# Core Workflow Details

## 1. Define the Prediction Contract

Capture the product-level contract first:

- Prediction target and decision owner
- Input entity, output schema, confidence/calibration fields, allowed latency
- Batch, online, streaming, or hybrid serving mode
- Fallback when the model, feature store, or dependency is unavailable
- Human review or override path for high-impact decisions
- Privacy, retention, and audit requirements

Tie the model to an observable product behavior and a measurable acceptance gate.

## 2. Lock the Data Contract

Explicit data contract:

- Entity grain and primary key
- Label definition, timestamp, and availability delay
- Feature timestamp, freshness SLA, and point-in-time join rules
- Train, validation, test, and backtest split policy
- Required columns, allowed nulls, ranges, categories, units
- PII or sensitive fields that must not enter training artifacts or logs
- Dataset version or snapshot ID for reproducibility

Guard against leakage. If a feature is not available at prediction time, remove it or move it to an analysis-only path.

## 3. Build a Reproducible Pipeline

Reproducibility requirements:

- Typed config or dataclasses for hyperparameters and paths
- Pinned package and model dependencies
- Random seeds and documented nondeterministic GPU behavior
- Recorded dataset version, code SHA, config hash, metrics, artifact URI
- Preprocessing saved with the model artifact
- Shared train/eval/inference transformations from one source
- Idempotent steps so retries do not corrupt artifacts

Prefer immutable values and pure functions. Avoid mutating shared data frames or global config.

```python
import hashlib
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class TrainingConfig:
    dataset_uri: str
    model_dir: Path
    seed: int
    learning_rate: float
    batch_size: int


def artifact_name(config: TrainingConfig, code_sha: str) -> str:
    key = f"{config.dataset_uri}:{config.seed}:{config.learning_rate}:{config.batch_size}"
    config_hash = hashlib.sha256(key.encode("utf-8")).hexdigest()[:12]
    return f"{code_sha[:12]}-{config_hash}"
```

## 4. Evaluate Before Promotion

Promotion criteria (declared before training finishes):

- Baseline and current production model comparison
- Primary metric aligned to product behavior
- Guardrail metrics for latency, calibration, fairness slices, cost, error concentration
- Slice metrics for important cohorts
- Confidence intervals or repeated-run variance
- Human-reviewed failure examples for high-impact models
- Explicit "do not ship" thresholds

```python
PROMOTION_GATES = {
    "auc": ("min", 0.82),
    "calibration_error": ("max", 0.04),
    "p95_latency_ms": ("max", 80),
}


def assert_promotion_ready(metrics: dict[str, float]) -> None:
    missing = [n for n in PROMOTION_GATES if n not in metrics]
    if missing:
        raise ValueError(f"Missing required gates: {missing}")

    failures = {
        name: value
        for name, (direction, threshold) in PROMOTION_GATES.items()
        if (direction == "min" and metrics[name] < threshold)
        or (direction == "max" and metrics[name] > threshold)
    }
    if failures:
        raise ValueError(f"Failed promotion gates: {failures}")
```

Use offline metrics as gates, not guarantees. When the model changes product behavior, plan shadow evaluation, canary rollout, or A/B testing before full rollout.

## 5. Package for Serving

Serving contract requirements:

- Artifact includes version, training data reference, config, preprocessing
- Input schema rejects invalid, stale, or out-of-range features
- Output schema includes model version and confidence/explanation fields
- Serving path has timeout, batching, resource limits, fallback
- Explicit and tested CPU/GPU requirements
- Prediction logs avoid PII and include debug/label-join identifiers
- Integration tests cover missing/stale features, bad types, empty batches, fallback

Never let training-only feature code diverge from serving code without an equivalence test.

## 6. Operate the Model

Monitoring signals:

- Availability, error rate, timeout rate, queue depth, p50/p95/p99 latency
- Feature null rate, range drift, categorical drift, freshness drift
- Prediction distribution drift and confidence distribution drift
- Label arrival health and delayed quality metrics
- Business KPI guardrails and rollback triggers
- Per-version dashboards for canaries and rollbacks

Every deployment needs a rollback plan naming the previous artifact, config, data dependency, and traffic-switch mechanism.
