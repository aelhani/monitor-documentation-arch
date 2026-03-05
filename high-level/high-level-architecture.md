# Monitoring System — High-Level Architecture

## Purpose
This document provides a concise architecture map of the Monitoring System and aligns with the current implementation direction:
- PostgreSQL as the operational database.
- Dedicated user management service with login/authentication flows.
- User dashboard as the main product surface.
- Jenkins-based CI/CD with reusable pipeline loaders.

Reference documents for implementation details:
- `frontend/business-logic-and-ui-layout.md`
- `frontend/user-dashboard-layout.md`
- `core-backend/environment-and-database-policy.md`
- `core-backend/user-mgmt-with-postgre.md`
- `cicd-infra/jenkins-folders.md`
- `cicd-infra/cicd-common-loader-arch.md`
- `cicd-infra/jenkins-pipelines-workflow.md`

---

## System Context
The platform monitors environmental and operational KPIs across compounds/spaces:
- Air quality
- Energy
- Water
- Recycling
- Emissions

Primary users authenticate, access dashboard views, and inspect KPI trends, alerts, and drill-down data.

---

## Logical Architecture Layers

### 1) Edge & Ingestion Layer
- Sensor devices and external data providers push KPI readings.
- Ingestion APIs normalize payloads and apply basic validation.

### 2) Core Services Layer
- **User Management Service**: Authentication, profile, role/account APIs.
- **Data Collection Service**: Accepts and stores measurements/events.
- **Data Processing Service**: Aggregates/derives metrics for dashboard consumption.
- **Alerts & Logging Service**: Generates and records alert events.

### 3) Persistence Layer
- **PostgreSQL** is the system-of-record for user and operational data.
- Clear table ownership per service domain is preferred, with explicit contracts for shared reads.

### 4) Experience Layer
- **User Dashboard Frontend** for KPI monitoring, global overview, and domain pages.
- Login flow integrated with backend authentication.

### 5) Delivery Layer
- Jenkins multibranch pipelines trigger build/test/deploy flows.
- Shared CI/CD loader architecture keeps service pipelines consistent.

---

## Architectural Principles
- Service boundaries first: each service owns a clear business capability.
- PostgreSQL-first persistence strategy.
- API contracts over direct cross-service DB coupling.
- CI/CD as a mandatory path to environment changes.
- Documentation updated with architecture decisions as part of delivery.
