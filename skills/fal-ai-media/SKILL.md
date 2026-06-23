---
name: fal-ai-media
description: Use when the user wants unified media generation via the fal.ai MCP for image, video, and audio, including text-to-image, text/image-to-video, text-to-speech, and video-to-audio workflows.
origin: ECC
---

# fal.ai Media Generation

> **Drift-prone skill.** fal.ai model IDs, pricing, inputs, and MCP tool names change quickly. Search or fetch current model metadata before promising a specific model, parameter, output format, or cost.

Generate images, videos, and audio using fal.ai models via MCP.

## When to Activate

- User wants to generate images from text prompts
- Creating videos from text or images
- Generating speech, music, or sound effects
- Any media generation task
- User says "generate image", "create video", "text to speech", "make a thumbnail", or similar

## MCP Requirement

fal.ai MCP server must be configured. Add to `~/.claude.json`:

```json
"fal-ai": {
  "command": "npx",
  "args": ["-y", "fal-ai-mcp-server"],
  "env": { "FAL_KEY": "YOUR_FAL_KEY_HERE" }
}
```

Get an API key at [fal.ai](https://fal.ai).

## MCP Tools

The fal.ai MCP provides `search`, `find`, `generate`, `result`, `status`, `cancel`, `estimate_cost`, `models`, and `upload`.

## Model Discovery

Find models for specific tasks:

```
search(query: "text to video")
find(endpoint_ids: ["fal-ai/seedance-1-0-pro"])
models()
```

## Tips

- Use `seed` for reproducible results when iterating on prompts
- Start with lower-cost models for prompt iteration, then switch to Pro for finals
- Image-to-video produces more controlled results than pure text-to-video

## Reference

See [references/fal-models.md](references/fal-models.md) for image and video model examples. See [references/fal-audio.md](references/fal-audio.md) for audio generation patterns.

## Related Skills

- `videodb` — Video processing, editing, and streaming
- `video-editing` — AI-powered video editing workflows
- `content-engine` — Content creation for social platforms
