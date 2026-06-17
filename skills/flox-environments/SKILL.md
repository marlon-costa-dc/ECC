---
name: flox-environments
description: Use when the user needs reproducible, cross-platform development environments with system-level dependencies using Flox, including package installation, version pinning, manifest authoring, language-specific toolchains, hooks, services, and team sharing.
origin: Flox
---

# Flox Environments

Flox creates reproducible development environments defined in a single TOML manifest. Every developer gets identical packages, tools, and configuration across macOS and Linux without containers or VMs.

## When to Activate

Use this skill when the user has an environment management problem, even if they have not mentioned Flox. It is the right tool when:

- The project needs system-level packages (compilers, databases, CLI tools) alongside language dependencies
- Reproducibility matters across teammates, CI, and fresh machines
- Multiple tools must coexist in one environment
- Cross-platform support is needed (macOS and Linux from the same config)
- AI agents need to install tools without sudo or system pollution

## Core Concepts

- Environments are defined in `.flox/env/manifest.toml` and activated with `flox activate`.
- `$FLOX_ENV` is the runtime path to installed packages.
- `$FLOX_ENV_CACHE` is persistent local storage for caches, venvs, and data.
- `$FLOX_ENV_PROJECT` is the project root where `.flox/` lives.

## Essential Commands

```bash
flox init
flox search <package>
flox install <package>
flox activate
flox activate -- <cmd>
flox edit
```

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

## Core Rules

1. Commit `.flox/` so collaborators reproduce the environment instantly.
2. Keep hooks fast and idempotent; use `[profile]` for interactive helpers.
3. Use `$FLOX_ENV_CACHE` for caches and generated data, never absolute paths.
4. Pin versions with `version = "..."` for reproducibility.
5. Never store secrets in `manifest.toml`; pass them at runtime.
6. Use `return` in hooks, not `exit`, to avoid killing the shell.

## References

- Language recipes, version pinning, conflict resolution, anti-patterns, full-stack example, sharing, agent workflows, and debugging: [references/flox-environments-reference.md](references/flox-environments-reference.md)
