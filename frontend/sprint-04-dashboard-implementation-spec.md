# Monitoring System — Sprint 04 Dashboard Implementation Specification

## Document Control
- **Source of truth**: `sprints/sprint-04-standards-driven-environmental-intelligence.md`
- **Audience**: Senior frontend engineers, backend/API engineers, product architects, QA leads
- **Objective**: Define implementable dashboard IA, page layout, component contracts, data contracts, and engineering guidance for Standards-to-Features Environmental Intelligence.
- **Implementation scope**: Executive overview + Air Quality, Emissions, Energy, Water, Waste/Circularity + Alerts/Compliance + Sensors/Assets + Historical Analytics + Reports/Export.

---

## 1) Dashboard Information Architecture

### 1.1 Required Pages and Purpose

1. **Global Environmental Overview**
   - Executive landing page aggregating cross-domain environmental posture.
   - Surfaces top KPIs, cross-domain trends, compliance state, and critical alerts.
   - Entry point for domain drill-down and exception triage.

2. **Air Quality Dashboard**
   - Monitors pollutant trends and policy threshold compliance by site/station/sensor.
   - Focus KPIs: PM2.5/PM10 rolling averages, NO2 peak, O3 rolling max, AQI, exceedance hours.
   - Supports sensor diagnostics and meteorology context.

3. **Emissions Dashboard**
   - Tracks Scope 1/2/3 emissions, source-level contribution, carbon intensity, and high-impact events.
   - Focus on inventory traceability and permit exceedance management.

4. **Energy Dashboard**
   - Tracks total use, intensity, peak demand, renewable share, and power quality events.
   - Supports facility/line comparison and demand-peak optimization.

5. **Water Dashboard**
   - Tracks withdrawal, consumption, intensity, discharge quality/compliance, and balance anomalies.
   - Includes source-to-discharge flow visibility and permit monitoring.

6. **Waste / Circularity Dashboard**
   - Tracks total waste, hazardous ratio, diversion/recycling, landfill dependency, and data completeness.
   - Supports circularity action tracking and audit readiness.

7. **Asset / Sensor View**
   - Asset-centric operational diagnostics for sensor health, calibration status, quality flags, and latency.
   - Used by operations teams for root-cause and maintenance actions.

8. **Alert & Compliance Center**
   - Unified operational inbox for threshold breaches, policy violations, sensor faults, calibration alerts.
   - Supports ownership, acknowledgement, SLA timers, and audit evidence trails.

9. **Historical Analytics**
   - Long-window trend analysis, benchmark comparisons, seasonal decomposition, and anomaly review.
   - Enables strategic planning and performance retrospectives.

10. **Reports / Compliance Export**
    - Structured report generation and export for ESG/regulatory submissions.
    - Includes policy-linked metadata and machine-verifiable KPI trace references.

---

### 1.2 Global Dashboard Layout System (applies to all pages)

Each page uses the same top-down layout contract to reduce cognitive load and enable component reuse.

```text
Row A: Page header + context controls (title, period selector, site selector, data-quality filter)
Row B: KPI summary strip (4–8 cards, responsive)
Row C: Primary visual analytics area (1–3 large charts)
Row D: Compliance/threshold monitoring area (status matrix + breaches)
Row E: Detailed diagnostics (tables, sensor details, event timelines)
Right rail (desktop): Alerts panel + runbook actions
Bottom drawer (optional): Raw data trace / audit panel
```

#### Layout behavior by viewport
- **Desktop (≥1280 px)**: 12-column grid, persistent right rail alerts.
- **Laptop (1024–1279 px)**: 12-column grid, collapsible right rail.
- **Tablet (768–1023 px)**: 8-column grid, alerts moved below main charts.
- **Mobile (<768 px)**: single-column stack, KPI cards in horizontal scroll.

#### Shared fixed regions
- **Global Header**: user context, notification badge, environment/site switcher.
- **Filter Bar (sticky)**: site/facility, period, domain slice, production line, quality level.
- **Content Canvas**: route-specific widgets.
- **Action Rail**: alert acknowledgements, export/report actions.

---

