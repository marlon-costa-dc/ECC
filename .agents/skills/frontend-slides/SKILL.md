---
name: frontend-slides
description: 'Use this skill to use when creating zero-dependency, animation-rich
  HTML presentations from scratch or by converting PPT/PPTX files for talks, pitches,
  workshops, or documentation. DO NOT USE FOR: questions unrelated to frontend-slides
  creating projects or architecture from scratch'
license: MIT
metadata:
  version: 1.0.0
---
# frontend-slides

**UTILITY SKILL**

## When to use
## What to do
1. Detect mode: new deck, PPT conversion, or enhancement
2. Discover content: ask purpose, length, and content state; have the user paste copy before styling
3. Discover style: if no preset is known, generate 3 single-slide previews in `.ecc-design/slide-previews/` and ask which to keep or mix
4. Build `presentation.html` (or `[name].html`) with inline CSS/JS; use `assets/` only for extracted or user-supplied images
5. Enforce viewport fit: every slide must fit without internal scrolling
6. Validate at 1920x1080, 1280x720, 768x1024, 375x667, and 667x375
7. Deliver: delete previews unless kept, open the file, summarize path/preset/slide count/theme customization points

## Critical rules
- Zero dependencies: one self-contained HTML file with inline CSS and JS
- Every slide must fit the viewport: `height: 100vh; height: 100dvh; overflow: hidden;`
- Use `clamp()` for type and spacing; split content rather than shrink below readable sizes

## USE FOR

- Requests about frontend slides.
- Workflows described in this skill.
- Operator tasks within this scope.

## DO NOT USE FOR

- questions unrelated to frontend-slides.
- creating projects or architecture from scratch.

## Workflow

1. **Understand** intent and constraints.
2. **Execute** the canonical approach.
3. **Validate** with native checks.

## Example

**Input:** a request.
**Output:** a concise response.

## Troubleshooting

- Unclear scope → ask.
- Missing context → state assumptions.
