# Sprint 02 — First End-to-End Monitoring Slice

## Sprint Objective
Deliver the first complete monitoring workflow from sensor input to dashboard KPIs and initial alerts.

## Key Deliverables
- Data Collection service MVP (ingestion endpoint/consumer + validation + persistence).
- Data Processing baseline for core aggregates.
- Alerts & Logging baseline with first threshold-based alerting rule.
- Dashboard integration showing live-ish metrics from processed pipeline.
- PostgreSQL schema hardening for sensor records and KPI snapshots.

## Epics / Tasks
1. **Ingestion MVP**
   - Define ingestion contract (payload schema, idempotency key, timestamp policy).
   - Persist raw readings with traceability metadata.
   - Add dead-letter handling for malformed records.

2. **Processing & KPI Computation**
   - Implement periodic/stream processor for core KPIs (average, peak, threshold breach counts).
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

## Expected Outcomes
- Platform demonstrates core value proposition, not just architecture.
- Stakeholders can validate KPI usefulness with realistic flows.
- Risk reduced on data correctness and service boundaries.

## Sprint Success Metrics
- End-to-end sensor-to-dashboard flow working in staging-like environment.
- First alert rule generates actionable events from both real and synthetic input.
- Core KPI APIs meet baseline correctness and response-time targets.
