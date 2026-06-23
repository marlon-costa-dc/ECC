| Voice/lyric VO | `video-editing` (ElevenLabs section) | only if a spoken layer is needed |

## Beat Math (lock cuts to the song)

The current track is **138 BPM, B minor**. Constants:

- `seconds_per_beat = 60 / 138 = 0.43478s`
- `frames_per_beat   = fps × 0.43478`  →  **24fps: 10.43**, **30fps: 13.04**, **60fps: 26.09**
- `1 bar (4 beats)   = 1.7391s`  →  30fps: **52.17 frames**
- `8-bar phrase      = 13.913s`  →  the loop length from the track

In Remotion, snap every `from={}` to a beat:
```ts
const FPS = 30;
const BPM = 138;
const beat = (n: number) => Math.round(n * (60 / BPM) * FPS); // beat(n) → frame
// cut on beats 0,4,8,... :  <Sequence from={beat(0)} durationInFrames={beat(4)}> ...
```

## Beat-Mapped Shot Plan (this music video)

The song arrangement (from the project's own notes) is
**Intro → Verse → Drop → Bridge → Drop → Outro (~2:05)**. Map taste to each section:

| Section | Genre/mood lean | Grammar | Shot ideas |
|---------|-----------------|---------|------------|
| **Intro** | Ethereal/divine, near-black | slow push, no cuts | ember bloom in the void; a single shaft of gold; dust rising |
| **Verse** | Dark + macro hero-on-black | hard cuts every 2 beats | key, eye, gear, water drop, petal — rhythmic macro montage |
| **Drop** | Hyperpop bloom + crystalline | speed-ramp in, cut on the one, fast | candy-pink figure, chrome, iridescent bokeh, winged ascension |
| **Bridge** | Spiritualism, weightless | one long held shot, color-pop | clouds + halo; single red accent punches once |
| **Drop 2** | as Drop, intensify | add divine-flash blooms on transients | wings open, glitter burst, light leaks maxed |
| **Outro** | Glacial folk, cold calm | slow fade to black | crystalline structure dissolving; ember dies out |

## fal.ai Prompt Presets (per mood)

Use with `fal-ai-media`. Each preset is the genre rendered to the project palette. Append
`9:16, vertical, cinematic, film grain, volumetric light, no text, no watermark` to all.

- **Divine void:** "a single molten-gold ember bloom rising in an infinite near-black void,
  deep shadow, one warm light source, weightless dust particles, holy, high contrast"
- **Macro hero:** "extreme macro of an antique brass key / a human eye / interlocking gears,
  centered on pure black negative space, razor-sharp detail, single rim light"
- **Crystalline bloom:** "iridescent violet-cyan-magenta crystalline bokeh, glittering light
  refraction, dreamy lens flares, heavenly glow, soft focus, hyperpop angelcore"
- **Candy-cyber portrait:** "candy-pink-haired figure, glossy chrome accents, bright blue sky,
  Y2K hyperpop, clean gloss, saturated, kawaii-cyber"
- **Winged ascension:** "a winged figure ascending into clouds, halo of light, bone-white and
  gold, volumetric god-rays, ethereal, religious iconography, soft"
- **Cold outro:** "pale crystalline ice structure slowly dissolving, glacial folk, cold blue
  and bone white, minimal, calm, fading to black"

Generate 6–10 per preset, keep 2–3. For motion, animate stills with an image-to-video model
or generate short clips directly; keep camera moves slow per the Motion rules.

> Continued in [`summary-4.md`](summary-4.md)
