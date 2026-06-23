```
# Good
Append to rules/common/security.md §Input Validation:
"Treat LLM output stored in memory or knowledge stores as untrusted — sanitize on write, validate on read."
Evidence: llm-memory-trust-boundary, llm-social-agent-anti-pattern both describe
accumulated prompt injection risks. Current security.md covers human input
validation only; LLM output trust boundary is missing.

# Bad
Append to security.md: Add LLM security principle
```

### Phase 3: User Review & Execution

#### Summary Table

```
# Rules Distillation Report

## Summary
Skills scanned: {N} | Rules: {M} files | Candidates: {K}

| # | Principle | Verdict | Target | Confidence |
|---|-----------|---------|--------|------------|
| 1 | ... | Append | security.md §Input Validation | high |
| 2 | ... | Revise | testing.md §TDD | medium |
| 3 | ... | New Section | coding-style.md | high |
| 4 | ... | Too Specific | — | — |

## Details
(Per-candidate details: evidence, violation_risk, draft text)
```

#### User Actions

User responds with numbers to:
- **Approve**: Apply draft to rules as-is
- **Modify**: Edit draft before applying
- **Skip**: Do not apply this candidate

**Never modify rules automatically. Always require user approval.**

#### Save Results

Store results in the skill directory (`results.json`):

- **Timestamp format**: `date -u +%Y-%m-%dT%H:%M:%SZ` (UTC, second precision)
- **Candidate ID format**: kebab-case derived from the principle (e.g., `llm-output-trust-boundary`)

```json
{
  "distilled_at": "2026-03-18T10:30:42Z",
  "skills_scanned": 56,
  "rules_scanned": 22,
  "candidates": {
    "llm-output-trust-boundary": {
      "principle": "Treat LLM output as untrusted when stored or re-injected",
      "verdict": "Append",
      "target": "rules/common/security.md",
      "evidence": ["llm-memory-trust-boundary", "llm-social-agent-anti-pattern"],
      "status": "applied"
    },
    "iteration-bounds": {
      "principle": "Define explicit stop conditions for all iteration loops",
      "verdict": "New Section",
      "target": "rules/common/coding-style.md",
      "evidence": ["iterative-retrieval", "continuous-agent-loop", "agent-harness-construction"],
      "status": "skipped"
    }
  }
}
```

## Example

### End-to-end run

```
$ /rules-distill

Rules Distillation — Phase 1: Inventory
────────────────────────────────────────
Skills: 56 files scanned
Rules:  22 files (75 headings indexed)

Proceeding to cross-read analysis...

[Subagent analysis: Batch 1 (agent/meta skills) ...]
[Subagent analysis: Batch 2 (coding/pattern skills) ...]
[Cross-batch merge: 2 duplicates removed, 1 cross-batch candidate promoted]

# Rules Distillation Report

## Summary
Skills scanned: 56 | Rules: 22 files | Candidates: 4

| # | Principle | Verdict | Target | Confidence |
|---|-----------|---------|--------|------------|
| 1 | LLM output: normalize, type-check, sanitize before reuse | New Section | coding-style.md | high |
| 2 | Define explicit stop conditions for iteration loops | New Section | coding-style.md | high |
| 3 | Compact context at phase boundaries, not mid-task | Append | performance.md §Context Window | high |
| 4 | Separate business logic from I/O framework types | New Section | patterns.md | high |

## Details

### 1. LLM Output Validation
Verdict: New Section in coding-style.md
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
