# Deployment Patterns — Extended Reference

## Deployment Strategies

### Rolling Deployment

Gradually replace instances. Old and new versions run simultaneously.

**Pros:** Zero downtime, gradual rollout
**Cons:** Two versions run simultaneously — requires backward-compatible changes
**Use when:** Standard deployments

### Blue-Green Deployment

Run two identical environments. Switch traffic atomically.

**Pros:** Instant rollback
**Cons:** 2x infrastructure during deployment
**Use when:** Critical services

### Canary Deployment

Route a small percentage of traffic to the new version first, then increase.

**Pros:** Catches issues with real traffic
**Cons:** Requires traffic splitting and monitoring
**Use when:** High-traffic services, risky changes

## Docker

### Multi-Stage Dockerfile (Node.js)

```dockerfile
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --production=false

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build && npm prune --production

FROM node:22-alpine AS runner
WORKDIR /app
RUN addgroup -g 1001 -S appgroup && adduser -S appuser -u 1001
USER appuser
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/dist ./dist
COPY --from=builder --chown=appuser:appgroup /app/package.json ./
ENV NODE_ENV=production
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1
CMD ["node", "dist/server.js"]
```

### Go Dockerfile

```dockerfile
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /server ./cmd/server

FROM alpine:3.19 AS runner
RUN apk --no-cache add ca-certificates && adduser -D -u 1001 appuser
USER appuser
COPY --from=builder /server /server
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:8080/health || exit 1
CMD ["/server"]
```

### Python/Django Dockerfile

```dockerfile
FROM python:3.12-slim AS builder
WORKDIR /app
RUN pip install --no-cache-dir uv
COPY requirements.txt .
RUN uv pip install --system --no-cache -r requirements.txt

FROM python:3.12-slim AS runner
WORKDIR /app
RUN useradd -r -u 1001 appuser
USER appuser
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin
COPY . .
ENV PYTHONUNBUFFERED=1
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=3s CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health/')" || exit 1
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "4"]
```

### Best Practices

- Use specific tags, multi-stage builds, non-root user, layer caching, `.dockerignore`, `HEALTHCHECK`
- Avoid `:latest`, root, single-layer copies, dev dependencies in production, secrets in images

## CI/CD Pipeline

### GitHub Actions Standard

```yaml
name: CI/CD
on:
  push: { branches: [main] }

> Continued in [`deployment-patterns-reference-2.md`](deployment-patterns-reference-2.md)
