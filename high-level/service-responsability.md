# Service Responsibilities

## Responsibility Matrix

| Service | Core Responsibility | Key Interfaces | Data Ownership (PostgreSQL) |
|---|---|---|---|
| User Management | Authentication, login, account/profile management | `/auth/*`, `/users/*` | users, auth/session-related records |
| Data Collection | KPI ingestion and validation | `/ingest/*`, source adapters | raw/normalized measurements |
| Data Processing | Aggregations and derived KPI views | `/metrics/*`, internal processing APIs | computed summaries/materializations |
| Alerts & Logging | Rules, thresholds, alert history | `/alerts/*`, event endpoints | alerts, action/audit logs |
| User Dashboard (frontend) | KPI visualization and user interaction | backend REST APIs | no direct DB ownership |

## Notes
- All backend services should follow environment-driven configuration patterns.
- Shared concerns (auth validation, logging conventions, error schema) should be standardized through internal guidelines.
- CI/CD pipelines should enforce baseline checks before deployment for each service.
