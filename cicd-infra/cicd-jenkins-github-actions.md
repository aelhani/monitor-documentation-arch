# Jenkins and GitHub Actions Strategy

## Current State

Jenkins is the active CI/CD orchestrator for service delivery, using shared libraries and centralized pipeline definitions.

## GitHub Actions Positioning

GitHub Actions can be used selectively for:
- Documentation linting
- Lightweight checks
- Repository hygiene workflows

Production service build/deploy remains Jenkins-driven to preserve consistency with the current platform architecture.

## Decision Rationale

- Existing Jenkins shared loader architecture is already integrated with service repos.
- Team workflows and branch/pipeline controls are established in Jenkins.
- Introducing Actions for production CD would duplicate responsibilities.

## Recommended Split

- **Jenkins**: build/test/containerize/deploy workloads
- **GitHub Actions**: optional non-deployment automation
