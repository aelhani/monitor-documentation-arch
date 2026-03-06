# Sprint 04 — Standards-to-Features Environmental Intelligence (Frontend-Led)

## Sprint Objective
Convert recognized environmental monitoring standards into **product-ready monitoring policies, KPIs, and dashboard behaviors** so the frontend can present operationally meaningful insights across Air Quality, Emissions, Energy, Water, and Waste/Circularity domains.

This sprint is frontend-led but implemented end-to-end enough to ensure every UI metric is traceable to source measurements and policy logic.

---

## Standards Scope and Translation Approach

### Frameworks to Anchor the Sprint
- **ISO 14001**: environmental management system structure, objectives, continual improvement.
- **ISO 14064-1 / GHG Protocol alignment**: emissions inventory structure (Scope 1/2/3 where available).
- **ISO 50001**: energy performance indicators and improvement actions.
- **Water stewardship and ESG disclosures** (aligned with common practice in GRI/SASB/CSRD-style reporting): intensity, consumption, discharge quality, compliance.
- **Industrial environmental monitoring practices**: permit thresholds, alarm bands, quality flags, calibration status, and auditability.

### Policy → KPI → UI Translation Method (to execute during sprint)
1. Select required/priority obligations per domain (regulatory + operational).
2. Convert each obligation to machine-readable policy rules:
   - threshold policy
   - aggregation window
   - severity and escalation
   - data quality requirement
3. Map each policy to one or more KPIs.
4. Define frontend cards/charts/alerts and drill-down expectations.
5. Validate with domain experts before locking widget behavior.

---

## Domain KPI Catalog

> KPI formulas below assume configurable period boundaries (`hour`, `day`, `month`, `quarter`), site-level filtering, and quality-filtered records (`quality_flag = valid`).

### 1) Air Quality

| KPI | What it Measures | Why it Matters | Calculation (reference) |
|---|---|---|---|
| PM2.5 24h Rolling Average | Fine particulate concentration trend | Health risk and regulatory compliance | `avg(pm25_ug_m3)` over trailing 24h window |
| PM10 24h Rolling Average | Coarse particulate concentration | Dust/process impact control | `avg(pm10_ug_m3)` over trailing 24h window |
| NO2 Hourly Peak | Highest nitrogen dioxide concentration per hour/day | Combustion impact and permit compliance | `max(no2_ppb)` grouped per hour/day |
| O3 8h Rolling Max | Ozone exposure indicator | Air quality episode detection | `max(rolling_avg(o3_ppb, 8h))` per day |
| AQI Composite Score | Normalized multi-pollutant index | Executive-level readability | Domain formula from pollutant sub-indices, highest sub-index shown |
| Exceedance Hours | Number of periods above policy thresholds | Compliance risk and root-cause trigger | `count(interval where pollutant > policy_limit)` |

### 2) Emissions

| KPI | What it Measures | Why it Matters | Calculation (reference) |
|---|---|---|---|
| Total GHG Emissions (tCO2e) | Combined greenhouse gas emissions | Core ESG/regulatory reporting metric | `sum(activity_data × emission_factor)` by source |
| Scope 1 Emissions | Direct emissions from owned operations | Mandatory for most disclosures | Sum combustion/process/fugitive sources mapped to Scope 1 |
| Scope 2 Emissions (Location/Market Based) | Purchased energy emissions | Tracks decarbonization of electricity sourcing | `electricity_kwh × EF_grid` (location) or contractual factors (market) |
| Carbon Intensity | Emissions per unit output/revenue | Operational efficiency normalization | `tCO2e / production_unit` (or revenue/unit area) |
| Flare/Vent Event Count | Number of discrete high-impact events | Incident management and loss prevention | Count events classified as flare/vent from event stream |
| Emissions Exceedance Events | Permit-limit exceedance count | Regulatory exposure control | Count events where measured emissions > permit threshold |

### 3) Energy

| KPI | What it Measures | Why it Matters | Calculation (reference) |
|---|---|---|---|
| Total Energy Consumption | Absolute energy use | Cost and footprint baseline | `sum(electricity_kwh + fuel_kwh_equivalent)` |
| Energy Intensity | Energy use normalized by output | Performance comparability across shifts/sites | `total_energy_kwh / production_unit` |
| Peak Demand | Maximum short-interval demand | Utility penalties and capacity planning | `max(demand_kw)` by billing cycle |
| Renewable Energy Share | Portion of energy from renewable sources | Transition progress tracking | `(renewable_kwh / total_kwh) * 100` |
| Power Quality Event Rate | Voltage/frequency anomalies | Asset reliability and process stability | `count(power_quality_events)/period` |

### 4) Water

