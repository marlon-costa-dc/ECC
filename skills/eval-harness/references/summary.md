# Eval Harness Skill

A formal evaluation framework for Claude Code sessions, implementing eval-driven development (EDD) principles.

## When to Activate

- Setting up eval-driven development (EDD) for AI-assisted workflows
- Defining pass/fail criteria for Claude Code task completion
- Measuring agent reliability with pass@k metrics
- Creating regression test suites for prompt or agent changes
- Benchmarking agent performance across model versions

## Philosophy

Eval-Driven Development treats evals as the "unit tests of AI development":
- Define expected behavior BEFORE implementation
- Run evals continuously during development
- Track regressions with each change
- Use pass@k metrics for reliability measurement

## Eval Types

### Capability Evals
Test if Claude can do something it couldn't before:

[See code example 1 in `code-examples.md`]

### Regression Evals
Ensure changes don't break existing functionality:

[See code example 2 in `code-examples.md`]

## Grader Types

### 1. Code-Based Grader
Deterministic checks using code:

[See code example 3 in `code-examples.md`]

### 2. Model-Based Grader
Use Claude to evaluate open-ended outputs:

[See code example 4 in `code-examples.md`]

### 3. Human Grader
Flag for manual review:

[See code example 5 in `code-examples.md`]

## Metrics

### pass@k
"At least one success in k attempts"
- pass@1: First attempt success rate
- pass@3: Success within 3 attempts
- Typical target: pass@3 > 90%

### pass^k
"All k trials succeed"
- Higher bar for reliability
- pass^3: 3 consecutive successes
- Use for critical paths

## Eval Workflow

### 1. Define (Before Coding)

[See code example 6 in `code-examples.md`]

### 2. Implement
Write code to pass the defined evals.

### 3. Evaluate

[See code example 7 in `code-examples.md`]

### 4. Report

[See code example 8 in `code-examples.md`]

## Integration Patterns

### Pre-Implementation

[See code example 9 in `code-examples.md`]

Creates eval definition file at `.claude/evals/feature-name.md`

### During Implementation

[See code example 10 in `code-examples.md`]

Runs current evals and reports status

### Post-Implementation

[See code example 11 in `code-examples.md`]

Generates full eval report

## Eval Storage

Store evals in project:

[See code example 12 in `code-examples.md`]

## Best Practices

1. **Define evals BEFORE coding** - Forces clear thinking about success criteria
2. **Run evals frequently** - Catch regressions early
3. **Track pass@k over time** - Monitor reliability trends
4. **Use code graders when possible** - Deterministic > probabilistic
5. **Human review for security** - Never fully automate security checks
6. **Keep evals fast** - Slow evals don't get run
7. **Version evals with code** - Evals are first-class artifacts

## Example: Adding Authentication

```markdown
## EVAL: add-authentication

---

For additional details, continue reading `summary-1.md`.
