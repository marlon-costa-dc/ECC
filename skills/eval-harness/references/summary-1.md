### Phase 1: Define (10 min)
Capability Evals:
- [ ] User can register with email/password
- [ ] User can login with valid credentials
- [ ] Invalid credentials rejected with proper error
- [ ] Sessions persist across page reloads
- [ ] Logout clears session

Regression Evals:
- [ ] Public routes still accessible
- [ ] API responses unchanged
- [ ] Database schema compatible

### Phase 2: Implement (varies)
[Write code]

### Phase 3: Evaluate
Run: /eval check add-authentication

### Phase 4: Report
EVAL REPORT: add-authentication
==============================
Capability: 5/5 passed (pass@3: 100%)
Regression: 3/3 passed (pass^3: 100%)
Status: SHIP IT
```

## Product Evals (v1.8)

Use product evals when behavior quality cannot be captured by unit tests alone.

### Grader Types

1. Code grader (deterministic assertions)
2. Rule grader (regex/schema constraints)
3. Model grader (LLM-as-judge rubric)
4. Human grader (manual adjudication for ambiguous outputs)

### pass@k Guidance

- `pass@1`: direct reliability
- `pass@3`: practical reliability under controlled retries
- `pass^3`: stability test (all 3 runs must pass)

Recommended thresholds:
- Capability evals: pass@3 >= 0.90
- Regression evals: pass^3 = 1.00 for release-critical paths

### Eval Anti-Patterns

- Overfitting prompts to known eval examples
- Measuring only happy-path outputs
- Ignoring cost and latency drift while chasing pass rates
- Allowing flaky graders in release gates

### Minimal Eval Artifact Layout

- `.claude/evals/<feature>.md` definition
- `.claude/evals/<feature>.log` run history
- `docs/releases/<version>/eval-summary.md` release snapshot
