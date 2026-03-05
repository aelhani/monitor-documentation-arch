# Service Responsibilities Matrix

| Service Area | Primary Responsibilities | Explicitly Out of Scope |
|---|---|---|
| User Management | Login/authentication, identity profile, access control context | KPI ingestion, KPI analytics |
| KPI Data Services | Accept/validate KPI events, expose KPI query APIs | User auth, UI rendering |
| Rules & Alerts | Evaluate thresholds and rules, create alerts/events | User CRUD, dashboard layout |
| Reporting & Analytics | Aggregations, trend outputs, export-ready summaries | Real-time auth/session handling |
| Frontend Dashboard | User interaction, navigation, visual KPI analytics | Backend persistence, deployment orchestration |
| CI/CD Platform | Build/test/deploy automation, pipeline reuse model | Runtime business logic |

## Ownership Rules

- Services can depend on shared contracts but must not depend on each other's internal storage implementation.
- Schema changes require explicit ownership and versioned rollout notes.
- Frontend behavior must align with backend capabilities, not inferred internal logic.
