| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `fontsize` | `int` | `24` | Font size in pixels |
| `fontcolor` | `str` | `"black"` | CSS colour name or hex |
| `fontcolor_expr` | `str` | `""` | Dynamic font colour expression |
| `alpha` | `float` | `1.0` | Text opacity (0.0–1.0) |
| `font` | `str` | `"Sans"` | Font family |
| `box` | `bool` | `True` | Enable background box |
| `boxcolor` | `str` | `"white"` | Background box colour |
| `boxborderw` | `str` | `"10"` | Box border width |
| `boxw` | `int` | `0` | Box width override |
| `boxh` | `int` | `0` | Box height override |
| `line_spacing` | `int` | `0` | Line spacing |
| `text_align` | `str` | `"T"` | Text alignment within the box |
| `y_align` | `str` | `"text"` | Vertical alignment reference |
| `borderw` | `int` | `0` | Text border width |
| `bordercolor` | `str` | `"black"` | Text border colour |
| `expansion` | `str` | `"normal"` | Text expansion mode |
| `basetime` | `int` | `0` | Base time for time-based expressions |
| `fix_bounds` | `bool` | `False` | Fix text bounds |
| `text_shaping` | `bool` | `True` | Enable text shaping |
| `shadowcolor` | `str` | `"black"` | Shadow colour |
| `shadowx` | `int` | `0` | Shadow X offset |
| `shadowy` | `int` | `0` | Shadow Y offset |
| `tabsize` | `int` | `4` | Tab size in spaces |
| `x` | `str` | `"(main_w-text_w)/2"` | Horizontal position expression |
| `y` | `str` | `"(main_h-text_h)/2"` | Vertical position expression |

## Audio Overlays

Layer background music, sound effects, or voiceover on top of the video track:

```python
from videodb.asset import AudioAsset

music = coll.get_audio(music_id)

audio_layer = AudioAsset(
    asset_id=music.id,
    disable_other_tracks=False,
    fade_in_duration=2,
    fade_out_duration=2,
)

# Start the music at t=0, overlaid on the video track
timeline.add_overlay(0, audio_layer)
```

### AudioAsset Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `asset_id` | `str` | required | Audio media ID |
| `start` | `float` | `0` | Trim start (seconds) |
| `end` | `float\|None` | `None` | Trim end (`None` = full) |
| `disable_other_tracks` | `bool` | `True` | When True, mutes other audio tracks |
| `fade_in_duration` | `float` | `0` | Fade-in seconds (max 5) |
| `fade_out_duration` | `float` | `0` | Fade-out seconds (max 5) |

## Image Overlays

Add logos, watermarks, or generated images as overlays:

```python
from videodb.asset import ImageAsset

logo = coll.get_image(logo_id)

logo_overlay = ImageAsset(
    asset_id=logo.id,
    duration=10,
    width=120,
    height=60,
    x=20,
    y=20,
)

timeline.add_overlay(0, logo_overlay)
```

### ImageAsset Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `asset_id` | `str` | required | Image media ID |
| `width` | `int\|str` | `100` | Display width |
| `height` | `int\|str` | `100` | Display height |
| `x` | `int` | `80` | Horizontal position (px from left) |
| `y` | `int` | `20` | Vertical position (px from top) |
| `duration` | `float\|None` | `None` | Display duration (seconds) |

## Caption Overlays

There are two ways to add captions to video.

### Method 1: Subtitle Workflow (simplest)

Use `video.add_subtitle()` to burn subtitles directly onto a video stream. This uses the `videodb.timeline.Timeline` internally:

```python
from videodb import SubtitleStyle

# Video must have spoken words indexed first (force=True skips if already done)
video.index_spoken_words(force=True)

# Add subtitles with default styling
stream_url = video.add_subtitle()

# Or customise the subtitle style
stream_url = video.add_subtitle(style=SubtitleStyle(
    font_name="Arial",
    font_size=22,
    primary_colour="&H00FFFFFF",
    bold=True,
))
```

### Method 2: Editor API (advanced)

The Editor API (`videodb.editor`) provides a track-based composition system with `CaptionAsset`, `Clip`, `Track`, and its own `Timeline`. This is a separate API from the `videodb.timeline.Timeline` used above.

```python
from videodb.editor import (
    CaptionAsset,
    Clip,
    Track,
    Timeline as EditorTimeline,
    FontStyling,
    BorderAndShadow,
    Positioning,
    CaptionAnimation,
)

# Video must have spoken words indexed first (force=True skips if already done)
video.index_spoken_words(force=True)

# Create a caption asset
caption = CaptionAsset(
    src="auto",
    font=FontStyling(name="Clear Sans", size=30),
    primary_color="&H00FFFFFF",
    back_color="&H00000000",
    border=BorderAndShadow(outline=1),
    position=Positioning(margin_v=30),
    animation=CaptionAnimation.box_highlight,
)

---

Continue in `editor-2.md`.
