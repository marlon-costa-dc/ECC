3. If systematic patterns emerge, apply targeted fixes to the entire batch
4. Re-sample and re-verify the fixed batch
5. Continue until a clean sample passes

```python
import random

def santa_batch(items, rubric, sample_rate=0.15):
    sample = random.sample(items, max(5, int(len(items) * sample_rate)))

for item in sample:
        result = santa_full(item, rubric)
        if result.verdict == "NAUGHTY":
            pattern = classify_failure(result.issues)
            items = batch_fix(items, pattern)  # Fix all items matching pattern
            return santa_batch(items, rubric)   # Re-sample

return items  # Clean sample → ship batch
```

## Failure Modes and Mitigations

| Failure Mode | Symptom | Mitigation |
|-------------|---------|------------|
| Infinite loop | Reviewers keep finding new issues after fixes | Max iteration cap (3). Escalate. |
| Rubber stamping | Both reviewers pass everything | Adversarial prompt: "Your job is to find problems, not approve." |
| Subjective drift | Reviewers flag style preferences, not errors | Tight rubric with objective pass/fail criteria only |
| Fix regression | Fixing issue A introduces issue B | Fresh reviewers each round catch regressions |
| Reviewer agreement bias | Both reviewers miss the same thing | Mitigated by independence, not eliminated. For critical output, add a third reviewer or human spot-check. |
| Cost explosion | Too many iterations on large outputs | Batch sampling pattern. Budget caps per verification cycle. |

## Integration with Other Skills

---

Continue in `summary-2.md`.
