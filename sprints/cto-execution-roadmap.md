# CTO Execution Roadmap — Air Quality & Emissions Monitoring Platform

## Current System Diagnosis

### 1) Maturity assessment
The project appears to be in a **functional prototype / pre-production stage**:
- Multi-app frontend exists (dashboard, admin, live display).
- Backend ingestion and processing paths exist.
- Docker + CI/CD foundations are present.
- Operational reliability patterns (route resilience, observability depth, test safety nets, release discipline) are still emerging.

This is a strong foundation for a small team, but it is not yet a production-ready platform.

### 2) Architectural gaps and technical risks

#### A. Runtime stability and delivery credibility gaps
- SPA refresh/direct-link 404 indicates reverse proxy/web server fallback is not correctly configured for frontend routes.
- Font request 400 indicates unmanaged third-party asset dependency and weak frontend build/runtime validation.

**Risk:** even simple user navigation breaks and interface quality degrades, reducing product credibility immediately.

#### B. Quality engineering gap
- No clear test pyramid and no explicit quality gates are described.
- Testing ideas are currently feature-siloed instead of risk-driven (e.g., “test dashboard”, “test user management”).

**Risk:** regressions in ingestion, metrics calculation, and authentication may reach production undetected.

#### C. Data pipeline confidence gap
- Sensor ingestion exists, but there is no explicit synthetic data harness for deterministic local, CI, and staging verification.

**Risk:** difficult to reproduce bugs, slow development cycles, and fragile demos.

#### D. Observability and operations gap
- There is no explicit baseline for logs, metrics, traces, SLOs, and alert runbooks.

**Risk:** failures become long investigations rather than quick recoveries.

#### E. Scope complexity risk (Kubernetes timing)
- Kubernetes is being considered early.

**Risk:** for a small team, premature Kubernetes adoption can reduce velocity unless basic reliability, deployment hygiene, and operational telemetry are already mature.

### 3) Most limiting factors right now
1. **Product trust blockers:** SPA routing + frontend asset failures.
2. **Release safety blockers:** insufficient automated test gates for core business-critical flows.
3. **Debugging/time-to-recovery blockers:** weak observability and alerting baseline.
4. **Developer speed blockers:** lack of realistic sensor simulation for dev/CI.

---

## Top 5 Engineering Priorities

### Priority 1 — Stabilize user-facing runtime behavior (immediate credibility)
**What:** Fix SPA routing fallback across environments; remove invalid Google Font dependency and enforce frontend asset checks.

**Why now:** Broken routing is a direct product failure. Reliability perception must be fixed before scaling features.

---

### Priority 2 — Establish a small-team test strategy with mandatory quality gates
**What:** Define a pragmatic test pyramid:
- Frontend: critical route/render smoke + a few high-value component tests.
- Backend: unit tests for metrics processing + API integration tests for auth/user management.
- Contract tests between frontend and backend for top APIs.
- CI gates: fail pipeline when core test suites fail.

**Why now:** This is the highest leverage for preventing regressions while still shipping fast.

---

### Priority 3 — Build deterministic sensor simulation and replay framework
**What:** Create mock sensor data generator + scenario library (normal, spikes, missing data, outliers, delayed packets).

**Why now:** Enables reproducible development, regression testing, and realistic stakeholder demos without relying on physical infrastructure.

---

### Priority 4 — Implement minimum viable observability and incident response
**What:**
- Structured logs with correlation IDs.
- Key RED/USE metrics and ingestion pipeline health metrics.
- Dashboard + alerting for ingestion delays, processing failures, API error rate, and UI availability.
- Lightweight runbooks for top 5 likely incidents.

**Why now:** Small teams need fast diagnosis more than complex tooling.

---

### Priority 5 — Harden deployment model before Kubernetes migration
**What:**
- Keep Docker-based deployments, but formalize environment promotion (dev -> staging -> prod).
- Add zero/low-downtime rollout pattern and rollback scripts.
- Define Kubernetes readiness criteria (traffic, team capacity, SLO maturity, deployment frequency).

**Why now:** Prevents premature infrastructure complexity while preserving future scalability path.

---

## 3 Sprint Execution Plan (2 weeks each)

## Sprint 1 — “Trust & Stability Baseline”

### Sprint Goal
Eliminate visible reliability issues and establish baseline release confidence.

### Key Deliverables
- SPA routing works on refresh/deep links in all frontend apps.
- Font loading fixed and static asset validation added to CI.
- Critical smoke tests for user login, dashboard load, and live display route.
- Deployment verification checklist for frontend release.

### Detailed Tasks
1. Configure reverse proxy/static host fallback (`/index.html`) per React app.
2. Add environment-specific route tests (local/staging build artifacts).
3. Replace invalid `Majalla` font reference with approved web-safe or bundled font.
4. Add CI step to detect failed external asset fetches/build warnings.
5. Add E2E smoke tests for:
   - `/dashboard`
   - `/admin`
   - `/live`
