:# Style Presets Reference

Curated visual styles for `frontend-slides`.

## Viewport Fit

- Each slide = exactly one viewport. Never scroll inside a slide.
- Density: title = 1 heading + subtitle; content = 1 heading + 4-6 bullets; code = 8-10 lines.

## Mandatory Base CSS

```css
html, body { height: 100%; overflow-x: hidden; }
html { scroll-snap-type: y mandatory; scroll-behavior: smooth; }
.slide { width: 100vw; height: 100vh; height: 100dvh; overflow: hidden; scroll-snap-align: start; display: flex; flex-direction: column; }
.slide-content { flex: 1; display: flex; flex-direction: column; justify-content: center; max-height: 100%; padding: var(--slide-padding); }
:root {
  --title-size: clamp(1.5rem, 5vw, 4rem);
  --h2-size: clamp(1.25rem, 3.5vw, 2.5rem);
  --body-size: clamp(0.75rem, 1.5vw, 1.125rem);
  --slide-padding: clamp(1rem, 4vw, 4rem);
  --content-gap: clamp(0.5rem, 2vw, 2rem);
}
.card, .container { max-width: min(90vw, 1000px); max-height: min(80vh, 700px); }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr)); gap: clamp(0.5rem, 1.5vw, 1rem); }
img { max-width: 100%; max-height: min(50vh, 400px); object-fit: contain; }
@media (max-height: 700px), (max-height: 600px), (max-height: 500px) { :root { --slide-padding: clamp(0.5rem, 2.5vw, 1.5rem); --title-size: clamp(1rem, 3.5vw, 1.5rem); } }
@media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.2s !important; } }
```

## Preset Catalog

| # | Preset | Vibe | Best For | Fonts | Palette | Signature |
|---|--------|------|----------|-------|---------|-----------|
| 1 | Bold Signal | confident, high-impact | pitches, launches | Archivo Black + Space Grotesk | charcoal, hot orange, white | oversized numbers, contrast card |
| 2 | Electric Studio | clean, agency-polished | client decks | Manrope | black, white, cobalt | two-panel split |
| 3 | Creative Voltage | energetic, retro-modern | creative studios | Syne + Space Mono | electric blue, neon yellow, navy | halftone, badges |
| 4 | Dark Botanical | elegant, premium | luxury, narratives | Cormorant + IBM Plex Sans | near-black, ivory, blush, gold | blurred circles, fine rules |
| 5 | Notebook Tabs | editorial, tactile | reports, reviews | Bodoni Moda + DM Sans | cream paper, charcoal, pastel tabs | paper sheet, side tabs |
| 6 | Pastel Geometry | approachable, modern | onboarding, overviews | Plus Jakarta Sans | pale blue, cream, soft accents | vertical pills, soft shadows |
| 7 | Split Pastel | playful, creative | agency intros | Outfit | peach + lavender, mint | split backdrop, rounded tags |
| 8 | Vintage Editorial | witty, magazine-inspired | personal brands | Fraunces + Work Sans | cream, charcoal, warm accents | geometric accents, serif headlines |
| 9 | Neon Cyber | futuristic, kinetic | AI, infra | Clash Display + Satoshi | midnight navy, cyan, magenta | glow, grids, particles |
| 10 | Terminal Green | developer-focused | APIs, CLI | JetBrains Mono | GitHub dark + green | scan lines, monospace |
| 11 | Swiss Modern | minimal, data-forward | corporate, analytics | Archivo + Nunito | white, black, red | visible grids, asymmetry |
| 12 | Paper & Ink | literary, story-driven | essays, manifestos | Cormorant Garamond + Source Serif 4 | warm cream, charcoal, crimson | pull quotes, drop caps |

## Mood Mapping

| Mood | Presets |
|------|---------|
| Impressed / Confident | Bold Signal, Electric Studio, Dark Botanical |
| Excited / Energized | Creative Voltage, Neon Cyber, Split Pastel |
| Calm / Focused | Notebook Tabs, Paper & Ink, Swiss Modern |
| Inspired / Moved | Dark Botanical, Vintage Editorial, Pastel Geometry |

## Motion Mapping

| Feeling | Motion |
|---------|--------|
| Dramatic | slow fades, parallax, scale-ins |
| Techy | glow, particles, grid motion |
| Playful | springy easing, floating shapes |
| Professional | 200-300ms subtle transitions |
| Calm | restrained movement, whitespace-first |
| Editorial | staggered text and image interplay |

## CSS Gotchas

Never write `right: -clamp(...)`. Use `calc(-1 * clamp(...))`.

## Validation Viewports

Test at: 1920x1080, 1440x900, 1280x720, 1024x768, 768x1024, 375x667, 414x896.

## Anti-Patterns

Avoid: purple-on-white startup templates, Inter/Roboto as default, bullet walls, scrolling code, decorative illustrations when geometry suffices.
