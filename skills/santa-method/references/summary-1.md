**Content/Marketing:**
- Brand voice adherence
- SEO requirements met (keyword density, meta tags, structure)
- No competitor trademark misuse
- CTA present and correctly linked

**Code:**
- Type safety (no `any` leaks, proper null handling)
- Error handling coverage
- Security (no secrets in code, input validation, injection prevention)
- Test coverage for new paths

**Compliance-Sensitive (regulated, legal, financial):**
- No outcome guarantees or unsubstantiated claims
- Required disclaimers present
- Approved terminology only
- Jurisdiction-appropriate language

### Phase 3: Naughty or Nice (Verdict Gate)

```python
def santa_verdict(review_b, review_c):
    """Both reviewers must pass. No partial credit."""
    if review_b.verdict == "PASS" and review_c.verdict == "PASS":
        return "NICE"  # Ship it

# Merge flags from both reviewers, deduplicate
    all_issues = dedupe(review_b.critical_issues + review_c.critical_issues)
    all_suggestions = dedupe(review_b.suggestions + review_c.suggestions)

return "NAUGHTY", all_issues, all_suggestions
```

Why both must pass: if only one reviewer catches an issue, that issue is real. The other reviewer's blind spot is exactly the failure mode Santa Method exists to eliminate.

### Phase 4: Fix Until Nice (Convergence Loop)

```python
MAX_ITERATIONS = 3

for iteration in range(MAX_ITERATIONS):
    verdict, issues, suggestions = santa_verdict(review_b, review_c)

if verdict == "NICE":
        log_santa_result(output, iteration, "passed")
        return ship(output)

# Fix all critical issues (suggestions are optional)
    output = fix_agent.execute(
        output=output,
        issues=issues,
        instruction="Fix ONLY the flagged issues. Do not refactor or add unrequested changes."
    )

# Re-run BOTH reviewers on fixed output (fresh agents, no memory of previous round)
    review_b = Agent(prompt=REVIEWER_PROMPT.format(output=output, ...))
    review_c = Agent(prompt=REVIEWER_PROMPT.format(output=output, ...))

# Exhausted iterations — escalate
log_santa_result(output, MAX_ITERATIONS, "escalated")
escalate_to_human(output, issues)
```

Critical: each review round uses **fresh agents**. Reviewers must not carry memory from previous rounds, as prior context creates anchoring bias.

## Implementation Patterns

### Pattern A: Claude Code Subagents (Recommended)

Subagents provide true context isolation. Each reviewer is a separate process with no shared state.

```bash
# In a Claude Code session, use the Agent tool to spawn reviewers
# Both agents run in parallel for speed
```

```python
# Pseudocode for Agent tool invocation
reviewer_b = Agent(
    description="Santa Review B",
    prompt=f"Review this output for quality...\n\nRUBRIC:\n{rubric}\n\nOUTPUT:\n{output}"
)
reviewer_c = Agent(
    description="Santa Review C",
    prompt=f"Review this output for quality...\n\nRUBRIC:\n{rubric}\n\nOUTPUT:\n{output}"
)
```

### Pattern B: Sequential Inline (Fallback)

When subagents aren't available, simulate isolation with explicit context resets:

1. Generate output
2. New context: "You are Reviewer 1. Evaluate ONLY against this rubric. Find problems."
3. Record findings verbatim
4. Clear context completely
5. New context: "You are Reviewer 2. Evaluate ONLY against this rubric. Find problems."
6. Compare both reviews, fix, repeat

The subagent pattern is strictly superior — inline simulation risks context bleed between reviewers.

### Pattern C: Batch Sampling

For large batches (100+ items), full Santa on every item is cost-prohibitive. Use stratified sampling:

1. Run Santa on a random sample (10-15% of batch, minimum 5 items)
2. Categorize failures by type (hallucination, compliance, completeness, etc.)

> Continued in [`summary-2.md`](summary-2.md)
