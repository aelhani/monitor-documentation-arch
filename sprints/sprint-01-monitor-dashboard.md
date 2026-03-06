# Sprint 01 — Stabilize & De-risk Core UX + Contracts (monitor-dashboard)

## Scope implemented
- SPA routing hardening for direct navigation refreshes.
- Font strategy fix (replace invalid `Majalla` import with `Inter`).
- Smoke checks for route loads and dashboard render safety.
- Unit testing baseline (widgets, transformation, state hook) and coverage threshold.
- Deterministic mock data scenarios with runtime toggle between mock and real API.

## File structure updates
```text
monitor-dashboard/
  .github/workflows/frontend-smoke.yml
  docker/Dockerfile
  k8s/ingress.yaml
  nginx/default.conf
  jest.config.cjs
  src/
    components/widgets/StatusWidget.tsx
    config/env.ts
    fixtures/sensors.{normal,warning,critical}.json
    hooks/useDashboardState.ts
    services/{apiClient,mockData}.ts
    styles/fonts.css
    utils/transformSensorData.ts
  tests/
    smoke/routes-and-render.smoke.test.tsx
    unit/{StatusWidget,useDashboardState,transformSensorData}.test.ts(x)
```

## Configuration placement
- `monitor-dashboard/nginx/default.conf`: SPA fallback via `try_files ... /index.html`.
- `monitor-dashboard/docker/Dockerfile`: production image that bundles fallback Nginx config.
- `monitor-dashboard/k8s/ingress.yaml`: ingress snippet fallback for Nginx ingress deployments.
- `monitor-dashboard/.github/workflows/frontend-smoke.yml`: CI gate for smoke + unit tests.

## Mock data contract
- `VITE_USE_MOCKS=true` enables mocks.
- `VITE_MOCK_SCENARIO=normal|warning|critical` selects deterministic fixture.
- `fetchSensors()` in `src/services/apiClient.ts` is the single entry point for real/mock transport.

## Recommended commit structure
1. `chore(frontend): add SPA fallback configs for nginx/docker/ingress`
2. `fix(frontend): replace broken Majalla font import with Inter`
3. `test(frontend): add smoke checks for routing and dashboard rendering`
4. `test(frontend): add jest + rtl baseline with 38% coverage threshold`
5. `feat(frontend): add deterministic sensor mock scenarios and env-driven toggle`
