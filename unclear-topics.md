# Open Topics and Decision Backlog

## CI/CD Quality Gates

- Should linting and formatting be mandatory gates in every service pipeline?
- Proposed direction: yes, with a phased rollout by repository maturity.

## Database Hosting Strategy

- Should PostgreSQL remain self-managed in-cluster for all environments?
- Or move production to managed PostgreSQL while keeping local/dev lightweight?

## Observability Standardization

- Define baseline logs/metrics/traces required for each service.
- Decide on alert routing ownership between backend services and ops tooling.

## Authorization Roadmap

- Current model is authenticated access; role granularity must be formalized.
- Define required roles for admin and operational personas.
