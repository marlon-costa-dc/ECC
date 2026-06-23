# Timeline Editing Guide

VideoDB provides a non-destructive timeline editor for composing videos from multiple assets, adding text and image overlays, mixing audio tracks, and trimming clips — all server-side without re-encoding or local tools. Use this for trimming, combining clips, overlaying audio/music on video, adding subtitles, and layering text or images.

## Prerequisites

Videos, audio, and images **must be uploaded** to a collection before they can be used as timeline assets. For caption overlays, the video must also be **indexed for spoken words**.

## Core Concepts

### Timeline

A `Timeline` is a virtual composition layer. Assets are placed on it either **inline** (sequentially on the main track) or as **overlays** (layered at a specific timestamp). Nothing modifies the original media; the final stream is compiled on demand.

```python
from videodb.timeline import Timeline

timeline = Timeline(conn)
```

### Assets

Every element on a timeline is an **asset**. VideoDB provides five asset types:

| Asset | Import | Primary Use |
|-------|--------|-------------|
| `VideoAsset` | `from videodb.asset import VideoAsset` | Video clips (trim, sequencing) |
| `AudioAsset` | `from videodb.asset import AudioAsset` | Music, SFX, narration |
| `ImageAsset` | `from videodb.asset import ImageAsset` | Logos, thumbnails, overlays |
| `TextAsset` | `from videodb.asset import TextAsset, TextStyle` | Titles, captions, lower-thirds |
| `CaptionAsset` | `from videodb.editor import CaptionAsset` | Auto-rendered subtitles (Editor API) |

## Building a Timeline

### Add Video Clips Inline

Inline assets play one after another on the main video track. The `add_inline` method only accepts `VideoAsset`:

```python
from videodb.asset import VideoAsset

video_a = coll.get_video(video_id_a)
video_b = coll.get_video(video_id_b)

timeline = Timeline(conn)
timeline.add_inline(VideoAsset(asset_id=video_a.id))
timeline.add_inline(VideoAsset(asset_id=video_b.id))

stream_url = timeline.generate_stream()
```

### Trim / Sub-clip

Use `start` and `end` on a `VideoAsset` to extract a portion:

```python
# Take only seconds 10–30 from the source video
clip = VideoAsset(asset_id=video.id, start=10, end=30)
timeline.add_inline(clip)
```

### VideoAsset Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `asset_id` | `str` | required | Video media ID |
| `start` | `float` | `0` | Trim start (seconds) |
| `end` | `float\|None` | `None` | Trim end (`None` = full) |

> **Warning:** The SDK does not validate negative timestamps. Passing `start=-5` is silently accepted but produces broken or unexpected output. Always ensure `start >= 0`, `start < end`, and `end <= video.length` before creating a `VideoAsset`.

## Text Overlays

Add titles, lower-thirds, or captions at any point on the timeline:

```python
from videodb.asset import TextAsset, TextStyle

title = TextAsset(
    text="Welcome to the Demo",
    duration=5,
    style=TextStyle(
        fontsize=36,
        fontcolor="white",
        boxcolor="black",
        alpha=0.8,
        font="Sans",
    ),
)

# Overlay the title at the very start (t=0)
timeline.add_overlay(0, title)
```

### TextStyle Parameters

---

For additional details, continue reading `editor-1.md`, `editor-2.md`, `editor-3.md`.