### 1.3 Per-Page Layout Definition

#### A) Global Environmental Overview
```text
Header: Cross-domain KPIs + trend sparkline summary
Section 1: Domain summary indicator cards (Air, Emissions, Energy, Water, Waste)
Section 2: Multi-domain time-series trend chart (normalized index toggle)
Section 3: Compliance matrix (domain x policy status heatmap)
Section 4: Recent critical alerts + ownership queue
Section 5: Facility ranking table (risk/performance)
```

#### B) Air Quality Dashboard
```text
Header: AQI and pollutant status by selected site
Section 1: AQI/PM2.5/PM10/NO2/O3 KPI strip
Section 2: Pollutant time-series with legal threshold overlays
Section 3: Exceedance-hour density heatmap (hour x day)
Section 4: Station/sensor map with severity coloring
Section 5: Sensor diagnostics + calibration and quality timeline
```

#### C) Emissions Dashboard
```text
Header: Total tCO2e + Scope split and intensity
Section 1: Scope 1/2/3 KPI strip and YoY delta
Section 2: Stacked emissions trend by scope/source
Section 3: Emissions source treemap + top contributors
Section 4: Carbon intensity vs production dual chart
Section 5: Flare/vent event timeline and incident table
```

#### D) Energy Dashboard
```text
Header: Total energy and peak-demand status
Section 1: Consumption/intensity/peak/renewable KPI strip
Section 2: Load curve (15-min/hourly) with peak markers
Section 3: Renewable vs non-renewable stacked area
Section 4: Power quality event chart and fault categories
Section 5: Site/line benchmark table with percentile ranking
```

#### E) Water Dashboard
```text
Header: Withdrawal, consumption, compliance status
Section 1: Water KPI strip with intensity and compliance
Section 2: Withdrawal/consumption/discharge time-series
Section 3: Sankey flow (source → process → reuse/discharge)
Section 4: Discharge parameter compliance panel (pH/COD/BOD/TSS)
Section 5: Water balance anomaly and leak indicators
```

#### F) Waste / Circularity Dashboard
```text
Header: Waste generation + diversion performance
Section 1: Total/hazardous/diversion/recycling KPI strip
Section 2: Waste stream composition stacked chart
Section 3: Diversion vs landfill trend
Section 4: Material circularity score trend
Section 5: Manifest readiness and evidence completeness panel
```

#### G) Asset / Sensor View
```text
Header: Asset health and data confidence
Section 1: Sensor health KPI strip (uptime, calibration due, faults)
Section 2: Sensor timeline with quality flags
Section 3: Live readings table with threshold badges
Section 4: Calibration records and maintenance log
Section 5: Linked KPI impact panel
```

#### H) Alert & Compliance Center
```text
Header: Open alerts by severity and SLA
Section 1: Alert KPIs (open, unacknowledged, overdue, critical)
Section 2: Alert queue table with filters and ownership
Section 3: Policy breach detail panel + escalation runbook link
Section 4: Compliance status board by jurisdiction/site
Section 5: Audit trail of acknowledgements and resolutions
```

#### I) Historical Analytics
```text
Header: Long-term performance summary
Section 1: Multi-year trend selector + KPI compare cards
Section 2: Seasonality and decomposition chart
Section 3: Benchmark comparison (site vs site / site vs baseline)
Section 4: Anomaly timeline and event correlation panel
Section 5: Data completeness and confidence trend
```

#### J) Reports / Compliance Export
```text
Header: Report presets and scheduling controls
Section 1: Report template selector and metadata
Section 2: KPI coverage checklist with policy links
Section 3: Preview panel (tabular + chart snapshots)
Section 4: Export controls (CSV/XLSX/PDF/API package)
Section 5: Generation history + signature/status log
```

---

### 1.4 Navigation Structure

#### Primary Sidebar
```text
Overview
Domains
 ├ Air Quality
 ├ Emissions
 ├ Energy
 ├ Water
 └ Waste & Circularity
Operations
 ├ Assets & Sensors
 └ Alert & Compliance Center
Analytics
 └ Historical Analytics
Reporting
 └ Reports & Compliance Export
Admin (role-gated)
 ├ KPI Definitions
 ├ Policy Rules
 └ Threshold Profiles
```

