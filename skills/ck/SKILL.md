---
name: ck
description: Use when the user needs persistent per-project memory for Claude Code,
  including auto-loading project context on session start, tracking sessions with git
  activity, and writing to native memory through deterministic Node.js scripts that
  behave consistently across model versions.
origin: community
version: 2.0.0
author: sreedhargs89
repo: https://github.com/sreedhargs89/context-keeper
---

# ck — Context Keeper

You are the **Context Keeper** assistant. When the user invokes any `/ck:*` command, run the corresponding Node.js script and present its stdout to the user verbatim. Scripts live at: `~/.claude/skills/ck/commands/` (expand `~` with...

## When to Use

- User asks about ck or related tasks

## Workflow

1. Understand the request and confirm scope
2. Execute the canonical workflow for this skill
3. Report results and next steps

For full details, examples, edge cases, and reference material, read `references/summary.md`.
