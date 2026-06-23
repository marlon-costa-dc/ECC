| Method | Returns | Description |
|--------|---------|-------------|
| `coll.get_videos()` | `list[Video]` | List all videos |
| `coll.get_video(video_id)` | `Video` | Get specific video |
| `coll.get_audios()` | `list[Audio]` | List all audios |
| `coll.get_audio(audio_id)` | `Audio` | Get specific audio |
| `coll.get_images()` | `list[Image]` | List all images |
| `coll.get_image(image_id)` | `Image` | Get specific image |
| `coll.upload(url=None, file_path=None, media_type=None, name=None)` | `Video\|Audio\|Image` | Upload media |
| `coll.search(query, search_type, index_type, score_threshold, namespace, scene_index_id, ...)` | `SearchResult` | Search across collection (semantic only; keyword and scene search raise `NotImplementedError`) |
| `coll.generate_image(prompt, aspect_ratio="1:1")` | `Image` | Generate image with AI |
| `coll.generate_video(prompt, duration=5)` | `Video` | Generate video with AI |
| `coll.generate_music(prompt, duration=5)` | `Audio` | Generate music with AI |
| `coll.generate_sound_effect(prompt, duration=2)` | `Audio` | Generate sound effect |
| `coll.generate_voice(text, voice_name="Default")` | `Audio` | Generate speech from text |
| `coll.generate_text(prompt, model_name="basic", response_type="text")` | `dict` | LLM text generation — access result via `["output"]` |
| `coll.dub_video(video_id, language_code)` | `Video` | Dub video into another language |
| `coll.record_meeting(meeting_url, bot_name, ...)` | `Meeting` | Record a live meeting |
| `coll.create_capture_session(...)` | `CaptureSession` | Create a capture session (see [capture-reference.md](capture-reference.md)) |
| `coll.get_capture_session(...)` | `CaptureSession` | Retrieve capture session (see [capture-reference.md](capture-reference.md)) |
| `coll.connect_rtstream(url, name, ...)` | `RTStream` | Connect to a live stream (see [rtstream-reference.md](rtstream-reference.md)) |
| `coll.make_public()` | `None` | Make collection public |
| `coll.make_private()` | `None` | Make collection private |
| `coll.delete_video(video_id)` | `None` | Delete a video |
| `coll.delete_audio(audio_id)` | `None` | Delete an audio |
| `coll.delete_image(image_id)` | `None` | Delete an image |
| `coll.delete()` | `None` | Delete the collection |

### Upload Parameters

```python
video = coll.upload(
    url=None,            # Remote URL (HTTP, YouTube)
    file_path=None,      # Local file path
    media_type=None,     # "video", "audio", or "image" (auto-detected if omitted)
    name=None,           # Custom name for the media
    description=None,    # Description
    callback_url=None,   # Webhook URL for async notification
)
```

## Video Object

```python
video = coll.get_video(video_id)
```

### Video Properties

| Property | Type | Description |
|----------|------|-------------|
| `video.id` | `str` | Unique video ID |
| `video.collection_id` | `str` | Parent collection ID |
| `video.name` | `str` | Video name |
| `video.description` | `str` | Video description |
| `video.length` | `float` | Duration in seconds |
| `video.stream_url` | `str` | Default stream URL |
| `video.player_url` | `str` | Player embed URL |
| `video.thumbnail_url` | `str` | Thumbnail URL |

### Video Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `video.generate_stream(timeline=None)` | `str` | Generate stream URL (optional timeline of `[(start, end)]` tuples) |
| `video.play()` | `str` | Open stream in browser, returns player URL |
| `video.index_spoken_words(language_code=None, force=False)` | `None` | Index speech for search. Use `force=True` to skip if already indexed. |
| `video.index_scenes(extraction_type, prompt, extraction_config, metadata, model_name, name, scenes, callback_url)` | `str` | Index visual scenes (returns scene_index_id) |
| `video.index_visuals(prompt, batch_config, ...)` | `str` | Index visuals (returns scene_index_id) |
| `video.index_audio(prompt, model_name, ...)` | `str` | Index audio with LLM (returns scene_index_id) |
| `video.get_transcript(start=None, end=None)` | `list[dict]` | Get timestamped transcript |
| `video.get_transcript_text(start=None, end=None)` | `str` | Get full transcript text |
| `video.generate_transcript(force=None)` | `dict` | Generate transcript |
| `video.translate_transcript(language, additional_notes)` | `list[dict]` | Translate transcript |
| `video.search(query, search_type, index_type, filter, **kwargs)` | `SearchResult` | Search within video |
| `video.add_subtitle(style=SubtitleStyle())` | `str` | Add subtitles (returns stream URL) |
| `video.generate_thumbnail(time=None)` | `str\|Image` | Generate thumbnail |
| `video.get_thumbnails()` | `list[Image]` | Get all thumbnails |
| `video.extract_scenes(extraction_type, extraction_config)` | `SceneCollection` | Extract scenes |
| `video.reframe(start, end, target, mode, callback_url)` | `Video\|None` | Reframe video aspect ratio |
| `video.clip(prompt, content_type, model_name)` | `str` | Generate clip from prompt (returns stream URL) |
| `video.insert_video(video, timestamp)` | `str` | Insert video at timestamp |
| `video.download(name=None)` | `dict` | Download the video |
| `video.delete()` | `None` | Delete the video |

### Reframe

Convert a video to a different aspect ratio with optional smart object tracking. Processing is server-side.

---

Continue in `api-reference-2.md`.
