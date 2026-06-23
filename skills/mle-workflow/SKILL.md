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
Use only the lanes that fit the system in front of you. Do not assume every model has supervised labels. Do not add heavyweight MLOps machinery before the product risk justifies it. Replace metrics, serving mode, data stores, and rollout mechanics with project-native equivalents.

## Core Workflow

1. **Prediction contract**: target, owner, schema, latency, serving mode, fallback, human override, privacy/retention/audit.
2. **Data contract**: entity grain, label/feature timestamps, point-in-time joins, split policy, columns, PII rules, snapshot/version.
3. **Reproducible pipeline**: typed config, pinned dependencies, seeds, recorded hashes, shared preprocessing, idempotent steps.
4. **Evaluation before promotion**: baseline comparison, primary metric, guardrails, slice metrics, confidence intervals, "do not ship" thresholds.
5. **Package for serving**: versioned artifact, schema validation, timeout/batching, resource limits, fallback, PII-safe logs, equivalence tests.
6. **Operate the model**: system health, feature drift, prediction drift, label arrival, KPI guardrails, rollback plan.

## Task Simulations

| ID | Common MLE task | ECC path | Output | Pipeline lanes covered |
|----|-----------------|----------|--------|------------------------|
| MLE-01 | Frame an ambiguous prediction, ranking, recommender, classifier, embedding, or forecast capability | `product-capability`, `plan`, `architecture-decision-records`, `mle-workflow` | Iteration Compact naming who cares, Decision owner, metric, Unacceptable mistakes, assumptions, and first experiment | product contract, stakeholder loss, risk, rollout |
| MLE-02 | Define metric goals, labels, data sources, and the mistake budget | `repo-scan`, `database-reviewer`, `database-migrations`, `postgres-patterns`, `clickhouse-io` | Data contract with entity grain, label timing, label confidence, feature timing, point-in-time joins, split policy, and snapshot | data contract, metric design, leakage, reproducibility |
| MLE-03 | Build a baseline model and scoring path before adding complexity | `tdd-workflow`, `python-testing`, `python-patterns`, `code-reviewer` | Baseline scorer with confusion matrix, calibration, latency, cost, weaknesses, and determinism tests | baseline, scoring, testing, serving parity |
| MLE-04 | Generate features from outcome-separating hypotheses | `python-patterns`, `pytorch-patterns`, `docker-patterns`, `deployment-patterns` | Feature plan covering signal source, missing values, outliers, correlated features, leakage checks, and train/serve equivalence | feature pipeline, leakage, training, artifacts |
| MLE-05 | Tune thresholds, configs, and model complexity under tradeoffs | `eval-harness`, `ai-regression-testing`, `quality-gate`, `test-coverage` | Report comparing precision, recall, F1, AUC, calibration, slices, latency, cost, and error classes | evaluation, threshold, promotion, regression |
| MLE-06 | Run error analysis and turn mistakes into the next experiment | `eval-harness`, `ai-regression-testing`, `mle-reviewer`, `silent-failure-hunter` | Error clusters for false positives, false negatives, labels, stale features, missing signals, and bug trace lessons | error analysis, bug trace, iteration, regression |
| MLE-07 | Package a model artifact for batch or online inference | `api-design`, `backend-patterns`, `security-review`, `security-scan` | Artifact bundle with preprocessing, config, dependencies, schema validation, safe loading, and PII-safe logs | artifact, security, inference contract |
| MLE-08 | Ship online serving or batch scoring with feedback capture | `api-design`, `backend-patterns`, `e2e-testing`, `browser-qa`, `accessibility` | Endpoint or batch job with envelope, timeout, batching, fallback, version, confidence, feedback, and product-flow tests | serving, batch inference, fallback, user workflow |
| MLE-09 | Roll out with shadow traffic, canary, A/B test, or rollback | `canary-watch`, `dashboard-builder`, `verification-loop`, `performance-optimizer` | Rollout plan with split, dashboards, p95 latency, cost, quality guardrails, rollback artifact, and trigger | deployment, canary, rollback |
| MLE-10 | Operate, debug, and refresh a production model after launch | `silent-failure-hunter`, `dashboard-builder`, `mle-reviewer`, `doc-updater`, `github-ops` | Observation Ledger and refresh plan with drift, delayed labels, alert owners, runbooks, retraining, and PR evidence | monitoring, incident response, retraining |

## SWE Surface Reuse

Reuse `product-capability`, `architecture-decision-records`, `repo-scan`, `database-reviewer`, `tdd-workflow`, `python-testing`, `python-patterns`, `pytorch-patterns`, `docker-patterns`, `deployment-patterns`, `eval-harness`, `quality-gate`, `api-design`, `security-review`, `e2e-testing`, `browser-qa`, `build-fix`, `pr-test-analyzer`, `canary-watch`, `dashboard-builder`, `verification-loop`, `performance-optimizer`, `silent-failure-hunter`, `doc-updater`, `github-ops`, `cost-aware-llm-pipeline`, `token-budget-advisor`, `documentation-lookup`, `search-first`, `git-workflow`, `opensource-pipeline`, `strategic-compact`, and `dmux-workflows` before creating parallel MLE-only process.

## Judgment Primitives

Use an Iteration Compact with Who cares, Decision owner, Mistake budget, Unacceptable mistakes, Acceptable mistakes, and Next iteration. Use the Decision Brain to score `(probability, confidence) x (cost, severity, importance, impact)` while considering adversarial behavior and selective disclosure. Metric and Mistake Economics starts with a confusion matrix, false positives, false negatives, precision, recall, F1, AUC, latency, and cost. Data and Feature Hypotheses cover label confidence, class imbalance, missing values, outliers, and correlated features. The Error Analysis Loop feeds an Observation Ledger with Lesson captured and Regression added.

## Promotion Gate Example

```python
PROMOTION_GATES = {"auc": ("min", 0.82), "calibration_error": ("max", 0.04)}


def assert_promotion_ready(metrics: dict[str, float]) -> None:
    missing = sorted(name for name in PROMOTION_GATES if name not in metrics)
    if missing:
        raise ValueError(f"Model promotion metrics missing required gates: {missing}")
```

## References

- [references/swe-surface.md](references/swe-surface.md) — ECC SWE skills mapped to MLE use cases
- [references/task-simulations.md](references/task-simulations.md) — ten common MLE tasks and ECC paths
- [references/workflow-guide.md](references/workflow-guide.md) — related skills, iteration compact, decision brain, metric economics, feature hypotheses, error analysis, observation ledger, checklist, anti-patterns, and code snippets
