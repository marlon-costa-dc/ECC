# Flox Environments — Extended Reference

## Manifest Structure

```toml
[install]
ripgrep.pkg-path = "ripgrep"
jq.pkg-path = "jq"

[vars]
DATABASE_URL = "postgres://localhost:5432/myapp"

[hook]
on-activate = """
  echo "Environment ready"
"""

[profile]
common = """
  alias dev="npm run dev"
"""

[options]
systems = ["x86_64-linux", "aarch64-linux", "x86_64-darwin", "aarch64-darwin"]
```

## Package Installation Patterns

### Basic

```toml
[install]
nodejs.pkg-path = "nodejs"
python.pkg-path = "python311"
rustup.pkg-path = "rustup"
```

### Version Pinning

```toml
[install]
nodejs.pkg-path = "nodejs"
nodejs.version = "^20.0"
postgres.pkg-path = "postgresql"
postgres.version = "16.2"
```

### Platform-Specific

```toml
[install]
valgrind.pkg-path = "valgrind"
valgrind.systems = ["x86_64-linux", "aarch64-linux"]
Security.pkg-path = "darwin.apple_sdk.frameworks.Security"
Security.systems = ["x86_64-darwin", "aarch64-darwin"]
```

### Conflicts

Use `priority` (lower wins) for file conflicts:

```toml
[install]
gcc.pkg-path = "gcc12"
gcc.priority = 3
clang.pkg-path = "clang_18"
clang.priority = 5
```

Use `pkg-group` to resolve versions together:

```toml
[install]
python.pkg-path = "python311"
python.pkg-group = "python-stack"
pip.pkg-path = "python311Packages.pip"
pip.pkg-group = "python-stack"
```

## Language Recipes

### Python with uv

```toml
[install]
python.pkg-path = "python311"
uv.pkg-path = "uv"

[vars]
UV_CACHE_DIR = "$FLOX_ENV_CACHE/uv-cache"
PIP_CACHE_DIR = "$FLOX_ENV_CACHE/pip-cache"

[hook]
on-activate = """
  venv="$FLOX_ENV_CACHE/venv"
  if [ ! -d "$venv" ]; then uv venv "$venv" --python python3; fi
  if [ -f "$venv/bin/activate" ]; then source "$venv/bin/activate"; fi
  if [ -f requirements.txt ] && [ ! -f "$FLOX_ENV_CACHE/.deps_installed" ]; then
    uv pip install --python "$venv/bin/python" -r requirements.txt --quiet
    touch "$FLOX_ENV_CACHE/.deps_installed"
  fi
"""
```

### Node.js

```toml
[install]
nodejs.pkg-path = "nodejs"
nodejs.version = "^20.0"

[hook]
on-activate = """
  if [ -f package.json ] && [ ! -d node_modules ]; then npm install --silent; fi
"""
```

### Rust

```toml
[install]
rustup.pkg-path = "rustup"
pkg-config.pkg-path = "pkg-config"
openssl.pkg-path = "openssl"

[vars]
RUSTUP_HOME = "$FLOX_ENV_CACHE/rustup"
CARGO_HOME = "$FLOX_ENV_CACHE/cargo"

[profile]
common = """
  export PATH="$CARGO_HOME/bin:$PATH"
"""
```

### Go

```toml
[install]
go.pkg-path = "go"
gopls.pkg-path = "gopls"
delve.pkg-path = "delve"

[vars]
GOPATH = "$FLOX_ENV_CACHE/go"
GOBIN = "$FLOX_ENV_CACHE/go/bin"

[profile]
common = """
  export PATH="$GOBIN:$PATH"
"""
```

### C/C++

```toml
[install]
gcc.pkg-path = "gcc13"
gcc.pkg-group = "compilers"
gcc-unwrapped.pkg-path = "gcc-unwrapped"
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
- Package not found: search is case-sensitive; try `--all`
- File conflicts: add `priority`
- Hook failures: use `return`, guard with `${FLOX_ENV_CACHE:-}`
- Stale deps: delete `$FLOX_ENV_CACHE/.deps_installed`

## Related Skills

- `flox-services`
- `flox-builds`
- `flox-containers`
- `flox-sharing`
- `flox-cuda`

Learn more at [flox.dev/docs](https://flox.dev/docs/install-flox/install/)
