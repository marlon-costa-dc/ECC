---
name: code-tour
description: Use when the user wants a CodeTour walkthrough, onboarding tour, architecture
  tour, PR tour, RCA tour, or a guided explanation of how a specific part of the codebase
  works. Outputs `.tour` JSON files anchored to real files and line ranges.
origin: ECC
---

# Code Tour

Create **CodeTour** `.tour` files for codebase walkthroughs that open directly to real files and line ranges. Tours live in `.tours/` and are meant for the CodeTour format, not ad hoc Markdown notes.

## When to Use

- the user asks for a code tour, onboarding tour, architecture walkthrough, or PR tour
- the user says "explain how X works" and wants a reusable guided artifact
- the user wants a ramp-up path for a new engineer or reviewer
- the task is better served by a guided sequence than a flat summary
- onboarding a new maintainer
- architecture tour for one service or package

## Workflow

1. Understand the request and confirm scope
2. Execute the canonical workflow for this skill
3. Report results and next steps

For full details, examples, edge cases, and reference material, read `references/summary.md`.
