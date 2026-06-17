---
name: mle-workflow
description: Use when building, reviewing, or hardening production machine-learning pipelines covering data contracts, training, evaluation, deployment, monitoring, and rollback.
allowed-tools: Read, Write, Edit, Bash, Grep, Glob
---

# mle-workflow

## When to use
- Building, reviewing, or hardening production ML systems beyond notebooks.
- Designing prediction/data contracts, eval gates, serving paths, or rollback plans.
- Converting experiments into reproducible training/inference pipelines.
- Debugging data drift, label leakage, stale features, or train/serve mismatch.

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
- Compare against baseline and current production, not just offline metrics.
- Prediction logs must include model version and avoid PII.
- Every deployment needs a named rollback artifact and traffic-switch mechanism.

## Example
```python
PROMOTION_GATES = {
    "auc": ("min", 0.82),
    "calibration_error": ("max", 0.04),
    "p95_latency_ms": ("max", 80),
}

def assert_promotion_ready(metrics: dict[str, float]) -> None:
    failures = {
        name: metrics[name]
        for name, (direction, threshold) in PROMOTION_GATES.items()
        if (direction == "min" and metrics[name] < threshold)
        or (direction == "max" and metrics[name] > threshold)
    }
    if failures:
        raise ValueError(f"Model failed promotion gates: {failures}")
```
