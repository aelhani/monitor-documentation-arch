# Monitoring System – Next 3 Sprint Roadmap (CTO/Product Architecture View)

## 1) Current-State Assessment

Based on `_progress-tracking.md`, the platform is still at **foundation stage**:

- Overall completion is ~**5.5%** across workstreams.
- Most product-critical services (data collection, processing, alerts, admin/live frontends) are still not started.
- Existing progress is concentrated in architecture/docs, with early movement in user/dashboard/auth and CI/CD.

### Maturity Summary
- **Product maturity:** Low (architecture-heavy, limited production-ready implementation).
- **Technical maturity:** Low-to-medium in selected areas (auth/db/cicd direction exists), low in end-to-end sensor-to-dashboard pipeline.
- **Operational maturity:** Low (infra hardening/observability not yet delivered).

### Key Technical Risks
1. **No stable vertical slice yet** from sensor ingestion → processing → dashboard KPI visualization.
2. **Frontend reliability gaps** (404 on SPA route refresh; external font request issues) could block demos and undermine trust.
3. **Insufficient test coverage** in monitor-dashboard and monitor-user-mgmt increases regression risk as velocity rises.
4. **CI/CD not yet hardened** for safe progressive rollout.
5. **Undefined standards-to-KPI translation pipeline** risks building dashboards disconnected from compliance/value outcomes.

### Missing Foundations
- API contracts and schema versioning governance.
- Mock/synthetic sensor streams for deterministic local/dev/demo workflows.
- Baseline SLO/error-budget approach for critical services.
- Security and operational readiness gates (secrets, rollback, backups, observability).

### Highest-Impact Areas
- Deliver first production-like end-to-end data flow.
- Fix user-visible reliability defects immediately.
- Build test + CI confidence loop.
- Define policy/KPI model tied to recognized environmental standards.

---

## 2) Roadmap Priorities (Guiding Principles)

1. **Prove value early with a thin vertical slice** (ingestion to actionable KPI).
2. **Reduce technical risk before scaling features** (routing, assets, tests, contracts, observability).
3. **Institutionalize quality gates** (unit/integration tests + pipeline checks).
4. **Design for scale without overbuilding** (Kubernetes baseline after release safety exists).
5. **Tie product outputs to compliance language** (standards → policies → KPIs).

---

## 3) Sprint Plan (Next 3 Sprints)

Assumption: 2-week sprints with cross-functional squad (backend/frontend/devops/product).

## Sprint 1 — “Stabilize & De-risk Core UX + Contracts”

### Objective
Eliminate critical demo blockers and define stable contracts so teams can build in parallel safely.

### Key Deliverables
- SPA routing fixed (no 404 on refresh/deep-link).
- Frontend typography/assets stabilized (remove/fix bad Google Fonts dependency causing 400).
- Contract baseline between user dashboard and user-mgmt finalized and versioned.
- Unit test scaffolding and first meaningful suites for monitor-dashboard and monitor-user-mgmt.
- Mock sensor data generator (basic) for local dev and demos.

### Epics / Tasks
1. **Frontend Reliability Hardening**
   - Configure reverse-proxy/web server fallback to `index.html` for SPA routes.
   - Audit and correct font loading strategy (self-host or correct supported family).
   - Add smoke checks for route refresh and asset load in CI.

2. **Contract-First Integration**
   - Publish OpenAPI/typed contract for auth/user profile/dashboard dependencies.
   - Add compatibility checks in CI (contract lint + breaking-change detection).

3. **Testing Baseline**
   - Add unit tests for core dashboard widgets/state transforms.
   - Add unit tests for user-mgmt auth/session flows and validation logic.
   - Configure coverage threshold starter gates (modest target, e.g., 35–40% on touched modules).

4. **Developer Enablement via Synthetic Data**
   - Build mock sensor feed service/script with deterministic scenarios (normal/warning/critical).
   - Provide fixtures for UI and API integration testing.

### Expected Outcomes
- Demo reliability materially improved.
- Teams can integrate against stable interfaces.
- Regression risk starts dropping due to automated checks.
- Product discovery can proceed using realistic simulated data.

---

## Sprint 2 — “First End-to-End Monitoring Slice”