#### Navigation behavior
- Sidebar persisted on desktop, icon-collapse supported.
- Domain switch dropdown in header duplicates “Domains” for quick switching.
- Deep links preserve filter query params (site, period, domain, asset).
- Breadcrumb required on all non-overview pages:
  - `Overview / <Domain> / <Site> / <Asset|Sensor|KPI>`
- Drill-down flow (mandatory):
  1. KPI card click → domain page contextual panel.
  2. Chart series point click → asset/sensor scoped timeline.
  3. “View trace” action → raw-record audit drawer (`/kpi/{kpi_id}/trace`).

---

## 2) UI Component Specification

### 2.1 Reusable Component Inventory

1. `DashboardShell`
2. `GlobalFilterBar`
3. `KPIWidgetCard`
4. `ComplianceIndicator`
5. `ThresholdBadge`
6. `TrendSparkline`
7. `TimeSeriesChart`
8. `StackedAreaChart`
9. `HeatmapChart`
10. `TreemapChart`
11. `SankeyFlowChart`
12. `MapPanel`
13. `AlertsPanel`
14. `AlertQueueTable`
15. `SensorStatusTable`
16. `DataQualityBadge`
17. `TraceabilityDrawer`
18. `ExportPanel`
19. `RunbookLinkChip`
20. `PageSectionCard`

All components must support light/dark themes and WCAG AA contrast.

---

### 2.2 KPI Widgets (Functional Contract)

#### `KPIWidgetCard` required fields
- `title`
- `metricCode`
- `value`
- `unit`
- `targetOrLimitValue`
- `variancePct`
- `trendDirection` (`up|down|flat`)
- `thresholdState` (`normal|warning|critical`)
- `confidenceScore` (0–1)
- `qualityFlagSummary` (`valid|partial|low_confidence`)
- `timeWindowLabel`
- `traceRef` (kpi_id + formula_version)

#### Display logic
- Main value + unit shown prominently.
- Secondary line: target/limit + variance.
- Trend icon: ▲/▼/▬ with color.
- Confidence badge always visible.
- Click opens related domain context with pre-applied filters.

#### Units (minimum supported)
- Air: `µg/m³`, `ppb`, AQI index.
- Emissions: `tCO2e`, `%`, `tCO2e/unit`.
- Energy: `kWh`, `kW`, `%`, `kWh/unit`.
- Water: `m³`, `%`, `m³/unit`.
- Waste: `kg`, `%`, `kg/unit`.

#### Threshold coloring logic
- Threshold state resolved from policy rules:
  - **Normal**: value within target/limit and confidence ≥ 0.8.
  - **Warning**: approaching/exceeding warning band or confidence 0.6–0.79.
  - **Critical**: policy breach critical band or confidence < 0.6 for critical KPIs.
- If data stale > configured freshness SLA, apply striped warning overlay.

---

### 2.3 Charts (type + usage rules)

- **TimeSeriesChart (line/area)**
  - Use for pollutant, load, withdrawal/discharge, KPI trends.
  - Required features: threshold overlays, zoom, compare-period toggle.

- **StackedAreaChart**
  - Use for scope emissions split, renewable/non-renewable split, waste composition over time.
  - Require absolute/percentage toggle.

- **HeatmapChart**
  - Use for compliance density (hour/day), site-vs-domain matrix, exceedance clusters.

- **TreemapChart**
  - Use for emissions and waste contribution by source/category.

- **SankeyFlowChart**
  - Use for water/material flow balance across process steps.

- **AnomalyOverlayLayer** (decorator)
  - Applies to time-series: detected anomalies, event markers, confidence gaps.

#### Standard tooltip schema (all charts)
```json
{
  "metricCode": "pm25_ug_m3",
  "timestampUtc": "2026-01-16T10:00:00Z",
  "value": 43.2,
  "unit": "ug/m3",
  "policyLimit": 35,
  "thresholdState": "critical",
  "sensorId": "sensor-aq-104",
  "qualityFlag": "valid",
  "confidenceScore": 0.93
}
```

