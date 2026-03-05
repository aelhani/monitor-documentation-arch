# Service Boundaries

## Why this document
This article defines service boundaries at a policy level. For day-to-day ownership details and interfaces, use the canonical matrix in `high-level/service-responsability.md`.

## Boundary Definitions

### User Management Service
- Owns identity/authentication and account/profile lifecycle.
- Does not own KPI measurement or analytics data.

### Data Collection Service
- Owns ingestion endpoints, payload validation, and initial measurement persistence.
- Does not own analytics transformations or user identity lifecycle.

### Data Processing Service
- Owns KPI aggregations/derivations and summary output contracts.
- Does not own login/session management.

### Alerts & Logging Service
- Owns threshold/rule evaluation and alert/event history.
- Does not own raw ingestion validation or profile authority.

## Boundary Rules
1. Each service owns its core domain tables in PostgreSQL.
2. Cross-service interaction is API/event based, never direct writes to another service’s owned tables.
3. Service contracts must be versioned and documented.
4. Frontend consumes service APIs only (no direct database access).

## Related Canonical Docs
- `high-level/service-responsability.md`
- `core-backend/data-flow-between-components.md`
