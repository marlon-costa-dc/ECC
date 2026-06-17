---
name: eval-harness
description: Use when defining, running, or reporting Claude Code evals with pass@k metrics, task variants, and reproducible evaluation criteria as part of eval-driven development.
allowed-tools: Read, Write, Edit, Bash, Grep, Glob
---

# eval-harness

## When to use
- Setting up eval-driven development (EDD) for AI-assisted workflows
- Defining pass/fail criteria before implementation
- Measuring reliability with pass@k metrics
- Creating regression suites for prompt or agent changes
- Benchmarking agent performance across model versions

## What to do
1. **Define evals before coding** — create `.claude/evals/<feature>.md` with capability criteria, regression criteria, and target metrics (e.g., pass@3 > 90%).
2. **Implement** — write code to satisfy the defined evals.
3. **Evaluate** — run evals with code-based, model-based, or human graders; record PASS/FAIL and attempts.
4. **Report** — emit a concise eval report with per-eval results, pass@k / pass^k metrics, and a status decision.

## Critical rules
- Define expected behavior before implementation; never retrofit evals to match output.
- Prefer deterministic code-based graders over model-based or human graders.
- Version eval definitions with the code they validate.
- Run regression evals after every meaningful change.
- Never fully automate security or safety checks; flag them for human review.
- Keep evals fast enough to run frequently.

## Example
```markdown
## EVAL: add-authentication

Capability:
- [ ] User can register and login
- [ ] Invalid credentials rejected
- [ ] Sessions persist across reloads

Regression:
- [ ] Public routes still accessible
- [ ] API responses unchanged

Metrics: pass@3 ≥ 90%, pass^3 = 100%

### Report
Capability: 3/3 passed (pass@3: 100%)
Regression: 2/2 passed (pass^3: 100%)
Status: SHIP IT
```
