# Jenkins Folder Strategy

## Purpose
Standardize Jenkins job organization for multi-repository microservices delivery.

## Recommended Folder Layout
1. **Core-Backend-Services**
   - user-mgmt
   - data-collection
   - data-processing
   - alerts-logging

2. **Frontend-Applications**
   - user-dashboard
   - admin-panel (when available)
   - live-display (when available)

3. **Infra-DevOps**
   - infrastructure/deployment jobs
   - shared CI/CD support jobs

4. **Documentation-Quality** (optional)
   - docs validation and publication workflows

## Naming Conventions
- `<domain>-<service>-cicd` for pipelines.
- Examples:
  - `core-user-mgmt-cicd`
  - `frontend-user-dashboard-cicd`
  - `infra-deploy-cicd`

## Operational Rules
- Every service repository should map to one multibranch pipeline job.
- Folder-level permissions can be used to separate backend/frontend/infra ownership.
- Shared libraries/loaders from `monitor-cicd-common` should be referenced consistently.

## Alignment Notes
- This structure aligns with current Jenkins-first pipeline architecture.
- References to deprecated MongoDB-specific folder naming should be removed from active usage.
