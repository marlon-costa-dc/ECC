---
name: frontend-a11y
description: Use when building or reviewing interactive UI components, forms, modals, dropdowns, or any React/Next.js frontend work that must meet accessibility standards for keyboard, screen-reader, and focus users.
origin: community
---

# Frontend Accessibility Patterns

Practical accessibility patterns for React and Next.js. Covers the issues most commonly flagged in code review: missing form labels, incorrect ARIA usage, non-semantic interactive elements, and broken keyboard navigation.

## When to Activate

- Building or reviewing form components (`<input>`, `<select>`, `<textarea>`).
- Creating interactive elements (modals, dropdowns, tooltips, tabs).
- Using `<div>` or `<span>` with `onClick`.
- Adding `aria-*` attributes to any element.
- Implementing keyboard navigation or focus management.
- Receiving accessibility feedback from review tools.
- Building components that must support screen readers.

## Core Rules

1. **Prefer native HTML first.** Use `<button>`, `<a>`, `<label>`, `<nav>`, `<main>` before adding `role` attributes.
2. **Every interactive element must be keyboard reachable and operable.**
3. **Form inputs need labels.** Use `<label htmlFor>` or `aria-label` when the visible label is an icon.
4. **Wrong ARIA is worse than no ARIA.** Add ARIA only when native semantics are insufficient.
5. **Manage focus on state changes.** Save and restore focus for modals; move focus on route changes.
6. **Respect `prefers-reduced-motion`.** Disable animation for users who request reduced motion.

## Quick Examples

```tsx
{/* GOOD: label connected to input */}
<label htmlFor="email">Email</label>
<input id="email" type="email" aria-required="true" />

{/* BAD: onClick on non-interactive element */}
<div onClick={handleClick}>Submit</div>

{/* GOOD: semantic button */}
<button type="button" onClick={handleClick}>Submit</button>
```

## Links

- Detailed recipes and full examples: [references/a11y-recipes.md](references/a11y-recipes-1.md)
- Related skills: [frontend-patterns](../frontend-patterns/SKILL.md), [design-system](../design-system/SKILL.md), [motion-ui](../motion-ui/SKILL.md)
