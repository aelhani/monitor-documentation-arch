# docs/air-quality/01-domain-purpose-and-current-state.md

## 1) Domain Purpose in Product Context

The Air Quality frontend domain is the standards-driven dashboard implementation for GRI 305 emissions reporting inside the user dashboard. It replaces the generic dashboard composition for `/dashboard/air-quality` with a dedicated domain page that prioritizes:

- auditable KPI cards with methodology + boundary metadata,
- source/location breakdown drill-downs,
- live refresh visibility,
- export actions (PDF/CSV/JSON), and
- readiness/transparency status for operations teams.

This implementation aligns to the project architecture direction (domain page pattern with filters, chart grid, insights, and live metadata) and is currently the most advanced user-dashboard domain.

## 2) Runtime Placement and Routing

- Route: `/dashboard/air-quality`
- Route registration is centralized in `DASHBOARD_ROUTES` and rendered by the dashboard shell.
- The dashboard view switches to `AirQualityDomainPage` only for `domain === 'air-quality'`; all other domains still use the shared generic dashboard modules.

## 3) Current Implementation Scope (As Built)

### Delivered

- Domain-specific Air Quality page composition (filters, KPI row, charts, insights, export controls, readiness panel).
- Contract-aware API client with mock/real backend switching.
- Polling-based live updates with stale-state handling.
- Role-based UI gating for exports/admin controls.
- Tenant-scoped request payload propagation from Redux user context.
- Export request payload builder with reporting context metadata.

### Not Yet Full-Cycle Complete

The domain is frontend-delivered, but the wider program progress still marks collection/processing/alerts services as not started. Practically, this means frontend behavior is ahead of backend + ingestion maturity and must be treated as contract-driving integration guidance.

## 4) Progress/Readiness Signal (2026-03-25 tracker)

From project progress tracking, `User Dashboard` is in progress (35%) and explicitly notes Air Quality baseline delivery (KPI row, drill-downs, transparency UX, export/readiness integration points). The same tracker also flags production hardening still needed for:

- exports,
- refresh cadence,
- role/tenant validation.

## 5) Architectural Boundaries for Cross-Repo Teams

- Frontend expects a dashboard aggregate endpoint (`/api/v1/air-quality/dashboard`) as the primary integration point.
- Frontend has design-time definitions for split endpoints (`/kpis`, `/breakdowns`, `/time-series`), but runtime page currently consumes only the aggregate endpoint.
- Export endpoint is modeled as asynchronous file generation via `POST /api/v1/air-quality/exports` returning a blob + optional trace header.
- Tenant isolation is passed in query/payload; frontend does not itself enforce tenant validity beyond propagating `tenantId`.

