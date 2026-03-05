# Testing Dockerized Projects

## Test Layers

1. **Unit tests**
   - Run before image build when possible.
2. **Container build validation**
   - Ensure Docker image builds deterministically.
3. **Container runtime smoke tests**
   - Validate startup and health endpoints.
4. **Integration checks**
   - Validate connectivity to required dependencies (e.g., PostgreSQL, service APIs).

## Pipeline Recommendations

- Fail fast on lint/test errors before pushing images.
- Tag images with branch/commit metadata.
- Keep smoke tests lightweight and reproducible.

## Minimum Service Checks

- Application process starts successfully.
- Config/env parsing succeeds.
- Health endpoint reports ready.
- Authentication-protected routes enforce auth when applicable.
