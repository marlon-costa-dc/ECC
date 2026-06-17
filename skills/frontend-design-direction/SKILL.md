---
name: frontend-design-direction
description: Use when building or improving websites, dashboards, applications, components, landing pages, visual tools, or any web UI that needs stronger product-specific design judgment.
origin: community
---

# Frontend Design Direction

Use this skill when making UI feel purposeful, polished, and appropriate to the product domain, not merely functional.

## When to Activate

- Building or improving a web page, app, dashboard, artifact, component, or UI.
- Making an interface more polished, distinctive, beautiful, or less generic.
- Choosing visual hierarchy, typography, color, motion, layout, or interactions.
- The current UI reads as flat, generic, templated, or mismatched to the audience.

## Design Direction

Define before coding:

1. **Purpose** — what job does the interface do?
2. **Audience** — who repeats this workflow and what do they scan first?
3. **Tone** — utilitarian, editorial, playful, industrial, refined, technical, or another explicit direction.
4. **Memorable detail** — one intentional idea that makes the result feel designed.
5. **Constraints** — framework, accessibility, performance, responsiveness, and existing design system.

## Implementation Guidance

- Build the usable experience first unless marketing copy is explicitly requested.
- Use existing components, tokens, icons, and routing before adding a new visual system.
- Use real or generated visual assets when the interface depends on images, products, people, gameplay, or inspectable media.
- Prefer contextual typography and spacing over generic oversized hero text.
- Keep palettes multi-dimensional; avoid a UI dominated by one hue family.
- Use CSS variables or design tokens for coherence across states.
- Design responsive constraints explicitly so grids, toolbars, and controls stay stable.
- Use motion sparingly but deliberately; prefer high-signal transitions that clarify state.
- Verify text fit on mobile and desktop; labels must wrap cleanly.

## Anti-Patterns

- Generated patterns: purple gradients, decorative blobs, oversized cards, vague hero copy, or stock-like media.
- Nesting UI cards inside other cards.
- A single decorative style everywhere when restraint is needed.
- Hiding the primary product or workflow behind generic marketing sections.
- Adding a new dependency for a design flourish unless it clearly pays for itself.

## Links

- Review checklist: [references/design-checklist.md](references/design-checklist.md)
