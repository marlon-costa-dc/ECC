---
name: coding-standards
description: Baseline cross-project conventions for naming, readability, immutability, and code-quality review. Defer to framework-specific skills for detailed patterns.
---

# coding-standards

## Quando usar
- Starting a new project or module
- Reviewing or refactoring code for quality and maintainability
- Enforcing naming, formatting, or structural consistency
- Setting up linting, formatting, or type-checking rules

## O que fazer
1. **Readability first**: self-documenting names and consistent formatting over comments.
2. **Keep it simple**: simplest working solution; avoid premature optimization.
3. **Eliminate duplication**: extract reusable functions, components, utilities.
4. **Default to immutability**: spread/copy instead of mutating objects/arrays.
5. **Handle errors explicitly**: validate inputs, surface messages, avoid silent failures.
6. **Use strong types**: avoid `any`/bare `object`; prefer explicit contracts and schemas.
7. **Run quality tooling**: lint, format, type-check, test before considering code complete.

## Regras críticas
- **Naming**: descriptive names, verb-noun functions, typed interfaces.
- **Immutability**: never mutate directly; use spread, `map`, `filter`.
- **Error handling**: check responses, throw/return meaningful errors, log failures.
- **Concurrency**: parallelize independent async work with `Promise.all`.
- **React**: typed props, functional components, custom hooks, functional state updates.
- **APIs**: consistent REST paths/envelopes; validate input with Zod.
- **Tests**: AAA structure, descriptive names, cover error and edge cases.
- **Avoid**: magic numbers, deep nesting, long functions, nested ternaries, `any`, duplication.

## Exemplo
```typescript
interface Market { id: string; name: string; status: 'active' | 'closed' }

async function fetchMarket(id: string): Promise<Market> {
  const response = await fetch(`/api/markets/${id}`)
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  return response.json()
}

const [users, markets] = await Promise.all([fetchUsers(), fetchMarkets()])
const updated = { ...market, status: 'closed' as const }
```