6. Create a release checklist: route sanity, API connectivity, asset health.

### Why This Sprint Matters
It removes immediate product trust failures and creates a minimum quality gate before further feature work.

### Expected Impact on the Product
- Fewer user-visible errors.
- Higher demo and stakeholder confidence.
- Reduced emergency hotfix frequency.

---

## Sprint 2 — “Data & Quality Engineering Foundation”

### Sprint Goal
Create reproducible development/testing workflows centered on sensor data and core logic.

### Key Deliverables
- Mock sensor generator with scenario packs.
- Backend test coverage for ingestion and metrics transformation logic.
- API integration tests for authentication/user management critical flows.
- CI pipeline split into fast checks and full checks.

### Detailed Tasks
1. Design sensor simulation schema (timestamp, location, pollutant values, status).
2. Implement replay modes:
   - Real-time stream mode
   - Accelerated replay mode
   - Deterministic seed mode
3. Add backend unit tests for:
   - aggregation windows
   - anomaly threshold logic
   - unit conversion correctness
4. Add integration tests for:
   - login/role permissions
   - user create/update/deactivate
5. CI optimization:
   - PR pipeline: lint + fast tests
   - Main branch pipeline: full integration suites

### Why This Sprint Matters
It converts uncertain behavior into testable, reproducible workflows and materially improves engineering velocity.

### Expected Impact on the Product
- More stable releases.
- Faster debugging.
- Reliable non-production demos of real-world scenarios.

---

## Sprint 3 — “Operate Like Production”

### Sprint Goal
Introduce practical observability and deployment maturity for production-like operations.

### Key Deliverables
- Unified structured logging standard.
- Core service dashboards and actionable alerts.
- Runbooks for top incident types.
- Deployment promotion policy and rollback automation.
- Kubernetes readiness decision memo (go/no-go criteria).

### Detailed Tasks
1. Implement request/trace correlation IDs across API and ingestion services.
2. Define service SLO candidates:
   - API uptime
   - ingestion latency
   - data freshness on dashboard
3. Build dashboards for:
   - API p95 latency
   - ingestion queue depth
   - processing error count
   - frontend availability
4. Configure alert thresholds and paging rules for high-severity events.
5. Create runbooks for:
   - sensor ingestion stall
   - API auth outage
   - delayed dashboard updates
6. Implement scripted rollback for previous deploy artifact.
7. Draft Kubernetes readiness checklist and decision matrix.

### Why This Sprint Matters
Operations capability is a prerequisite for credible production rollout and any future SaaS commitments.

### Expected Impact on the Product
- Reduced MTTR.
- Better reliability posture.
- Clear, evidence-based path to future Kubernetes adoption.

---

## High-Level Roadmap (Next 6 Months)

### Phase 1 (Month 1–2): Stabilize and Standardize
- Complete Sprint 1 + Sprint 2 outcomes.
- Enforce CI quality gates and branch protection.
- Define architecture ownership map for frontend, backend, and platform concerns.

### Phase 2 (Month 3–4): Production Reliability Layer
- Complete Sprint 3 outcomes.
- Formalize SLOs/SLIs and incident review cadence.
- Add data quality checks (schema drift, missing/invalid sensor data policies).

### Phase 3 (Month 5–6): SaaS Readiness Foundations
- Multi-tenant readiness assessment (tenant boundary strategy, data isolation options).
- Security hardening:
  - RBAC refinement
  - secrets lifecycle policy
  - audit logging for admin actions
- Compliance roadmap translation:
  - map environmental standards into KPI catalog
  - define report generation requirements and traceability model
- Decide infra evolution path:
  - stay on hardened Docker orchestration, or
  - phased Kubernetes adoption if readiness criteria are met.

---

## Strategic Work Missing from the Initial List

1. **Architecture boundary enforcement**
   - Define clear contracts between ingestion, processing, API, and UI layers.
   - Introduce API versioning policy for external consumers.

2. **Security and identity maturity**
   - Threat model for admin APIs and ingestion endpoints.
   - Token/session lifecycle hardening.
   - Least-privilege access and audit logging.

3. **Data governance and compliance traceability**
   - Data retention policy by metric type.
   - Lineage metadata for compliance reporting.
   - Evidence store for generated compliance outputs.

4. **Frontend architecture consistency**
   - Shared component/system design guidelines across Dashboard/Admin/Live apps.
   - Shared API client/error-handling strategy to reduce duplicated logic.

5. **Product analytics + reliability KPIs**
   - Engineering KPIs: deployment frequency, change failure rate, MTTR, escaped defects.
   - Product KPIs: data freshness SLA attainment, alert accuracy, dashboard load performance.

These additions are necessary to evolve from “working software” to a platform trusted by enterprise and public-sector buyers.
