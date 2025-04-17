
# Jenkins Pipeline Workflow Guide for Monitoring Services

This guide explains the workflow of the Jenkins multi-branch pipeline used for services like `monitor-service-user-mgmt` in the Monitoring project, focusing on how it operates and how to reproduce it for other services (e.g., `mongo-cicd`, `data-cicd`). It emphasizes the conceptual flow and replication approach, omitting granular implementation details.

## How the Workflow Works

The workflow automates building, testing, and deploying services using a modular, reusable pipeline structure. It leverages Jenkins multi-branch pipelines, a shared library, and a GitHub bot for secure access, ensuring consistency across services.

### Components
- **Service Repository** (e.g., `monitor-service-user-mgmt`):
  - Contains service code and a `Jenkinsfile`.
  - The `Jenkinsfile` triggers the pipeline, specifying which pipeline script to load.
- **Shared Library** (`monitor-cicd-common`):
  - A centralized repository hosting reusable pipeline logic.
  - Includes a `loadPipeline` function that fetches and executes pipeline scripts dynamically.
  - Organized with a `jenkins/` folder to support multiple tools in the same repo (e.g., GitHub Actions in the future).
- **Pipeline Definitions** (`monitor-cicd-pipelines`):
  - Stores pipeline scripts (e.g., `user-mgmt-service-cicd/pipeline.groovy`) that define build, test, and deploy steps.
  - Supports versioning via branches (e.g., `master`, `fix-creds`).
- **Infrastructure Configs** (`monitor-cicd-infra-config`):
  - Holds Kubernetes manifests for deployment.
- **GitHub Bot** (`monitoringbot`, Eva):
  - Authenticates Git operations using an SSH key, ensuring secure access to repositories.

### Workflow
1. **Pipeline Trigger**:
   - A multi-branch pipeline scans the service repository (e.g., `monitor-service-user-mgmt`) for branches (`master`, `develop`).
   - Each branch with a `Jenkinsfile` triggers a build, automatically detecting changes via periodic scans.

2. **Parameter Input**:
   - The `Jenkinsfile` defines a parameter, `PIPELINE_BRANCH`, which specifies the branch of `monitor-cicd-pipelines` (e.g., `master`) to source the pipeline script.
   - Users can override `PIPELINE_BRANCH` when launching a build, enabling testing of new pipeline versions.

3. **Shared Library Execution**:
   - The `Jenkinsfile` calls `loadPipeline` from `monitor-cicd-common`, passing:
     - `PIPELINE_NAME`: Identifies the service pipeline (e.g., `user-mgmt-service-cicd`).
     - `PIPELINE_SCRIPT`: Specifies the script file (e.g., `pipeline.groovy`).
     - `PIPELINE_BRANCH`: Determines the pipeline definition branch.
   - `loadPipeline` clones `monitor-cicd-pipelines` at the specified branch and loads the pipeline script.

4. **Pipeline Execution**:
   - The loaded script (e.g., `user-mgmt-service-cicd/pipeline.groovy`) defines stages:
     - **Build**: Installs dependencies, lints, tests, and builds the service (e.g., Node.js app).
     - **Docker**: Builds and tags a Docker image, pushing to Google Container Registry (GCR) for `master` branches.
     - **Deploy**: Updates Kubernetes manifests in `monitor-cicd-infra-config` and applies them to Google Kubernetes Engine (GKE) for `master` branches.
   - The service repository’s code is used as the working directory, ensuring builds reflect the latest commit.

5. **Post-Processing**:
   - Cleans up Docker images to save space.
   - Logs success or failure for monitoring.

### Key Features
- **Modularity**: `monitor-cicd-common` centralizes pipeline logic, reusable across services.
- **Flexibility**: `PIPELINE_BRANCH` allows switching pipeline versions without changing service code.
- **Scalability**: Multi-branch pipelines handle multiple branches automatically.
- **Security**: SSH-based access via `monitoringbot` ensures secure Git operations.

## How to Reproduce for Other Services

To apply this workflow to new services (e.g., `monitor-service-mongo`, `monitor-service-data`), follow these high-level steps. Specific configurations can be adapted during implementation.

1. **Set Up Service Repository**:
   - Create a repository (`monitor-service-<service>`) for the service code.
   - Add a `Jenkinsfile` that:
     - Defines `PIPELINE_BRANCH` as a parameter.
     - Calls `loadPipeline` with the service’s pipeline name, script, and branch.

2. **Define Pipeline Script**:
   - In `monitor-cicd-pipelines`, create a folder (e.g., `<service>-cicd`) with a `pipeline.groovy`.
   - Adapt the script to the service’s needs (e.g., build commands, Docker image name, Kubernetes manifest path).
   - Use branches (e.g., `master`) for stable pipelines and feature branches for testing.

3. **Reuse Shared Library**:
   - Ensure `monitor-cicd-common` is configured in Jenkins to load from `jenkins/` folder.
   - No changes needed unless new pipeline logic is required.

4. **Configure Infrastructure**:
   - Add service-specific Kubernetes manifests to `monitor-cicd-infra-config` (e.g., `<service>/deployment.yaml`).
   - Ensure the pipeline script updates and applies these manifests.

5. **Create Multi-Branch Pipeline**:
   - Set up a Jenkins multi-branch pipeline for `monitor-service-<service>`.
   - Configure it to scan the service repository and use the `Jenkinsfile`.

6. **Grant Access to Bot**:
   - Add `monitoringbot` as a collaborator with write access to the new service repository and any other required repos.

7. **Test and Iterate**:
   - Run builds for `master` and other branches, adjusting `PIPELINE_BRANCH` to test pipeline versions.
   - Monitor console logs to verify stages execute as expected.

## Considerations
- **Consistency**: Use similar `pipeline.groovy` structures across services for maintainability.
- **Versioning**: Test new pipeline scripts in feature branches of `monitor-cicd-pipelines` before merging to `master`.
- **Extensibility**: The `jenkins/` folder in `monitor-cicd-common` allows adding logic for other tools (e.g., GitHub Actions) in parallel folders.
- **Monitoring**: Regularly check build logs and Eva’s permissions to prevent access issues.

