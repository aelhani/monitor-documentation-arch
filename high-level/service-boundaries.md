# Service Boundaries

## Why this document
Clear service boundaries prevent coupling and keep ownership, releases, and troubleshooting manageable.

## Bounded Services

### 1) User Management Service
**Owns**
- User identity records
- Login/authentication flows
- Profile/account management primitives

**Does not own**
- KPI measurements
- Domain analytics

**Primary consumers**
- User dashboard frontend
- Other services requiring identity validation

---

### 2) Data Collection Service
**Owns**
- Ingestion endpoints for sensor/source payloads
- Input validation and canonicalization
- Initial persistence of raw/normalized KPI records

**Does not own**
- Complex business analytics transformations
- User identity lifecycle

---

### 3) Data Processing Service
**Owns**
- KPI aggregation/derivation logic
- Time-windowed summaries consumed by dashboard views

**Does not own**
- Login/session logic
- Frontend presentation concerns

---

### 4) Alerts & Logging Service
**Owns**
- Threshold/rule-based alert generation
- Alert lifecycle/status and auditable logs

**Does not own**
- Raw ingestion validation
- User profile authority

---

## Boundary Rules
1. Each service owns its core tables/domain model in PostgreSQL.
2. Cross-service communication is API/event driven, not via direct writes to another service's tables.
3. Service contracts (inputs/outputs/errors) are versioned and documented.
4. Frontend consumes public service APIs, never direct DB connections.
