---
name: agent-eval
description: Use when comparing coding agents head-to-head on reproducible tasks, measuring performance before adopting a new tool or model, running regression checks after an agent update, or producing data-backed agent selection decisions for a team.
origin: ECC
---

# Agent Eval

Lightweight CLI for head-to-head coding agent comparison on reproducible tasks.

## When to Activate

- Comparing agents (Claude Code, Aider, Codex, etc.) on your codebase
- Measuring performance before adopting a new tool/model
- Regression checks after an agent/model update
- Data-backed agent selection decisions

Install agent-eval from its repository before use.

## Core Concepts

- **YAML tasks** define repo, files, prompt, judge, and pinned commit
- **Git worktree isolation** gives each run a fresh copy without Docker
- **Metrics**: pass rate, cost, time, consistency across repeated runs

## Workflow

1. Create `tasks/<task>.yaml`
2. Run: `agent-eval run --task tasks/<task>.yaml --agent claude-code --agent aider --runs 3`
3. Report: `agent-eval report --format table`

## Judge Types

- **Code-based**: `pytest`, `command` (deterministic)
- **Pattern-based**: `grep` for required patterns
- **Model-based**: `llm` judge (adds noise; pair with deterministic judge)

## Best Practices

- Start with 3–5 real-workload tasks
- Run at least 3 trials per agent
- Pin the commit for reproducibility
- Include at least one deterministic judge per task
- Track cost alongside pass rate
- Version task definitions as code

## Links

- Repository: [github.com/joaquinhuigomez/agent-eval](https://github.com/joaquinhuigomez/agent-eval)
