---
name: plan-orchestrate
description: Read a plan document, decompose it into steps, design a per-step agent
  chain from the ECC catalogue, and emit ready-to-paste /orchestrate custom prompts.
  Generative only — never invokes /orchestrate itself. Use when the user has a multi-step
  plan and wants...
origin: ECC
---

# Plan Orchestrate

Bridge a plan document to `/orchestrate custom` by emitting one ready-to-paste invocation per step. The skill is generative only — it never executes `/orchestrate`. The user pastes each line when ready.

> Trabalho multi-passo/paralelo coordena por beads (bd) como SSOT: reivindicar bead in_progress antes de edição não-trivial, nunca reverter trabalho de outro agente (AGENTS.md §12 / openclaw ADR-0001).

## When to Use

- User has a multi-step plan document (PRD, RFC, implementation plan) and wants to drive it through /orchestrate.
- User says "orchestrate this plan", "give me orchestrate prompts for each step", "compose chains for this plan".
- A step-by-step plan exists but the user does not want to manually pick agents per step.
- The work is one ad-hoc step → call /orchestrate custom directly.
- The plan is unreadable or empty. Lack of explicit numbering alone is not a skip condition — see the "No clear steps" edge case below.

## Workflow

1. Understand the request and confirm scope
2. Execute the canonical workflow for this skill
3. Report results and next steps

For full details, examples, edge cases, and reference material, read `references/summary.md`.
