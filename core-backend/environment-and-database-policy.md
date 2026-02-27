# Monitor Platform – Environment & Database Policy (MVP)

## Goal

Provide a clean, safe, and standard environment model for the Monitor platform where:

* each environment is isolated (data + configuration)
* deployments are predictable
* database changes are controlled and promotable
* the setup remains freemium-friendly for the MVP

---

## Environments

We maintain four shared environments plus local developer environments:

### Local (feature branches)

* Used by: individual developers
* Purpose: fast iteration and testing
* Database: local-only (developer machine/container)
* Deployment: no shared deployment

### Integration (develop)

* Used by: `develop` branch
* Purpose: integration of all merged work
* Database: `monitor_integration`
* Deployment: automatic on merges to `develop`

### Validation (release/*)

* Used by: `release/*` branches
* Purpose: staging / release candidate verification
* Database: `monitor_validation`
* Deployment: automatic when a `release/*` is deployed (or triggered), then treated as “frozen” except for bugfixes on the same release branch

### Performance (*-perf)

* Used by: performance pipelines (`*-perf`)
* Purpose: load/performance testing without impacting other envs
* Database: `monitor_perf`
* Deployment: resettable environment; data can be destroyed/reseeded freely

### Production (master/main)

* Used by: `master` (or `main`)
* Purpose: customer-facing truth
* Database: `monitor_prod`
* Deployment: controlled promotion only; highest protection and auditing

---

## Database Layout

MVP uses a **single PostgreSQL server (one VM)** with **separate databases per environment**:

* `monitor_integration`
* `monitor_validation`
* `monitor_perf`
* `monitor_prod`

### Isolation Rules

1. **Each environment has its own database user/credentials**

   * Example: `integration_user` can only access `monitor_integration`
   * `prod_user` can only access `monitor_prod`

2. **No environment shares data with another**

   * Performance tests must never run on integration/validation/prod DBs
   * Production DB must never be used for debugging or testing

3. **Access control tightens by environment**

   * Production credentials are stored separately and are not reused elsewhere
   * Only CI/CD for production deploys can access production credentials

---

## Deployment Policy (Branch → Environment)

* `feature/*` → Local only (build + unit tests; no shared deploy)
* `develop` → Integration environment (`monitor_integration`)
* `release/*` → Validation environment (`monitor_validation`)
* `*-perf` → Performance environment (`monitor_perf`)
* `master` / `main` → Production environment (`monitor_prod`)

---

## Schema Change Policy (Migrations)

Database schema changes are managed via **versioned migrations** stored in the service repository.

### Migration Rules

1. Migrations are **applied forward only** (no manual SQL changes in shared envs).
2. Each environment progresses through schema versions in this order:

   * Integration → Validation → Production

### When migrations run

* **Integration:** automatically during deploy (fast feedback)
* **Validation:** automatically when deploying a `release/*` candidate
* **Performance:** automatically before running perf tests (always up-to-date schema)
* **Production:** executed as a **gated deployment step** (controlled)

---

## Data Management Policy

* **Integration:** disposable data allowed; can be reset if needed
* **Validation:** stable dataset for release verification; reset only when moving to a new release candidate
* **Performance:** frequently reset/reseeded; data is not trusted, only metrics are
* **Production:** protected data; backups mandatory; no destructive operations without explicit approval

---

## Why this design

This design matches common industry practice:

* environment isolation to prevent cross-impact
* promotion-based deployment flow (develop → release → prod)
* controlled database migrations
* performance testing isolated from functional environments

It also stays realistic for an MVP by using one PostgreSQL server while maintaining strong logical separation.

---

If you want, next I can add one short section at the end: **“Operational Checklist”** (what you must verify before promoting a release from Validation to Production).
