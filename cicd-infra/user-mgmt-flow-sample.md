# User Management CI/CD Flow (Sample)

## Objective
Show the end-to-end Jenkins flow for `monitor-service-user-mgmt` aligned with current architecture (PostgreSQL + shared pipeline loader).

## Flow Summary
1. Developer pushes changes to service repository branch.
2. Jenkins multibranch job detects branch and runs `Jenkinsfile`.
3. `Jenkinsfile` calls shared loader from `monitor-cicd-common`.
4. Loader fetches pipeline implementation from `monitor-cicd-pipelines`.
5. Pipeline runs build/test/package stages.
6. Docker image is built and published for deployable branches.
7. Deployment stage updates environment manifests/config and deploys service.
8. Post steps publish status/logs and cleanup temporary resources.

## Minimal Jenkinsfile Pattern
```groovy
@Library('monitor-cicd-common') _

pipeline {
  agent any
  parameters {
    string(name: 'PIPELINE_BRANCH', defaultValue: 'master', description: 'Branch in monitor-cicd-pipelines')
  }
  stages {
    stage('Load Pipeline') {
      steps {
        script {
          loadPipeline(
            PIPELINE_NAME: 'user-mgmt-service-cicd',
            PIPELINE_SCRIPT: 'pipeline.groovy',
            PIPELINE_BRANCH: params.PIPELINE_BRANCH
          )
        }
      }
    }
  }
}
```

## Environment Requirements
- PostgreSQL connection settings per environment.
- Auth-related secrets configured in CI/CD credentials.
- Service health endpoints available for deployment checks.

## Verification Checklist
- Pipeline triggered from branch event.
- Build/test stages pass.
- Deploy stage executes for approved branch policy.
- Service reachable and healthy after deployment.
