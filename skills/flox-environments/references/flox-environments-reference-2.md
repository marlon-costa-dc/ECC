gcc-unwrapped.pkg-group = "libraries"
cmake.pkg-group = "build"
gnumake.pkg-group = "build"
gdb.systems = ["x86_64-linux", "aarch64-linux"]
```

## Hooks and Profile

- **Hook (`[hook]`):** Runs on every activation. Keep fast and idempotent. Use for setup that should happen automatically.
- **Profile (`[profile]`):** Available in interactive shell. Use for user-invokable functions.

```toml
[hook]
on-activate = """
  setup_database() {
    if [ ! -d "$FLOX_ENV_CACHE/pgdata" ]; then
      initdb -D "$FLOX_ENV_CACHE/pgdata" --no-locale --encoding=UTF8
    fi
  }
  setup_database
"""
```

```toml
[profile]
common = """
  dev() { npm run dev; }
  test() { npm run test -- "$@"; }
"""
```

## Anti-Patterns

| Anti-Pattern | Fix |
|--------------|-----|
| Absolute paths in vars | Use `$FLOX_ENV_PROJECT` |
| `exit` in hooks | Use `return` |
| Storing secrets in manifest | Pass at runtime or reference external config |
| Slow hooks without guards | Add idempotency checks |
| User commands in hooks | Put them in `[profile]` |

## Full-Stack Example

```toml
[install]
python.pkg-path = "python311"
uv.pkg-path = "uv"
postgresql.pkg-path = "postgresql_16"
redis.pkg-path = "redis"
jq.pkg-path = "jq"
curl.pkg-path = "curl"

[vars]
UV_CACHE_DIR = "$FLOX_ENV_CACHE/uv-cache"
DATABASE_URL = "postgres://localhost:5432/myapp"
REDIS_URL = "redis://localhost:6379"

[hook]
on-activate = """
  if [ ! -d "$FLOX_ENV_CACHE/pgdata" ]; then
    initdb -D "$FLOX_ENV_CACHE/pgdata" --no-locale --encoding=UTF8
  fi
  venv="$FLOX_ENV_CACHE/venv"
  if [ ! -d "$venv" ]; then uv venv "$venv" --python python3; fi
  if [ -f "$venv/bin/activate" ]; then source "$venv/bin/activate"; fi
  if [ -f requirements.txt ] && [ ! -f "$FLOX_ENV_CACHE/.deps_installed" ]; then
    uv pip install --python "$venv/bin/python" -r requirements.txt --quiet
    touch "$FLOX_ENV_CACHE/.deps_installed"
  fi
"""

[profile]
common = """
  serve() { uvicorn app.main:app --reload --host 0.0.0.0 --port 8000; }
  migrate() { alembic upgrade head; }
"""

[services]
postgres.command = "postgres -D $FLOX_ENV_CACHE/pgdata -k $FLOX_ENV_CACHE"
redis.command = "redis-server --port 6379 --daemonize no"

[options]
systems = ["x86_64-linux", "aarch64-linux", "x86_64-darwin", "aarch64-darwin"]
```

Activate with services: `flox activate --start-services`

## Sharing

Commit `.flox/` so collaborators get the same environment. Push to FloxHub with `flox push` and activate remotely with `flox activate -r owner/env-name`.

Compose environments:

```toml
[include]
base.floxhub = "myorg/python-base"

[install]
fastapi.pkg-path = "python311Packages.fastapi"
```

## Agent Workflow

```bash
flox search jq
flox install jq
flox activate -- jq '.results[]' data.json
```

## Debugging

```bash
flox list -c
flox activate -- which python
flox activate -- env | grep FLOX
flox search <package> --all
```

Common issues:

> Continued in [`flox-environments-reference-3.md`](flox-environments-reference-3.md)
