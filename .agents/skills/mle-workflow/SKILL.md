---
name: mle-workflow
description: 'Use this skill to use when building, reviewing, or hardening production
  machine-learning pipelines covering data contracts, training, evaluation, deployment,
  monitoring, and rollback. DO NOT USE FOR: questions unrelated to mle-workflow creating
  projects or architecture from scratch'
license: MIT
metadata:
  version: 1.0.0
allowed-tools: Read, Write, Edit, Bash, Grep, Glob
---
# mle-workflow

**UTILITY SKILL**

## When to use
## What to do
1. **Define prediction contract** — target, owner, schema, latency, serving mode, fallback, human override.
2. **Lock data contract** — entity grain, feature timing, point-in-time joins, splits, ranges, snapshot/version.
3. **Build reproducible pipeline** — typed config, pinned deps, seeds, recorded hashes, shared transforms.
4. **Evaluate before promotion** — baseline + production comparison, primary/guardrail/slice metrics, gates.
5. **Package for serving** — versioned artifact with preprocessing, schema validation, timeouts, fallback, limits.
6. **Operate the model** — health, drift, delayed labels, dashboards, rollback plan.

## Critical rules
- Guard against leakage first; reject features unavailable at prediction time.
- Never let train/serve feature code diverge without equivalence tests.
- Promotion gates must be declared before training and fail closed.

## Example
**Input:** a request.
**Output:** a concise response.

## USE FOR

- Requests about mle workflow.
- Workflows described in this skill.
- Operator tasks within this scope.

## DO NOT USE FOR

- questions unrelated to mle-workflow.
- creating projects or architecture from scratch.

## Workflow

1. **Understand** intent and constraints.
2. **Execute** the canonical approach.
3. **Validate** with native checks.

## Troubleshooting

- Unclear scope → ask.
- Missing context → state assumptions.
