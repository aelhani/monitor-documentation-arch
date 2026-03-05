# Service Responsibilities (Canonical Matrix)

This is the canonical ownership matrix for service responsibilities and interfaces.

## Responsibility Matrix

| Service | Core Responsibility | Key Interfaces | Data Ownership (PostgreSQL) |
|---|---|---|---|
| User Management | Authentication, login, account/profile management | `/auth/*`, `/users/*` | users, auth/session-related records |
| Data Collection | KPI ingestion and validation | `/ingest/*`, source adapters | raw/normalized measurements |
| Data Processing | Aggregations and derived KPI views | `/metrics/*`, internal processing APIs | computed summaries/materializations |
| Alerts & Logging | Rules, thresholds, alert history | `/alerts/*`, event endpoints | alerts, action/audit logs |
| User Dashboard (frontend) | KPI visualization and user interaction | backend REST APIs | no direct DB ownership |

## Usage Rules
- Other docs should reference this matrix instead of re-listing service ownership tables.
- Boundary policies remain in `high-level/service-boundaries.md`.
- Runtime interactions remain in `core-backend/data-flow-between-components.md`.
