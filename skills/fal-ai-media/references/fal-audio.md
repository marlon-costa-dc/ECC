> **Drift-prone reference.** fal.ai model IDs, pricing, inputs, and MCP tool names change quickly. Search or fetch current model metadata before promising a specific model, parameter, output format, or cost.

## CSM-1B (Conversational Speech)

```
generate(
  app_id: "fal-ai/csm-1b",
  input_data: {
    "text": "Hello, welcome to the demo. Let me show you how this works.",
    "speaker_id": 0
  }
)
```

## ThinkSound (Video-to-Audio)

```
generate(
  app_id: "fal-ai/thinksound",
  input_data: {
    "video_url": "<video_url>",
    "prompt": "ambient forest sounds with birds chirping"
  }
)
```

## ElevenLabs (direct API)

```python
import os, requests
resp = requests.post(
    "https://api.elevenlabs.io/v1/text-to-speech/<voice_id>",
    headers={"xi-api-key": os.environ["ELEVENLABS_API_KEY"], "Content-Type": "application/json"},
    json={
        "text": "Your text here",
        "model_id": "eleven_turbo_v2_5",
        "voice_settings": {"stability": 0.5, "similarity_boost": 0.75}
    }
)
with open("output.mp3", "wb") as f:
    f.write(resp.content)
```

## VideoDB Generative Audio

If VideoDB is configured:

```python
audio = coll.generate_voice(text="Your narration here", voice="alloy")
music = coll.generate_music(prompt="upbeat electronic background music", duration=30)
sfx = coll.generate_sound_effect(prompt="thunder crack followed by rain")
```
