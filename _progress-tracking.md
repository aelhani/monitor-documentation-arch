# Monitoring Project Progress Tracking

## Snapshot (Current)
This tracker reflects the architecture baseline plus completed Air Quality delivery planning and frontend/domain readiness work captured in Sprints 05–07.

_Last updated: 2026-03-25_

## Sprint Plan Status (from `sprints/`)

| Sprint | Title | Status | Notes |
|---|---|---|---|
| Sprint 00 | Architecture Alignment Sprint | Completed (Docs) | Baseline alignment documented across auth, PostgreSQL, dashboard, and CI/CD. |
| Sprint 01 | Stabilize & De-risk Core UX + Contracts | Planned | Execution work remains open. |
| Sprint 02 | First End-to-End Monitoring Slice | Planned | Execution work remains open. |
| Sprint 03 | Production Readiness & Scalable Delivery | Planned | Execution work remains open. |
| Sprint 04 | Standards-to-Features Environmental Intelligence | Planned | Standards-to-KPI framework documented. |
| Sprint 05 | Air Quality GRI Reporting Foundation | Completed (Definition/Design) | Domain contracts, traceability, and KPI foundation documented. |
| Sprint 06 | Air Quality Domain Experience & Drilldowns | Completed (Frontend scope) | Air Quality domain page UX scope and transparency/drilldown requirements captured. |
| Sprint 07 | Air Quality Exports, Real-Time, and Readiness Gates | Completed (Definition/Readiness) | Export, real-time, RBAC, and readiness gates documented and accepted for tracking. |

## Progress by Workstream

| Workstream | Progress (%) | Status | Notes |
|---|---:|---|---|
| User Management | 15 | In progress | Login/auth architecture and PostgreSQL direction documented; implementation remains partial. |
| User Dashboard | 25 | In progress | Core dashboard logic/layout documented, with Air Quality domain UX coverage now defined through Sprint 06. |
| Air Quality Domain (GRI 305) | 40 | In progress | Foundation, domain UX, and readiness/exports specifications are now complete across Sprints 05–07. |
| CI/CD Pipelines | 20 | In progress | Jenkins architecture and reusable loader model are defined and partially operational. |
| Database (PostgreSQL) | 15 | In progress | PostgreSQL strategy is established; production-grade migration maturity remains limited. |
| Documentation | 45 | In progress | Architecture and Air Quality sprint documentation are significantly expanded and synchronized. |
| Data Collection Service | 0 | Not started | No delivery progress recorded yet. |
| Data Processing Service | 0 | Not started | No delivery progress recorded yet. |
| Alerts & Logging Service | 0 | Not started | No delivery progress recorded yet. |
| Admin Frontend | 0 | Not started | No delivery progress recorded yet. |
| Live Display Frontend | 0 | Not started | No delivery progress recorded yet. |
| Shared Frontend Components | 0 | Not started | No delivery progress recorded yet. |
| Infra Config Hardening | 0 | Not started | No delivery progress recorded yet. |

## Overall Progress Indicator
**Approximate global completion: 12.3%**

Calculation method: simple average across 13 workstreams in this tracker.

## Current Focus Areas
1. Convert Sprint 05–07 Air Quality definitions into implementation tickets (frontend + backend + QA).
2. Lock API contracts between user dashboard and user-mgmt with versioned compatibility checks.
3. Deliver PostgreSQL-backed user/auth paths end-to-end.
4. Stabilize CI/CD service templates and deployment flow.
5. Keep documentation synchronized with implementation changes.

## Upcoming Priorities
1. Start Data Collection service with minimal ingestion contract.
2. Introduce Data Processing baseline for dashboard aggregates.
3. Implement Alerts & Logging baseline with first threshold rule.
4. Build Air Quality export and real-time capabilities per Sprint 07 acceptance criteria.
5. Extend observability and security controls in running environments.

## Change Log
| Date | Change |
|---|---|
| 2026-03-25 | Updated tracker to align with current `sprints/` set, added sprint status table, and reflected completed Air Quality planning/UX/readiness documentation (Sprints 05–07). |
| 2026-03-24 | Added Air Quality GRI (305) three-phase sprint roadmap and aligned focus/priority bullets. |
| 2026-03-05 | Reworked progress model, removed obsolete MongoDB/Firebase-oriented status, added explicit current focus and next priorities. |
