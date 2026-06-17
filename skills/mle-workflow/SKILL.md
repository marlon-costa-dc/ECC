---
name: mle-workflow
description: Use when building, reviewing, or hardening production machine-learning systems beyond one-off notebooks, covering data contracts, training, evaluation, deployment, monitoring, and rollback.
origin: ECC
---

# Machine Learning Engineering Workflow

## When to Activate

- Planning or reviewing a production ML feature, model refresh, ranking system, recommender, classifier, embedding workflow, or forecasting pipeline
- Converting notebook code into reusable training, evaluation, batch inference, or online inference pipelines
- Designing model promotion criteria, offline/online evals, experiment tracking, or rollback paths
- Debugging failures caused by data drift, label leakage, stale features, artifact mismatch, or inconsistent training/serving logic

## Scope Calibration

Use only lanes that fit the system. Do not assume labels, online serving, feature stores, GPUs, or A/B tests exist. Do make assumptions explicit; treat examples as scaffolds to replace with project-native equivalents.

## Core Workflow

1. **Prediction contract**: target, owner, schema, latency, serving mode, fallback, human override, privacy/retention/audit.
2. **Data contract**: entity grain, label/feature timestamps, point-in-time joins, split policy, columns, PII rules, snapshot/version.
3. **Reproducible pipeline**: typed config, pinned dependencies, seeds, recorded hashes, shared preprocessing, idempotent steps.
4. **Evaluation before promotion**: baseline comparison, primary metric, guardrails, slice metrics, confidence intervals, "do not ship" thresholds.
5. **Package for serving**: versioned artifact, schema validation, timeout/batching, resource limits, fallback, PII-safe logs, equivalence tests.
6. **Operate the model**: system health, feature drift, prediction drift, label arrival, KPI guardrails, rollback plan.

## References

- [references/swe-surface.md](references/swe-surface.md) — ECC SWE skills mapped to MLE use cases
- [references/task-simulations.md](references/task-simulations.md) — ten common MLE tasks and ECC paths
- [references/workflow-guide.md](references/workflow-guide.md) — related skills, iteration compact, decision brain, metric economics, feature hypotheses, error analysis, observation ledger, checklist, anti-patterns, and code snippets
