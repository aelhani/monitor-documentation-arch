# Repository Responsibilities

## Documentation Repository (this repo)

Contains architecture, design, process, and progress documentation for:
- Frontend
- Core backend
- CI/CD and infrastructure
- Project planning and roadmap

## Operational Repositories (Referenced)

- Service repositories (application code + `Jenkinsfile`).
- Shared CI/CD library repository.
- Pipeline definitions repository.
- Infrastructure configuration repository.

## Repository Contract

Every service repository should include:
- Clear README (service purpose, run instructions, API summary).
- CI entrypoint (`Jenkinsfile`) using shared loader patterns.
- Environment variable documentation.
- Migration and release notes where relevant.

## Documentation Expectations

- Architecture docs in this repo must not contradict source-of-truth implementation docs.
- When implementation changes, update source-of-truth first, then dependent documents.
