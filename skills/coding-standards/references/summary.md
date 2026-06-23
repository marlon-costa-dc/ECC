# Coding Standards & Best Practices

Baseline coding conventions applicable across projects.

This skill is the shared floor, not the detailed framework playbook.

- Use `frontend-patterns` for React, state, forms, rendering, and UI architecture.
- Use `backend-patterns` or `api-design` for repository/service layers, endpoint design, validation, and server-specific concerns.
- Use `rules/common/coding-style.md` when you need the shortest reusable rule layer instead of a full skill walkthrough.

## When to Activate

- Starting a new project or module
- Reviewing code for quality and maintainability
- Refactoring existing code to follow conventions
- Enforcing naming, formatting, or structural consistency
- Setting up linting, formatting, or type-checking rules
- Onboarding new contributors to coding conventions

## Scope Boundaries

Activate this skill for:
- descriptive naming
- immutability defaults
- readability, KISS, DRY, and YAGNI enforcement
- error-handling expectations and code-smell review

Do not use this skill as the primary source for:
- React composition, hooks, or rendering patterns
- backend architecture, API design, or database layering
- domain-specific framework guidance when a narrower ECC skill already exists

## Code Quality Principles

### 1. Readability First
- Code is read more than written
- Clear variable and function names
- Self-documenting code preferred over comments
- Consistent formatting

### 2. KISS (Keep It Simple, Stupid)
- Simplest solution that works
- Avoid over-engineering
- No premature optimization
- Easy to understand > clever code

### 3. DRY (Don't Repeat Yourself)
- Extract common logic into functions
- Create reusable components
- Share utilities across modules
- Avoid copy-paste programming

### 4. YAGNI (You Aren't Gonna Need It)
- Don't build features before they're needed
- Avoid speculative generality
- Add complexity only when required
- Start simple, refactor when needed

## TypeScript/JavaScript Standards

### Variable Naming

[See code example 1 in `code-examples.md`]

### Function Naming

[See code example 2 in `code-examples.md`]

### Immutability Pattern (CRITICAL)

[See code example 3 in `code-examples.md`]

### Error Handling

[See code example 4 in `code-examples.md`]

### Async/Await Best Practices

[See code example 5 in `code-examples.md`]

### Type Safety

[See code example 6 in `code-examples.md`]

## React Best Practices

### Component Structure

[See code example 7 in `code-examples.md`]

### Custom Hooks

```typescript
// PASS: GOOD: Reusable custom hook
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

return () => clearTimeout(handler)
  }, [value, delay])

return debouncedValue
}

---

For additional details, continue reading `summary-1.md`, `summary-2.md`.
