# Generative Media Guide

VideoDB provides AI-powered generation of images, videos, music, sound effects, voice, and text content. All generation methods are on the **Collection** object.

## Prerequisites

You need a connection and a collection reference before calling any generation method:

```python
import videodb

conn = videodb.connect()
coll = conn.get_collection()
```

## Image Generation

Generate images from text prompts:

```python
image = coll.generate_image(
    prompt="a futuristic cityscape at sunset with flying cars",
    aspect_ratio="16:9",
)

# Access the generated image
print(image.id)
print(image.generate_url())  # returns a signed download URL
```

### generate_image Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `prompt` | `str` | required | Text description of the image to generate |
| `aspect_ratio` | `str` | `"1:1"` | Aspect ratio: `"1:1"`, `"9:16"`, `"16:9"`, `"4:3"`, or `"3:4"` |
| `callback_url` | `str\|None` | `None` | URL to receive async callback |

Returns an `Image` object with `.id`, `.name`, and `.collection_id`. The `.url` property may be `None` for generated images — always use `image.generate_url()` to get a reliable signed download URL.

> **Note:** Unlike `Video` objects (which use `.generate_stream()`), `Image` objects use `.generate_url()` to retrieve the image URL. The `.url` property is only populated for some image types (e.g. thumbnails).

## Video Generation

Generate short video clips from text prompts:

```python
video = coll.generate_video(
    prompt="a timelapse of a flower blooming in a garden",
    duration=5,
)

stream_url = video.generate_stream()
video.play()
```

### generate_video Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `prompt` | `str` | required | Text description of the video to generate |
| `duration` | `int` | `5` | Duration in seconds (must be integer value, 5-8) |
| `callback_url` | `str\|None` | `None` | URL to receive async callback |

Returns a `Video` object. Generated videos are automatically added to the collection and can be used in timelines, searches, and compilations like any uploaded video.

## Audio Generation

VideoDB provides three separate methods for different audio types.

### Music

Generate background music from text descriptions:

```python
music = coll.generate_music(
    prompt="upbeat electronic music with a driving beat, suitable for a tech demo",
    duration=30,
)

print(music.id)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `prompt` | `str` | required | Text description of the music |
| `duration` | `int` | `5` | Duration in seconds |
| `callback_url` | `str\|None` | `None` | URL to receive async callback |

### Sound Effects

Generate specific sound effects:

```python
sfx = coll.generate_sound_effect(
    prompt="thunderstorm with heavy rain and distant thunder",
    duration=10,
)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `prompt` | `str` | required | Text description of the sound effect |
| `duration` | `int` | `2` | Duration in seconds |
| `config` | `dict` | `{}` | Additional configuration |
| `callback_url` | `str\|None` | `None` | URL to receive async callback |

### Voice (Text-to-Speech)

Generate speech from text:

```python
voice = coll.generate_voice(
    text="Welcome to our product demo. Today we'll walk through the key features.",
    voice_name="Default",
)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `text` | `str` | required | Text to convert to speech |
| `voice_name` | `str` | `"Default"` | Voice to use |
| `config` | `dict` | `{}` | Additional configuration |
| `callback_url` | `str\|None` | `None` | URL to receive async callback |

All three audio methods return an `Audio` object with `.id`, `.name`, `.length`, and `.collection_id`.

## Text Generation (LLM Integration)

Use `coll.generate_text()` to run LLM analysis. This is a **Collection-level** method -- pass any context (transcripts, descriptions) directly in the prompt string.

```python
# Get transcript from a video first
transcript_text = video.get_transcript_text()

# Generate analysis using collection LLM
result = coll.generate_text(
    prompt=f"Summarize the key points discussed in this video:\n{transcript_text}",
    model_name="pro",
)

print(result["output"])
```

### generate_text Parameters

---

For additional details, continue reading `generative-1.md`, `generative-2.md`.
