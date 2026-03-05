# Data Flow: Sensors to Dashboard

## End-to-End Flow

1. **Sensor or external source emits measurements**
   - Example KPIs: CO2, kWh, water usage, recycling volume.
2. **Ingestion service receives payload**
   - Validates structure and domain metadata.
3. **Backend processing enriches and stores data**
   - Writes normalized records and derived values in PostgreSQL-backed structures.
4. **Rules engine evaluates conditions**
   - Generates alerts/events when thresholds are exceeded.
5. **Frontend dashboard queries KPI endpoints**
   - Renders global overview and domain-specific pages.
6. **User action and operational response**
   - Alerts and insights support operational decisions.

## Data Contract Guidelines

- Include source/device identifier.
- Include domain and metric name.
- Include timestamp in UTC.
- Include value and optional quality metadata.

## Quality and Reliability Notes

- Prefer idempotent ingestion operations when possible.
- Track failed validations and partial ingestion outcomes.
- Define retention and aggregation policies per domain.
