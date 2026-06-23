# TDD Reference

Expanded patterns, examples, and checklists for `tdd-workflow`.

## Test Types

- **Unit:** individual functions, components, pure logic.
- **Integration:** API endpoints, database operations, service interactions.
- **E2E:** critical user flows via Playwright.

## RED Validation

A valid RED state requires:

- The test target compiles.
- The new/changed test is executed.
- Failure is caused by missing logic, a bug, or undefined behavior—not unrelated syntax errors, setup issues, or missing dependencies.

Recommended RED commit: `test: add reproducer for <feature or bug>`.

## Unit Test Pattern (Jest/Vitest)

```typescript
describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

## API Integration Test Pattern

```typescript
describe('GET /api/markets', () => {
  it('returns markets successfully', async () => {
    const request = new NextRequest('http://localhost/api/markets')
    const response = await GET(request)
    expect(response.status).toBe(200)
  })

  it('validates query parameters', async () => {
    const request = new NextRequest('http://localhost/api/markets?limit=invalid')
    const response = await GET(request)
    expect(response.status).toBe(400)
  })
})
```

## E2E Pattern (Playwright)

```typescript
test('user can search and filter markets', async ({ page }) => {
  await page.goto('/markets')
  await page.fill('input[placeholder="Search markets"]', 'election')
  await page.waitForTimeout(600)
  const results = page.locator('[data-testid="market-card"]')
  await expect(results).toHaveCount(5, { timeout: 5000 })
  await page.click('button:has-text("Active")')
  await expect(results).toHaveCount(3)
})
```

## File Organization

```
src/
├── components/
│   └── Button/
│       ├── Button.tsx
│       └── Button.test.tsx
├── app/api/markets/
│   ├── route.ts
│   └── route.test.ts
└── e2e/
    └── markets.spec.ts
```

## Mocking External Services

```typescript
jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => Promise.resolve({ data: [], error: null }))
      }))
    }))
  }
}))
```

## Coverage Thresholds

```json
{
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

## Common Mistakes

| Wrong | Right |
|---|---|
| Test internal state | Test user-visible behavior |
| Brittle CSS selectors | Semantic selectors / `data-testid` |
| Dependent tests | Isolated tests with own setup |
| Only happy paths | Edge cases, errors, boundaries |

## Best Practices

1. Tests first.
2. One logical assertion per test.
3. Descriptive test names.
4. Arrange-Act-Assert.
5. Mock external dependencies.
6. Cover edge cases and error paths.
7. Keep unit tests fast (<50 ms each).
8. Clean up after tests.

## Success Metrics

- ≥80% coverage.
- All tests passing.
- No skipped tests.
- Unit suite <30 s.
- E2E covers critical flows.
