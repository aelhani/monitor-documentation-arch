# Service Repositories and Ownership Model

This document explains how repositories are organized around the current Monitoring System architecture, what each repository is expected to contain, and how repositories interact in delivery workflows.

> This is an onboarding/deep-dive document. Use it with the source-of-truth CI/CD and backend/frontend docs.

---

## 1) Repository Landscape

The project uses a **multi-repository model** with explicit ownership boundaries:

1. **Application service repositories** (microservices + frontend apps)
2. **CI/CD shared logic repository** (`monitor-cicd-common`)
3. **CI/CD pipeline definitions repository** (`monitor-cicd-pipelines`)
4. **Infrastructure configuration repository** (`monitor-cicd-infra-config`)
5. **Architecture/documentation repository** (this repository)

This separation allows independent evolution of business code, delivery logic, and runtime manifests.

---

## 2) Application Service Repositories

Each service repository (for example, `monitor-service-user-mgmt`) must be the single source for service implementation and local dev/test behaviors.

### Required structure (minimum)

- `README.md`
  - Service purpose and scope
  - Local run commands
  - Configuration variables
  - API endpoint summary
- `Jenkinsfile`
  - Uses shared loader (`monitor-cicd-common`) and references pipeline definitions by name/script/branch
- Application source folders
- Tests (unit/integration as relevant)
- Optional DB migration folder if service owns schema objects

### Ownership rules

- Service repo owns:
  - Business logic
  - API contracts for that service
  - Service-specific tests
  - App-level config defaults (non-secret)
- Service repo does **not** own:
  - Shared Jenkins library internals
  - Global pipeline orchestration logic
  - Cluster-wide infrastructure baseline

---

## 3) CI/CD Shared Library Repository (`monitor-cicd-common`)

This repository provides reusable pipeline helpers, especially the loader pattern that decouples service repos from detailed pipeline implementation.

### Why it exists

- Avoid duplicating complex Jenkins logic in each service repository
- Allow consistent pipeline behavior across services
- Enable centralized updates to common stages/utilities

### Typical responsibilities

- Pipeline loading helper (`loadPipeline`)
- Shared utility methods (credential setup, git checkout helpers, standard wrappers)
- Structural conventions (e.g., `jenkins/` folder organization)

---

## 4) CI/CD Pipeline Definitions Repository (`monitor-cicd-pipelines`)

This repository stores service-specific pipeline workflows (e.g., `user-mgmt-service-cicd/pipeline.groovy`) referenced at runtime by service repos.

### Benefits

- Pipeline evolution can happen without editing service business code
- Branch-based testing of pipeline changes (`PIPELINE_BRANCH`) before broad adoption
- Clear separation between *what the service does* and *how it is delivered*

### Typical contents

- Service pipeline folders
- Stage definitions (test/build/image/deploy/post steps)
- Optional shared stage snippets/templates

---

## 5) Infrastructure Configuration Repository (`monitor-cicd-infra-config`)

This repository contains deployment descriptors consumed by pipelines (Kubernetes manifests or equivalent artifacts).

### Typical responsibilities

- Deployment/service manifests per microservice
- Environment overlays or folder-based environment separation
- Runtime values references and rollout metadata

### Governance

- Changes should be reviewed with service owners + platform owners
- PRs should reference corresponding service/pipeline changes when coupled

---

## 6) Documentation Repository (this repo)

This repository tracks architecture decisions, integration patterns, operating models, and project progress.

### It should answer

- How the system is decomposed
- How services exchange data
- How authentication and data governance are designed
- How CI/CD and infrastructure are structured
- What is completed vs. planned

### It should not become

- A duplicate of implementation code
- A stale snapshot disconnected from real repos

---

## 7) Cross-Repository Change Flow (Practical Example)

Example: introducing a new KPI ingestion capability.

1. **Service repo**: add endpoint + validation + tests.
2. **Pipeline repo**: add/adjust stages if service build/deploy needs differ.
3. **Infra repo**: add/update deployment manifest and env vars.
4. **Documentation repo**: update data-flow and service-boundary docs.
5. **Progress tracker**: reflect status change.

This sequence prevents “implemented but undocumented” and “documented but undeployed” drift.

---

## 8) Branching and Release Expectations

- Service repos use multibranch Jenkins jobs.
- `Jenkinsfile` in each branch triggers pipeline resolution.
- `PIPELINE_BRANCH` supports controlled rollout of CI/CD definition changes.
- Release branches (or protected branch policy) gate image push and cluster deployment.

---

## 9) Onboarding Checklist for New Contributors

1. Read this doc + `high-level/service-boundaries.md`.
2. Read source-of-truth backend/frontend docs.
3. Inspect target service `README.md` + `Jenkinsfile`.
4. Review corresponding pipeline folder in `monitor-cicd-pipelines`.
5. Review deployment manifest path in infra config repo.
6. Validate local run + test flow before proposing changes.
