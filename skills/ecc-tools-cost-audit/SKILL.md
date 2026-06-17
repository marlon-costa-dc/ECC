---
name: ecc-tools-cost-audit
description: Evidence-first ECC Tools burn and billing audit workflow. Use when investigating
  runaway PR creation, quota bypass, premium-model leakage, duplicate jobs, or GitHub
  App cost spikes in the ECC Tools repo.
origin: ECC
---

# ECC Tools Cost Audit

Use this skill when the user suspects the ECC Tools GitHub App is burning cost, over-creating PRs, bypassing usage limits, or routing free users into premium analysis paths.

## When to Use

- user says ECC Tools burn rate, PR recursion, over-created PRs, usage-limit bypass, or premium-model leakage
- the task is in the sibling ECC-Tools repo and depends on webhook handlers, queue workers, usage reservation, PR creation logic, or paid-gate enforcement
- a customer report says the app created too many PRs, billed incorrectly, or analyzed code without producing a usable result

## Workflow

1. Understand the request and confirm scope
2. Execute the canonical workflow for this skill
3. Report results and next steps

For full details, examples, edge cases, and reference material, read `references/summary.md`.
