# `kubectl port-forward` in Monitoring System Workflows

## What it does
`kubectl port-forward` creates a temporary tunnel from your local machine to a Kubernetes pod/service port.

## Why we use it
- Quick local debugging against in-cluster services.
- Temporary access without exposing public ingress.

## Generic Command Patterns
```bash
kubectl -n <namespace> port-forward svc/<service-name> <local-port>:<service-port>
kubectl -n <namespace> port-forward pod/<pod-name> <local-port>:<container-port>
```

## Example (PostgreSQL)
```bash
kubectl -n monitoring port-forward svc/postgres 5432:5432
```
After this, local tools can connect to `localhost:5432` while traffic is tunneled to the in-cluster PostgreSQL service.

## Important Notes
- Port-forward is session-based (stops when command exits).
- It is for development/debugging, not production exposure.
- RBAC permissions are required to port-forward in target namespace.
