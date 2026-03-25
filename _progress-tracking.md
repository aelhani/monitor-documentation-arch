# Monitoring Project Progress Tracking

## Snapshot (Current)
This tracker reflects the architecture baseline after alignment to PostgreSQL, backend-owned authentication, dashboard UX progress (including Air Quality domain delivery), and Jenkins-centered CI/CD.

_Last updated: 2026-03-25_

## Progress by Workstream

| Workstream | Progress (%) | Status | Notes |
|---|---:|---|---|
| User Management | 10 | In progress | Login/auth architecture and PostgreSQL direction documented; implementation still early. |
| User Dashboard | 35 | In progress | Air Quality frontend page baseline is now delivered (GRI KPI row, drill-downs, transparency UX, and export/readiness integration points); broader dashboard rollout still in progress. |
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
**Approximate global completion: 7.6%**

Calculation method: simple average across 12 workstreams in this tracker.

## Current Focus Areas
1. Lock API contracts between user dashboard and user-mgmt.
2. Deliver PostgreSQL-backed user/auth paths end-to-end.
3. Stabilize CI/CD service templates and deployment flow.
4. Keep documentation synchronized with implementation changes.
5. Harden Air Quality page production-readiness controls (exports, refresh cadence, and role/tenant validation).

## Upcoming Priorities
1. Start Data Collection service with minimal ingestion contract.
2. Introduce Data Processing baseline for dashboard aggregates.
3. Implement Alerts & Logging baseline with first threshold rule.
4. Extend observability and security controls in running environments.
5. Roll out Air Quality delivery patterns to additional standards-driven dashboard domains.

## Change Log
| Date | Change |
|---|---|
| 2026-03-25 | Updated tracker to reflect completed Air Quality frontend-page progress from Sprint 05–07 outputs (domain UX, drill-down/transparency, exports/realtime/readiness integration points). |
| 2026-03-24 | Added Air Quality GRI (305) three-phase sprint roadmap and aligned focus/priority bullets. |
| 2026-03-05 | Reworked progress model, removed obsolete MongoDB/Firebase-oriented status, added explicit current focus and next priorities. |
