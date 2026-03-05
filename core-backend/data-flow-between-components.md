# Core Backend Data Flow Between Components

This document details the backend interaction flow used by the Monitoring System, aligned with the current state: **PostgreSQL-backed services**, **implemented user authentication**, and **dashboard-first API consumption**.

---

## 1) Components in the Current Backend Context

- **User Management Service**
  - Authenticates users and provides identity context.
- **KPI Ingestion / Domain Services**
  - Accept KPI payloads (air, energy, water, recycling, emissions).
- **Rules / Alerting Logic (current or incremental)**
  - Evaluates thresholds and derives actionable alerts.
- **Read APIs for Frontend Dashboard**
  - Serve aggregated and domain-specific KPI views.
- **PostgreSQL Data Layer**
  - Persists user, operational, and KPI-related entities.

---

## 2) End-to-End Logical Flow

### Step A — Authentication entry

1. Frontend submits login credentials.
2. User management validates credentials against PostgreSQL-backed user records.
3. Auth context/session token is returned.
4. Frontend stores session context and enables protected routes.

### Step B — KPI write path

1. Sensor/gateway/system payload arrives at ingestion endpoint.
2. Service validates payload schema (required fields, value types, timestamp coherence).
3. Service normalizes payload (units/domain mapping where applicable).
4. Service persists canonical record to PostgreSQL.
5. Service emits internal event/log entry for observability.

### Step C — Processing/rules path

1. Processing logic scans new measurements or receives them via service workflow.
2. Rule evaluation compares values to domain thresholds/business rules.
3. Matching rule produces alert/event records.
4. Alert state is persisted and exposed to read APIs.

### Step D — Dashboard read path

1. Frontend calls protected domain endpoints with auth context.
2. Backend verifies authorization context.
3. Backend returns:
   - latest values
   - timeseries slices
   - alert status/last triggers
4. Frontend renders global overview + domain pages.

---

## 3) Suggested Canonical Payload Contract (for consistency)

Even if internal services evolve, this minimal contract should remain stable:

```json
{
  "sourceId": "sensor-01",
  "domain": "air_quality",
  "metric": "co2",
  "value": 742.5,
  "unit": "ppm",
  "timestamp": "2026-03-05T09:15:00Z"
}
```

### Contract notes

- `timestamp` must be UTC ISO-8601.
- `domain`/`metric` must map to known domain registry values.
- `value` must be numeric with explicit `unit`.

---

## 4) Backend Interaction Rules

1. **No direct DB coupling across services**
   - Services interact through APIs/events, not by reading each other’s private tables directly.
2. **Auth context propagation required**
   - Protected operations require validated identity context.
3. **Validation at boundaries**
   - Reject malformed payloads early.
4. **Deterministic error contracts**
   - Keep response codes and error bodies predictable for frontend integration.
5. **Auditability**
   - Important actions (auth failures, ingestion rejection, alert trigger) must be logged.

---

## 5) Failure Modes and Handling Expectations

### Ingestion failures
- Return explicit 4xx for invalid payload.
- Log validation reason for supportability.

### Persistence failures
- Return 5xx and mark write as failed.
- Ensure no false “accepted” status is emitted.

### Rules evaluation failures
- Isolate evaluation errors from ingestion availability when possible.
- Record failed evaluations for replay/troubleshooting.

### Read path failures
- Keep auth failures distinct from data errors.
- Return empty-state semantics clearly when data is absent.

---

## 6) Observability and Traceability Expectations

Minimum signals to capture:

- Auth success/failure counters
- Ingestion accepted/rejected counters by domain
- Processing latency and error counters
- Alert creation rate by metric/domain
- API response time for dashboard-critical endpoints

These metrics are essential for both platform stability and compliance-oriented reporting integrity.
