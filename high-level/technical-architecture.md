# Technical Architecture (Current State)

## Scope
This document describes the current technical architecture baseline and replaces earlier exploratory stacks (MongoDB/Firebase-heavy variants).

## Technology Baseline

### Frontend
- React-based frontend ecosystem composed of multiple purpose-specific applications.
- Domain-oriented UX coverage: user dashboards, administration workflows, and public live displays.
- Login and authenticated navigation integrated with backend user management APIs where applicable.

## Frontend Architecture

The Monitoring System frontend layer is implemented as a set of React applications rather than a single UI. Each repository addresses a specific user context while sharing architecture principles (API-first integration, reusable UI patterns, and environment-based configuration).

### 1) `monitor-dashboard`
- Primary user-facing interface for viewing air quality data, reports, and alerts.
- Provides dashboard experiences with charts and map-based visualizations.
- Consumes backend services through REST APIs for KPI data, alert states, and reporting views.

### 2) `monitor-admin-panel`
- Administrative interface for managing users, alert thresholds, and system-level settings.
- Exposes CRUD-oriented workflows for platform administrators.
- Integrates with `monitor-service-user-mgmt` for identity and account-management operations.

### 3) `monitor-live-display`
- Real-time, large-screen frontend intended for public or operations-room display.
- Continuously refreshes to show live air quality/emissions indicators.
- Optimized for readability, minimal interaction, and high-visibility layouts.

### 4) `monitor-ui-components` (shared library, optional but recommended)
- Shared React component repository used across frontend applications.
- Hosts reusable UI elements (for example buttons, charts, and layout primitives).
- Reduces duplication and improves visual/interaction consistency between frontend projects.

### Frontend-to-Backend Interaction Model
- Frontend applications communicate with backend microservices via REST APIs.
- Authentication and user context are provided by user-management services and consumed by UIs that require secured access.
- Data dashboards and live displays consume processed environmental metrics from data collection/processing services.
- Administrative actions (user/threshold/settings changes) flow through dedicated backend service endpoints for validation and persistence.

### Backend
- Microservices architecture centered on:
  - `monitor-service-user-mgmt`
  - data collection service
  - data processing service
  - alerts/logging service
- API-first interactions between services and frontend.

### Data & Storage
- **PostgreSQL is the primary operational database.**
- Environment-specific connection policies and credentials management follow `core-backend/environment-and-database-policy.md`.
- User/account persistence follows `core-backend/user-mgmt-with-postgre.md`.

### CI/CD & Infrastructure
- Jenkins folder strategy for team/project scalability.
- Shared common loader for reusable pipeline behavior.
- Service pipeline workflows in dedicated pipeline definitions.

## Runtime Environments
- Local development for rapid iteration.
- Cluster/deployment environments for integrated testing and release.
- Environment settings are explicit and non-hardcoded (12-factor alignment).

## Security Baseline
- User authentication/login enforced for dashboard access.
- Token/session handling implemented by user-mgmt APIs and consumed by frontend.
- Secrets managed via environment-level configuration and CI/CD credentials.

## Decision Snapshot
1. PostgreSQL replaces MongoDB as primary database direction.
2. Authentication is service-owned (user-mgmt) and integrated into frontend user journey.
3. Jenkins shared libraries/loaders standardize CI/CD across services.
4. Documentation follows source-of-truth articles for implementation details.
