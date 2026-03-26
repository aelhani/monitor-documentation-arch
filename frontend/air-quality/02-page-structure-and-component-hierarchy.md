# docs/air-quality/02-page-structure-and-component-hierarchy.md

## 1) Page Composition

`AirQualityDomainPage` is the orchestration component for the domain. It wires filters, data fetching, drill-down state, exports, and access controls.

High-level render order:

1. Header (title/subtitle)
2. Filter bar
3. Live refresh status + stale data banner
4. Export controls
5. Loading/error states
6. KPI row
7. Chart grid (comparison, source breakdown, location breakdown, time series)
8. Insights section
9. Readiness & traceability panel

## 2) Component Hierarchy

```text
Dashboard (domain === 'air-quality')
└── AirQualityDomainPage
    ├── AirQualityFilters
    ├── LiveRefreshStatus
    ├── StaleDataBanner
    ├── AirQualityExportControls
    ├── AirQualityKpiRow
    │   └── KpiCard[*]
    │       ├── QualityBadge
    │       ├── TraceabilityMeta
    │       └── MethodologyModal
    ├── ComparisonChart
    │   └── TraceabilityMeta
    ├── BreakdownChart (Source)
    │   └── TraceabilityMeta
    ├── BreakdownChart (Location)
    │   └── TraceabilityMeta
    ├── TimeSeriesChart
    │   └── TraceabilityMeta
    ├── AirQualityInsights
    └── ReadinessStatusPanel
```

## 3) State Ownership Map

### URL query-string state

Owned by `useAirQualityFilters` via `useSearchParams`:

- `timePreset`
- `granularity`
- `boundaryId`
- `metricKey` (single-select; transformed to `metricKeys: [metricKey]`)

`dateFrom/dateTo` are derived in the hook from preset, not directly user-editable.

### Redux-derived user state

Owned by `useAirQualityAccess`:

- `role`
- `tenantId`
- `tenantSettings.airQualityRefreshMs` -> polling cadence

### Local component state

- Drill-down breadcrumb parents (`sourceParent`, `locationParent`).
- Methodology modal open/close per KPI card.
- Export status state machine (`idle/running/success/failed/denied`).
- Live data fetch state (`loading/error/stale/latency/lastUpdatedAt`).

## 4) Drill-down Behavior

`useAirQualityDrilldown` filters a flat `breakdowns` array by `dimension` and `parentKey`:

- Source chart: root items where `dimension='source'` and `parentKey=null`, then child traversal by selected parent key.
- Location chart: root items where `dimension='location'` and `parentKey=null`, then child traversal by selected parent key.

Back button clears current parent key.

## 5) UX Semantics Relevant to Integration

- KPI quality badge is threshold-based on `coveragePct`:
  - `>=95` good,
  - `>=90` watch,
  - `<90` risk.
- Trend rendering is directional (`▲/▼`) based on `trendPct` sign.
- Traceability metadata is rendered in KPI and chart cards (source type, coverage, methodology id/version, boundary).
- Readiness panel cross-checks measured/estimated split and factor version count to surface warnings.

