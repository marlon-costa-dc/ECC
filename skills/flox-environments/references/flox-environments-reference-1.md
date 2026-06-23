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

> Continued in [`flox-environments-reference-2.md`](flox-environments-reference-2.md)
