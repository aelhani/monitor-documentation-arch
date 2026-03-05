# kubectl port-forward Usage Guide

## Why This Is Useful

`kubectl port-forward` enables local debugging of services running in Kubernetes without exposing them publicly.

## Typical Commands

```bash
kubectl get pods -n <namespace>
kubectl port-forward -n <namespace> pod/<pod-name> 8080:8080
kubectl port-forward -n <namespace> svc/<service-name> 5432:5432
```

## Common Use Cases

- Verify backend API responses locally.
- Test user management login endpoints from local tools.
- Inspect PostgreSQL connectivity in non-production environments.

## Security Notes

- Use only in controlled development/troubleshooting contexts.
- Avoid long-lived port-forward sessions.
- Respect namespace and RBAC boundaries.
