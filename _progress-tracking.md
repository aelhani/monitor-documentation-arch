# Monitoring Project Progress Tracking

## Snapshot (Current)
This tracker reflects the architecture baseline after alignment to PostgreSQL, backend-owned authentication, dashboard UX progress, and Jenkins-centered CI/CD.

_Last updated: 2026-03-24_

## Progress by Workstream

| Workstream | Progress (%) | Status | Notes |
|---|---:|---|---|
| User Management | 10 | In progress | Login/auth architecture and PostgreSQL direction documented; implementation still early. |
| User Dashboard | 10 | In progress | Business logic and layout are defined; major implementation remains. |
| CI/CD Pipelines | 15 | In progress | Jenkins architecture and reusable loader model are defined and partially operational. |
| Database (PostgreSQL) | 10 | In progress | PostgreSQL strategy is established; migration/execution maturity remains limited. |
| Documentation | 20 | In progress | Core architecture docs updated; additional deep-dive docs and consistency work ongoing. |
| Data Collection Service | 0 | Not started | No delivery progress recorded yet. |
| Data Processing Service | 0 | Not started | No delivery progress recorded yet. |
| Alerts & Logging Service | 0 | Not started | No delivery progress recorded yet. |
| Admin Frontend | 0 | Not started | No delivery progress recorded yet. |
| Live Display Frontend | 0 | Not started | No delivery progress recorded yet. |
| Shared Frontend Components | 0 | Not started | No delivery progress recorded yet. |
| Infra Config Hardening | 0 | Not started | No delivery progress recorded yet. |

## Overall Progress Indicator
**Approximate global completion: 5.5%**

Calculation method: simple average across 12 workstreams in this tracker.

## Current Focus Areas
1. Lock API contracts between user dashboard and user-mgmt.
2. Deliver PostgreSQL-backed user/auth paths end-to-end.
3. Stabilize CI/CD service templates and deployment flow.
4. Keep documentation synchronized with implementation changes.
5. Prepare Air Quality (GRI 305) delivery contracts before implementation starts.

## Upcoming Priorities
1. Start Data Collection service with minimal ingestion contract.
2. Introduce Data Processing baseline for dashboard aggregates.
3. Implement Alerts & Logging baseline with first threshold rule.
4. Extend observability and security controls in running environments.
5. Execute Air Quality roadmap in 3 sprints (Foundation → Domain UX → Exports/Readiness).

## Change Log
| Date | Change |
|---|---|
| 2026-03-24 | Added Air Quality GRI (305) three-phase sprint roadmap and aligned focus/priority bullets. |
| 2026-03-05 | Reworked progress model, removed obsolete MongoDB/Firebase-oriented status, added explicit current focus and next priorities. |
