# Monitoring System: Architecture Overview

## Purpose

The Monitoring System is a microservices-based platform that ingests, stores, analyzes, and visualizes environmental and operational KPIs for buildings and compounds.

## KPI Domains

- Air quality
- Energy consumption
- Water usage
- Recycling and waste
- Emissions

## Core Building Blocks

1. **Data producers**
   - Sensors, gateways, and operational systems emitting KPI measurements.
2. **Ingestion and processing services**
   - Services responsible for validation, normalization, and rule evaluation.
3. **Core data layer (PostgreSQL)**
   - Primary persistent storage for users, domains, measurements metadata, and operational entities.
4. **User management and authentication**
   - Login and identity lifecycle handled by `monitor-service-user-mgmt`.
5. **Frontend dashboard**
   - Domain-based UI with global overview and detailed KPI pages.
6. **CI/CD and runtime infrastructure**
   - Jenkins multibranch pipelines, reusable shared library loader, Kubernetes deployments.

## Key Architectural Decisions

- **Database standardization**: PostgreSQL is the primary data store for backend services.
- **Authentication first**: Login is required before dashboard access.
- **Domain-oriented UI**: Dashboard navigation and business logic are organized by KPI domains.
- **Reusable CI/CD architecture**: Service pipelines are loaded dynamically from centralized pipeline definitions.

## System Qualities

- **Scalability**: Independent service and pipeline evolution.
- **Traceability**: CI/CD versioning and branch-based pipeline selection.
- **Maintainability**: Centralized architecture references and explicit service boundaries.
- **Security**: Authenticated access and controlled CI/CD credentials model.
