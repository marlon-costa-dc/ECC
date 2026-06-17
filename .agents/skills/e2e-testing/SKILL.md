---
name: e2e-testing
description: Use when writing, configuring, or debugging Playwright end-to-end tests, Page Object Models, CI/CD integration, artifacts, flaky-test strategies, and cross-browser coverage.
---

# e2e-testing

## When to use
- Writing or reviewing Playwright E2E tests.
- Designing Page Object Models, fixtures, or test configuration.
- Debugging flaky tests or integrating E2E into CI/CD.

## What to do
1. Organize tests under `tests/e2e/` by feature; keep page objects in `pages/` and reusable auth/data in `fixtures/`.
2. Use Page Object Model: encapsulate locators and actions; expose methods like `goto()`, `search()`, `getItemCount()`.
3. Prefer `data-testid` locators and auto-waiting APIs; avoid arbitrary timeouts and race conditions.
4. Configure Playwright with `fullyParallel`, CI-aware `retries`, `trace: 'on-first-retry'`, and `screenshot/video: 'on-failure'`.
5. Run flaky tests with `--repeat-each=10` or `--retries=3`; quarantine with `test.fixme()` or `test.skip()` and link issues.
6. Upload artifacts (HTML report, screenshots, videos, traces) on every CI run with `if: always()`.
7. For critical/wallet flows, mock providers, skip production, and assert explicit success states.

## Critical rules
- Never use `waitForTimeout()` for synchronization; wait for responses, load states, or visible locators.
- Keep tests independent; use `beforeEach` for setup, not shared mutable state.
- Avoid production for financial or destructive flows; gate with `test.skip(process.env.NODE_ENV === 'production')`.
- Pin Actions and Node versions in CI; use `npm ci` and install browsers with dependencies.

## Example
```typescript
export class ItemsPage {
  readonly searchInput = this.page.locator('[data-testid="search-input"]')
  readonly itemCards = this.page.locator('[data-testid="item-card"]')
  constructor(private readonly page: Page) {}
  async goto() { await this.page.goto('/items') }
  async search(query: string) {
    await this.searchInput.fill(query)
    await this.page.waitForResponse(r => r.url().includes('/api/search'))
  }
}
```
