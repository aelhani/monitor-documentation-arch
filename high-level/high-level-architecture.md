# Monitoring System — High-Level Architecture

## Purpose
This document is the architectural entry point. It defines scope and layers, then links to canonical deep-dive docs to avoid duplicated content.

## System Scope
The platform monitors environmental and operational KPIs across compounds/spaces:
- Air quality
- Energy
- Water
- Recycling
- Emissions

## Logical Architecture Layers
1. **Edge & Ingestion**
   - Sensor devices and external data providers emit KPI readings.
   - Ingestion APIs normalize and validate payloads.

2. **Core Services**
   - User Management
   - Data Collection
   - Data Processing
   - Alerts & Logging

3. **Persistence**
   - PostgreSQL is the system-of-record for operational and user/account data.

4. **Experience**
   - User Dashboard frontend for global and domain KPI views.

5. **Delivery**
   - Jenkins multibranch CI/CD with shared loader/pipeline architecture.

## Canonical Deep Dives
- Service ownership matrix: `high-level/service-responsability.md`
- System context and interaction map: `high-level/system-context-and-data-flow.md`
- Detailed component data flow: `core-backend/data-flow-between-components.md`
- Security and authentication: `high-level/security-and-authentication-architecture.md`
- Observability and monitoring: `high-level/observability-and-monitoring-strategy.md`
- Source-of-truth implementation documents:
  - `frontend/business-logic-and-ui-layout.md`
  - `frontend/user-dashboard-layout.md`
  - `core-backend/environment-and-database-policy.md`
  - `core-backend/user-mgmt-with-postgre.md`
  - `cicd-infra/jenkins-folders.md`
  - `cicd-infra/cicd-common-loader-arch.md`
  - `cicd-infra/jenkins-pipelines-workflow.md`

## Architecture Principles
- Single ownership per business capability.
- PostgreSQL-first persistence strategy.
- API contracts over direct cross-service DB coupling.
- CI/CD as the standard path to environment changes.
- Keep docs concise and cross-linked rather than duplicated.
