---
name: orch-pipeline
description: Shared orchestration engine for the orch-* skill family. Defines the
  gated Research-Plan-TDD-Review-Commit pipeline, the size classifier, the agent map,
  and the two human gates that the orch-* operation skills delegate to. Not usually
  invoked directly.
origin: ECC
---

# Orchestrator Pipeline (shared engine)

The `orch-*` skills are thin wrappers. They do not re-implement any work — they classify the request, choose which phases of *this* pipeline run, and delegate each phase to an existing ECC agent or command. This file is that pipeline.

## When to Use

- Loaded indirectly whenever an orch-* operation skill runs.
- Read directly only when adding a new operation to the family or tuning the

## Workflow

1. Understand the request and confirm scope
2. Execute the canonical workflow for this skill
3. Report results and next steps

For full details, examples, edge cases, and reference material, read `references/summary.md`.
