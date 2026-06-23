---
name: autonomous-loops
description: Use when the user needs to architect or maintain autonomous Claude Code loops, from simple sequential pipelines to RFC-driven multi-agent DAG systems, including context persistence, quality gates, and merge coordination.
origin: ECC
---

# Autonomous Loops Skill

> Compatibility note (v1.8.0): `autonomous-loops` is retained for compatibility. The canonical skill name is now `continuous-agent-loop`. Author new loop guidance in `continuous-agent-loop`; keep this skill referenced only for existing loops.

## When to Use

- Setting up autonomous development workflows that run without human intervention.
- Choosing the right loop architecture for your problem (simple vs complex).
- Building CI/CD-style continuous development pipelines.
- Running parallel agents with merge coordination.
- Implementing context persistence across loop iterations.
- Adding quality gates and cleanup passes to autonomous workflows.

## Workflow

1. Understand the request and confirm scope.
2. Execute the canonical workflow for this skill.
3. Report results and next steps.

For full details, examples, edge cases, and reference material, read `references/summary.md`.
