---
name: tdd-workflow
description: Use this skill when writing new features, fixing bugs, or refactoring code. Enforces test-driven development with 80%+ coverage including unit, integration, and E2E tests.
---

# tdd-workflow

## When to use
- Writing new features, components, or API endpoints
- Fixing bugs or refactoring existing code

## What to do
1. Write a failing test that expresses the expected behavior (unit, integration, or E2E).
2. Run the test suite and confirm the new test fails.
3. Write the minimal code needed to make the test pass.
4. Run tests again and confirm green.
5. Refactor while keeping tests green.
6. Verify coverage is ≥80% for branches, functions, lines, and statements.

## Critical rules
- Tests come first, never after implementation.
- Cover edge cases, errors, and boundary conditions, not just happy paths.
- Mock external services (DB, cache, APIs); keep unit tests isolated.
- Use semantic selectors (`role`, `data-testid`, text) in E2E tests.
- One behavior per test; no shared state between tests.
- Never skip, disable, or ignore failing tests without fixing them.

## Example
```typescript
describe('searchMarkets', () => {
  it('returns relevant results for a query', async () => {
    const result = await searchMarkets('election')
    expect(result[0]).toMatchObject({ slug: expect.stringContaining('election') })
  })

  it('handles empty query gracefully', async () => {
    await expect(searchMarkets('')).rejects.toThrow('Query is required')
  })
})
```
