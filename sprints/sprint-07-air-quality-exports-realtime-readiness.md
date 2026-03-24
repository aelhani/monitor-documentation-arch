# Sprint 07 — Air Quality Exports, Real-Time, and Readiness Gates

## Sprint Objective
Operationalize the Air Quality dashboard for compliance reporting and day-to-day usage through GRI-ready exports, near-real-time updates, role-based access controls, and non-functional readiness gates.

## Scope for this Sprint
### In Scope
- Reporting and export capabilities:
  - PDF export (GRI-ready section)
  - CSV export (structured table)
  - JSON export (API-compatible schema)
  - Required export content: reporting period, metrics, breakdowns, methodology, boundaries
- Real-time refresh behavior:
  - WebSocket or polling path
  - default refresh interval = 30s, tenant-configurable
- Security and tenancy:
  - Viewer / Analyst / Admin role permissions
  - organization-scoped data access validation
- Non-functional controls:
  - page load and rendering performance gates
  - reliability checks under normal load

### Out of Scope
- Predictive analytics.
- Advanced anomaly-detection beyond reporting requirements.

## Key Deliverables
1. **GRI Export Pack v1**
   - Unified export schema mapping to GRI 305 reporting structure.
   - PDF/CSV/JSON generation integrated with Air Quality filters.
2. **Real-Time Delivery Path**
   - Refresh pipeline with configurable cadence and stale-data indicators.
3. **Security + Tenant Controls**
   - Role-aware visibility of insights, exports, and methodology details.
   - Tenant-scoped emission factor and metric-toggle behavior enforced.
4. **Release Readiness Evidence**
   - Acceptance criteria checklist execution and signoff.
   - Performance test report and known-risk register update.

## Epics / Tasks
1. **Export Service Integration**
   - Implement Air Quality export endpoint integration for all supported formats.
   - Validate completeness of required GRI fields across formats.

2. **Real-Time Updates**
   - Add polling/WebSocket update mechanism with configurable interval.
   - Prevent full-page reloads during data refresh.

3. **RBAC and Data Scoping**
   - Enforce role-based feature access.
   - Enforce organization data boundaries in API and UI queries.

4. **Performance + Quality Gates**
   - Validate initial page load < 2s under normal conditions.
   - Validate chart render/update < 500ms for standard dashboard datasets.
   - Execute regression suite for filters, drill-downs, and exports.

5. **Risk Mitigation and Operational Handoff**
   - Add controls for sensor-vs-estimated inconsistency detection.
   - Add checks for emission factor misalignment across organizations.
   - Publish runbook for support and audit response workflows.

## Expected Outcomes
- Air Quality dashboard can be used for formal GRI-aligned reporting cycles.
- Users receive current data without disruptive reload behavior.
- Compliance, performance, and access controls are validated before rollout.

## Sprint Success Metrics
- Export files include all required reporting and methodology fields in all formats.
- Real-time updates run at configured interval without page reload.
- RBAC and tenant scoping tests pass for Viewer/Analyst/Admin roles.
- Performance targets are met under normal load profile.
