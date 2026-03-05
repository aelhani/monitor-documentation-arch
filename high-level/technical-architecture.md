# Technical Architecture (Implementation-Aligned)

This document provides a practical technical view of the Monitoring System, focusing on the currently adopted stack and delivery model.

---

## 1) Architecture Style

- **Microservices-oriented backend** with domain-aligned service boundaries.
- **Web frontend dashboard** consuming authenticated APIs.
- **PostgreSQL-centered persistence strategy** for core relational data.
- **Jenkins-based CI/CD** with shared library + centrally versioned pipeline definitions.
- **Kubernetes runtime target** for deployed services.

---

## 2) Runtime Topology (Logical)

### Frontend layer
- User-facing dashboard application.
- Provides login entry, global overview, and domain-level KPI pages.
- Calls backend APIs with auth context.

### API/service layer
- User management service for authentication/profile identity functions.
- KPI services for ingestion, retrieval, and domain responses.
- Processing/alerting capabilities for threshold/event workflows.

### Data layer
- PostgreSQL as current canonical relational store.
- Service-owned schema boundaries to reduce coupling.

### Platform layer
- Jenkins for build/test/deploy orchestration.
- Kubernetes for runtime deployment and service networking.

---

## 3) Service Communication Model

- **Frontend → Backend**: authenticated HTTP APIs.
- **Service ↔ Service**: API contracts and explicit integration boundaries.
- **Service → Database**: service-owned persistence operations.

### Principles

1. Avoid shared-table coupling across services.
2. Keep payload contracts explicit and versionable.
3. Keep auth responsibilities centralized in user management.

---

## 4) Configuration and Secrets Strategy

- Environment variables are the primary service configuration mechanism.
- Secrets are injected by runtime/CI infrastructure, never hardcoded.
- Environment differences (dev/staging/prod) should be encoded in infra config and pipeline behavior.

---

## 5) CI/CD Technical Pattern

1. Service repo `Jenkinsfile` triggers multibranch execution.
2. Shared loader (`monitor-cicd-common`) resolves selected pipeline definition from `monitor-cicd-pipelines`.
3. Pipeline executes standard stages:
   - code checks/tests
   - container build/tag
   - image push (release-eligible branches)
   - deployment update/apply in Kubernetes
4. Post-deploy checks validate service reachability/health.

---

## 6) Current Constraints and Risks

- Some domain services are still early, so data contracts may evolve.
- Alerting/processing maturity is behind foundational architecture.
- Observability baseline is not yet fully standardized across all services.

---

## 7) Onboarding Guidance

For new engineers:

1. Start with source-of-truth frontend/backend/CI docs.
2. Read `high-level/service-boundaries.md` + `high-level/service-repositories.md`.
3. Inspect service `Jenkinsfile` and corresponding pipeline definition.
4. Validate local service startup and endpoint behavior before changing pipeline/infra.