### Objective
Deliver the first complete monitoring workflow from sensor input to dashboard KPIs and initial alerts.

### Key Deliverables
- Data Collection service MVP (ingestion endpoint/consumer + validation + persistence).
- Data Processing baseline for core aggregates.
- Alerts & Logging baseline with first threshold-based alerting rule.
- Dashboard integration showing live-ish metrics from processed pipeline.
- PostgreSQL schema hardening for time-series-ish sensor records and KPI snapshots.

### Epics / Tasks
1. **Ingestion MVP**
   - Define ingestion contract (payload schema, idempotency key, timestamp policy).
   - Persist raw readings with traceability metadata.
   - Add dead-letter handling for malformed records.

2. **Processing & KPI Computation**
   - Implement periodic/stream processor for core KPIs (e.g., average, peak, threshold breach counts).
   - Store derived KPI snapshots for dashboard query performance.

3. **Alerts Baseline**
   - Implement first rules engine pass (configurable threshold rule).
   - Emit structured logs/events for alert lifecycle.

4. **Product Surface Integration**
   - Connect dashboard widgets to processed KPI APIs.
   - Add drill-down from KPI to source sensor context.

5. **Reliability + Security Minimums**
   - Add service health endpoints and basic SLO metrics.
   - Enforce authN/authZ checks for protected monitoring endpoints.

### Expected Outcomes
- Platform demonstrates core value proposition, not just architecture.
- Stakeholders can validate KPI usefulness with realistic flows.
- Risk reduced on data correctness and service boundaries.

---

## Sprint 3 — “Production Readiness & Scalable Delivery”

### Objective
Move from MVP slice to deployable, operable, and scalable platform baseline.

### Key Deliverables
- Kubernetes deployment baseline for core services (dev/staging), integrated into CI/CD.
- Progressive delivery controls (blue/green or canary-lite), rollback automation.
- Observability baseline (metrics, logs, traces, alerting dashboards).
- Standards-to-policy-to-KPI mapping v1 for at least one environmental framework.
- Release readiness checklist and go-live gates.

### Epics / Tasks
1. **Kubernetes Foundation**
   - Container hardening, resource requests/limits, readiness/liveness probes.
   - Helm/Kustomize templates for consistent environment promotion.
   - Secrets/config management policy for non-local envs.

2. **CI/CD Hardening**
   - Multi-stage pipeline: test → build → security scan → deploy staging.
   - Add deployment verification and auto-rollback triggers.

3. **Operational Observability**
   - Golden signals per service (latency, traffic, errors, saturation).
   - Centralized logs with correlation IDs.
   - On-call runbooks for common incidents.

4. **Compliance Productization**
   - Translate one target standard into explicit system policies.
   - Map policies to measurable KPIs and dashboard narratives.
   - Document audit trail requirements (who/what/when of alerts and overrides).

5. **Readiness & Governance**
   - Non-functional test pass (load smoke, backup/restore drill, basic security checks).
   - Definition of Done updated with test, observability, and docs requirements.

### Expected Outcomes
- Repeatable deployments and safer releases.
- Stronger confidence in reliability and incident response.
- Platform begins aligning with compliance-driven buying criteria.

---

## 4) Milestone-Level Success Metrics

Track sprint success using objective metrics:

- **Reliability:**
  - 0 known critical frontend route/font blockers.
  - API error-rate and dashboard load-time targets set and monitored.

- **Quality/Velocity:**
  - Unit-test coverage trend up each sprint on changed modules.
  - CI pass rate and mean-time-to-fix pipeline breaks.

- **Product Value:**
  - Sensor-to-KPI latency for core flow.
  - Number of actionable alerts generated from real/mock scenarios.
  - Stakeholder acceptance of standards-mapped KPI dashboard.

- **Scalability/Operations:**
  - Successful staging deployments via Kubernetes pipeline.
  - Verified rollback + incident runbook execution.

## 5) Recommended Sequencing Notes

- Do **not** postpone Sprint 1 reliability fixes; they are trust-critical and cheap to resolve.
- Build Kubernetes in Sprint 3 only after baseline quality gates are active to avoid scaling instability.
- Treat standards-to-KPI mapping as product core, not documentation-only: it directly affects market fit and procurement readiness.