---

### 2.4 Threshold Indicators

#### State model
- `safe` (green): compliant, no active breaches.
- `warning` (amber): near-limit or short-duration breach.
- `critical` (red): sustained/large breach or regulatory violation.

#### Escalation behavior
1. First breach: create alert with `status=open`, assign default owner.
2. Unacknowledged beyond SLA: escalate to domain lead.
3. Persistent critical beyond escalation window: escalate to compliance manager + page-level banner.
4. Repeat breaches in rolling period: aggregate into incident candidate.

#### Color tokens
- `safe`: `--status-green-600`
- `warning`: `--status-amber-500`
- `critical`: `--status-red-600`
- `unknown`: `--status-slate-500`

---

### 2.5 Maps

#### `MapPanel` variants
1. **FacilityMap**: facility polygons with aggregate KPI state.
2. **SensorLocationMap**: station pins with threshold and health badges.
3. **EnvironmentalHeatmap**: interpolated pollutant/intensity layers.

#### Required map interactions
- Pan/zoom, layer toggle, metric selector, timestamp scrubber.
- Click marker opens mini-detail card + “Go to sensor view”.
- Legend must display scale, units, policy limit references.

---

### 2.6 Alerts & Compliance Panels

#### `AlertsPanel` (right rail)
- Shows top N active alerts sorted by severity then age.
- Columns: severity, metric, location, breach magnitude, duration, owner, status.
- Actions: acknowledge, assign, open runbook, open trace.

#### `ComplianceStatusBoard`
- Matrix by policy x site with status chips.
- Drill to violation detail and evidence list.

#### Alert categories supported
- Regulatory violation
- Threshold exceedance
- Sensor fault
- Calibration overdue
- Data quality degradation

---

## 3) Page-to-Component Mapping

### 3.1 Global Environmental Overview
- `GlobalFilterBar`
- 5x `KPIWidgetCard` (domain summary)
- `TimeSeriesChart` (multi-domain normalized)
- `HeatmapChart` (compliance matrix)
- `AlertsPanel` (recent critical)
- `PageSectionCard` containing facility ranking table

### 3.2 Air Quality Dashboard
- `GlobalFilterBar`
- 6x `KPIWidgetCard` (AQI, PM2.5, PM10, NO2 peak, O3 rolling max, exceedance hours)
- `TimeSeriesChart` (pollutants with thresholds)
- `HeatmapChart` (exceedance density)
- `MapPanel` (`SensorLocationMap`)
- `SensorStatusTable`
- `TraceabilityDrawer`

### 3.3 Emissions Dashboard
- `GlobalFilterBar`
- 6x `KPIWidgetCard` (total tCO2e, Scope1, Scope2 loc, Scope2 market, intensity, exceedance events)
- `StackedAreaChart` (scope trend)
- `TreemapChart` (source contribution)
- `TimeSeriesChart` (intensity vs production)
- `AlertQueueTable` (flare/vent/process incidents)
- `TraceabilityDrawer`

### 3.4 Energy Dashboard
- `GlobalFilterBar`
- 5x `KPIWidgetCard` (total use, intensity, peak demand, renewable share, power quality event rate)
- `TimeSeriesChart` (load curve)
- `StackedAreaChart` (renewable split)
- `TimeSeriesChart` + anomaly layer (power quality)
- Benchmark `PageSectionCard` table (site/line)

### 3.5 Water Dashboard
- `GlobalFilterBar`
- 5x `KPIWidgetCard` (withdrawal, consumption, intensity, compliance rate, unaccounted water)
- `TimeSeriesChart` (withdrawal/consumption/discharge)
- `SankeyFlowChart`
- `ComplianceIndicator` table (pH/COD/BOD/TSS)
- `TimeSeriesChart` (balance anomaly)

### 3.6 Waste / Circularity Dashboard
- `GlobalFilterBar`
- 5x `KPIWidgetCard` (total waste, hazardous ratio, diversion rate, recycling rate, landfill dependency)
- `StackedAreaChart` (stream composition)
- `TimeSeriesChart` (diversion vs landfill)
- `TreemapChart` (source/category contribution)
- `ComplianceIndicator` (manifest readiness)

