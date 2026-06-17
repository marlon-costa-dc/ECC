---
name: skill-stocktake
description: Use when auditing Claude skills and commands for quality. Supports Quick
  Scan (changed skills only) and Full Stocktake modes with sequential subagent batch
  evaluation.
origin: ECC
---

# skill-stocktake

Slash command (`/skill-stocktake`) that audits all Claude skills and commands using a quality checklist + AI holistic judgment. Supports two modes: Quick Scan for recently changed skills, and Full Stocktake for a complete review.

## When to Use

- User asks about skill stocktake or related tasks

## Workflow

1. Understand the request and confirm scope
2. Execute the canonical workflow for this skill
3. Report results and next steps

For full details, examples, edge cases, and reference material, read `references/summary.md`.
