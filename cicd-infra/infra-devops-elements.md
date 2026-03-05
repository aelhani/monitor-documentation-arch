# Infrastructure & DevOps Elements

## Core Elements in Use

- Jenkins multibranch jobs per service repository
- Shared pipeline loader architecture (`monitor-cicd-common`)
- Centralized pipeline scripts repository
- Kubernetes runtime deployments
- Credentialed Git operations through automation account/bot

## Deployment Model

- CI builds and validates service artifacts.
- CD stage publishes container images for releasable branches.
- Deployment stage applies service manifests to Kubernetes environments.

## Configuration Model

- Runtime parameters are environment-driven.
- Secrets and credentials are managed outside code.
- Branch conventions define promotion and release behavior.

## Operational Expectations

- Standardized pipeline naming per service.
- Repeatable rollout workflow across microservices.
- Explicit ownership of infrastructure config updates.
