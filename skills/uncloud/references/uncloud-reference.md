# Uncloud — Extended Reference

## CLI Reference

### Machines

| Command | Purpose |
|---------|---------|
| `uc machine init user@host` | Bootstrap first machine |
| `uc machine add user@host` | Join machine to cluster |
| `uc machine ls` | List machines |
| `uc machine update NAME --public-ip IP` | Update public IP |
| `uc machine rm NAME` | Remove machine |

Flags: `--name`, `--network 10.210.0.0/16`, `--no-caddy`, `--no-dns`, `--public-ip auto|IP|none`

### Services

| Command | Purpose |
|---------|---------|
| `uc service ls` / `uc ls` | List services |
| `uc service run IMAGE` | Run single container |
| `uc deploy` | Deploy from compose.yaml |
| `uc deploy --no-build` | Deploy existing images |
| `uc deploy --recreate` | Force recreation |
| `uc scale SERVICE N` | Set replicas |
| `uc service logs SERVICE` | View logs |
| `uc service exec SERVICE` | Shell into container |
| `uc service inspect SERVICE` | Detailed info |
| `uc service rm SERVICE` | Remove service (keeps volumes) |
| `uc ps` | All containers |

### Images and Volumes

```bash
uc image push myapp:latest
uc image push myapp:latest -m machine1,machine2
uc images
uc volume ls
uc volume create NAME -m MACHINE
uc volume rm NAME
```

### Caddy and DNS

```bash
uc caddy config
uc caddy deploy
uc dns show
uc dns reserve
uc ctx ls
uc ctx use prod
```

## Port Publishing

### HTTP/HTTPS via Caddy

```
-p [hostname:]container_port[/protocol]
```

| Example | Meaning |
|---------|---------|
| `-p 8080/https` | HTTPS with auto hostname |
| `-p app.example.com:8080/https` | HTTPS with custom hostname |
| `-p 8080/http` | HTTP only |

### TCP/UDP Host-Bound

```
-p [host_ip:]host_port:container_port[/protocol]@host
```

| Example | Meaning |
|---------|---------|
| `-p 5432:5432@host` | TCP on all interfaces |
| `-p 127.0.0.1:5432:5432@host` | TCP loopback only |
| `-p 53:5353/udp@host` | UDP |

## Compose Extensions

### `x-ports`

```yaml
services:
  app:
    image: app:latest
    x-ports:
      - example.com:8000/https
```

### `x-caddy`

```yaml
services:
  app:
    image: app:latest
    x-caddy: |
      example.com {
        redir https://www.example.com{uri} permanent
      }
      www.example.com {
        reverse_proxy {{upstreams 8000}} { import common_proxy }
        basic_auth /admin/* { admin $2a$14$... }
      }
```

Template functions: `{{upstreams [service] [port]}}`, `{{.Name}}`, `{{.Upstreams}}`

### `x-machines`

```yaml
services:
  db:
    image: postgres:18
    x-machines: db-machine
  app:
    image: app:latest
    x-machines: [machine-1, machine-2]
```

### Full Example

```yaml
services:
  api:
    build: ./api
    x-ports: [api.example.com:3000/https]
    environment: { DATABASE_URL: postgres://db:5432/mydb }
  web:
    build: ./web
    x-ports: [example.com:8000/https, www.example.com:8000/https]
    environment: { API_URL: http://api:3000 }
  db:
    image: postgres:18
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