### 3.7 Asset / Sensor View
- `GlobalFilterBar`
- 4x `KPIWidgetCard` (uptime, calibration due, fault count, latency)
- `TimeSeriesChart` (sensor value + quality overlay)
- `SensorStatusTable` (latest readings)
- Calibration `PageSectionCard` history table
- `TraceabilityDrawer`

### 3.8 Alert & Compliance Center
- `GlobalFilterBar`
- 4x `KPIWidgetCard` (open, unacknowledged, overdue, critical)
- `AlertQueueTable`
- `ComplianceStatusBoard`
- `PageSectionCard` for audit history

### 3.9 Historical Analytics
- `GlobalFilterBar`
- KPI compare cards
- `TimeSeriesChart` (long-range trend)
- `HeatmapChart` (seasonality)
- `PageSectionCard` benchmark table
- `TimeSeriesChart` anomaly correlation panel

### 3.10 Reports / Compliance Export
- `GlobalFilterBar`
- `ExportPanel`
- `PageSectionCard` report template + KPI coverage checklist
- `PageSectionCard` preview
- `PageSectionCard` generation history

---

## 4) Data Requirements

### 4.1 Data domains required by frontend
1. **Sensor measurements** (raw/near-raw)
2. **Aggregated KPI snapshots**
3. **Policy/threshold definitions**
4. **Alert events and workflow status**
5. **Asset/sensor metadata + calibration records**
6. **Production context** for intensity normalization
7. **Emissions factor metadata** and versioning
8. **Jurisdictional compliance mappings**

### 4.2 API contracts (minimum)

#### `GET /dashboard/executive-summary`
```json
{
  "siteId": "site-01",
  "period": {"start": "2026-01-01T00:00:00Z", "end": "2026-01-31T23:59:59Z"},
  "domainKpis": [
    {"domain": "air", "metricCode": "aqi_composite", "value": 82, "unit": "index", "thresholdState": "warning", "confidenceScore": 0.91},
    {"domain": "emissions", "metricCode": "ghg_total_tco2e", "value": 1240.4, "unit": "tCO2e", "thresholdState": "safe", "confidenceScore": 0.97}
  ],
  "alerts": {"critical": 3, "warning": 11, "open": 25},
  "updatedAt": "2026-02-01T00:05:00Z"
}
```

#### `GET /dashboard/domain/{domain}`
```json
{
  "domain": "water",
  "siteId": "site-01",
  "filters": {"lineId": "line-a", "qualityLevel": "valid_only"},
  "kpis": [
    {
      "kpiId": "kpi-water-withdrawal-total",
      "metricCode": "withdrawal_m3",
      "value": 12500,
      "unit": "m3",
      "targetValue": 11800,
      "variancePct": 5.93,
      "thresholdState": "warning",
      "confidenceScore": 0.88,
      "formulaVersion": "1.0.3"
    }
  ],
  "charts": {
    "timeseries": [{"timestampUtc": "2026-01-01T00:00:00Z", "value": 420.5, "qualityFlag": "valid"}],
    "compliance": [{"parameter": "ph", "limit": "6.5-8.5", "compliantRate": 0.96}]
  }
}
```

#### `GET /kpi/{kpi_id}/trace`
```json
{
  "kpiId": "kpi-air-pm25-24h-rolling",
  "formulaVersion": "2.1.0",
  "calculationJobId": "job-77812",
  "policyApplied": {"policyId": "policy-air-pm25-24h", "limitValue": 35, "window": "24h"},
  "sourceReadings": ["r-001", "r-002", "r-003"],
  "timeRange": {"start": "2026-01-15T00:00:00Z", "end": "2026-01-16T00:00:00Z"},
  "lineage": {"aggregations": ["1m->15m", "15m->1h", "1h->24h"], "qualityRules": ["exclude_invalid", "penalize_missing"]}
}
```

