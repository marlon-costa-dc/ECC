# MLE Workflow Guide

## Related Skills

- `python-patterns` and `python-testing` for Python implementation and pytest coverage
- `pytorch-patterns` for deep learning models, data loaders, device handling, and training loops
- `eval-harness` and `ai-regression-testing` for promotion gates and agent-assisted regression checks
- `database-migrations`, `postgres-patterns`, and `clickhouse-io` for data storage and analytics surfaces
- `deployment-patterns`, `docker-patterns`, and `security-review` for serving, secrets, containers, and production hardening

## Iteration Compact

Before touching model code, compress the work into one reviewable artifact:

```text
Goal:
Who cares:
Decision owner:
User or system action changed by the model:
Success metric:
Guardrail metrics:
Mistake budget:
Unacceptable mistakes:
Acceptable mistakes:
Assumptions:
Constraints:
Labels and data snapshot:
Baseline:
Candidate signals:
Threshold or config plan:
Eval slices:
Known risks:
Next experiment:
Rollback or fallback:
```

## Decision Brain

Use this loop whenever the task is ambiguous, high-impact, or metric-heavy:

1. Start from the decision, not the model. Name the action that changes downstream behavior.
2. Name who cares and why. Stakeholders pay different costs for false positives, false negatives, latency, compute spend, opacity, or missed opportunities.
3. Convert ambiguity into hypotheses. Ask what signal would separate outcomes, what evidence would disprove it, and what simple baseline should be hard to beat.
4. Research prior art or a nearby known problem before inventing a bespoke system.
5. Score choices with `(probability, confidence) x (cost, severity, importance, impact)`.
6. Consider adversarial behavior, incentives, selective disclosure, distribution shift, and feedback loops.
7. Prefer the simplest change that reduces the most important mistake.
8. Capture the decision, evidence, counterargument, and next reversible step.

## Metric and Mistake Economics

Choose metrics from failure costs, not habit:

- Use a confusion matrix early so the team can discuss concrete false positives and false negatives.
- Favor precision when incorrect positive decisions dominate; favor recall when missed positives dominate.
- Use F1 only when precision/recall tradeoff is balanced and explainable.
- Use AUC or ranking metrics when ordering matters more than a threshold.
- Track latency, throughput, memory, and cost as first-class metrics.
- Compare against a baseline and the current production model before celebrating an offline gain.
- Treat real-world feedback as delayed labels with bias, lag, and coverage gaps.

## Data and Feature Hypotheses

Features should come from a theory of separation:

- Candidate signal families include text, categorical fields, numeric histories, graph relationships, recency, frequency, and aggregates.
- For every feature family, state why it should separate outcomes and how it could leak future information.
- For noisy labels, consider adjudication, label confidence, soft targets, or confidence weighting.
- For class imbalance, compare weighted loss, resampling, threshold movement, and calibrated rules.
- For missing values, decide whether absence is informative, imputable, or a reason to abstain.
- For outliers, decide whether to clip, bucket, investigate, or preserve them as rare signal.
- For correlated features, check whether they are redundant, unstable, or proxies for future state.

## Error Analysis Loop

After each baseline, training run, threshold change, or config change:

1. Split mistakes into false positives, false negatives, abstentions, low-confidence cases, and system failures.
2. Cluster errors by shared traits: language, entity type, source, time, geography, device, sparsity, recency, feature freshness, label source, or model version.
3. Separate model mistakes from data bugs, label ambiguity, product ambiguity, instrumentation gaps, and serving mismatches.
4. Trace each major cluster to one of four moves: better labels, better features, better threshold/config, or better product fallback.
5. Preserve every important mistake as a regression test, eval slice, dashboard panel, or runbook entry.
6. Write the next iteration as a falsifiable experiment, not a vague "improve model" task.

## Observation Ledger

Keep a compact decision and evidence trail:

```text
Iteration:
Change:
Why this mattered:
Metric movement:
Slice movement:
False positives:
False negatives:
Unexpected errors:
Decision:
Tradeoff accepted:
Lesson captured:
Regression added:
Debt created:
Next iteration:
```
