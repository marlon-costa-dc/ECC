| Limitation | Detail |
|---|---|
| **No transitions or effects** | No crossfades, wipes, dissolves, or transitions between clips. All cuts are hard cuts. |
| **No video-on-video (picture-in-picture)** | `add_inline()` only accepts `VideoAsset`. You cannot overlay one video stream on top of another. Image overlays can approximate static PiP but not live video. |
| **No speed or playback control** | No slow-motion, fast-forward, reverse playback, or time remapping. `VideoAsset` has no `speed` parameter. |
| **No crop, zoom, or pan** | Cannot crop a region of a video frame, apply zoom effects, or pan across a frame. `video.reframe()` is for aspect-ratio conversion only. |
| **No video filters or color grading** | No brightness, contrast, saturation, hue, or color correction adjustments. |
| **No animated text** | `TextAsset` is static for its full duration. No fade-in/out, movement, or animation. For animated captions, use `CaptionAsset` with the Editor API. |
| **No mixed text styling** | A single `TextAsset` has one `TextStyle`. Cannot mix bold, italic, or colors within a single text block. |
| **No blank or solid-color clips** | Cannot create a solid color frame, black screen, or standalone title card. Text and image overlays require a `VideoAsset` beneath them on the inline track. |
| **No audio volume control** | `AudioAsset` has no `volume` parameter. Audio is either full volume or muted via `disable_other_tracks`. Cannot mix at a reduced level. |
| **No keyframe animation** | Cannot change overlay properties over time (e.g., move an image from position A to B). |

### Constraints

| Constraint | Detail |
|---|---|
| **Audio fade max 5 seconds** | `fade_in_duration` and `fade_out_duration` are capped at 5 seconds each. |
| **Overlay positioning is absolute** | Overlays use absolute timestamps from the timeline start. Rearranging inline clips does not move their overlays. |
| **Inline track is video only** | `add_inline()` only accepts `VideoAsset`. Audio, image, and text must use `add_overlay()`. |
| **No overlay-to-clip binding** | Overlays are placed at a fixed timeline timestamp. There is no way to attach an overlay to a specific inline clip so it moves with it. |

## Tips

- **Non-destructive**: Timelines never modify source media. You can create multiple timelines from the same assets.
- **Overlay stacking**: Multiple overlays can start at the same timestamp. Audio overlays mix together; image/text overlays layer in add-order.
- **Inline is VideoAsset only**: `add_inline()` only accepts `VideoAsset`. Use `add_overlay()` for `AudioAsset`, `ImageAsset`, and `TextAsset`.
- **Trim precision**: `start`/`end` on `VideoAsset` and `AudioAsset` are in seconds.
- **Muting video audio**: Set `disable_other_tracks=True` on `AudioAsset` to mute the original video audio when overlaying music or narration.
- **Fade limits**: `fade_in_duration` and `fade_out_duration` on `AudioAsset` have a maximum of 5 seconds.
- **Generated media**: Use `coll.generate_music()`, `coll.generate_sound_effect()`, `coll.generate_voice()`, and `coll.generate_image()` to create media that can be used as timeline assets immediately.