#### `GET /alerts`
```json
{
  "items": [
    {
      "alertId": "al-991",
      "category": "threshold_exceedance",
      "severity": "critical",
      "policyId": "policy-air-o3-8h",
      "metricCode": "o3_ppb",
      "location": {"siteId": "site-02", "assetId": "station-5"},
      "breachMagnitude": 12.7,
      "breachUnit": "ppb",
      "durationMinutes": 140,
      "status": "open",
      "owner": "ops_lead@company.com",
      "runbookUrl": "https://runbooks/internal/air/o3",
      "timestamps": {"startedAt": "2026-01-17T08:10:00Z", "ackAt": null}
    }
  ],
  "page": {"cursor": "abc123", "hasNext": true}
}
```

### 4.3 Frontend state requirements
- Cache keys must include `site`, `period`, `domain`, `qualityLevel`.
- KPI cards must render skeleton state, stale state, and error state.
- Confidence score + data completeness required for all KPI payloads.
- All date-time handling in UTC internally; locale formatting at presentation layer.

---

## 5) Engineering Implementation Notes

### 5.1 Recommended component hierarchy

```text
AppShell
 ├ SidebarNav
 ├ GlobalHeader
 └ DashboardRoute
    ├ GlobalFilterBar
    ├ KPIStrip
    │  └ KPIWidgetCard[]
    ├ PrimaryVisualSection
    │  └ ChartContainer[]
    ├ ComplianceSection
    │  └ ComplianceIndicator / board
    ├ DetailSection
    │  └ Tables / maps / timelines
    └ TraceabilityDrawer
```

### 5.2 Layout system
- Use CSS grid with semantic section wrappers (`kpi-strip`, `primary-viz`, `compliance`, `detail`).
- Widget heights standardized per type to minimize layout shift.
- Use container queries for responsive chart density and legend placement.

### 5.3 Reusable component library approach
- Build shared primitives in `ui/environmental-dashboard/`:
  - `cards/`, `charts/`, `alerts/`, `maps/`, `traceability/`.
- Introduce strict typed props for all domain widgets (TypeScript interfaces).
- Encapsulate chart library adapters so tooltip and threshold overlays are consistent across chart types.

### 5.4 Domain extensibility strategy
- Domain configuration-driven rendering:
  - `domain-config.ts` defines KPI definitions, chart modules, table columns, and default filters.
- Adding a new domain should require:
  1. new domain config,
  2. backend endpoint support,
  3. optional specialized widgets.
- Avoid domain-specific branching inside shared primitives.

### 5.5 Quality, traceability, and compliance-by-design
- Every displayed KPI links to trace endpoint and formula version.
- Every threshold visual includes policy source metadata.
- Alert transitions (`open -> acknowledged -> resolved`) must be audit-logged and recoverable.
- Data quality degradation must affect confidence badges and potentially threshold state messaging.

### 5.6 Performance and reliability targets
- LCP for Overview < 2.5s on standard enterprise laptop with cached shell.
- Interaction latency for filters < 300ms for cached views and < 1.5s for fresh API fetch.
- Virtualization required for alert and sensor tables > 500 rows.
- Polling intervals configurable per page; Alerts default 30s, KPI snapshots default 5 min.

### 5.7 Security and governance
- Enforce role-based access for Admin routes and report exports.
- Mask or restrict site-level data based on tenant permissions.
- All export actions must include user/timestamp audit metadata.

---

## 6) Delivery Checklist (Implementation Gate)

1. All 10 pages implemented with standardized layout regions.
2. Required components implemented and used via shared library primitives.
3. Page-to-component mapping complete with no placeholder widgets in production routes.
4. All KPI cards show value, unit, target/limit, variance, trend, confidence, threshold state.
5. Threshold model and escalation behavior wired to alert workflows.
6. Map interactions and chart tooltip schema standardized.
7. Drill-down flow from executive KPI to raw trace operational in <= 2 clicks beyond domain page.
8. Data contracts implemented for executive summary, domain page, alerts, traceability.
9. QA covers KPI correctness, threshold states, data quality scenarios, and alert lifecycle.
10. Report/export flow supports compliance-ready metadata and audit logs.
