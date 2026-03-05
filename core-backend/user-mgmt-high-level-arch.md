# User Management High-Level Architecture

## Scope

`monitor-service-user-mgmt` is responsible for identity and access entry points used by the Monitoring System frontend and internal services.

## Responsibilities

- User authentication (login flow)
- User profile retrieval/update
- Identity persistence in PostgreSQL
- Exposure of APIs consumed by frontend login and protected dashboard routes

## Integration Points

- **Frontend**: calls authentication and user profile endpoints.
- **PostgreSQL**: stores user credentials/metadata according to current DB policy.
- **CI/CD**: built and deployed through Jenkins multibranch pipelines.

## Design Constraints

- Keep auth logic centralized in user management service.
- Avoid duplicating credential logic in other domain services.
- Ensure environment-based configuration and secret isolation.

## Related Canonical Docs

- `core-backend/user-mgmt-with-postgre.md`
- `core-backend/environment-and-database-policy.md`
