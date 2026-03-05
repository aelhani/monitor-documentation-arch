# Technical Architecture (Current State)

## Scope
This document describes the current technical architecture baseline and replaces earlier exploratory stacks (MongoDB/Firebase-heavy variants).

## Technology Baseline

### Frontend
- React-based dashboard application.
- Domain-oriented UI: global overview + KPI domain pages (energy, water, air quality, recycling, emissions).
- Login and authenticated navigation integrated with backend user management APIs.

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
