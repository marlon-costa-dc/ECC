# Santa Method

Multi-agent adversarial verification framework. Make a list, check it twice. If it's naughty, fix it until it's nice.

The core insight: a single agent reviewing its own output shares the same biases, knowledge gaps, and systematic errors that produced the output. Two independent reviewers with no shared context break this failure mode.

## When to Activate

Invoke this skill when:
- Output will be published, deployed, or consumed by end users
- Compliance, regulatory, or brand constraints must be enforced
- Code ships to production without human review
- Content accuracy matters (technical docs, educational material, customer-facing copy)
- Batch generation at scale where spot-checking misses systemic patterns
- Hallucination risk is elevated (claims, statistics, API references, legal language)

Do NOT use for internal drafts, exploratory research, or tasks with deterministic verification (use build/test/lint pipelines for those).

## Architecture

[See code example 1 in `code-examples.md`]

## Phase Details

### Phase 1: Make a List (Generate)

Execute the primary task. No changes to your normal generation workflow. Santa Method is a post-generation verification layer, not a generation strategy.

[See code example 2 in `code-examples.md`]

### Phase 2: Check It Twice (Independent Dual Review)

Spawn two review agents in parallel. Critical invariants:

1. **Context isolation** — neither reviewer sees the other's assessment
2. **Identical rubric** — both receive the same evaluation criteria
3. **Same inputs** — both receive the original spec AND the generated output
4. **Structured output** — each returns a typed verdict, not prose

[See code example 3 in `code-examples.md`]

[See code example 4 in `code-examples.md`]

### Rubric Design

The rubric is the most important input. Vague rubrics produce vague reviews. Every criterion must have an objective pass/fail condition.

| Criterion | Pass Condition | Failure Signal |
|-----------|---------------|----------------|
| Factual accuracy | All claims verifiable against source material or common knowledge | Invented statistics, wrong version numbers, nonexistent APIs |
| Hallucination-free | No fabricated entities, quotes, URLs, or references | Links to pages that don't exist, attributed quotes with no source |
| Completeness | Every requirement in the spec is addressed | Missing sections, skipped edge cases, incomplete coverage |
| Compliance | Passes all project-specific constraints | Banned terms used, tone violations, regulatory non-compliance |
| Internal consistency | No contradictions within the output | Section A says X, section B says not-X |
| Technical correctness | Code compiles/runs, algorithms are sound | Syntax errors, logic bugs, wrong complexity claims |

#### Domain-Specific Rubric Extensions

---

For additional details, continue reading `summary-1.md`, `summary-2.md`.
