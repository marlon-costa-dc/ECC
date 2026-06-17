---
name: frontend-slides
description: Use when creating zero-dependency, animation-rich HTML presentations from scratch or by converting PPT/PPTX files for talks, pitches, workshops, or documentation.
---

# frontend-slides

## When to use
- Building a talk, pitch, workshop, or internal deck
- Converting `.ppt` or `.pptx` to HTML
- Improving layout, motion, or typography of existing HTML slides

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
- Read `STYLE_PRESETS.md` for the viewport-safe CSS base, presets, and density limits
- Distinctive design: avoid generic gradients, system-font-only decks, and template look
- Support keyboard, wheel, and touch navigation; progress indicator; reveal-on-enter; `prefers-reduced-motion`
- Content density limits: title = 1 heading + 1 subtitle; content = 1 heading + 4-6 bullets; feature grid = 6 cards max; code = 8-10 lines max
- For PPT conversion use `python3` + `python-pptx`; preserve slide order, notes, and extracted assets
