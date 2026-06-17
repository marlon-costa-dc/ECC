---
name: docker-patterns
description: Use when the user is building, reviewing, or debugging Docker images and Docker Compose setups for local development or containerized deployments, including multi-stage builds, non-root users, image hardening, volume strategies, container networking, secret injection, and .dockerignore hygiene.
origin: ECC
---

# Docker Patterns

## When to Activate

- Writing or reviewing Dockerfiles and docker-compose.yml
- Designing multi-container local development stacks
- Troubleshooting container networking, volumes, or image builds
- Hardening images (non-root, read-only rootfs, pinned tags, no secrets)

## Core Rules

1. Pin image tags (`node:22-alpine`, never `:latest`).
2. Run containers as non-root with explicit UID/GID.
3. Use multi-stage builds to separate build and production images.
4. Keep secrets out of image layers; inject at runtime.
5. Use `.dockerignore` to exclude `.git`, `node_modules`, `.env`, and build artifacts.
6. Prefer named volumes for persistence; bind mounts only for development.

## Quick Example

```dockerfile
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:22-alpine AS production
WORKDIR /app
RUN addgroup -g 1001 -S appgroup && adduser -S appuser -u 1001
USER appuser
COPY --from=deps --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --chown=appuser:appgroup . .
ENV NODE_ENV=production
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "dist/server.js"]
```

## References

- Full examples, networking, volume strategies, security hardening, and debugging: [references/docker-patterns-reference.md](references/docker-patterns-reference.md)
