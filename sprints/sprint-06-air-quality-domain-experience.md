# Sprint 06 — Air Quality Domain Experience & Drilldowns

## Sprint Objective
Deliver the full Air Quality domain page UX with GRI-aligned KPIs, drillable breakdowns, trend analysis, and mandatory transparency elements visible in the interface.

## Scope for this Sprint
### In Scope
- Domain page structure using reference architecture pattern:
  - Header + filters (time range, granularity)
  - KPI row (CO₂e, intensity, trend, contribution)
  - chart grid (time-series + source/location/time breakdowns)
  - insight section + export controls entry point
- Drill-down interactions:
  - source → sub-source
  - site → building → zone
- Time-series capabilities:
  - multi-granularity (hour/day/month)
  - multi-metric overlay (CO₂e + pollutants)
  - current vs previous period/baseline comparison
- Data transparency in UI (tooltips/modals):
  - data source attribution
  - coverage indicator
  - methodology and boundary definitions

### Out of Scope
- PDF/CSV/JSON export generation implementation (handled in Sprint 07).
- Full RBAC hardening beyond page-level role gating.

## Key Deliverables
1. **Air Quality Page v1 (Frontend + API Integration)**
   - 4 KPI cards with filter-aware updates and methodology tooltips.
   - 5 required chart sections with interactive legends and hover details.
2. **Breakdown & Drill-down UX**
   - Source distribution visualization and sub-source navigation.
   - Hierarchical location bar charts with contextual breadcrumbs.
3. **Insights Engine v1 (Rule-based)**
   - Auto-insights such as period delta and top contributor messages.
4. **Quality & Accessibility Baseline**
   - Responsive desktop/tablet behavior.
   - WCAG 2.1 AA checks for chart labeling, focus flow, and color usage.

## Epics / Tasks
1. **Domain Layout Composition**
   - Build Air Quality page shell and reusable KPI row patterns.
   - Wire global filters to all widgets with consistent query model.

2. **KPI + Chart Integrations**
   - Integrate top KPIs with backend contracts from Sprint 05.
   - Implement emissions/pollutants trend charts and period comparison.

3. **Transparency-First UX**
   - Expose source attribution and data-quality markers in every key widget.
   - Add methodology modal with formulas, factors, and assumptions.

4. **Drill-down + Interactions**
   - Implement source and location hierarchy drill-down patterns.
   - Add chart legend toggling and metric overlays.

5. **Performance & Usability Stabilization**
   - Frontend performance optimization to support rendering target (<500ms chart updates on normal datasets).
   - Add UI integration tests for filters, drill-downs, and transparency artifacts.

## Expected Outcomes
- Stakeholders can use a production-like Air Quality domain page for reporting analysis.
- Users can trace every visible metric to source/type/methodology in the UI.
- The domain UX is reusable as a pattern for other standards-driven pages.

## Sprint Success Metrics
- All mandatory breakdowns (source/location/time) are present and drillable.
- KPI and chart values update correctly on time/granularity filter changes.
- Transparency metadata is accessible from all KPI cards and required charts.
- UX passes core responsive and accessibility validation criteria.
