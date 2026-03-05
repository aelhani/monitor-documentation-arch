# System Context and Data Flow

## Context
Monitoring System integrates building/compound KPI streams and provides authenticated analytics dashboards.

## Actors
- Sensor devices / gateway integrations
- Platform backend services
- Authenticated end users (dashboard)
- CI/CD operators and maintainers

## Interaction Map (Context Level)
1. Sources emit KPI measurements.
2. Platform backend ingests, stores, processes, and evaluates KPI data.
3. Dashboard retrieves current and historical KPI views for authenticated users.
4. CI/CD maintains repeatable build/test/deploy workflows.

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

## Detailed Flow Reference
For service-by-service and step-by-step runtime flows, see:
- `core-backend/data-flow-between-components.md`
