# CTO Execution Roadmap — Air Quality & Emissions Monitoring Platform

## Current System Diagnosis

### Likely Maturity Stage
The project appears to be in a **late prototype / pre-production** phase:
- Core product slices exist (dashboard, admin, live display, APIs, ingestion).
- Deployment and CI/CD exist in some form (Docker + pipelines).
- Known issues are mostly operational and product-hardening items, not greenfield unknowns.

This is good momentum, but it also means the next bottleneck is not “more features.” It is **reliability + execution discipline**.

### Architectural Gaps
1. **Runtime boundary clarity is still weak**
   - Frontend apps, APIs, and ingestion exist, but missing explicit contracts for data schemas, latency expectations, and error semantics.
   - Without clear contracts, team members will keep reinterpreting data formats and API behavior.

2. **Environment parity risk (dev/stage/prod mismatch)**
   - SPA routing 404 and font failures indicate web serving and asset strategy are not standardized across environments.
   - This often causes “works on localhost, fails in deployed container” loops.

3. **Data pipeline trustworthiness is not yet explicit**
   - Sensor ingestion exists, but there is no mention of idempotency, late-data handling, quality flags, or backfill strategy.
   - For emissions/compliance use cases, data lineage and accuracy confidence are product-critical.

4. **No explicit observability baseline**
   - There is no mention of structured logs, traces, error budgets, SLOs, or alert policy.
   - A monitoring product without strong self-monitoring undermines credibility.

### Missing Engineering Practices
- **Risk-based testing pyramid** is absent (unit + contract + integration + smoke/e2e).
- **Definition of Done** likely does not include operability checks (health endpoints, logs, dashboards, rollback readiness).
- **Release hardening discipline** appears limited (canary/rollback strategy, migration safety checks, post-deploy verification).
- **Frontend deployment checklist** is missing (SPA fallback, cache policy, asset integrity, external dependency validation).

### Technical Risks
- **Immediate risk:** SPA route refresh failures break user trust and demo stability.
- **Brand/UX risk:** external Google font call failing adds noisy errors and can break visual consistency.
- **Scaling risk:** Kubernetes before operational baselines can increase failure modes and cognitive load.
- **Compliance credibility risk:** without KPI/compliance model formalization, reporting can be inconsistent and hard to audit.

### Scalability Blockers
- Lack of ingestion reliability semantics (retry/idempotency/dead-letter handling).
- No clear performance budgets (ingestion throughput, dashboard query latency, live display refresh SLA).
- Unknown database/query optimization strategy for time-series heavy workloads.

### Developer Productivity Blockers
- Unclear local simulation path for realistic sensor data.
- Probably long feedback loops due to limited automated tests and environment drift.
- Troubleshooting friction due to weak logs/metrics/traces.

### What Is Limiting the Project Most Right Now
The biggest limiter is **platform reliability discipline**, not feature breadth.

In practical terms: fix deployment/runtime correctness + add observability + add high-value automated tests + create repeatable sensor simulation. These four unlock faster and safer delivery across everything else.

---

## Top 5 Engineering Priorities

### 1) Stabilize Frontend Delivery and Runtime Behavior (Now)
**Scope**
- Fix SPA refresh/direct-route handling on all React apps.
- Replace/fix broken Google font dependency (self-host or correct family).
- Standardize web server config + cache headers across environments.

**Why now**
This removes visible product instability and reduces repeated support/debug time.

---

### 2) Establish a “Minimum Viable Quality Gate” in CI/CD
**Scope**
- Mandatory checks per PR: lint + typecheck + targeted unit tests + API contract checks + build.
- Add deploy smoke tests (health endpoints, route checks, critical API call).
- Introduce release tagging and rollback notes.

**Why now**
Small teams scale through automation, not heroics. This shortens lead time while reducing regressions.

---

### 3) Build a Deterministic Sensor Data Simulation Layer
**Scope**
- Mock sensor generator with scenarios: normal, spike, dropout, delayed packet, out-of-range.
- Replayable datasets for QA and demo environments.
- Seed scripts for local/staging environments.

**Why now**
It unblocks backend, frontend, QA, and demo readiness without dependency on physical infrastructure availability.

---

### 4) Add Observability Baseline (Logs, Metrics, Alerts)
**Scope**
- Structured logging with correlation IDs across ingestion/API/frontend request paths.
- Core dashboards: ingestion success rate, processing latency, API error rate, frontend JS errors.
- Alert policy for critical failures and data gaps.

**Why now**
You cannot run production-grade monitoring without monitoring your own pipeline health.

---

### 5) Define Compliance KPI Domain Model and Data Contracts
**Scope**
- Translate standards into versioned KPI definitions (formula, units, source fields, aggregation windows).
- Document contract between ingestion → processing → API → UI.
- Add validation checks for required fields/units.

**Why now**
This is the foundation of product credibility and future SaaS auditability.

---

## 3 Sprint Execution Plan (2 Weeks Each)

## Sprint 1 — “Stability and Deployment Correctness”
### Sprint Goal
Eliminate customer-visible runtime issues and create a safe release baseline.

### Key Deliverables
- SPA routing fixed in user dashboard, admin panel, and live display deployments.
- Font strategy fixed (remove broken external dependency or correct/safe fallback).
- CI quality gate v1 and post-deploy smoke checks.

### Detailed Tasks
1. **Frontend delivery hardening**
   - Add server rewrite/fallback rules for all SPA routes.
   - Verify route refresh/deep-link behavior for all major views.
   - Define cache policy for static assets and index entrypoint.