| KPI | What it Measures | Why it Matters | Calculation (reference) |
|---|---|---|---|
| Total Withdrawal | Water taken from all sources | Resource dependency and permit alignment | `sum(withdrawal_m3)` |
| Total Consumption | Water withdrawn minus returned | Scarcity impact indicator | `withdrawal_m3 - discharge_m3_returned` |
| Water Intensity | Water per output unit | Efficiency benchmarking | `consumption_m3 / production_unit` |
| Discharge Compliance Rate | Percent of compliant discharge samples | Environmental risk and permit conformance | `(compliant_samples / total_samples) * 100` |
| Non-Revenue / Unaccounted Water | Balance gap in industrial water network | Leak/loss detection | `input_m3 - metered_use_m3 - authorized_losses_m3` |

### 5) Waste & Circularity (Additional Domain)

| KPI | What it Measures | Why it Matters | Calculation (reference) |
|---|---|---|---|
| Total Waste Generated | Waste output volume/mass | Baseline for minimization initiatives | `sum(waste_kg)` by stream |
| Hazardous Waste Ratio | Share of hazardous waste | Regulatory and handling risk | `(hazardous_waste_kg / total_waste_kg) * 100` |
| Diversion Rate (Reuse/Recycle/Recovery) | Share diverted from disposal | Circularity performance | `(diverted_waste_kg / total_waste_kg) * 100` |
| Disposal-to-Landfill Rate | Portion sent to landfill | Long-term sustainability indicator | `(landfill_waste_kg / total_waste_kg) * 100` |

### Cross-Domain Data Quality KPIs (must be visible)
- **Sensor Uptime (%)** = online_duration / expected_duration.
- **Data Completeness (%)** = records_received / records_expected.
- **Calibration Compliance (%)** = sensors with valid calibration / total critical sensors.
- **Late Data Ratio (%)** = records arriving after SLA / total records.

These KPIs are required to qualify confidence in all environmental metrics.

---

## Dashboard Information Architecture

### A. Main Executive Dashboard (Cross-Domain)

**Top row (headline cards):**
- Overall Environmental Health Score (weighted domain composite).
- Active Critical Alerts.
- Total GHG (MTD/YTD toggle).
- Energy Intensity (current vs target).
- Water Intensity (current vs target).
- Air Quality Compliance Hours (% compliant).

**Second row (trend and risk):**
- 30-day trend for each primary domain (small multiples).
- Compliance risk heatmap by site/domain.
- Alert lifecycle panel (new, acknowledged, resolved, overdue).

**Third row (action context):**
- Top 5 facilities at risk (policy breach likelihood).
- “What changed” insights (largest week-over-week deltas).
- Data quality status strip (uptime, completeness, calibration).

### B. Domain-Specific Dashboards

1. **Air Quality Dashboard**
   - Pollutant time-series with legal threshold overlays.
   - Station map with status color coding.
   - Exceedance timeline and meteorology context (wind direction/speed if available).

2. **Emissions Dashboard**
   - Scope 1/2/3 stacked trends.
   - Emissions by source/process treemap.
   - Carbon intensity vs production trend.
   - Event log for flare/vent/process incidents.

3. **Energy Dashboard**
   - Load curve (15-min or hourly) with peak markers.
   - Renewable share stacked area.
   - Site and line-level energy intensity benchmark table.

4. **Water Dashboard**
   - Sankey-style flow (withdrawal → process → discharge/reuse).
   - Compliance chart for discharge parameters (e.g., pH/COD/BOD/TSS).
   - Water balance anomaly detection panel.

5. **Waste & Circularity Dashboard**
   - Waste stream composition chart (hazardous/non-hazardous categories).
   - Diversion vs landfill trend.
   - Manifest/document readiness indicator for audits.

### C. Alerts and Threshold Indicators
- Multi-band status model: **Normal (green), Warning (amber), Critical (red)**.
- Every KPI widget must show:
  - current value
  - target/limit
  - variance (%)
  - trend direction
  - confidence badge (data quality aware)
- Alert payload should include:
  - breached policy id
  - location/asset
  - breach magnitude and duration
  - recommended response runbook link.

---

## UI / Visualization Recommendations

### Chart-to-Domain Fit
- **Time-series line/area charts**: best for Air pollutants, energy load, water withdrawal/discharge trends.
- **Stacked area charts**: Scope emissions split, renewable vs non-renewable energy.
- **Bullet charts / progress bars**: KPI vs regulatory/target thresholds (compact and readable).
- **Gauges (sparingly)**: AQI or single operational readiness indicator where immediate state matters.
- **Heatmaps**: site-by-domain compliance matrix and hour-of-day exceedance density.
- **Treemaps**: emissions/waste contribution by source category.
- **Sankey diagrams**: water and material flow balance.
- **Box plots (advanced view)**: variability and outlier analysis for pollutant distributions.

