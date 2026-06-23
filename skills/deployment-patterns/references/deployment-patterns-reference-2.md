  pull_request: { branches: [main] }
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test -- --coverage
  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with: { registry: ghcr.io, username: '${{ github.actor }}', password: '${{ secrets.GITHUB_TOKEN }}' }
      - uses: docker/build-push-action@v5
        with: { push: true, tags: 'ghcr.io/${{ github.repository }}:${{ github.sha }}', cache-from: 'type=gha', cache-to: 'type=gha,mode=max' }
```

## Environment Configuration

Use environment variables for all config. Validate at startup with Zod:

```typescript
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "staging", "production"]),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
});
export const env = envSchema.parse(process.env);
```

## Rollback

```bash
kubectl rollout undo deployment/app
vercel rollback
railway up --commit <previous-sha>
npx prisma migrate resolve --rolled-back <migration-name>
```

Rollback checklist: previous artifact available, migrations backward-compatible, feature flags present, monitoring alerts configured, rollback tested in staging.

## Production Readiness Checklist

### Application
- Tests pass; no hardcoded secrets; structured logging; meaningful health checks

### Infrastructure
- Reproducible builds; env vars documented and validated; resource limits; horizontal scaling; TLS

### Monitoring
- Metrics, alerts, log aggregation, uptime monitoring

### Security
- CVE scans, CORS, rate limiting, authz verified, security headers

### Operations
- Rollback plan tested, migration tested, runbook, on-call rotation
