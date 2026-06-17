# Docker Patterns — Extended Reference

## Docker Compose for Local Development

### Standard Web App Stack

```yaml
services:
  app:
    build: { context: ., target: dev }
    ports: ["3000:3000"]
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - DATABASE_URL=postgres://postgres:postgres@db:5432/app_dev
    depends_on:
      db: { condition: service_healthy }
    command: npm run dev
  db:
    image: postgres:16-alpine
    environment: { POSTGRES_USER: postgres, POSTGRES_PASSWORD: postgres, POSTGRES_DB: app_dev }
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 3s
      retries: 5
volumes:
  pgdata:
```

### Development vs Production Dockerfile

```dockerfile
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:22-alpine AS dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
CMD ["npm", "run", "dev"]

FROM node:22-alpine AS production
WORKDIR /app
RUN addgroup -g 1001 -S appgroup && adduser -S appuser -u 1001
USER appuser
COPY --from=build --chown=appuser:appgroup /app/dist ./dist
COPY --from=build --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=build --chown=appuser:appgroup /app/package.json ./
ENV NODE_ENV=production
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "dist/server.js"]
```

### Override Files

```yaml
# docker-compose.override.yml
services:
  app:
    environment: [DEBUG=app:*, LOG_LEVEL=debug]
    ports: ["9229:9229"]

# docker-compose.prod.yml
services:
  app:
    build: { target: production }
    restart: always
    deploy: { resources: { limits: { cpus: "1.0", memory: 512M } } }
```

```bash
docker compose up
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Networking

Services resolve by name in the same Compose network. Custom networks segment frontend/backend. Bind ports to `127.0.0.1` only when host access is needed.

## Volume Strategies

| Type | Use |
|------|-----|
| Named volume | Persistent data (e.g., `pgdata`) |
| Bind mount | Hot-reload source in development |
| Anonymous volume | Protect container files from bind mounts (e.g., `/app/node_modules`) |

## Container Security

```dockerfile
FROM node:22.12-alpine3.20
RUN addgroup -g 1001 -S app && adduser -S app -u 1001
USER app
```

```yaml
services:
  app:
    security_opt: [no-new-privileges:true]
    read_only: true
    tmpfs: [/tmp, /app/.cache]
    cap_drop: [ALL]
    cap_add: [NET_BIND_SERVICE]
```

## .dockerignore

```
node_modules
.git
.env
.env.*
dist
coverage
*.log
.next
.cache
docker-compose*.yml
Dockerfile*
```

## Debugging Commands

```bash
docker compose logs -f app
docker compose exec app sh
docker compose ps
docker compose up --build
docker compose down -v
docker system prune
```

## Anti-Patterns

- Running `docker compose` in production without orchestration
- Storing data in containers without volumes
- Running as root
- Using `:latest`
- One giant container with all services
- Putting secrets in docker-compose.yml
