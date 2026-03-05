# Technical Architecture

## Runtime Topology

- **Frontend**: Dashboard web application.
- **Backend services**: Independent microservices with clear ownership.
- **Database**: PostgreSQL as primary data store.
- **Infrastructure**: Kubernetes for deployment and service runtime.
- **Delivery**: Jenkins-driven CI/CD pipelines with shared pipeline loader.

## Integration Style

- Service-to-service communication through internal APIs.
- Frontend-to-backend communication through authenticated API calls.
- CI/CD integration through repository conventions (`Jenkinsfile`, pipeline name/branch parameters).

## Configuration Strategy

- Environment variables are the primary mechanism for service configuration.
- Secrets are managed outside source code and injected in deployment/runtime.
- Environment promotion is managed by branch/workflow conventions in CI/CD.

## Non-Functional Priorities

- **Reliability**: Deterministic pipeline loading and repeatable deployments.
- **Security**: Access control in user management and CI/CD credential governance.
- **Operability**: Clear infrastructure ownership boundaries and documented runbooks.
- **Extensibility**: New services can reuse existing pipeline and repository structure.
