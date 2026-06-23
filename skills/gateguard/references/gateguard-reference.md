# GateGuard Reference

Full prompts, evidence, and setup details for the `gateguard` skill.

## Evidence

Two independent A/B tests, identical agents, same task:

| Task | Gated | Ungated | Gap |
| --- | --- | --- | --- |
| Analytics module | 8.0/10 | 6.5/10 | +1.5 |
| Webhook validator | 10.0/10 | 7.0/10 | +3.0 |
| **Average** | **9.0** | **6.75** | **+2.25** |

Both agents produced running, tested code. The difference was design depth.

## Gate Prompts

### Edit / MultiEdit Gate

```text
Before editing {file_path}, present these facts:

1. List ALL files that import/require this file (use Grep)
2. List the public functions/classes affected by this change
3. If this file reads/writes data files, show field names, structure,
   and date format (use redacted or synthetic values, not raw production data)
4. Quote the user's current instruction verbatim
```

### Write Gate

```text
Before creating {file_path}, present these facts:

1. Name the file(s) and line(s) that will call this new file
2. Confirm no existing file serves the same purpose (use Glob)
3. If this file reads/writes data files, show field names, structure,
   and date format (use redacted or synthetic values, not raw production data)
4. Quote the user's current instruction verbatim
```

### Destructive Bash Gate

Triggers on: `rm -rf`, `git reset --hard`, `git push --force`, `drop table`, etc.

```text
1. List all files/data this command will modify or delete
2. Write a one-line rollback procedure
3. Quote the user's current instruction verbatim
```

### Routine Bash Gate

```text
1. The current user request in one sentence
2. What this specific command verifies or produces
```

## Setup

### Option A: ECC hook

Enable the hook at `scripts/hooks/gateguard-fact-force.js` via hooks.json. If GateGuard blocks setup or repair work, start the session with `ECC_GATEGUARD=off` or use `ECC_DISABLED_HOOKS` with the hook ID.

In long sessions, only the first `GATEGUARD_FACT_FORCE_FULL_DENIALS` denials (default 3) emit the full four-fact block; later denials are condensed to a single line carrying the denial ordinal. Retrying the same file or command after presenting facts never re-triggers the gate.

### Option B: Standalone package

```bash
pip install gateguard-ai
gateguard init
```

This adds `.gateguard.yml` for per-project configuration (custom messages, ignore paths, gate toggles).

## Best Practices

- Let the gate fire naturally; the investigation itself improves quality.
- Customize gate messages for your domain's conventions.
- Use `.gateguard.yml` to ignore paths like `.venv/`, `node_modules/`, `.git/`.
