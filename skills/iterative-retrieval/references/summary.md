# Iterative Retrieval Pattern

Solves the "context problem" in multi-agent workflows where subagents don't know what context they need until they start working.

## When to Activate

- Spawning subagents that need codebase context they cannot predict upfront
- Building multi-agent workflows where context is progressively refined
- Encountering "context too large" or "missing context" failures in agent tasks
- Designing RAG-like retrieval pipelines for code exploration
- Optimizing token usage in agent orchestration

## The Problem

Subagents are spawned with limited context. They don't know:
- Which files contain relevant code
- What patterns exist in the codebase
- What terminology the project uses

Standard approaches fail:
- **Send everything**: Exceeds context limits
- **Send nothing**: Agent lacks critical information
- **Guess what's needed**: Often wrong

## The Solution: Iterative Retrieval

A 4-phase loop that progressively refines context:

[See code example 1 in `code-examples.md`]

### Phase 1: DISPATCH

Initial broad query to gather candidate files:

[See code example 2 in `code-examples.md`]

### Phase 2: EVALUATE

Assess retrieved content for relevance:

[See code example 3 in `code-examples.md`]

Scoring criteria:
- **High (0.8-1.0)**: Directly implements target functionality
- **Medium (0.5-0.7)**: Contains related patterns or types
- **Low (0.2-0.4)**: Tangentially related
- **None (0-0.2)**: Not relevant, exclude

### Phase 3: REFINE

Update search criteria based on evaluation:

[See code example 4 in `code-examples.md`]

### Phase 4: LOOP

Repeat with refined criteria (max 3 cycles):

[See code example 5 in `code-examples.md`]

## Practical Examples

### Example 1: Bug Fix Context

[See code example 6 in `code-examples.md`]

### Example 2: Feature Implementation

[See code example 7 in `code-examples.md`]

## Integration with Agents

Use in agent prompts:

[See code example 8 in `code-examples.md`]

## Best Practices

1. **Start broad, narrow progressively** - Don't over-specify initial queries
2. **Learn codebase terminology** - First cycle often reveals naming conventions
3. **Track what's missing** - Explicit gap identification drives refinement
4. **Stop at "good enough"** - 3 high-relevance files beats 10 mediocre ones
5. **Exclude confidently** - Low-relevance files won't become relevant

## Related

---

For additional details, continue reading `summary-1.md`.
