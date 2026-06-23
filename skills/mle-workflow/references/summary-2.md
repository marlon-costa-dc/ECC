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

- [references/swe-surface.md](swe-surface.md) — ECC SWE skills mapped to MLE use cases
- [references/task-simulations.md](task-simulations.md) — ten common MLE tasks and ECC paths
- [references/workflow-guide.md](workflow-guide.md) — related skills, iteration compact, decision brain, metric economics, feature hypotheses, error analysis, observation ledger, checklist, anti-patterns, and code snippets
