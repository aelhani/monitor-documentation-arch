# CI/CD Setup with Kubernetes (Detailed)

This document describes the current delivery architecture from service commit to Kubernetes rollout.

---

## 1) Target Architecture

- Jenkins multibranch pipeline per service repository
- Shared pipeline loader from `monitor-cicd-common`
- Pipeline definitions centralized in `monitor-cicd-pipelines`
- Deployment manifests centralized in `monitor-cicd-infra-config`
- Runtime target on Kubernetes clusters

---

## 2) End-to-End Flow

1. Developer pushes to a branch in a service repository.
2. Jenkins multibranch job detects branch + `Jenkinsfile`.
3. `Jenkinsfile` calls shared loader with pipeline name/script/branch.
4. Loader checks out selected pipeline definition.
5. Pipeline runs checks, build, image packaging.
6. Release-eligible branches publish image.
7. Pipeline updates/applies Kubernetes deployment config.
8. Rollout verification confirms deployment health.

---

## 3) Jenkins Job Setup Checklist

For each service:

- Create multibranch Jenkins job
- Link SCM repository with credentials
- Enable branch indexing/discovery
- Ensure `Jenkinsfile` path is correct
- Validate shared library availability in Jenkins global config

---

## 4) Service Repository Requirements

- Valid `Jenkinsfile` using shared loader conventions
- Build/test commands deterministic in CI
- Docker build path and context available
- Environment variable documentation present
- Health endpoint for post-deploy verification

---

## 5) Kubernetes Deployment Requirements

- Deployment + service manifests defined in infra repo
- Namespace/environment mapping is explicit
- Secret/config references align with runtime expectations
- Resource requests/limits defined where available

---

## 6) Branching and Promotion Guidance

- Use feature branches for validation pipelines.
- Use stable branch for deployable pipeline definitions.
- Gate image push/deploy to release branches only.
- Keep rollback path simple via immutable image tags.

---

## 7) Common Pitfalls

- Pipeline branch mismatch (service Jenkinsfile points to non-existent pipeline branch)
- Environment variable drift between service code and manifests
- Credentials not synchronized in Jenkins
- Deployment manifest image tag update skipped/overwritten

---

## 8) Minimum Verification After Deployment

- Pod rollout successful
- Readiness/health endpoint responds
- Service endpoint reachable from expected network path
- Auth-protected endpoints reject unauthorized requests and accept authorized ones
