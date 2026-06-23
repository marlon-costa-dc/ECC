# Build an editor timeline with tracks and clips
editor_tl = EditorTimeline(conn)
track = Track()
track.add_clip(start=0, clip=Clip(asset=caption, duration=video.length))
editor_tl.add_track(track)
stream_url = editor_tl.generate_stream()
```

### CaptionAsset Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `src` | `str` | `"auto"` | Caption source (`"auto"` or base64 ASS string) |
| `font` | `FontStyling\|None` | `FontStyling()` | Font styling (name, size, bold, italic, etc.) |
| `primary_color` | `str` | `"&H00FFFFFF"` | Primary text colour (ASS format) |
| `secondary_color` | `str` | `"&H000000FF"` | Secondary text colour (ASS format) |
| `back_color` | `str` | `"&H00000000"` | Background colour (ASS format) |
| `border` | `BorderAndShadow\|None` | `BorderAndShadow()` | Border and shadow styling |
| `position` | `Positioning\|None` | `Positioning()` | Caption alignment and margins |
| `animation` | `CaptionAnimation\|None` | `None` | Animation effect (e.g., `box_highlight`, `reveal`, `karaoke`) |

## Compiling & Streaming

After assembling a timeline, compile it into a streamable URL. Streams are generated instantly - no render wait times.

```python
stream_url = timeline.generate_stream()
print(f"Stream: {stream_url}")
```

For more streaming options (segment streams, search-to-stream, audio playback), see [streaming.md](streaming.md).

## Complete Workflow Examples

### Highlight Reel with Title Card

```python
import videodb
from videodb import SearchType
from videodb.exceptions import InvalidRequestError
from videodb.timeline import Timeline
from videodb.asset import VideoAsset, TextAsset, TextStyle

conn = videodb.connect()
coll = conn.get_collection()
video = coll.get_video("your-video-id")

# 1. Search for key moments
video.index_spoken_words(force=True)
try:
    results = video.search("product announcement", search_type=SearchType.semantic)
    shots = results.get_shots()
except InvalidRequestError as exc:
    if "No results found" in str(exc):
        shots = []
    else:
        raise

# 2. Build timeline
timeline = Timeline(conn)

# Title card
title = TextAsset(
    text="Product Launch Highlights",
    duration=4,
    style=TextStyle(fontsize=48, fontcolor="white", boxcolor="#1a1a2e", alpha=0.95),
)
timeline.add_overlay(0, title)

# Append each matching clip
for shot in shots:
    asset = VideoAsset(asset_id=shot.video_id, start=shot.start, end=shot.end)
    timeline.add_inline(asset)

# 3. Generate stream
stream_url = timeline.generate_stream()
print(f"Highlight reel: {stream_url}")
```

### Logo Overlay with Background Music

```python
import videodb
from videodb.timeline import Timeline
from videodb.asset import VideoAsset, AudioAsset, ImageAsset

conn = videodb.connect()
coll = conn.get_collection()

main_video = coll.get_video(main_video_id)
music = coll.get_audio(music_id)
logo = coll.get_image(logo_id)

timeline = Timeline(conn)

# Main video track
timeline.add_inline(VideoAsset(asset_id=main_video.id))

# Background music — disable_other_tracks=False to mix with video audio
timeline.add_overlay(
    0,
    AudioAsset(asset_id=music.id, disable_other_tracks=False, fade_in_duration=3),
)

# Logo in top-right corner for first 10 seconds
timeline.add_overlay(
    0,
    ImageAsset(asset_id=logo.id, duration=10, x=1140, y=20, width=120, height=60),
)

stream_url = timeline.generate_stream()
print(f"Final video: {stream_url}")
```

### Multi-Clip Montage from Multiple Videos

```python
import videodb
from videodb.timeline import Timeline
from videodb.asset import VideoAsset, TextAsset, TextStyle

conn = videodb.connect()
coll = conn.get_collection()

clips = [
    {"video_id": "vid_001", "start": 5, "end": 15, "label": "Scene 1"},
    {"video_id": "vid_002", "start": 0, "end": 20, "label": "Scene 2"},
    {"video_id": "vid_003", "start": 30, "end": 45, "label": "Scene 3"},
]

timeline = Timeline(conn)
timeline_offset = 0.0

for clip in clips:
    # Add a label as an overlay on each clip
    label = TextAsset(
        text=clip["label"],
        duration=2,
        style=TextStyle(fontsize=32, fontcolor="white", boxcolor="#333333"),
    )
    timeline.add_inline(
        VideoAsset(asset_id=clip["video_id"], start=clip["start"], end=clip["end"])
    )
    timeline.add_overlay(timeline_offset, label)
    timeline_offset += clip["end"] - clip["start"]

stream_url = timeline.generate_stream()
print(f"Montage: {stream_url}")
```

## Two Timeline APIs

VideoDB has two separate timeline systems. They are **not interchangeable**:

| | `videodb.timeline.Timeline` | `videodb.editor.Timeline` (Editor API) |
|---|---|---|
| **Import** | `from videodb.timeline import Timeline` | `from videodb.editor import Timeline as EditorTimeline` |
| **Assets** | `VideoAsset`, `AudioAsset`, `ImageAsset`, `TextAsset` | `CaptionAsset`, `Clip`, `Track` |
| **Methods** | `add_inline()`, `add_overlay()` | `add_track()` with `Track` / `Clip` |
| **Best for** | Video composition, overlays, multi-clip editing | Caption/subtitle styling with animations |

Do not mix assets from one API into the other. `CaptionAsset` only works with the Editor API. `VideoAsset` / `AudioAsset` / `ImageAsset` / `TextAsset` only work with `videodb.timeline.Timeline`.

## Limitations & Constraints

The timeline editor is designed for **non-destructive linear composition**. The following operations are **not supported**:

### Not Possible

---

Continue in `editor-3.md`.
