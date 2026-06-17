---
name: make-interfaces-feel-better
description: Use when applying concrete design-engineering details to make web interfaces feel polished, including spacing, typography, borders, shadows, motion, hit areas, icons, text wrapping, and interaction states.
---

# Make Interfaces Feel Better

Use this skill for small design-engineering details that make an interface feel polished.

## Triggers

- The UI feels off, flat, generic, cramped, or jumpy.
- Building controls, cards, lists, dashboards, navigation, or forms.
- A component needs hover, active, focus, enter, exit, or loading states.
- A frontend review needs before/after recommendations.

## Principles

- **Concentric radius.** For nested rounded surfaces: `outer radius = inner radius + padding`. When padding is large, treat them as separate surfaces.
- **Optical alignment.** Geometric centering is not always visual. Offset asymmetric icons (play triangles, arrows, stars) with pixel-level margin/padding or fix the SVG.
- **Shadows & borders.** Use borders for separation and focus rings. Use layered, transparent shadows for depth on cards, buttons, dropdowns, and popovers.
- **Text wrapping.** Use `text-wrap: balance` on headings and short titles, `text-wrap: pretty` on body text, and `font-variant-numeric: tabular-nums` for counters, timers, prices, and tables.
- **Font smoothing.** On macOS, set `html { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }` when not already present.
- **Image outlines.** Add a subtle inset outline so images do not blur into surfaces (`outline: 1px solid rgba(0, 0, 0, 0.1); outline-offset: -1px`; neutral alpha, not brand-tinted).
- **Motion.** Use CSS transitions for interactive state changes; reserve keyframes for one-shot entrances or loading.
- **Transition scope.** Never use `transition: all`; specify changed properties. Use `will-change` only for first-frame stutter on `transform`, `opacity`, or `filter`; never `will-change: all`.
- **Hit areas.** Interactive controls should be at least 40x40px, ideally 44x44px. Expand with a pseudo-element for small visible icons, avoiding overlaps.
