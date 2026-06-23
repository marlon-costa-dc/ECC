# Extended guidance


Gather what you'll evaluate:

```
- The original user request (read back from conversation)
- Your final response/output (the deliverable)
- Any tool outputs that verify correctness (test results, exit codes, lint output)
- Any user feedback received during the task (corrections, "try again", "that's not right")
```

### Step 2: Score Each Axis Independently

Work through the 5 axes one at a time. For each:

1. Read the axis question
2. Find evidence (or lack of evidence) in the output
3. Assign a score 1-5
4. If score < 5, write a one-sentence improvement note citing the gap

Do NOT average the scores in your head first and then work backwards. Score each axis fresh.

### Step 3: Produce the Evaluation Report

Use the template from `templates/evaluation-report.md`. The report must include:

```
- One-line summary
- 5-axis scorecard (score + evidence per axis)
- Overall score (simple average, rounded to 1 decimal)
- 1-3 specific improvements ranked by impact
- Self-check: "Would the user agree with this assessment?"
```

### Step 4: Apply the Improvement

If any axis scored 3 or below:

1. State what you would do differently
2. If the gap is fixable in < 30 seconds (missing link, unclear phrasing), fix it now
3. If the gap requires rework, flag it explicitly: "This axis scored [reason] because [evidence]. Re-running with [specific fix] would likely raise it to [score]."

## Code Examples

### Example: Good Evaluation (Score 4+)

```
Task: Add retry logic to HTTP client

Scorecard:
  Accuracy:    5 — All API calls correct. Verified: retries use
                  exponential backoff. No hallucinated methods.
  Completeness: 4 — Covered happy path + 3 error cases. Missing:
                  timeout handling for hung connections.
  Clarity:      5 — Code comments explain backoff formula.
                  PR description links to incident that motivated this.
  Actionability:5 — Single merge. No follow-up tasks. Tests pass.
  Conciseness:  4 — 47 lines total. The retry loop could be extracted
                  into a helper to drop ~8 lines.

Overall: 4.6 — One gap (timeout handling). Fix before merging.
```

### Example: Weak Evaluation (Score 2-3)

```
Task: Add retry logic to HTTP client

Scorecard:
  Accuracy:    2 — Used urllib3 which doesn't match our
                  httpx-based codebase. Wrong library.
  Completeness: 3 — Works for GET. POST/PUT not handled (user
                  said "all HTTP requests").
  Clarity:      4 — Code is readable. Good variable names.
  Actionability:2 — "Add tests" mentioned but no test file created.
                  User has to write tests before merging.
  Conciseness:  3 — 120 lines. The retry config is duplicated in
                  3 places instead of one shared RetryConfig object.

Overall: 2.8 — Wrong library used. Needs httpx rewrite.
  Fix accuracy first (switch to httpx), then extend to all
  HTTP methods, then consolidate config.
```

## Anti-Patterns

### "Everything is a 5"

```
FAIL: Accuracy:    5 — All good.
   Completeness: 5 — Everything covered.
   Clarity:      5 — Clear.
```

No evidence cited. This is self-congratulation, not evaluation. A real 5 requires proving there's nothing to improve.

### Over-penalizing for scope creep

```
FAIL: Completeness: 2 — Didn't handle WebSocket connections or
   gRPC streaming (user didn't ask for these)
```

Only evaluate against what the user actually requested, not what you could have additionally built.

### Using the evaluation to re-litigate

```

> Continued in [`summary-2.md`](summary-2.md)
