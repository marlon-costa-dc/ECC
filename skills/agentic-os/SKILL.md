---
name: agentic-os
description: Use when building a persistent multi-agent operating system inside Claude Code that survives session restarts, routes tasks to specialist agents, exposes slash commands, runs scheduled automation, and manages state through file-based memory rather than external databases.
origin: ECC
---

# Agentic OS

Treat Claude Code as a persistent runtime: a kernel routes tasks to specialist agents, commands provide reusable workflows, scripts handle scheduled automation, and `data/` holds JSON/markdown state.

## When to Activate

- Building multi-agent workflows inside Claude Code
- Setting up persistent automation that survives session restarts
- Creating a personal OS, agent coordinator, or long-running project context
- User says "agentic OS", "personal OS", "multi-agent", "agent coordinator", or "persistent agent"

## Architecture

Project root layers:

```
CLAUDE.md          # Kernel: identity, routing, model policies
agents/            # Specialist agent definitions
.claude/commands/  # Slash commands
scripts/           # Daemon scripts
data/              # JSON/markdown state
```

Keep `CLAUDE.md` small and declarative. Routing lives in markdown tables, not code.

## Specialist Agents

Each `agents/<name>.md` defines one specialist with identity, memory scope, tool access, and constraints. The kernel hands off tasks and synthesizes results.

## Commands

Place markdown files in `.claude/commands/<name>.md`. Claude auto-discovers them; invoke with `/<name>`. Use imperative names.

## Persistent Memory

File-based only. Use `data/` directories for daily-logs, projects, decisions, inbox, contacts, templates. End each session with a reflection.

## Automation

Use external cron; see reference.

## Data Layer

Use JSON for structured state and markdown for narrative. Never rename fields; add new ones and mark deprecated fields.

## Best Practices

- Keep `CLAUDE.md` under 200 lines and each agent file under 100 lines
- Git-ignore sensitive logs; track decisions/specs
- Logs are append-only
- Write reflections at session end
- Log API spend per session
- One project = one Agentic OS

## References

- Config templates, JSON examples, command set, schema evolution, anti-patterns: [references/agentic-os-reference.md](references/agentic-os-reference.md)
