# Review Checklist and Anti-Patterns

## Review Checklist

- [ ] Prediction contract is explicit and testable
- [ ] Data contract defines entity grain, label timing, feature timing, and snapshot/version
- [ ] Leakage risks were checked against prediction-time availability
- [ ] Training is reproducible from code, config, data version, and seed
- [ ] Metrics compare against baseline and current production model
- [ ] Slice metrics and guardrails are included for high-risk cohorts
- [ ] Promotion gates are automated and fail closed
- [ ] Training and serving transformations are shared or equivalence-tested
- [ ] Model artifact carries version, config, dataset reference, and preprocessing
- [ ] Serving path validates inputs and has timeout, fallback, and rollback behavior
- [ ] Monitoring covers system health, feature drift, prediction drift, and delayed labels
- [ ] Sensitive data is excluded from artifacts, logs, prompts, and examples

## Anti-Patterns

- Notebook state is required to reproduce the model
- Random split leaks future data into validation or test sets
- Feature joins ignore event time and label availability
- Offline metric improves while important slices regress
- Thresholds are tuned on the test set repeatedly
- Training preprocessing is copied manually into serving code
- Model version is missing from prediction logs
- Monitoring only checks service uptime, not data or prediction quality
- Rollback requires retraining instead of switching to a known-good artifact

## Output Expectations

When using this skill, return concrete artifacts: data contract, promotion gates, pipeline steps, test plan, deployment plan, or review findings. Call out unknowns that block production readiness instead of filling them with assumptions.
