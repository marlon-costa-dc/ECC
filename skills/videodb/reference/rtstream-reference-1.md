Generate AI descriptions of visual content:

```python
scene_index = rtstream.index_visuals(
    prompt="Describe what is happening on screen",
    batch_config={"type": "time", "value": 2, "frame_count": 5},
    model_name="basic",
    name="screen_monitor",  # optional
    ws_connection_id=ws_id,
)
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `prompt` | `str` | Instructions for the AI model (supports structured JSON output) |
| `batch_config` | `dict` | Controls frame sampling (see below) |
| `model_name` | `str` | Model tier: `"mini"`, `"basic"`, `"pro"`, `"ultra"` |
| `name` | `str` | Name for the index (optional) |
| `ws_connection_id` | `str` | WebSocket connection ID for receiving results |

**Visual batch_config:**

| Key | Type | Description |
|-----|------|-------------|
| `type` | `str` | Only `"time"` is supported for visuals |
| `value` | `int` | Window size in seconds |
| `frame_count` | `int` | Number of frames to extract per window |

Example: `{"type": "time", "value": 2, "frame_count": 5}` samples 5 frames every 2 seconds and sends them to the model.

**Structured JSON output:**

Use a prompt that requests JSON format for structured responses:

```python
scene_index = rtstream.index_visuals(
    prompt="""Analyze the screen and return a JSON object with:
{
  "app_name": "name of the active application",
  "activity": "what the user is doing",
  "ui_elements": ["list of visible UI elements"],
  "contains_text": true/false,
  "dominant_colors": ["list of main colors"]
}
Return only valid JSON.""",
    batch_config={"type": "time", "value": 3, "frame_count": 3},
    model_name="pro",
    ws_connection_id=ws_id,
)
```

Results arrive on the `scene_index` WebSocket channel.

---

## Batch Config Summary

| Indexing Type | `type` Options | `value` | Extra Keys |
|---------------|----------------|---------|------------|
| **Audio** | `"word"`, `"sentence"`, `"time"` | words/sentences/seconds | - |
| **Visual** | `"time"` only | seconds | `frame_count` |

Examples:
```python
# Audio: every 50 words
{"type": "word", "value": 50}

# Audio: every 30 seconds
{"type": "time", "value": 30}

# Visual: 5 frames every 2 seconds
{"type": "time", "value": 2, "frame_count": 5}
```

---

## Transcription

Real-time transcription via WebSocket:

```python
# Start live transcription
rtstream.start_transcript(
    ws_connection_id=ws_id,
    engine=None,  # optional, defaults to "assemblyai"
)

# Get transcript pages (with optional filters)
transcript = rtstream.get_transcript(
    page=1,
    page_size=100,
    start=None,   # optional: start timestamp filter
    end=None,     # optional: end timestamp filter
    since=None,   # optional: for polling, get transcripts after this timestamp
    engine=None,
)

# Stop transcription
rtstream.stop_transcript(engine=None)
```

Transcript results arrive on the `transcript` WebSocket channel.

---

## RTStreamSceneIndex

When you call `index_audio()` or `index_visuals()`, the method returns an `RTStreamSceneIndex` object. This object represents the running index and provides methods for managing scenes and alerts.

```python
# index_visuals returns an RTStreamSceneIndex
scene_index = rtstream.index_visuals(
    prompt="Describe what is on screen",
    ws_connection_id=ws_id,
)

# index_audio also returns an RTStreamSceneIndex
audio_index = rtstream.index_audio(
    prompt="Summarize the discussion",
    ws_connection_id=ws_id,
)
```

### RTStreamSceneIndex Properties

| Property | Type | Description |
|----------|------|-------------|
| `rtstream_index_id` | `str` | Unique ID of the index |
| `rtstream_id` | `str` | ID of the parent RTStream |
| `extraction_type` | `str` | Type of extraction (`time` or `transcript`) |
| `extraction_config` | `dict` | Extraction configuration |
| `prompt` | `str` | The prompt used for analysis |
| `name` | `str` | Name of the index |
| `status` | `str` | Status (`connected`, `stopped`) |

### RTStreamSceneIndex Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `index.get_scenes(start, end, page, page_size)` | `dict` | Get indexed scenes |
| `index.start()` | `None` | Start/resume the index |
| `index.stop()` | `None` | Stop the index |
| `index.create_alert(event_id, callback_url, ws_connection_id)` | `str` | Create alert for event detection |
| `index.list_alerts()` | `list` | List all alerts on this index |
| `index.enable_alert(alert_id)` | `None` | Enable an alert |
| `index.disable_alert(alert_id)` | `None` | Disable an alert |

### Getting Scenes

Poll indexed scenes from the index:

```python
result = scene_index.get_scenes(
    start=None,      # optional: start timestamp
    end=None,        # optional: end timestamp
    page=1,
    page_size=100,
)

for scene in result["scenes"]:
    print(f"[{scene['start']}-{scene['end']}] {scene['text']}")

if result["next_page"]:
    # fetch next page
    pass
```

### Managing Scene Indexes

```python
# List all indexes on the stream
indexes = rtstream.list_scene_indexes()

# Get a specific index by ID
scene_index = rtstream.get_scene_index(index_id)

# Stop an index
scene_index.stop()

# Restart an index
scene_index.start()
```

---

## Events

Events are reusable detection rules. Create them once, attach to any index via alerts.

---

Continue in `rtstream-reference-2.md`.
