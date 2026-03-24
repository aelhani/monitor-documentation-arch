# Sprint 05 — Air Quality GRI Reporting Foundation

## Sprint Objective
Establish the data and product foundations for a **GRI 305-aligned Air Quality Dashboard** with traceable CO₂e and pollutant reporting, clear boundaries, and configurable organization context.

## Scope for this Sprint
### In Scope
- Air Quality domain reporting model aligned with GRI 305.
- Core KPI definitions and calculation contracts:
  - Total CO₂e Emissions (tCO₂e)
  - Emissions Intensity (tCO₂e/m², tCO₂e/person)
  - Trend vs Previous Period
  - Air Quality contribution to total Bilan carbone
- Data model and ingestion contract for required fields:
  - timestamp, location hierarchy, source taxonomy
  - raw measurement, emission factor, calculated CO₂e
  - data source type (sensor vs estimated)
- Transparency foundation:
  - measured vs estimated distinction
  - methodology metadata (formula, factors, assumptions)
  - boundary metadata (included/excluded sources)

### Out of Scope
- Predictive analytics/forecasting.
- WHO threshold enforcement workflows.
- Non-air domains except dependencies needed for contribution KPI.

## Key Deliverables
1. **Air Quality Domain Contract v1**
   - API payload schemas for KPI cards, breakdowns, and time-series.
   - Versioned schema for measured/estimated flags and methodology metadata.
2. **Data Traceability Backbone**
   - KPI-to-raw lineage design and required audit fields.
   - Coverage % formula contract (`measured_data / total_data`).
3. **Configuration Baseline**
   - Tenant-level metric enable/disable matrix.
   - Versioned custom emission factor registry contract.
4. **Acceptance Test Matrix (Foundation)**
   - Formula correctness tests for CO₂e and intensity.
   - Boundary and methodology visibility checks.

## Epics / Tasks
1. **GRI 305 Data & KPI Modeling**
   - Define canonical entities: emission record, factor version, source taxonomy, location hierarchy.
   - Define period-based aggregation behavior (monthly, yearly baseline requirement).

2. **Calculation + Transparency Services**
   - Implement CO₂e calculation pipeline contract: `activity_data × emission_factor`.
   - Add metadata capture for assumptions and factor provenance.

3. **UI Contract Preparation**
   - Finalize card and chart data contracts with support for granularity filters.
   - Define tooltip payload structure including value, unit, source, methodology reference.

4. **Cross-Domain Dependency Enablement**
   - Define contribution KPI dependency contract with Global Overview/Bilan carbone service.
   - Define Scope 2 linkage interface with Energy domain inputs.

## Expected Outcomes
- Teams can build frontend and backend in parallel on stable contracts.
- GRI-critical traceability requirements are encoded in the data model early.
- CO₂e calculations and factor governance are testable and auditable.

## Sprint Success Metrics
- Signed-off API/data contracts for all top-level Air Quality KPIs.
- 100% of Air Quality KPI definitions include formula + methodology + boundary metadata.
- Coverage indicator and measured/estimated distinction available in the domain payloads.
- Custom emission factor versioning model validated by backend + product stakeholders.
