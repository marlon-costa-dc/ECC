    environment: { POSTGRES_PASSWORD: '${DB_PASSWORD}' }
    volumes: [db-data:/var/lib/postgresql/data]
    x-machines: db-machine
volumes:
  db-data:
```

## Routing to External Devices

Create a Caddyfile snippet and register a no-op service:

```caddyfile
https://device.example.com {
    reverse_proxy https://192.168.1.x {
        transport http { tls_insecure_skip_verify }
    }
    log
}
```

```bash
uc service run --name device-bmc --caddyfile ~/device.caddyfile registry.k8s.io/pause:3.9
```

`--caddyfile` cannot be combined with non-`@host` published ports. A wildcard DNS record (`*.yourdomain.com → cluster-public-ip`) lets new subdomains work immediately.

## Service DNS

| DNS name | Resolves to |
|----------|-------------|
| `service-name` | Any healthy container |
| `service-name.internal` | Same |
| `rr.service-name.internal` | Round-robin |
| `nearest.service-name.internal` | Machine-local first |

## Scaling and Global Services

```bash
uc scale web 5
```

```yaml
services:
  caddy:
    deploy:
      mode: global
```

## Image Tag Templates

```yaml
image: myapp:{{gitdate "20060102"}}.{{gitsha 7}}
image: myapp:{{gitsha 7}}.${GITHUB_RUN_ID:-local}
```

| Function | Output |
|----------|--------|
| `{{gitsha N}}` | First N chars of commit SHA |
| `{{gitdate "format"}}` | Git commit date in Go format |
| `{{date "format"}}` | Current date |

## Common Workflows

```bash
uc deploy
uc build --push && uc deploy --no-build
uc logs -f web
uc logs --since 1h web
uc exec web
uc exec web /bin/sh -c "env"
uc deploy --recreate
```

Zero-downtime deploys happen automatically when health checks pass.

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Editing Caddyfile directly | Use `x-caddy` or `--caddyfile` |
| HTTPS upstream with self-signed cert | Add `transport http { tls_insecure_skip_verify }` |
| `uc caddy config` shows no user blocks | Check `uc inspect caddy` and `uc logs caddy` |
| Service can't reach external LAN IP | Verify Caddy host routing |
| Volumes lost after `uc service rm` | Named volumes persist; anonymous volumes are removed |
