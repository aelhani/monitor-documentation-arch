# System Context and Data Flow

## Context
Monitoring System integrates building/compound KPI streams and provides authenticated analytics dashboards.

## Actors
- Sensor devices / gateway integrations
- Platform backend services
- Authenticated end users (dashboard)
- CI/CD operators and maintainers

## High-Level Data Flow
1. Sources emit KPI measurements.
2. Data Collection service validates and stores records in PostgreSQL.
3. Data Processing service computes aggregates/trends.
4. Alerts service evaluates thresholds and stores incidents.
5. Dashboard requests current and historical KPI views.
6. User Management service gates access via login/auth context.

## Data Domains
- Energy
- Water
- Air quality
- Recycling
- Emissions

## Design Constraints
- Consistent timestamp semantics.
- Environment-specific configuration isolation.
- API-contract stability for frontend consumption.
