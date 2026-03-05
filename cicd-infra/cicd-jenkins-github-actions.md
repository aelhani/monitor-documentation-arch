# Jenkins vs GitHub Actions in Monitoring System CI/CD

## Current Direction
Jenkins is the primary delivery engine in the project architecture, with shared loaders and pipeline repositories already documented.

GitHub Actions can be used as a complementary layer for lightweight checks.

## Recommended Responsibility Split

### Jenkins (Primary)
Use for:
- Build/test/package for service repositories.
- Docker image publication.
- Deployment orchestration to target environments.
- Reusable logic via `monitor-cicd-common` loaders and `monitor-cicd-pipelines` scripts.

Why:
- Matches current pipeline architecture and team workflows.
- Supports branch-aware and service-specific deployment behavior.

### GitHub Actions (Optional Secondary)
Use for:
- Fast pull request checks (lint/unit tests/static checks).
- Documentation checks and formatting validation.
- Early feedback before Jenkins deployment stages.

Why:
- Tight GitHub integration and quick feedback loops.

## Integration Pattern
1. Pull request opens/updates -> GitHub Actions runs lightweight checks.
2. Branch merge or manual trigger -> Jenkins executes full CI/CD pipeline.
3. Jenkins publishes deploy status and logs for release traceability.

## Notes for Current Stack Alignment
- Avoid old references to MongoDB-centric infra checks.
- Validate PostgreSQL-oriented environment configuration in CI where applicable.
- Keep pipeline templates service-agnostic and parameterized for reuse.
