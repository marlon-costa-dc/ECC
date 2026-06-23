---
name: design-system
description: Use when generating or auditing design systems, checking visual consistency across a codebase, or reviewing pull requests that touch styling and UI components.
---

# Design System

Use this skill to generate a new design system, audit an existing UI, or detect generic AI-generated design patterns.

## Triggers

- Starting a project that needs a design system
- Auditing an existing codebase for visual consistency
- Preparing for a redesign
- Investigating why a UI looks "off"
- Reviewing PRs that touch styling

## Modes

### Generate

Analyzes existing CSS/Tailwind/styled-components, extracts colors, typography, spacing, radius, shadows, and breakpoints, researches competitor sites, and proposes design tokens (JSON + CSS custom properties). Outputs `DESIGN.md`, `design-tokens.json`, and a self-contained `design-preview.html`.

### Visual Audit

Scores the UI across 10 dimensions: color consistency, typography hierarchy, spacing rhythm, component consistency, responsive behavior, dark mode, animation, accessibility, information density, and polish. Each dimension gets a score, examples, and a file:line fix.

### AI Slop Detection

Flags generic patterns: gratuitous gradients, purple-to-blue defaults, glass morphism without purpose, excessive rounded corners, scroll animations, generic hero over stock gradients, and personality-free font stacks.

## Examples

- Generate: `/design-system generate --style minimal --palette earth-tones`
- Audit: `/design-system audit --url http://localhost:3000 --pages / /pricing /docs`
- Slop check: `/design-system slop-check`
