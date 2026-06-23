---
name: deployment-patterns
description: Use when the user is planning, implementing, or reviewing production deployment workflows and CI/CD pipelines for web applications, including Docker containerization, deployment strategies, health checks, rollback procedures, environment configuration, and production readiness checklists.
origin: ECC
---

# Deployment Patterns

> Sujeito à lei no-bypass (AGENTS.md §0 / ADR-001 resolver-nunca-esconder): corrigir na raiz, verificar verde com evidência fresca, nunca mascarar/pular/adiar-como-pronto.

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
| Rolling | Replace instances gradually | Standard deployments |
| Blue-Green | Run two environments, switch traffic atomically | Critical services |
| Canary | Route small traffic percentage to new version first | High-traffic or risky changes |

## Core Rules

1. Pin all image and dependency versions for reproducible builds.
2. Run containers as non-root with minimal privileges.
3. Validate environment variables at startup; never hardcode secrets.
4. Provide `/health` and `/ready` endpoints wired to probes.
5. Keep database migrations backward-compatible for rollback safety.
6. Document and test rollback plans before every production release.

## Quick Example

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
