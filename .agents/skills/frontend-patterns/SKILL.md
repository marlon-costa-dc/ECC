---
name: frontend-patterns
description: Use when building or reviewing React, Next.js, state management, performance optimization, accessibility, and UI best practices for frontend applications.
---

# frontend-patterns

## When to use
- Building React components, custom hooks, or compound components
- Managing state with hooks, Context, reducers, or external stores
- Fetching data in client components or React Server Components
- Optimizing render performance, list virtualization, or code splitting
- Implementing forms, validation, error boundaries, or animations
- Ensuring accessibility (keyboard navigation, focus management)

## What to do
1. Prefer composition; expose small, focused components.
2. Encapsulate reusable logic in custom hooks with stable references.
3. Choose state by scope: `useState` local, `useReducer`/`Context` shared, store global.
4. Fetch data with SWR/React Query or server components; keep loading/error explicit.
5. Memoize expensive computations/callbacks; lazy-load heavy routes and virtualize long lists.
6. Validate forms with Zod/yup; keep inputs controlled and wrap error-prone trees in boundaries.
7. Use Framer Motion and respect `prefers-reduced-motion`; add ARIA roles and focus restoration.

## Critical rules
- Never log/display credentials, tokens, PII, or payment data.
- Avoid third-party analytics/tracking without approval.
- Do not pass inline objects/functions to memoized children without stabilizing.
- Keep side effects inside `useEffect` or data-fetching libraries.
- Return early for loading/error states before accessing nullable data.
- Restore/trap focus for modals and dropdowns.
- Respect motion preferences.

## Example
```typescript
function useToggle(initial = false) {
  const [value, setValue] = useState(initial)
  const toggle = useCallback(() => setValue(v => !v), [])
  return [value, toggle] as const
}

function Card({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'outlined' }) {
  return <div className={`card card-${variant}`}>{children}</div>
}

const [isOpen, toggleOpen] = useToggle()
<Card variant="outlined"><button onClick={toggleOpen}>Toggle</button>{isOpen && <p>Details</p>}</Card>
```
