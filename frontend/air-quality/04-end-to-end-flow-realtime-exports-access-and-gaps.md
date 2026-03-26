# docs/air-quality/04-end-to-end-flow-realtime-exports-access-and-gaps.md

## 1) End-to-End Frontend Data Flow (Current)

```text
Sensors/processing outputs (backend responsibility)
  -> Air quality aggregate API (/api/v1/air-quality/dashboard)
  -> getAirQualityDashboard(filters + tenantId)
  -> useAirQualityLiveData
      - initial fetch
      - polling fetch (pollMs from tenant settings)
      - stale detection
  -> createAirQualityDomainPageDTO
  -> AirQualityDomainPage rendering pipeline
      - KPI cards
      - comparison/time-series charts
      - source/location drill-down charts
      - insights
      - readiness panel
```

## 2) Filters and Query Behavior

### Active filters

- `timePreset`: `last_24_hours | last_7_days | last_30_days | last_90_days`
- `granularity`: `hour | day | month` (UI options)
- `boundaryId`: currently hardcoded option list (`global`, `site-nyc`, `site-aus`)
- `metricKeys`: single-select in UI (`total_co2e`, `intensity_per_record`, `trend_pct`)

### Derived filters

- `dateFrom/dateTo` are generated from `timePreset` on each render.

### Persistence

- URL search params persist current filter state and are updated with `replace: true`.

## 3) Drill-down Mechanics

- Backend must supply `breakdowns` with `dimension` and `parentKey` relationships.
- Frontend drill-down is purely client-side filtering of existing array; no incremental fetch.
- Source and location drill-down trees are independent state machines.

## 4) Real-Time Update Behavior

- Implementation uses polling (`setInterval`) not websocket streaming.
- Poll interval defaults to 30s, overridden by `user.tenantSettings.airQualityRefreshMs`.
- Manual refresh button triggers immediate re-fetch.
- Stale state rules:
  - if `metadata.dataFreshnessHours > 1` -> stale warning shown,
  - if refresh fails after at least one successful load -> stale warning with fallback reason.

## 5) Export Behavior (PDF/CSV/JSON)

- Export UI presents three actions: PDF, CSV, JSON.
- Export runs through a shared hook state machine:
  - `idle` -> `running` -> `success | failed | denied`
- File download is triggered in browser via `Blob` + temporary object URL + `<a download>` click.
- `latestExportLabel` shows last completed format/time.
- `traceId` from `x-trace-id` is surfaced in readiness panel.

## 6) Role-Based Access and Tenant Scoping

## Role model used by frontend

- `viewer`
  - cannot export
  - can view insights
  - cannot use admin controls
- `analyst`
  - can export
  - can view methodology
  - can view insights
  - cannot use admin controls
- `admin`
  - can export
  - can view methodology
  - can view insights
  - can use admin controls

Tenant behavior:

- `tenantId` resolved from Redux user context and passed to dashboard and export APIs.
- Refresh cadence can be tenant-specific (`tenantSettings.airQualityRefreshMs`).

## 7) Implementation Gaps / Inconsistencies to Align Across Repos

1. **Granularity mismatch**
   - Contract supports `hour/day/week/month/quarter/year`, but filter UI exposes only `hour/day/month`.

2. **Filter contract vs UI capability mismatch**
   - Contract includes `locationIds` and `sourceCategoryIds`; UI currently has no controls for these.

3. **Single metric selection in UI**
   - API shape accepts `metricKeys[]`, but UI stores one `metricKey` only.

4. **Methodology access inconsistency**
   - `canViewMethodology` gates readiness details only; KPI cards still expose methodology modal for all roles.

5. **Aggregate endpoint dependency**
   - Split endpoints are documented but unused at runtime; backend teams should prioritize aggregate parity first.

6. **Tenant validation is backend-dependent**
   - Frontend propagates tenant context but does not enforce cross-tenant data protection on client.

7. **Readiness panel admin control is placeholder**
   - “Open audit trace controls” button has no attached workflow yet.

8. **Real-time is polling, not push**
   - No websocket/SSE path exists in current frontend.

9. **Export payload metric override behavior**
   - Export builder falls back to default metrics if `filters.metricKeys` absent, but current UI always passes one selected metric.

10. **Source hierarchy assumptions are static in copy**
   - Location chart title implies `site -> building -> zone`; backend taxonomy should match or label should be parameterized.

## 8) Cross-Repository Alignment Checklist

- Backend/API:
  - Guarantee aggregate dashboard response shape and traceability metadata completeness.
  - Enforce tenant authorization and return 403 on export/dashboard scope violations.
  - Return consistent `x-trace-id` for exports.

- Data collection/processing:
  - Provide stable parent-child breakdown graph keys for source/location drill-down.
  - Populate `dataFreshnessHours` accurately to avoid false stale banners.
  - Keep methodology + factor version lineage complete for readiness checks.

- Analytics/reporting:
  - Accept export request context (`reportContext`, include list) as reporting-job inputs.
  - Ensure JSON export shape is machine-friendly for downstream ingestion.

