# Benchmark — Performance Baseline & Regression Detection

## When to Use

- Before and after a PR to measure performance impact
- Setting up performance baselines for a project
- When users report "it feels slow"
- Before a launch — ensure you meet performance targets
- Comparing your stack against alternatives

## How It Works

### Mode 1: Page Performance

Measures real browser metrics via browser MCP:

[See code example 1 in `code-examples.md`]

### Mode 2: API Performance

Benchmarks API endpoints:

[See code example 2 in `code-examples.md`]

### Mode 3: Build Performance

Measures development feedback loop:

[See code example 3 in `code-examples.md`]

### Mode 4: Before/After Comparison

Run before and after a change to measure impact:

[See code example 4 in `code-examples.md`]

Output:

[See code example 5 in `code-examples.md`]

## Output

Stores baselines in `.ecc/benchmarks/` as JSON. Git-tracked so the team shares baselines.

## Integration

- CI: run `/benchmark compare` on every PR
- Pair with `/canary-watch` for post-deploy monitoring
- Pair with `/browser-qa` for full pre-ship checklist
