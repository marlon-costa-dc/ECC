## FFmpeg Recipes (cut + reframe)

```bash
# Reframe any landscape/raw clip to 9:16 (center crop)
ffmpeg -i in.mp4 -vf "crop=ih*9/16:ih,scale=1080:1920" v.mp4

# Beat-cut a clip to exactly N beats at 138 BPM (e.g. 2 beats = 0.8696s)
ffmpeg -i in.mp4 -t 0.8696 -c copy beat2.mp4

# Concatenate beat-selects into the verse montage
for f in selects/*.mp4; do echo "file '$f'"; done > concat.txt
ffmpeg -f concat -safe 0 -i concat.txt -c copy verse.mp4

# Strip UI chrome / status bar from a screen-recorded reference (crop top+bottom)
ffmpeg -i reel.mp4 -vf "crop=iw:ih-300:0:150" clean.mp4
```

## Remotion Composition Skeleton (beat-synced)

```tsx
import { AbsoluteFill, Sequence, Video, Img, useCurrentFrame, interpolate } from "remotion";

const FPS = 30, BPM = 138;
const beat = (n: number) => Math.round(n * (60 / BPM) * FPS);

const Bloom: React.FC = () => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 3, 12], [0, 1, 0], { extrapolateRight: "clamp" }); // divine flash on a transient
  return <AbsoluteFill style={{ background: "radial-gradient(#fff,#ffb24d)", opacity: o, mixBlendMode: "screen" }} />;
};

export const AngelcoreMV: React.FC = () => (
  <AbsoluteFill style={{ background: "#05060a" }}>
    {/* Verse: macro hero-on-black, hard cut every 2 beats */}
    <Sequence from={beat(0)} durationInFrames={beat(2)}><Video src="/selects/key.mp4" /></Sequence>
    <Sequence from={beat(2)} durationInFrames={beat(2)}><Video src="/selects/eye.mp4" /></Sequence>
    <Sequence from={beat(4)} durationInFrames={beat(2)}><Video src="/selects/gear.mp4" /></Sequence>
    {/* Drop: crystalline bloom + flash on the one */}
    <Sequence from={beat(8)} durationInFrames={beat(16)}><Video src="/selects/crystalline.mp4" /></Sequence>
    <Sequence from={beat(8)} durationInFrames={beat(1)}><Bloom /></Sequence>
  </AbsoluteFill>
);
```
Render: `npx remotion render src/index.ts AngelcoreMV out.mp4`. See `remotion-video-creation`
for project setup, audio track binding, and render flags.

## Key Principles

1. **Decide the genre before the first generation.** Pick one primary family + one accent.
2. **One accent color per shot.** Gold in the dark, iridescence in the light, red once.
3. **Every hard cut lands on a beat.** Use the beat math; no transitions in tempo sections.
4. **Hero-on-black macro is the signature move.** Master it; it carries the verses.
5. **Generate 10, keep 2.** Coherence comes from rejection, not from prompting harder.
6. **Crop the chrome.** No status bars, captions, or UI in the final frame.
7. **Taste is decided first and judged last.** Set the direction, then defend it on every cut.

## Related Skills

- `video-editing` — the mechanical pipeline (FFmpeg, reframe, EDL, polish) this sits on top of
- `remotion-video-creation` — programmable beat-synced composition and rendering
- `fal-ai-media` — generate the b-roll, transition SFX, and risers
- `motion-foundations`, `motion-patterns`, `motion-advanced`, `motion-ui` — easing and motion timing

> Continued in [`summary-5.md`](summary-5.md)
