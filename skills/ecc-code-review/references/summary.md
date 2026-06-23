# /code-review — Code Review Workflow

## When to Activate

- After writing or modifying code
- Before committing changes
- When asked to review a PR or diff
- After completing a feature

## Delegation

For large reviews or multi-file changes, delegate to the `coder` subagent:

[See code example 1 in `code-examples.md`]

## Review Process

### 1. Gather Context
- Run `git diff --staged` and `git diff` to see all changes
- If no diff, check recent commits with `git log --oneline -5`
- Identify the scope and purpose of changes

### 2. Read Surrounding Code
- Don't review changes in isolation
- Read full files to understand imports, dependencies, call sites
- Check tests for the modified code

### 3. Apply Review Checklist

#### Quality
- [ ] Code is readable and well-organized
- [ ] Functions are small and focused (single responsibility)
- [ ] Naming is clear and consistent
- [ ] No dead code or unused imports
- [ ] Error handling is comprehensive
- [ ] Edge cases are handled

#### Security
- [ ] No hardcoded secrets or credentials
- [ ] User input is validated and sanitized
- [ ] SQL queries are parameterized
- [ ] Auth/authorization checks are present for sensitive paths
- [ ] XSS prevention for web output
- [ ] Error messages don't leak sensitive internals

#### Performance
- [ ] No unnecessary computations
- [ ] Efficient data structures chosen
- [ ] Database queries are optimized
- [ ] No N+1 query problems

#### Testing
- [ ] Tests cover critical paths
- [ ] Edge cases are tested
- [ ] Error scenarios have tests
- [ ] 80%+ coverage maintained

#### Maintainability
- [ ] Follows project conventions
- [ ] Consistent with existing patterns
- [ ] Documentation/comments where needed
- [ ] No unnecessary complexity

### 4. Confidence-Based Filtering

**IMPORTANT**: Do not flood the review with noise.

- **Report** if you are >80% confident it is a real issue
- **Skip** stylistic preferences unless they violate project conventions
- **Skip** issues in unchanged code unless CRITICAL security issues
- **Consolidate** similar issues
- **Prioritize** issues that could cause bugs, security vulnerabilities, or data loss

## Output Format

[See code example 2 in `code-examples.md`]

## Severity Definitions

- **Critical**: Security vulnerability, data loss risk, crash, or major bug
- **Medium**: Bug risk, performance issue, or maintainability concern
- **Low**: Style, documentation, or minor improvement
