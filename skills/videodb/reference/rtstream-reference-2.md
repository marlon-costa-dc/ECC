### Connection Event Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `conn.create_event(event_prompt, label)` | `str` (event_id) | Create detection event |
| `conn.list_events()` | `list` | List all events |

### Creating an Event

```python
event_id = conn.create_event(
    event_prompt="User opened Slack application",
    label="slack_opened",
)
```

### Listing Events

```python
events = conn.list_events()
for event in events:
    print(f"{event['event_id']}: {event['label']}")
```

---

## Alerts

Alerts wire events to indexes for real-time notifications. When the AI detects content matching the event description, an alert is sent.

### Creating an Alert

```python
# Get the RTStreamSceneIndex from index_visuals
scene_index = rtstream.index_visuals(
    prompt="Describe what application is open on screen",
    ws_connection_id=ws_id,
)

# Create an alert on the index
alert_id = scene_index.create_alert(
    event_id=event_id,
    callback_url="https://your-backend.com/alerts",  # for webhook delivery
    ws_connection_id=ws_id,  # for WebSocket delivery (optional)
)
```

**Note:** `callback_url` is required. Pass an empty string `""` if only using WebSocket delivery.

### Managing Alerts

```python
# List all alerts on an index
alerts = scene_index.list_alerts()

# Enable/disable alerts
scene_index.disable_alert(alert_id)
scene_index.enable_alert(alert_id)
```

### Alert Delivery

| Method | Latency | Use Case |
|--------|---------|----------|
| WebSocket | Real-time | Dashboards, live UI |
| Webhook | < 1 second | Server-to-server, automation |

### WebSocket Alert Event

```json
{
  "channel": "alert",
  "rtstream_id": "rts-xxx",
  "data": {
    "event_label": "slack_opened",
    "timestamp": 1710000012340,
    "text": "User opened Slack application"
  }
}
```

### Webhook Payload

```json
{
  "event_id": "event-xxx",
  "label": "slack_opened",
  "confidence": 0.95,
  "explanation": "User opened the Slack application",
  "timestamp": "2024-01-15T10:30:45Z",
  "start_time": 1234.5,
  "end_time": 1238.0,
  "stream_url": "https://stream.videodb.io/v3/...",
  "player_url": "https://console.videodb.io/player?url=..."
}
```

---

## WebSocket Integration

All real-time AI results are delivered via WebSocket. Pass `ws_connection_id` to:
- `rtstream.start_transcript()`
- `rtstream.index_audio()`
- `rtstream.index_visuals()`
- `scene_index.create_alert()`

### WebSocket Channels

| Channel | Source | Content |
|---------|--------|---------|
| `transcript` | `start_transcript()` | Real-time speech-to-text |
| `scene_index` | `index_visuals()` | Visual analysis results |
| `audio_index` | `index_audio()` | Audio analysis results |
| `alert` | `create_alert()` | Alert notifications |

For WebSocket event structures and ws_listener usage, see [capture-reference.md](capture-reference.md).

---

## Complete Workflow

```python
import time
import videodb
from videodb.exceptions import InvalidRequestError

conn = videodb.connect()
coll = conn.get_collection()

# 1. Connect and start recording
rtstream = coll.connect_rtstream(
    url="rtmp://your-stream-server/live/stream-key",
    name="Weekly Standup",
    store=True,
)
rtstream.start()

# 2. Record for the duration of the meeting
start_ts = time.time()
time.sleep(1800)  # 30 minutes
end_ts = time.time()
rtstream.stop()

# Generate an immediate playback URL for the captured window
stream_url = rtstream.generate_stream(start=start_ts, end=end_ts)
print(f"Recorded stream: {stream_url}")

# 3. Export to a permanent video
export_result = rtstream.export(name="Weekly Standup Recording")
print(f"Exported video: {export_result.video_id}")

# 4. Index the exported video for search
video = coll.get_video(export_result.video_id)
video.index_spoken_words(force=True)

# 5. Search for action items
try:
    results = video.search("action items and next steps")
    stream_url = results.compile()
    print(f"Action items clip: {stream_url}")
except InvalidRequestError as exc:
    if "No results found" in str(exc):
        print("No action items were detected in the recording.")
    else:
        raise
```
