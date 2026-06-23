---
name: orch-build-mvp
description: Orchestrate bootstrapping a working MVP from a design or spec document
  — ingest the doc, plan thin vertical slices, scaffold the first end-to-end slice,
  then TDD-implement, review, and gated commit. Use to turn an SDD/PRD into a running
  starting point.
origin: ECC
---

# orch-build-mvp

Actor · action · target: **orch · build · mvp**. Thin wrapper over the shared engine in [`orch-pipeline`](../orch-pipeline/SKILL.md).

## When to Use

- The user has a **design / spec document** (SDD, PRD, system_design) and wants a
- Takes a doc path as its argument, e.g. civicpulse/docs/SDD-v0.6.md.

## Workflow

1. Run the orch-pipeline engine with the settings above.
2. **Reuse the existing GAN harness** instead of hand-rolling an iterate loop:
3. Translate the SDD into gan-harness/spec.md + gan-harness/eval-rubric.md
4. Drive the build with /gan-build "<one-line brief>" --skip-planner
5. That command runs the gan-generator → gan-evaluator loop and writes
6. Stop at **Gate 1** (slice plan) and **Gate 2** (pre-commit). Commit the

For full details, examples, edge cases, and reference material, read `references/summary.md`.
