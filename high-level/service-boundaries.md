# Service Boundaries

This document defines current service boundaries to avoid overlap and coupling.

## Boundary Principles

- One service owns one core business capability.
- Each service owns its schema objects and operational logic.
- Cross-service dependencies happen through explicit APIs/contracts.

## Current Logical Services

### 1. User Management Service
- User authentication and login.
- User profile/identity management.
- Access control context for frontend and backend consumers.

### 2. KPI Data Services
- Ingestion, validation, and storage of KPI measurements.
- Domain-level retrieval APIs for dashboard pages.

### 3. Rules/Alerting Services
- Threshold and business-rule evaluation.
- Alert creation and lifecycle management.

### 4. Reporting/Analytics Services
- Aggregations for trend analysis and compliance-oriented reporting.

### 5. Frontend Dashboard
- Consumes service APIs.
- Presents global and domain-specific KPI views.

## Shared Concerns (Not Business Domains)

- CI/CD tooling and pipeline definitions.
- Kubernetes deployment descriptors.
- Observability, logging, and tracing standards.
