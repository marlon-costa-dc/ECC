---
name: inherit-legacy-style
description: Legacy-project style inheritance skill. Use when the user types /inherit-legacy-style,
  or when onboarding an AI coding agent onto a hand-written legacy project and you
  need to prevent "style drift" (the model imposing its pretrained mainstream idioms
  onto...
origin: community
allowed-tools: Read, Glob, Grep, Bash, Edit, Write, AskUserQuestion
---

# Inherit Legacy Style

Prevents AI code style drift in legacy projects by scanning the codebase for implicit conventions across 4 meta-architecture dimensions, resolving conflicts with the user one at a time, and crystallizing the consensus into an...

## When to Use

- User types /inherit-legacy-style
- User mentions onboarding AI onto a hand-written legacy project
- User is worried about AI-generated code "drifting" from existing project conventions
- User wants to extract and codify their project's implicit coding rules

## Workflow

1. Understand the request and confirm scope
2. Execute the canonical workflow for this skill
3. Report results and next steps

For full details, examples, edge cases, and reference material, read `references/summary.md`.
