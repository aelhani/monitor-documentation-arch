# Monitoring System Documentation

This repository contains the architectural and operational documentation for the **Monitoring System**, a microservices platform for environmental and operational KPIs across compounds and spaces.

## Scope

The platform currently focuses on:
- Air quality
- Energy consumption
- Water usage
- Recycling and waste
- Emissions

## Source-of-Truth Documents

Use these documents as the canonical references:

### Frontend
- `frontend/business-logic-and-ui-layout.md`
- `frontend/user-dashboard-layout.md`

### Core Backend
- `core-backend/environment-and-database-policy.md`
- `core-backend/user-mgmt-with-postgre.md`

### CI/CD & Infrastructure
- `cicd-infra/jenkins-folders.md`
- `cicd-infra/cicd-common-loader-arch.md`
- `cicd-infra/jenkins-pipelines-workflow.md`

## Recommended Reading Order

1. `high-level/system-architecture-overview.md`
2. `high-level/service-boundaries.md`
3. `high-level/data-flow-sensors-to-dashboard.md`
4. `core-backend/environment-and-database-policy.md`
5. `frontend/business-logic-and-ui-layout.md`
6. `cicd-infra/jenkins-pipelines-workflow.md`
7. `_progress-tracking.md`

## Documentation Map

### High-Level Architecture
- `high-level/system-architecture-overview.md`
- `high-level/technical-architecture.md`
- `high-level/service-boundaries.md`
- `high-level/service-responsability.md`
- `high-level/service-repositories.md`
- `high-level/security-and-authentication-architecture.md`
- `high-level/data-flow-sensors-to-dashboard.md`

### Frontend
- `frontend/business-logic-and-ui-layout.md`
- `frontend/user-dashboard-layout.md`

### Backend
- `core-backend/environment-and-database-policy.md`
- `core-backend/user-mgmt-with-postgre.md`
- `core-backend/user-mgmt-high-level-arch.md`
- `core-backend/data-flow-between-components.md`

### CI/CD and Infrastructure
- `cicd-infra/infra-devops-elements.md`
- `cicd-infra/cicd-setup-with-kubernetes.md`
- `cicd-infra/cicd-jenkins-github-actions.md`
- `cicd-infra/testing-dockerized-projects.md`
- `cicd-infra/kubectl-port-forward.md`
- `cicd-infra/user-mgmt-flow-sample.md`
- `restore-jenkins-from-backup.md`

### Product/Planning
- `business-logic/standards-for-data-centric-projects.md`
- `business-logic/similar-platforms.md`
- `sprints/sprint-00.md`
- `_progress-tracking.md`
- `unclear-topics.md`

## Current Documentation Priorities

- Keep all references aligned with **PostgreSQL** (no MongoDB architecture references).
- Keep authentication flow aligned with `monitor-service-user-mgmt` and frontend login implementation.
- Keep dashboard narratives aligned with current domain pages and global overview.
- Keep pipeline references aligned with Jenkins multibranch + shared loader architecture.

