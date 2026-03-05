# Repository Map

This document maps repository roles for the Monitoring System and aligns naming to current architecture decisions.

## Documentation Repository
- `monitor-documentation-arch` (this repository)
  - Architecture and operating model documentation.
  - Source-of-truth articles for frontend/backend/CI-CD direction.

## Application Repositories (Expected/Active Pattern)

### Backend Services
- `monitor-service-user-mgmt`
  - User login/auth/profile management.
  - PostgreSQL persistence.
- `monitor-service-data-collection`
  - KPI ingestion and normalization.
  - PostgreSQL persistence for collected readings.
- `monitor-service-data-processing`
  - Aggregation and derivation jobs/APIs.
- `monitor-service-alerts-logging`
  - Alert generation and audit/event tracking.

### Frontend
- `monitor-dashboard`
  - Main user-facing interface for air quality dashboards, reports, and alerts.
  - React application consuming backend REST APIs for KPI and alert/reporting data.
- `monitor-admin-panel`
  - Administrative UI for user, threshold, and configuration management workflows.
  - React CRUD interface integrated with `monitor-service-user-mgmt`.
- `monitor-live-display`
  - Real-time large-screen/public display for auto-refreshing environmental indicators.
  - React UI optimized for readability and at-a-glance monitoring.
- `monitor-ui-components` (optional shared library)
  - Reusable React components (e.g., buttons, charts, layout primitives).
  - Shared by frontend apps to reduce duplication and enforce consistency.

### CI/CD and Infrastructure
- `monitor-cicd-common`
  - Shared Jenkins library and loader patterns.
- `monitor-cicd-pipelines`
  - Service pipeline implementations.
- `monitor-cicd-infra-config`
  - Deployment manifests and environment-level infrastructure configs.

## Repository Conventions
1. Every service repository includes a `Jenkinsfile` for CI/CD entrypoint.
2. Environment variables are required for DB/auth/runtime config.
3. API contracts are documented in each service repo and cross-referenced from this repository.
