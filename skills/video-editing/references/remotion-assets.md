> **Reference.** Prefer the latest Remotion and ElevenLabs docs for current APIs.

## Remotion Composition

```tsx
import { AbsoluteFill, Sequence, Video, useCurrentFrame } from "remotion";

export const VlogComposition: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={300}>
        <Video src="/segments/intro.mp4" />
      </Sequence>
      <Sequence from={30} durationInFrames={90}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <h1 style={{ fontSize: 72, color: "white", textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}>
            The AI Editing Stack
          </h1>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={300} durationInFrames={450}>
        <Video src="/segments/demo.mp4" />
      </Sequence>
    </AbsoluteFill>
  );
};
```

Render: `npx remotion render src/index.ts VlogComposition output.mp4`

See the [Remotion docs](https://www.remotion.dev/docs) for detailed patterns.

## Generated Assets

### Voiceover with ElevenLabs

```python
import os, requests
resp = requests.post(
    f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}",
    headers={"xi-api-key": os.environ["ELEVENLABS_API_KEY"], "Content-Type": "application/json"},
    json={
        "text": "Your narration text here",
        "model_id": "eleven_turbo_v2_5",
        "voice_settings": {"stability": 0.5, "similarity_boost": 0.75}
    }
)
with open("voiceover.mp3", "wb") as f:
    f.write(resp.content)
```

### Music and SFX with fal.ai

Use the `fal-ai-media` skill for background music, ThinkSound video-to-audio, and transition sounds.

### Generated visuals with fal.ai

```
generate(app_id: "fal-ai/nano-banana-pro", input_data: {
  "prompt": "professional thumbnail for tech vlog, dark background, code on screen",
  "image_size": "landscape_16_9"
})
```

### VideoDB generative audio

If VideoDB is configured:

```python
voiceover = coll.generate_voice(text="Narration here", voice="alloy")
music = coll.generate_music(prompt="lo-fi background for coding vlog", duration=120)
sfx = coll.generate_sound_effect(prompt="subtle whoosh transition")
```

## What Each Tool Does Best

| Tool | Strength | Weakness |
|------|----------|----------|
| Claude / Codex | Organization, planning, code generation | Not the creative taste layer |
| FFmpeg | Deterministic cuts, batch processing, format conversion | No visual editing UI |
| Remotion | Programmable overlays, composable scenes, reusable templates | Learning curve for non-devs |
| Screen Studio | Polished screen recordings immediately | Only screen capture |
| ElevenLabs | Voice, narration, music, SFX | Not the center of the workflow |
| Descript / CapCut | Final pacing, captions, polish | Manual, not automatable |
