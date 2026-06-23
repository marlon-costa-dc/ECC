### 1. Single score vs multi-action prediction

- **Single score**: train one model to predict relevance. To change behavior → retrain.
- **Multi-action**: predict `P(action)` for many actions (read, like, share, skip, report), combine with weights at serving time. To change behavior → change weights. No retraining.

The X For You system uses multi-action with both positive and negative weights. Recommend multi-action when the user expects to tune frequently.

### 2. Candidate isolation in scoring

- **Isolated**: each candidate scored independently. Deterministic, cacheable.
- **Joint**: candidates attend to each other during scoring (e.g., transformer over batch). More expressive but non-deterministic across batches.

---

For additional details, continue reading `summary-1.md`.
