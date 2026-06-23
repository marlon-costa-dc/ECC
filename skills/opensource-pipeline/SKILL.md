---
name: opensource-pipeline
description: 'Open-source pipeline: fork, sanitize, and package private projects for
  safe public release. Chains 3 agents (forker, sanitizer, packager). Triggers: ''/opensource'',
  ''open source this'', ''make this public'', ''prepare for open source''.'
origin: ECC
---

# Open-Source Pipeline Skill

Safely open-source any project through a 3-stage pipeline: **Fork** (strip secrets) → **Sanitize** (verify clean) → **Package** (CLAUDE.md + setup.sh + README).

## When to Use

- User says "open source this project" or "make this public"
- User wants to prepare a private repo for public release
- User needs to strip secrets before pushing to GitHub
- User invokes /opensource fork, /opensource verify, or /opensource package

## Workflow

1. Understand the request and confirm scope
2. Execute the canonical workflow for this skill
3. Report results and next steps

For full details, examples, edge cases, and reference material, read `references/summary.md`.
