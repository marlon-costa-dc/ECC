---
name: ui-demo
description: Use when the user asks to create a polished demo video, screen recording, walkthrough, or tutorial of a web application and needs a professional WebM video with visible cursor, natural pacing, and clear storytelling flow.
origin: ECC
---

# UI Demo Video Recorder

Record polished demo videos of web applications using Playwright with an injected cursor overlay, natural pacing, and storytelling flow.

## When to Use

- User asks for a "demo video", "screen recording", "walkthrough", or "tutorial".
- User wants to showcase a feature or workflow visually.
- User needs a video for documentation, onboarding, or stakeholder presentation.

## Three-Phase Process

Every demo goes through **Discover → Rehearse → Record**. Never skip straight to recording.

### Phase 1: Discover

Explore each target page before scripting. Dump interactive elements (`input`, `select`, `textarea`, `button`, `[contenteditable]`) and capture tag, type, name, placeholder, text, and role. Record select options, required fields, dynamic fields, rich-text support, exact button labels, and table mappings. Produce a field map for each page.

### Phase 2: Rehearse

Run through all steps without recording. Verify every selector resolves using an `ensureVisible` helper that logs and fails loudly. Fix selectors and re-run until every selector passes.

### Phase 3: Record

Only record after discovery and rehearsal pass.

## Recording Principles

- **Flow**: Entry → Context → Action → Variation → Result.
- **Pacing**: 4s after login, 3s after navigation, 2s after clicks, 1.5–2s between major steps, 3s after final action, 25–40ms typing delay.
- **Cursor**: inject an SVG cursor after every navigation; never teleport it; move to targets before clicking.
- **Input**: use `pressSequentially` with a per-character delay; use smooth scroll with a 1.5s wait.
- **Subtitles**: inject a subtitle bar, use short `Step N - Action` text, clear during long pauses.

## References

- `references/field-discovery-and-rehearsal.md`
- `references/cursor-and-interaction.md`
- `references/subtitle-bar.md`
- `references/script-template.md`
