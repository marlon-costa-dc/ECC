---
name: manim-video
description: Use when the user wants a clean animated explainer for a technical concept, graph, system diagram, workflow, metric progression, or product walkthrough rather than a generic talking-head script or cinematic video.
origin: ECC
---

# Manim Video

Use Manim for precise, motion-driven explainers where structure and clarity matter more than photorealism.

## When to Activate

- Technical explainer animation
- Graph, workflow, architecture, metric progression, or system diagram
- Short product or launch explainer
- Visual should feel precise, not generically cinematic

## Requirements

- `manim` CLI for scene rendering
- `ffmpeg` for post-processing
- `video-editing` for final polish
- `remotion-video-creation` for composited UI, captions, or motion layers

## Workflow

1. Define the core visual thesis in one sentence.
2. Break the concept into 3–6 scenes; each scene proves one thing.
3. Write the scene outline before writing Manim code.
4. Render the smallest working version first.
5. Tighten typography, spacing, color, and pacing after the render works.
6. Hand off to the wider video stack only if it adds value.

## Scene Rules

- Each scene proves one thing.
- Prefer progressive reveal over full-screen clutter.
- Use motion to explain state change, not to keep the screen busy.
- Keep title cards short and meaningful.

## Render Conventions

- Default to 16:9 landscape.
- Start with a low-quality smoke test: `manim -ql <scene>.py <Class>`.
- Only raise quality after composition and timing are stable.
- Export one clean thumbnail frame that reads at social size.

## Network Graph Default

For social-graph and network-optimization explainers:

- Show the current graph before the optimized graph.
- Distinguish low-signal clutter from high-signal bridges.
- Highlight warm-path nodes and target clusters.

## Output

Return the core visual thesis, storyboard, scene outline, render plan, and any follow-on polish recommendations.

## Related Skills

- `video-editing` for final assembly
- `remotion-video-creation` for composited motion layers
- `content-engine` when the animation is part of a broader launch
