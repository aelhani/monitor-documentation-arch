# High-Level Architecture (Updated)

This document summarizes the current target architecture and replaces older mixed-database assumptions.

## Layers

### 1. Experience Layer
- User dashboard with login, global overview, and domain pages.
- User profile and session-aware navigation.

### 2. Application Layer
- User management service (authentication and user lifecycle).
- KPI-focused backend services (ingestion, processing, analytics, alerts).

### 3. Data Layer
- PostgreSQL as the core relational persistence layer.
- Schema and environment policy defined in backend source-of-truth docs.

### 4. Delivery Layer
- Jenkins multibranch jobs per service repository.
- Shared loader pattern (`monitor-cicd-common`) to execute centralized pipeline scripts.
- Kubernetes runtime deployments through infrastructure configuration repositories.

## End-to-End Flow (Simplified)

1. User authenticates through user management APIs.
2. Dashboard loads user context and available KPI domains.
3. KPI services expose metrics and trends to frontend pages.
4. Alerts and operational insights are produced from processed KPI data.
5. CI/CD pipelines build, test, package, and deploy service updates.

## Alignment Notes

- Remove MongoDB-centric references from implementation docs.
- Keep all authentication references aligned with the implemented login flow.
- Keep dashboard descriptions aligned with the current frontend architecture documents.
