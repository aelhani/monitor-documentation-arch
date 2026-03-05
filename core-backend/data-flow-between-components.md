# Data Flow Between Components

## Scope
Canonical end-to-end component flow across authentication, ingestion, processing, alerting, and dashboard consumption.

## Components
- Data sources
- Data Collection Service
- PostgreSQL
- Data Processing Service
- Alerts & Logging Service
- User Management Service
- User Dashboard Frontend

## Flow A — Authentication
1. User submits credentials via dashboard login.
2. Frontend calls user-mgmt auth endpoint.
3. User-mgmt validates credentials and returns auth context.
4. Frontend uses auth context for protected KPI APIs.

## Flow B — KPI Ingestion to Dashboard
1. Sensor/source sends KPI payload to data-collection.
2. Data-collection validates and stores normalized records in PostgreSQL.
3. Data-processing computes aggregations/rollups.
4. Alerts service evaluates rules and stores alert events.
5. Dashboard fetches KPI summaries and alert state.

## Flow C — Domain Drill-Down
1. User selects KPI domain.
2. Frontend calls domain metrics APIs.
3. Backend returns historical/summary datasets.
4. Frontend renders charts/widgets and refreshes.

## Contract Conventions
- Standard timestamp and timezone policy.
- Stable domain naming vocabulary.
- Consistent API response schema for dashboard consumption.

## Related Docs
- Context-level architecture map: `high-level/system-context-and-data-flow.md`
- Service ownership matrix: `high-level/service-responsability.md`
