---
name: deployment-patterns
description: Use when the user is planning, implementing, or reviewing production deployment workflows and CI/CD pipelines for web applications, including Docker containerization, deployment strategies, health checks, rollback procedures, environment configuration, and production readiness checklists.
origin: ECC
---

# Deployment Patterns

Production deployment workflows and CI/CD best practices.

## When to Activate

- Setting up CI/CD pipelines
- Dockerizing an application
- Planning deployment strategy (blue-green, canary, rolling)
- Implementing health checks and readiness probes
- Preparing for a production release
- Configuring environment-specific settings

## Deployment Strategies

| Strategy | How It Works | Best For |
|----------|--------------|----------|
| Rolling | Replace instances gradually | Standard deployments, backward-compatible changes |
| Blue-Green | Run two identical environments, switch traffic atomically | Critical services needing instant rollback |
| Canary | Route small traffic percentage to new version first | High-traffic services, risky changes |

## Core Rules

1. Pin all image and dependency versions for reproducible builds.
2. Run containers as non-root with minimal privileges.
3. Validate environment variables at startup; never hardcode secrets.
4. Provide `/health` and `/ready` endpoints wired to probes.
5. Keep database migrations backward-compatible for rollback safety.
6. Document and test rollback plans before every production release.

## Quick Examples

### Health Check Endpoint

```typescript
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/health/detailed", async (req, res) => {
  const checks = {
    database: await checkDatabase(),
    redis: await checkRedis(),
  };
  const allHealthy = Object.values(checks).every(c => c.status === "ok");
  res.status(allHealthy ? 200 : 503).json({
    status: allHealthy ? "ok" : "degraded",
    checks,
  });
});
```

### Kubernetes Probes

```yaml
livenessProbe:
  httpGet: { path: /health, port: 3000 }
  periodSeconds: 30
  failureThreshold: 3
readinessProbe:
  httpGet: { path: /ready, port: 3000 }
  periodSeconds: 10
  failureThreshold: 2
startupProbe:
  httpGet: { path: /health, port: 3000 }
  periodSeconds: 5
  failureThreshold: 30
```

## References

- Full Dockerfiles, CI/CD pipelines, environment validation, rollback commands, and production readiness checklist: [references/deployment-patterns-reference.md](references/deployment-patterns-reference.md)
