---
name: frontend-slides
description: Use when the user wants to create, convert, or enhance an animation-rich HTML presentation for a talk, pitch, workshop, or internal update, including converting PowerPoint files into browser-based decks and helping non-designers discover a distinctive visual style through preview exploration.
origin: ECC
---

# Frontend Slides

Create zero-dependency, animation-rich HTML presentations that run entirely in the browser.

## When to Activate

- Talk deck, pitch deck, workshop deck, or internal presentation.
- Converting `.ppt` or `.pptx` slides into HTML.
- Improving an existing HTML presentation's layout, motion, or typography.
- Exploring styles with a user who does not know their design preference yet.

## Non-Negotiables

1. **Zero dependencies**: one self-contained HTML file with inline CSS and JS.
2. **Viewport fit**: every slide fits one viewport with no internal scrolling.
3. **Show, don't tell**: use visual previews instead of abstract questionnaires.
4. **Distinctive design**: avoid generic purple-gradient, Inter-on-white templates.
5. **Production quality**: code is commented, accessible, responsive, and performant.

## Workflow

1. **Detect mode**: new deck, PPT conversion, or enhancement.
2. **Discover content**: ask purpose, length, and content state; have the user paste copy before styling.
3. **Discover style**: generate 3 single-slide previews in `.ecc-design/slide-previews/` and ask the user to pick or mix. Skip previews if the user already knows a preset.
4. **Build**: output `presentation.html` or `[name].html`. Use `assets/` only for extracted or user-supplied images.
5. **Enforce viewport fit**: every `.slide` uses `height: 100vh; height: 100dvh; overflow: hidden;`; all type and spacing scale with `clamp()`; split content rather than shrink text or allow scrollbars.
6. **Validate**: test at 1920x1080, 1280x720, 768x1024, 375x667, and 667x375. Verify no overflows and keyboard navigation works.
7. **Deliver**: delete temporary previews unless requested, open the deck with the OS-appropriate opener, and summarize file path, preset, slide count, and customization points.
