# Core Backend Data Flow Between Components

## Purpose

Describe how backend components exchange data in the current architecture.

## Main Flow

1. **Auth entry**
   - User logs in via user management APIs.
2. **KPI ingestion**
   - Data collection endpoints receive KPI measurements.
3. **Persistence**
   - Services persist operational and business data to PostgreSQL-backed stores.
4. **Processing and rules**
   - Processing services evaluate thresholds and derive alert entities.
5. **Read APIs for frontend**
   - Domain endpoints return summarized and detailed views for dashboard pages.

## Component Interaction Rules

- Interactions occur through stable API contracts.
- Service internals (tables, implementation details) are not directly coupled.
- Authentication context is validated before serving protected resources.

## Error Handling Expectations

- Validate payloads at ingress boundaries.
- Return consistent error responses for frontend and service clients.
- Log failures for observability and incident review.
