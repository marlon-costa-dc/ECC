---
name: plankton-code-quality
description: Write-time code quality enforcement using Plankton — auto-formatting,
  linting, and Claude-powered fixes on every file edit via hooks.
origin: community
---

# Plankton Code Quality Skill

Integration reference for Plankton (credit: @alxfazio), a write-time code quality enforcement system for Claude Code. Plankton runs formatters and linters on every file edit via PostToolUse hooks, then spawns Claude subprocesses to fix...

## When to Use

- You want automatic formatting and linting on every file edit (not just at commit time)
- You need defense against agents modifying linter configs to pass instead of fixing code
- You want tiered model routing for fixes (Haiku for simple style, Sonnet for logic, Opus for types)
- You work with multiple languages (Python, TypeScript, Shell, YAML, JSON, TOML, Markdown, Dockerfile)

## Workflow

1. Understand the request and confirm scope
2. Execute the canonical workflow for this skill
3. Report results and next steps

For full details, examples, edge cases, and reference material, read `references/summary.md`.
