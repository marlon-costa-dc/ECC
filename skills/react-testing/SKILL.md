---
name: react-testing
description: Use when writing or fixing tests for React components, custom hooks, or pages with React Testing Library, Vitest, Jest, MSW, axe, or when deciding between component tests and Playwright/Cypress E2E.
origin: ECC
---

# React Testing

## When to Activate

- Writing tests for React components, custom hooks, or pages.
- Adding coverage to legacy untested components.
- Migrating from Enzyme to React Testing Library.
- Setting up Vitest or Jest for a React project.
- Mocking HTTP requests in tests.
- Asserting accessibility violations.
- Deciding which tests belong in RTL vs Playwright CT vs E2E.

## Core Principle

Test user-visible behavior, not implementation details. Render with production providers, interact via accessible queries and `userEvent`, and assert visible output.

## Query Priority

1. Accessible: `getByRole`, `getByLabelText`, `getByText`, `getByDisplayValue`.
2. Semantic: `getByAltText`, `getByTitle`.
3. Test IDs: `getByTestId`.

Variants: `getBy*` throws; `queryBy*` returns `null`; `findBy*` is async.

## Interaction Rules

- Always `await` `userEvent` calls.
- Call `userEvent.setup()` once per test and reuse `user`.
- Prefer `userEvent` over `fireEvent`.

## Async Patterns

Use `findByText` for elements that appear after async work, `waitFor` for side effects, and `waitForElementToBeRemoved` for disappearing elements. Never `setTimeout` + assert.

## Anti-Patterns

- `container.querySelector("...")` — bypasses accessible queries.
- Asserting render counts.
- `jest.mock("react", ...)` — never mock React.
- Mocking child components by default.
- Ignoring `act()` warnings.
- Sharing mutable state across tests.

## Links

- Recipes, library choice, coverage targets, examples: [references/testing-recipes.md](references/testing-recipes.md)
- Related skills: [react-patterns](../react-patterns/SKILL.md), [frontend-a11y](../frontend-a11y/SKILL.md), [e2e-testing](../e2e-testing/SKILL.md)
- Rules: [rules/react/testing.md](../../rules/react/testing.md)
