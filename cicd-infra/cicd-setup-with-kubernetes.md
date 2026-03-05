# CI/CD Setup with Kubernetes

## Goal

Provide a consistent deployment path from Git commits to Kubernetes runtime environments.

## Baseline Flow

1. Developer pushes to service repository branch.
2. Jenkins multibranch pipeline discovers branch and runs `Jenkinsfile`.
3. Shared loader pulls the selected pipeline definition.
4. Pipeline builds, tests, and packages service image.
5. For release branches, pipeline updates/applies Kubernetes deployment configuration.

## Required Inputs per Service

- `Jenkinsfile` using shared loader conventions
- Docker build context and image naming strategy
- Kubernetes manifests/helm references in infra repository
- Environment variable and secret mapping

## Rollout Guidance

- Use non-production branch runs for validation.
- Promote only after passing build/test gates.
- Record deployment notes for traceability.
