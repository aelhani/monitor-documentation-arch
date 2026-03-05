# Service Responsibilities (Canonical Matrix)

This is the canonical ownership matrix for service responsibilities and interfaces.

## Responsibility Matrix

| Service | Core Responsibility | Key Interfaces | Data Ownership (PostgreSQL) |
|---|---|---|---|
| User Management | Authentication, login, account/profile management | `/auth/*`, `/users/*` | users, auth/session-related records |
| Data Collection | KPI ingestion and validation | `/ingest/*`, source adapters | raw/normalized measurements |
| Data Processing | Aggregations and derived KPI views | `/metrics/*`, internal processing APIs | computed summaries/materializations |
| Alerts & Logging | Rules, thresholds, alert history | `/alerts/*`, event endpoints | alerts, action/audit logs |
| `monitor-dashboard` (frontend) | KPI visualization, reports, and alerts for end users | backend REST APIs | no direct DB ownership |
| `monitor-admin-panel` (frontend) | Admin CRUD for users, thresholds, and system settings | user-mgmt and admin REST APIs | no direct DB ownership |
| `monitor-live-display` (frontend) | Public/operations real-time display with auto-refresh | metrics/alerts REST APIs | no direct DB ownership |
| `monitor-ui-components` (shared frontend library) | Reusable UI primitives and visual consistency | consumed by frontend repositories | no direct DB ownership |

## Usage Rules
- Other docs should reference this matrix instead of re-listing service ownership tables.
- Boundary policies remain in `high-level/service-boundaries.md`.
- Runtime interactions remain in `core-backend/data-flow-between-components.md`.
