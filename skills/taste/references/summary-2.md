- Film grain + subtle chromatic aberration on the dark frames; clean gloss on the bright frames.
- Macro detail on negative space: a hero object centered on black (key, eye, gear, petal, water).
- Subjects: winged figures, clouds, halos, angels, crystalline structures, candy-cyber portraits.

### Motion
- Slow, floating, weightless camera (drift, slow push, slow orbit) — *cloud* trance.
- Bursts of speed only at the drop. Otherwise everything breathes.
- Particles rising (embers, dust, glitter) — upward motion = ascension.

## The Editing Grammar (distilled)

From the reference edits, the techniques that recur and define the style:

1. **Beat-locked hard cuts.** No dissolves in the verse/drop. Cut on the kick. The eye should
   feel the BPM.
2. **Hero-on-black macro inserts.** A single sharp object centered in black negative space,
   held for 1–2 beats, then cut. Rhythmic montage of these = the cloud-trance signature.
3. **Bloom / explosion reveal.** A white or ember bloom that blows out the frame on a transient,
   then resolves into the next shot. The "divine flash" transition.
4. **Color-pop on monochrome.** Run a passage in B&W, then a single colored element (red eye,
   gold flame, pink hair) punches through on the downbeat.
5. **Speed-ramp into the drop.** Ramp footage from slow to fast across the last bar before the
   drop, hard-cut to tempo on the one.
6. **Caption keyword highlight (for talking-head / lyric sections only).** All-caps, one or two
   words highlighted in the accent color, synced to the vocal. Use for lyric video, not for the
   pure visualizer.
7. **Reaction PiP (for explainer/edit-commentary only).** Picture-in-picture talking head over
   b-roll. Out of scope for the music video itself; documented because the corpus uses it heavily.

**Do-nots:** crossfade transitions in tempo sections; more than one accent color per shot; a
shot held past its musical phrase; readable on-screen UI chrome (crop it out); mixed aspect
ratios in one timeline.

## The Pipeline — mixing the ECC video skills

This skill is the conductor. Each ECC skill is an instrument. Do not skip layers.

```
0. TASTE (this skill)        decide genre + mood + grammar BEFORE anything renders
1. STRUCTURE (video-editing) map the song: timestamps for intro/verse/drop/bridge/outro
2. GENERATE (fal-ai-media)   make b-roll per genre prompt-presets; throw away 80%
3. CUT (video-editing/FFmpeg) beat-cut + reframe to 9:16; assemble selects on the grid
4. COMPOSE (remotion-video-creation) overlays, blooms, lyric text, beat-synced sequencing
5. MOTION (motion-* skills)  easing curves, light-leak/particle motion, transition timing
6. AUDIO (fal-ai-media)      transition risers/impacts to sell the cuts (track itself is in Ableton)
7. POLISH                    grade to the palette above, final pacing pass, export
8. DISTRIBUTE (content-engine) platform-native versions + caption/cover
```

| Step | ECC skill to load | What it does here |
|------|-------------------|-------------------|
| Structure & cut | `video-editing` | FFmpeg cut/concat/reframe, EDL, scene/silence detection |
| Generate b-roll | `fal-ai-media` | image/video models per genre preset |
| Compose & overlay | `remotion-video-creation` | beat-synced `<Sequence>`s, text, blooms, masks |
| Motion timing | `motion-foundations`, `motion-patterns`, `motion-advanced`, `motion-ui` | easing, springs, light/particle motion |
| Server-side video | `videodb` | smart reframe, indexing if footage is large |
| Distribution | `content-engine` | per-platform cuts, covers, captions |

> Continued in [`summary-3.md`](summary-3.md)
