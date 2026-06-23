Evidence: parallel-subagent-batch-merge, llm-social-agent-anti-pattern, llm-memory-trust-boundary
Violation risk: Format drift, type mismatch, or syntax errors in LLM output crash downstream processing
Draft:
  ## LLM Output Validation
  Normalize, type-check, and sanitize LLM output before reuse...
  See skill: parallel-subagent-batch-merge, llm-memory-trust-boundary

[... details for candidates 2-4 ...]

Approve, modify, or skip each candidate by number:
> User: Approve 1, 3. Skip 2, 4.

✓ Applied: coding-style.md §LLM Output Validation
✓ Applied: performance.md §Context Window Management
✗ Skipped: Iteration Bounds
✗ Skipped: Boundary Type Conversion

Results saved to results.json
```

## Design Principles

- **What, not How**: Extract principles (rules territory) only. Code examples and commands stay in skills.
- **Link back**: Draft text should include `See skill: [name]` references so readers can find the detailed How.
- **Deterministic collection, LLM judgment**: Scripts guarantee exhaustiveness; the LLM guarantees contextual understanding.
- **Anti-abstraction safeguard**: The 3-layer filter (2+ skills evidence, actionable behavior test, violation risk) prevents overly abstract principles from entering rules.