### UX Patterns to Standardize
- Global filters: site, period, domain, production line, data quality level.
- Dual-axis caution: only when units differ and interpretation is validated.
- Threshold overlays always visible and labeled with policy source.
- Tooltip schema standardization: value, unit, timestamp, source sensor, policy limit, quality flag.
- Drill-down path: **executive card → domain trend → asset/sensor timeline → raw record audit panel**.

---

## Data Model Implications

### Core Entities
- `site`
- `asset`
- `sensor`
- `sensor_reading`
- `kpi_definition`
- `kpi_snapshot`
- `policy_rule`
- `threshold_profile`
- `alert_event`
- `emission_factor`
- `production_context`
- `calibration_record`

### Key Fields (minimum set)
- `sensor_reading`: `reading_id`, `sensor_id`, `timestamp_utc`, `metric_code`, `value`, `unit`, `quality_flag`, `ingestion_latency_ms`.
- `policy_rule`: `policy_id`, `domain`, `jurisdiction`, `metric_code`, `operator`, `limit_value`, `window`, `severity`, `effective_from`, `effective_to`.
- `kpi_snapshot`: `kpi_id`, `site_id`, `period_start`, `period_end`, `value`, `unit`, `target_value`, `variance_pct`, `confidence_score`.
- `alert_event`: `alert_id`, `policy_id`, `entity_id`, `started_at`, `ended_at`, `max_breach`, `status`, `owner`, `ack_at`, `resolved_at`.

### Sensor Types Needed
- Air: PM2.5/PM10, NOx, SO2, O3, CO, VOC, meteorological sensors.
- Emissions: stack CEMS, fuel flow meters, process counters, electricity meters.
- Energy: electricity submeters, fuel flow, power quality meters.
- Water: flow meters, pressure, pH, conductivity, turbidity, COD/BOD proxies.
- Waste: weighbridge/manual entry integration, container telemetry (optional).

### Aggregation Logic
- Raw ingestion at source granularity with immutable append-only storage.
- Rollups: 1-min → 15-min → hourly → daily snapshots.
- KPI compute windows: rolling (8h/24h), fixed calendar (day/month/year), and permit-period windows.
- Missing/invalid data handling:
  - exclude invalid from KPI numerator/denominator where required;
  - show completeness badge and confidence penalties.

### KPI-to-Raw Traceability Rule
Every KPI shown in UI must be reproducible with:
1. referenced `kpi_definition` formula version,
2. exact raw reading ids/time range,
3. applied policy and threshold profile,
4. calculation job metadata.

---

## Engineering Task Breakdown (Implementation-Ready)

### Frontend (Primary Sprint Focus)
1. Build **domain-aware dashboard shell** with reusable KPI card, threshold badge, and alert chip components.
2. Implement **Executive Overview page** with configurable widget layout.
3. Implement **four core domain pages** (Air, Emissions, Energy, Water) + Waste/Circularity page.
4. Add chart library wrappers for standardized tooltip, threshold overlay, and confidence indicators.
5. Add alert center UI with severity filters and acknowledgement workflow.
6. Add drill-down panel to raw measurement audit trail.

### Backend / Data Services
1. Implement KPI calculation services for defined KPI catalog and rolling/fixed windows.
2. Implement policy-rule engine with configurable threshold profiles by site/jurisdiction.
3. Implement emissions factor service and versioned factor lookup logic.
4. Expose APIs:
   - `/dashboard/executive-summary`
   - `/dashboard/domain/{domain}`
   - `/kpi/{kpi_id}/trace`
   - `/alerts`
5. Implement data-quality scoring service for confidence badges.

### Data Platform
1. Extend schema with entities above and enforce idempotent ingestion keys.
2. Build aggregation pipelines for hourly/daily KPI snapshots.
3. Add metadata lineage storage for KPI traceability.
4. Add late-arriving-data reprocessing jobs.

### QA / Validation
1. KPI formula unit tests per domain (happy path + edge cases).
2. Threshold breach simulation tests.
3. UI snapshot tests for critical widgets and alert states.
4. Data quality degradation scenarios (sensor downtime, late data, invalid calibration).
5. Domain expert sign-off checklist for policy interpretation.

---

## Definition of Done for Sprint 04
- KPI catalog approved by product + environmental SMEs.
- Executive dashboard and all domain dashboards implemented with live API data.
- Policy thresholds configurable without frontend redeploy.
- Every displayed KPI includes traceability endpoint coverage.
- Alert states visible, actionable, and audited.
- Documentation updated with formula dictionary and UI behavior rules.

## Sprint Success Metrics
- ≥ 90% of agreed KPIs available in dashboard with valid confidence score.
- 100% of critical KPIs linked to policy rules and threshold indicators.
- ≤ 2 clicks from executive KPI to root raw data evidence.
- Domain expert UAT approval for operational usability in at least 2 pilot facilities.
