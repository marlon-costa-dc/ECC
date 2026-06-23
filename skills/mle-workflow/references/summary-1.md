# Extended guidance


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

> Continued in [`summary-2.md`](summary-2.md)
