---
name: e2e-testing
description: Use when writing, configuring, debugging, or reviewing Playwright E2E tests, including Page Object Model patterns, flaky test handling, CI/CD integration, artifact management, and Web3 or financial flows.
---

# E2E Testing Patterns

Concise Playwright patterns for stable, fast, maintainable E2E suites. Extended examples (POM, test structure, full config, CI/CD, wallet/Web3, financial flows) are in [references/playwright-patterns.md](references/playwright-patterns.md).

## Page Object Model

Encapsulate page interactions in reusable classes with stable `data-testid` locators, constructor-initialized selectors, and async page-specific actions.

## Test Structure

Group related tests with `test.describe`, set up state in `test.beforeEach`, and assert with auto-waiting locators.

## Flaky Test Patterns

Mark and investigate flakiness:

```typescript
test.fixme(true, 'Flaky - Issue #123')
test.skip(process.env.CI, 'Flaky in CI - Issue #123')
```

```bash
npx playwright test tests/search.spec.ts --repeat-each=10
npx playwright test tests/search.spec.ts --retries=3
```

Fixes: use auto-waiting locators (`page.locator(...).click()`), wait for responses/states instead of timeouts, and wait for visibility/stability before clicking animated elements.

## Artifact Management

Capture screenshots and enable traces, screenshots, and video in config: `trace: 'on-first-retry'`, `screenshot: 'only-on-failure'`, `video: 'retain-on-failure'`.

## CI/CD Integration

Install dependencies, install Playwright browsers, run tests against `BASE_URL`, and upload `playwright-report/` as an artifact. See the reference for a full GitHub Actions workflow.
