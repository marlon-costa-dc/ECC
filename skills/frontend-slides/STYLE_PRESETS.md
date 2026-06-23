---
name: frontend-slides-style-presets
description: Use when the user needs a reference for curated visual style presets, viewport-fit rules, density limits, mood mapping, and validation sizes for browser-based HTML presentations generated with the frontend-slides skill.
origin: ECC
---

# Style Presets Reference

Curated visual styles for `frontend-slides`. Include the full mandatory base CSS from `viewport-base.css` in every generated presentation.

## Viewport Fit Is Non-Negotiable

Each slide must fully fit in one viewport.

- Every `.slide` uses `height: 100vh; height: 100dvh; overflow: hidden;`.
- All typography and spacing scale with `clamp()` or viewport units.
- Images have `max-height` constraints; grids adapt with `auto-fit` + `minmax()`.
- Short-height breakpoints exist at 700px, 600px, and 500px.
- If anything feels cramped, split the slide.

## Density Limits

| Slide type | Maximum content |
| --- | --- |
| Title slide | 1 heading + 1 subtitle + optional tagline |
| Content slide | 1 heading + 4–6 bullets or 2 paragraphs |
| Feature grid | 6 cards maximum |
| Code slide | 8–10 lines maximum |
| Quote slide | 1 quote + attribution |
| Image slide | 1 image, under 60vh |

## Mood to Preset Mapping

| Mood | Good presets |
| --- | --- |
| Impressed / Confident | Bold Signal, Electric Studio, Dark Botanical |
| Excited / Energized | Creative Voltage, Neon Cyber, Split Pastel |
| Calm / Focused | Notebook Tabs, Paper & Ink, Swiss Modern |
| Inspired / Moved | Dark Botanical, Vintage Editorial, Pastel Geometry |

## Preset Catalog

| Preset | Vibe | Best for | Fonts | Palette | Signature |
| --- | --- | --- | --- | --- | --- |
| Bold Signal | confident, high-impact | pitch decks, launches | Archivo Black + Space Grotesk | charcoal, hot orange, white | oversized numbers, high-contrast card |
| Electric Studio | clean, agency-polished | client presentations | Manrope | black, white, cobalt | two-panel split, sharp alignment |
| Creative Voltage | energetic, retro-modern | creative studios | Syne + Space Mono | electric blue, neon yellow, navy | halftone textures, badges |
| Dark Botanical | elegant, premium | luxury, narratives | Cormorant + IBM Plex Sans | near-black, ivory, blush, gold | blurred circles, fine rules |
| Notebook Tabs | editorial, organized | reports, reviews | Bodoni Moda + DM Sans | cream paper, charcoal, pastel tabs | paper sheet, colored tabs |
| Pastel Geometry | approachable, modern | product overviews | Plus Jakarta Sans | pale blue, cream, soft accents | vertical pills, rounded cards |
| Split Pastel | playful, creative | agency intros, portfolios | Outfit | peach + lavender split | split backdrop, rounded tags |
| Vintage Editorial | witty, magazine-inspired | personal brands, storytelling | Fraunces + Work Sans | cream, charcoal, warm accents | geometric accents, serif headlines |
| Neon Cyber | futuristic, kinetic | AI, infra, dev tools | Clash Display + Satoshi | midnight navy, cyan, magenta | glow, grids, particles |
| Terminal Green | developer-focused | APIs, CLI demos | JetBrains Mono | GitHub dark + terminal green | scan lines, command-line framing |
| Swiss Modern | minimal, data-forward | corporate, analytics | Archivo + Nunito | white, black, signal red | visible grids, asymmetry |
| Paper & Ink | literary, story-driven | essays, manifestos | Cormorant Garamond + Source Serif 4 | warm cream, charcoal, crimson | pull quotes, drop caps |

## CSS Gotcha: Negating Functions

Never write `right: -clamp(...)` or `margin-left: -min(...)`. Browsers ignore them silently. Use `calc(-1 * clamp(...))` or `calc(-1 * min(...))` instead.

## Validation Sizes

Test at minimum:

- Desktop: `1920x1080`, `1440x900`, `1280x720`
- Tablet: `1024x768`, `768x1024`
- Mobile: `375x667`, `414x896`
- Landscape phone: `667x375`, `896x414`

## Anti-Patterns

- Purple-on-white startup templates
- Inter / Roboto / Arial as the visual voice unless explicitly utilitarian
- Bullet walls, tiny type, or scrolling code blocks
- Decorative illustrations when abstract geometry would work better
