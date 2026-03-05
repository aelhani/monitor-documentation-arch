# Monitoring System Documentation Index

## Canonical Ownership (to avoid duplication)
- **System scope and layers**: `high-level/high-level-architecture.md`
- **Service ownership matrix**: `high-level/service-responsability.md`
- **End-to-end component data flow**: `core-backend/data-flow-between-components.md`
- **Security/auth model**: `high-level/security-and-authentication-architecture.md`
- **Observability model**: `high-level/observability-and-monitoring-strategy.md`

> Other articles should summarize and link to these canonical docs instead of duplicating full sections.

## 1. Start Here (Source of Truth)
- Frontend
  - `frontend/business-logic-and-ui-layout.md`
  - `frontend/user-dashboard-layout.md`
- Backend
  - `core-backend/environment-and-database-policy.md`
  - `core-backend/user-mgmt-with-postgre.md`
- CI/CD
  - `cicd-infra/jenkins-folders.md`
  - `cicd-infra/cicd-common-loader-arch.md`
  - `cicd-infra/jenkins-pipelines-workflow.md`

## 2. Architecture Deep Dives
- `high-level/high-level-architecture.md`
- `high-level/technical-architecture.md`
- `high-level/service-boundaries.md`
- `high-level/service-responsability.md`
- `high-level/system-context-and-data-flow.md`
- `high-level/security-and-authentication-architecture.md`
- `high-level/observability-and-monitoring-strategy.md`

## 3. Backend Supporting Docs
- `core-backend/user-mgmt-high-level-arch.md`
- `core-backend/data-flow-between-components.md`

## 4. CI/CD Supporting Docs
- `cicd-infra/cicd-jenkins-github-actions.md`
- `cicd-infra/cicd-setup-with-kubernetes.md`
- `cicd-infra/testing-dockerized-projects.md`

## 5. Project Management
- `_progress-tracking.md`
- `sprints/sprint-00.md`

## 6. Reading Paths
- **Onboarding path**: 1 -> 2 -> 3 -> 5
- **Platform/DevOps path**: 1 (CI/CD) -> 4 -> 5
- **Product/UI path**: 1 (Frontend) -> 2 -> 5
