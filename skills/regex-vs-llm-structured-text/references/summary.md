# Regex vs LLM for Structured Text Parsing

A practical decision framework for parsing structured text (quizzes, forms, invoices, documents). The key insight: regex handles 95-98% of cases cheaply and deterministically. Reserve expensive LLM calls for the remaining edge cases.

## When to Activate

- Parsing structured text with repeating patterns (questions, forms, tables)
- Deciding between regex and LLM for text extraction
- Building hybrid pipelines that combine both approaches
- Optimizing cost/accuracy tradeoffs in text processing

## Decision Framework

[See code example 1 in `code-examples.md`]

## Architecture Pattern

[See code example 2 in `code-examples.md`]

## Implementation

### 1. Regex Parser (Handles the Majority)

[See code example 3 in `code-examples.md`]

### 2. Confidence Scoring

Flag items that may need LLM review:

[See code example 4 in `code-examples.md`]

### 3. LLM Validator (Edge Cases Only)

[See code example 5 in `code-examples.md`]

### 4. Hybrid Pipeline

[See code example 6 in `code-examples.md`]

## Real-World Metrics

From a production quiz parsing pipeline (410 items):

| Metric | Value |
|--------|-------|
| Regex success rate | 98.0% |
| Low confidence items | 8 (2.0%) |
| LLM calls needed | ~5 |
| Cost savings vs all-LLM | ~95% |
| Test coverage | 93% |

## Best Practices

- **Start with regex** — even imperfect regex gives you a baseline to improve
- **Use confidence scoring** to programmatically identify what needs LLM help
- **Use the cheapest LLM** for validation (Haiku-class models are sufficient)
- **Never mutate** parsed items — return new instances from cleaning/validation steps
- **TDD works well** for parsers — write tests for known patterns first, then edge cases
- **Log metrics** (regex success rate, LLM call count) to track pipeline health

## Anti-Patterns to Avoid

---

For additional details, continue reading `summary-1.md`.
