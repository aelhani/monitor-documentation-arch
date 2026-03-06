# Sprint 01 — Stabilize & De-risk Core UX + Contracts

## Sprint Objective
Eliminate critical demo blockers and define stable contracts so teams can build in parallel safely.

## Key Deliverables
- SPA routing fixed (no 404 on refresh/deep-link).
- Frontend typography/assets stabilized (remove/fix bad Google Fonts dependency causing 400).
- Contract baseline between user dashboard and user-mgmt finalized and versioned.
- Unit test scaffolding and first meaningful suites for monitor-dashboard and monitor-user-mgmt.
- Mock sensor data generator (basic) for local development and demos.

## Epics / Tasks
1. **Frontend Reliability Hardening**
   - Configure reverse-proxy/web server fallback to `index.html` for SPA routes.
   - Audit and correct font loading strategy (self-host or supported family).
   - Add smoke checks for route refresh and asset load in CI.

2. **Contract-First Integration**
   - Publish OpenAPI/typed contract for auth/user profile/dashboard dependencies.
   - Add compatibility checks in CI (contract lint + breaking-change detection).

3. **Testing Baseline**
   - Add unit tests for core dashboard widgets/state transforms.
   - Add unit tests for user-mgmt auth/session flows and validation logic.
   - Configure starter coverage gates on touched modules (e.g., 35–40%).

4. **Developer Enablement via Synthetic Data**
   - Build mock sensor feed service/script with deterministic scenarios (normal/warning/critical).
   - Provide fixtures for UI and API integration testing.

## Expected Outcomes
- Demo reliability materially improved.
- Teams can integrate against stable interfaces.
- Regression risk starts dropping due to automated checks.
- Product discovery can proceed using realistic simulated data.

## Sprint Success Metrics
- No critical known 404 refresh issues on supported routes.
- No unresolved font-load 400 issue in primary environments.
- Baseline unit tests running in CI for monitor-dashboard and monitor-user-mgmt.
- Mock sensor scenarios available for both demo and local development.
