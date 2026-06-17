---
name: video-editing
description: Use when editing, cutting, structuring, or augmenting real video footage with FFmpeg, Remotion, ElevenLabs, fal.ai, Descript, or CapCut for publishing across platforms.
---

# video-editing

## What to do
1. **Capture**: gather raw footage (Screen Studio, camera, VideoDB desktop capture).
2. **Organize**: transcribe, label themes, plan structure, identify dead sections, generate an edit decision list.
3. **Cut**: use FFmpeg for splitting, trimming, concatenating, normalizing audio, proxies.
4. **Compose**: use Remotion for overlays, lower thirds, data visualizations, transitions, reusable templates.
5. **Generate assets**: ElevenLabs for voiceover; fal-ai-media for music, SFX, inserts, thumbnails.
6. **Polish**: finish pacing, captions, color, audio mix, export in Descript or CapCut.

## Critical rules
- Edit real footage; don't generate videos from prompts.
- Structure before style; get the story right first.
- Use FFmpeg for deterministic cuts, batch processing, format conversion.
- Use Remotion for anything done more than once.
- Generate assets only when they don't already exist.
- AI clears repetitive work; you make final creative calls.

## Examples

Extract a segment and normalize audio:
```bash
ffmpeg -i raw.mp4 -ss 00:12:30 -to 00:15:45 -c copy segment.mp4
ffmpeg -i segment.mp4 -af loudnorm=I=-16:TP=-1.5:LRA=11 -c:v copy final.mp4
```

Render a Remotion composition:
```bash
npx remotion render src/index.ts VlogComposition output.mp4
```

## Related skills
- `fal-ai-media` — AI image, video, and audio generation
- `videodb` — Server-side video processing, indexing, and streaming
- `content-engine` — Platform-native content distribution
