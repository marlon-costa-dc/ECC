# Style Presets Reference

Curated visual styles for `frontend-slides`: viewport-fitting CSS base, preset selection, mood mapping, and CSS gotchas. Abstract shapes only; avoid illustrations unless requested.

## Viewport Fit Is Non-Negotiable

Every slide must fully fit in one viewport.

### Golden Rule

```text
Each slide = exactly one viewport height.
Too much content = split into more slides.
Never scroll inside a slide.
```

### Density Limits

| Slide Type | Maximum Content |
|------------|-----------------|
| Title slide | 1 heading + 1 subtitle + optional tagline |
| Content slide | 1 heading + 4-6 bullets or 2 paragraphs |
| Feature grid | 6 cards maximum |
| Code slide | 8-10 lines maximum |
| Quote slide | 1 quote + attribution |
| Image slide | 1 image, ideally under 60vh |

## Mandatory Base CSS

Copy this block into every generated presentation and then theme on top of it.

```css
/* ===========================================
   VIEWPORT FITTING: MANDATORY BASE STYLES
   =========================================== */

html, body {
    height: 100%;
    overflow-x: hidden;
}

html {
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
}

.slide {
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    overflow: hidden;
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    position: relative;
}

.slide-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-height: 100%;
    overflow: hidden;
    padding: var(--slide-padding);
}

:root {
    --title-size: clamp(1.5rem, 5vw, 4rem);
    --h2-size: clamp(1.25rem, 3.5vw, 2.5rem);
    --h3-size: clamp(1rem, 2.5vw, 1.75rem);
    --body-size: clamp(0.75rem, 1.5vw, 1.125rem);
    --small-size: clamp(0.65rem, 1vw, 0.875rem);

    --slide-padding: clamp(1rem, 4vw, 4rem);
    --content-gap: clamp(0.5rem, 2vw, 2rem);
    --element-gap: clamp(0.25rem, 1vw, 1rem);
}

.card, .container, .content-box {
    max-width: min(90vw, 1000px);
    max-height: min(80vh, 700px);
}

.feature-list, .bullet-list {
    gap: clamp(0.4rem, 1vh, 1rem);
}

.feature-list li, .bullet-list li {
    font-size: var(--body-size);
    line-height: 1.4;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
    gap: clamp(0.5rem, 1.5vw, 1rem);
}

img, .image-container {
    max-width: 100%;
    max-height: min(50vh, 400px);
    object-fit: contain;
}

@media (max-height: 700px) {
    :root {
        --slide-padding: clamp(0.75rem, 3vw, 2rem);
        --content-gap: clamp(0.4rem, 1.5vw, 1rem);
        --title-size: clamp(1.25rem, 4.5vw, 2.5rem);
        --h2-size: clamp(1rem, 3vw, 1.75rem);
    }
}

@media (max-height: 600px) {
    :root {
        --slide-padding: clamp(0.5rem, 2.5vw, 1.5rem);
        --content-gap: clamp(0.3rem, 1vw, 0.75rem);
        --title-size: clamp(1.1rem, 4vw, 2rem);
        --body-size: clamp(0.7rem, 1.2vw, 0.95rem);
    }

    .nav-dots, .keyboard-hint, .decorative {
        display: none;
    }
}

@media (max-height: 500px) {
    :root {
        --slide-padding: clamp(0.4rem, 2vw, 1rem);
        --title-size: clamp(1rem, 3.5vw, 1.5rem);
        --h2-size: clamp(0.9rem, 2.5vw, 1.25rem);
        --body-size: clamp(0.65rem, 1vw, 0.85rem);
    }
}

@media (max-width: 600px) {
    :root {
        --title-size: clamp(1.25rem, 7vw, 2.5rem);
    }

    .grid {
        grid-template-columns: 1fr;
    }
}

@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.2s !important;
    }

    html {
        scroll-behavior: auto;
    }
}
```

## Viewport Checklist

- every `.slide` has `height: 100vh`, `height: 100dvh`, and `overflow: hidden`
- all typography uses `clamp()`
- all spacing uses `clamp()` or viewport units
- images have `max-height` constraints
- grids adapt with `auto-fit` + `minmax()`
- short-height breakpoints exist at `700px`, `600px`, and `500px`
- if anything feels cramped, split the slide

## Mood to Preset Mapping

| Mood | Good Presets |
|------|--------------|
| Impressed / Confident | Bold Signal, Electric Studio, Dark Botanical |
| Excited / Energized | Creative Voltage, Neon Cyber, Split Pastel |
| Calm / Focused | Notebook Tabs, Paper & Ink, Swiss Modern |
| Inspired / Moved | Dark Botanical, Vintage Editorial, Pastel Geometry |

## Preset Catalog

| # | Preset | Vibe | Best For | Fonts | Palette | Signature |
|---|--------|------|----------|-------|---------|-----------|
| 1 | Bold Signal | confident, high-impact | pitches, launches | Archivo Black + Space Grotesk | charcoal, hot orange, white | oversized numbers, high-contrast card |
| 2 | Electric Studio | clean, agency-polished | client decks, strategy | Manrope | black, white, cobalt | two-panel split, editorial alignment |
| 3 | Creative Voltage | energetic, retro-modern | creative studios, brands | Syne + Space Mono | electric blue, neon yellow, navy | halftone, badges, punchy contrast |
| 4 | Dark Botanical | elegant, premium | luxury, narratives | Cormorant + IBM Plex Sans | near-black, ivory, blush, gold | blurred circles, fine rules |
| 5 | Notebook Tabs | editorial, tactile | reports, reviews | Bodoni Moda + DM Sans | cream paper, charcoal, pastel tabs | paper sheet, colored side tabs |
| 6 | Pastel Geometry | approachable, friendly | product overviews, onboarding | Plus Jakarta Sans | pale blue, cream, soft accents | vertical pills, rounded cards |
| 7 | Split Pastel | playful, creative | agency intros, portfolios | Outfit | peach, lavender, mint | split backdrop, rounded tags |
| 8 | Vintage Editorial | witty, magazine-inspired | personal brands, storytelling | Fraunces + Work Sans | cream, charcoal, warm accents | bordered callouts, serif headlines |
| 9 | Neon Cyber | futuristic, kinetic | AI, infra, dev tools | Clash Display + Satoshi | midnight navy, cyan, magenta | glow, grids, particles |
| 10 | Terminal Green | developer-focused | APIs, CLI demos | JetBrains Mono | GitHub dark, terminal green | scan lines, monospace framing |
| 11 | Swiss Modern | minimal, data-forward | corporate, analytics | Archivo + Nunito | white, black, signal red | visible grids, asymmetry |
| 12 | Paper & Ink | literary, story-driven | essays, manifestos | Cormorant Garamond + Source Serif 4 | warm cream, charcoal, crimson | pull quotes, drop caps |

## CSS Gotcha: Negating Functions

Never write these:

```css
right: -clamp(28px, 3.5vw, 44px);
margin-left: -min(10vw, 100px);
```

Browsers ignore them silently.

Always write this instead:

```css
right: calc(-1 * clamp(28px, 3.5vw, 44px));
margin-left: calc(-1 * min(10vw, 100px));
```

## Anti-Patterns

Avoid: purple-on-white startup templates; Inter/Roboto/Arial unless neutrality is requested; bullet walls, tiny type, or scrolling code blocks; decorative illustrations when abstract geometry suffices.
