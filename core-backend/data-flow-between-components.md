# Data Flow Between Components

## Scope
End-to-end data flow across ingestion, processing, alerting, and dashboard consumption, aligned with current architecture (PostgreSQL + user-mgmt authentication).

## Components
- **Data sources**: Sensors/external systems producing KPI readings.
- **Data Collection Service**: Receives and validates measurements.
- **PostgreSQL**: Persists raw and processed KPI data plus alert records.
- **Data Processing Service**: Builds derived/aggregated KPI datasets.
- **Alerts & Logging Service**: Applies rules and writes alerts/events.
- **User Management Service**: Auth/login provider.
- **User Dashboard Frontend**: Authenticated KPI visualization.

## Flow A — Authentication
1. User submits credentials via dashboard login form.
2. Frontend calls user-mgmt authentication endpoint.
3. User-mgmt validates credentials and returns auth context.
4. Frontend stores auth context and calls protected KPI endpoints.

## Flow B — KPI Ingestion to Dashboard
1. Sensor/source sends KPI payload to data-collection endpoint.
2. Data-collection validates and persists normalized records in PostgreSQL.
3. Data-processing computes aggregated views (time windows/domain rollups).
4. Alerts service evaluates threshold rules and stores alert events.
5. Dashboard fetches latest KPI summaries and alert states for display.

## Flow C — Domain Drill-Down
1. User selects domain (energy/water/air quality/recycling/emissions).
2. Frontend calls domain-specific metrics endpoints.
3. Backend returns filtered historical and summary datasets.
4. Frontend renders charts/widgets and refreshes periodically.

## Data Contract Guidance
- Standard timestamp format and timezone policy across services.
- Consistent domain naming for KPI categories.
- Stable API response schema for dashboard components.
