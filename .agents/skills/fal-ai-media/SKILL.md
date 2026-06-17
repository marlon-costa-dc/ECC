---
name: fal-ai-media
description: Use when generating images, video, or audio via the fal.ai MCP, including Nano Banana, Seedance, Kling, Veo 3, CSM-1B, and ThinkSound models and pipelines.
---

# fal-ai-media

## Quando usar
- Generate images, videos, speech, music, or sound effects with AI
- User says "generate image", "create video", "text to speech", "make a thumbnail", or similar

## O que fazer
1. Ensure the fal.ai MCP server is configured with a valid `FAL_KEY`.
2. Pick the right model for the task.
3. Call `generate` with required input parameters.
4. For image/video inputs, `upload` the file first and pass the returned URL.
5. For expensive jobs, run `estimate_cost` before generating.
6. Poll async jobs with `result` or `status` if output is not immediate.

## Regras críticas
- **Images:** `fal-ai/nano-banana-2` for drafts; `fal-ai/nano-banana-pro` for production.
- **Videos:** `fal-ai/seedance-1-0-pro` for motion quality; `fal-ai/kling-video/v3/pro` for native audio; `fal-ai/veo-3` for generated sound.
- **Audio speech:** `fal-ai/csm-1b`; `fal-ai/thinksound` for video-matched audio.
- Common image params: `prompt`, `image_size`, `num_images`, `seed`, `guidance_scale`.
- Common video params: `prompt`, `duration`, `aspect_ratio`, `seed`, `image_url`.
- Always set `seed` when iterating for reproducible results.
- Start with cheaper models for iteration, then upscale to Pro/final models.

## Exemplo
```
generate(
  model_name: "fal-ai/nano-banana-2",
  input: {
    "prompt": "a futuristic cityscape at sunset, cyberpunk style",
    "image_size": "landscape_16_9",
    "num_images": 1,
    "seed": 42
  }
)
```
