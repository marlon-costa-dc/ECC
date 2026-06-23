---
name: video-editing
description: Use when the user wants AI-assisted video editing workflows for cutting, structuring, and augmenting real footage through the pipeline from raw capture to final polish using FFmpeg, Remotion, ElevenLabs, fal.ai, Descript, or CapCut, including vlogs and demo videos.
origin: ECC
---

# Video Editing

AI-assisted editing for real footage. Not generation from prompts.

## When to Activate

- User wants to edit, cut, or structure video footage
- Turning long recordings into short-form content
- Building vlogs, tutorials, or demo videos from raw capture
- Reframing video for different platforms

## Core Thesis

AI video editing is useful when you stop asking it to create the whole video and start using it to compress, structure, and augment real footage. The value is compression, not generation.

## The Pipeline

Capture → Organization (Claude/Codex) → Deterministic Cuts (FFmpeg) → Programmable Composition (Remotion) → Generated Assets (ElevenLabs / `fal-ai-media`) → Final Polish (Descript / CapCut).

## Layer Guide

- **Capture** — Screen Studio, raw camera footage, or `videodb` desktop capture.
- **Organization** — transcribe, label, plan structure, find dead sections, and scaffold FFmpeg/Remotion code.
- **Deterministic Cuts** — FFmpeg splits, trims, concatenates, and preprocesses. See [references/editing-commands.md](references/editing-commands.md).
- **Programmable Composition** — Remotion for overlays, motion graphics, and reusable scenes. See [references/remotion-assets.md](references/remotion-assets.md).
- **Generated Assets** — voiceover, music, SFX, and insert shots with ElevenLabs, `fal-ai-media`, or VideoDB generative audio.
- **Final Polish** — Descript or CapCut for pacing, captions, color grading, final audio mix, and export.

## Social Media Reframing

See [references/platform-reframing.md](references/platform-reframing.md) for aspect ratios, FFmpeg crop commands, and VideoDB smart reframe.

## Related Skills

- `fal-ai-media` — AI image, video, and audio generation
- `videodb` — Server-side video processing, indexing, and streaming
- `content-engine` — Platform-native content distribution