2. **Asset dependency cleanup**
   - Replace invalid `Majalla` Google Font request.
   - Prefer bundled/local font fallback to avoid external runtime dependency.

3. **CI/CD guardrails v1**
   - Enforce lint, typecheck, build, and smoke-test gates.
   - Add a quick deploy verification checklist script.

4. **Incident prevention basics**
   - Add standardized error page/handler for frontend runtime issues.
   - Document rollback steps in deployment runbook.

### Why This Sprint Matters
It addresses the most visible reliability failures and makes every subsequent sprint safer to ship.

### Expected Impact on the Product
- Fewer visible production/demo breakages.
- Better first impression and stakeholder confidence.
- Faster debug cycles due to standardized deployment behavior.

---

## Sprint 2 — “Confidence Through Testability + Simulation”
### Sprint Goal
Create repeatable development/test workflows independent of real sensor hardware.

### Key Deliverables
- Sensor simulation service/tooling with scenario library.
- Test strategy v1 implemented in highest-risk areas.
- Contract tests between APIs and frontend consumers.

### Detailed Tasks
1. **Simulation engine**
   - Implement generator with deterministic seeds.
   - Scenario packs: normal, burst, outage, delayed, malformed.
   - CLI/profile presets for local/staging runs.

2. **Testing strategy rollout**
   - Unit tests for user dashboard core transforms and user management services.
   - Integration tests for ingestion-to-API critical path.
   - E2E smoke for login + dashboard load + live data tile render.

3. **Contract governance**
   - Define JSON schema / OpenAPI assertions for top APIs.
   - Add CI checks to prevent contract-breaking changes.

4. **Developer experience improvements**
   - One-command local stack start (including simulation).
   - Seed/test data scripts and troubleshooting guide.

### Why This Sprint Matters
It significantly improves team velocity by reducing dependence on unstable external inputs and manual testing.

### Expected Impact on the Product
- Predictable QA and demos.
- Reduced regression risk.
- Faster onboarding and feature iteration.

---

## Sprint 3 — “Operability + Compliance-Ready Foundation”
### Sprint Goal
Make platform behavior measurable and align outputs with compliance-grade KPI definitions.

### Key Deliverables
- Observability baseline dashboards and alerts.
- KPI/compliance data model v1 with versioned definitions.
- Production readiness checklist for pre-scale operations.

### Detailed Tasks
1. **Observability implementation**
   - Add correlation IDs and structured logs end-to-end.
   - Define SLIs/SLOs for ingestion timeliness, API latency, and error rates.
   - Configure alerts for ingestion interruption, high error rate, stale display data.

2. **KPI/compliance model**
   - Publish KPI catalog with formula/units/granularity/source mapping.
   - Add validation rules at ingestion and processing boundaries.
   - Version KPI definitions for audit traceability.

3. **Operational readiness**
   - Write runbooks for top incidents (sensor outage, data lag, API degradation).
   - Add backup/restore and data retention policy checks.
   - Introduce security baseline: secret management review, RBAC validation, audit logging scope.

4. **Kubernetes decision framework (not full migration yet)**
   - Define objective trigger criteria for migration (throughput, team ops capacity, multi-tenant needs).
   - Run a small proof-of-readiness checklist rather than full platform migration.

### Why This Sprint Matters
It converts the project from “feature-complete prototype” to “operable platform with trustworthy outputs.”

### Expected Impact on the Product
- Better uptime and incident response.
- Increased confidence from enterprise stakeholders.
- Stronger foundation for certification/compliance discussions.

---

## High-Level Roadmap (Next 6 Months)

### Month 1–2: Reliability and Delivery Baseline
- Close known frontend/runtime issues.
- CI/CD quality gates + smoke testing + rollback discipline.
- Deterministic sensor simulation integrated into developer workflow.

### Month 3–4: Operability and Data Integrity
- Full observability baseline with alerting and on-call triage runbooks.
- Data quality checks and pipeline resilience patterns (retry/idempotency/dead-letter).
- Time-series query/performance optimization for dashboard workloads.

### Month 5–6: SaaS/Scale Readiness (Selective)
- Tenant-aware architecture review (data isolation, per-tenant quotas, access boundaries).
- Security maturity uplift (SSO/OIDC, stronger audit trails, secrets lifecycle).
- Kubernetes adoption only if trigger criteria are met; otherwise strengthen Docker + orchestration automation.

### Strategic Work Missing from the Original List (Must Add)
1. **Architecture decision records (ADRs)** for major tradeoffs (Kubernetes timing, storage model, KPI versioning).
2. **Data governance** (retention, lineage, correction policy, replay policy).
3. **Security baseline** (threat model, least privilege, secrets rotation, authz boundaries).
4. **Product SLOs** tied to business outcomes (dashboard freshness, alarm delay, uptime targets).
5. **Commercial/SaaS readiness controls** (tenant model, billing event hooks, usage metering primitives).

### CTO Guidance on Prioritization
For a small team, do not chase maximum architecture sophistication early.
Use this sequence:
1) **Reliability first** (visible stability and deploy safety)
2) **Repeatability second** (simulation + tests + contracts)
3) **Operability third** (observability + runbooks + SLOs)
4) **Scale selectively** (Kubernetes only when justified by load and team readiness)

That ordering maximizes velocity, credibility, and future optionality without over-engineering.
