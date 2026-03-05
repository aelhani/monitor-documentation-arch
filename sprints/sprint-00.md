# Sprint 00 — Architecture Alignment Sprint

## Sprint Goal
Establish a consistent baseline across backend, frontend, database, and CI/CD so that the project can deliver a stable authenticated KPI dashboard flow.

## Priority Outcomes

### 1) Authentication Baseline (User Management)
**Definition of Done**
- Login/auth endpoints documented and validated in user-mgmt architecture docs.
- Frontend login flow mapped to backend auth behavior.
- Auth prerequisites and environment settings are explicit.

### 2) PostgreSQL Baseline
**Definition of Done**
- MongoDB references removed from active architecture docs.
- PostgreSQL documented as system-of-record in backend and high-level docs.
- Environment policy and DB strategy references are consistent.

### 3) Dashboard Baseline
**Definition of Done**
- Domain-oriented dashboard model documented (global + energy/water/air/recycling/emissions).
- Business-logic and layout references aligned with source-of-truth frontend documents.
- Dependencies on auth and backend data contracts identified.

### 4) CI/CD Baseline
**Definition of Done**
- Jenkins folder/common-loader/pipeline workflow references aligned.
- Role of optional GitHub Actions clarified as supplementary checks.
- Service-repository CI/CD expectations documented.

### 5) Documentation Cohesion
**Definition of Done**
- Outdated architecture articles rewritten to reflect current technology choices.
- Navigation/index and onboarding-oriented architecture docs added.
- Progress tracking updated to current realistic percentages and priorities.

## Risks
- Drift between implementation and docs if updates are not tied to delivery workflows.
- Inconsistent naming across services/repos can reduce onboarding clarity.

## Exit Criteria
- New contributors can understand: service boundaries, data flow, auth path, and CI/CD path from documentation alone.
