| Property / Method | Type | Description |
|-------------------|------|-------------|
| `ws.connection_id` | `str` | Unique connection ID (pass to AI pipeline methods) |
| `ws.receive()` | `AsyncIterator[dict]` | Async iterator yielding real-time messages |

---

## CaptureSession

### Connection Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `conn.create_capture_session(end_user_id, collection_id, ws_connection_id, metadata)` | `CaptureSession` | Create a new capture session |
| `conn.get_capture_session(capture_session_id)` | `CaptureSession` | Retrieve an existing capture session |
| `conn.generate_client_token()` | `str` | Generate a client-side authentication token |

### Create a Capture Session

```python
from pathlib import Path

ws_id = (Path.home() / ".local" / "state" / "videodb" / "videodb_ws_id").read_text().strip()

session = conn.create_capture_session(
    end_user_id="user-123",  # required
    collection_id="default",
    ws_connection_id=ws_id,
    metadata={"app": "my-app"},
)
print(f"Session ID: {session.id}")
```

> **Note:** `end_user_id` is required and identifies the user initiating the capture. For testing or demo purposes, any unique string identifier works (e.g., `"demo-user"`, `"test-123"`).

### CaptureSession Properties

| Property | Type | Description |
|----------|------|-------------|
| `session.id` | `str` | Unique capture session ID |

### CaptureSession Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `session.get_rtstream(type)` | `list[RTStream]` | Get RTStreams by type: `"mic"`, `"screen"`, or `"system_audio"` |

### Generate a Client Token

```python
token = conn.generate_client_token()
```

---

## CaptureClient

The client runs on the user's machine and handles permissions, channel discovery, and streaming.

```python
from videodb.capture import CaptureClient

client = CaptureClient(client_token=token)
```

### CaptureClient Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `await client.request_permission(type)` | `None` | Request device permission (`"microphone"`, `"screen_capture"`) |
| `await client.list_channels()` | `Channels` | Discover available audio/video channels |
| `await client.start_capture_session(capture_session_id, channels, primary_video_channel_id)` | `None` | Start streaming selected channels |
| `await client.stop_capture()` | `None` | Gracefully stop the capture session |
| `await client.shutdown()` | `None` | Clean up client resources |

### Request Permissions

```python
await client.request_permission("microphone")
await client.request_permission("screen_capture")
```

### Start a Session

```python
selected_channels = [c for c in [mic, display, system_audio] if c]
await client.start_capture_session(
    capture_session_id=session.id,
    channels=selected_channels,
    primary_video_channel_id=display.id if display else None,
)
```

### Stop a Session

```python
await client.stop_capture()
await client.shutdown()
```

---

## Channels

Returned by `client.list_channels()`. Groups available devices by type.

```python
channels = await client.list_channels()
for ch in channels.all():
    print(f"  {ch.id} ({ch.type}): {ch.name}")

mic = channels.mics.default
display = channels.displays.default
system_audio = channels.system_audio.default
```

### Channel Groups

| Property | Type | Description |
|----------|------|-------------|
| `channels.mics` | `ChannelGroup` | Available microphones |
| `channels.displays` | `ChannelGroup` | Available screen displays |
| `channels.system_audio` | `ChannelGroup` | Available system audio sources |

### ChannelGroup Methods & Properties

| Member | Type | Description |
|--------|------|-------------|
| `group.default` | `Channel` | Default channel in the group (or `None`) |
| `group.all()` | `list[Channel]` | All channels in the group |

### Channel Properties

| Property | Type | Description |
|----------|------|-------------|
| `ch.id` | `str` | Unique channel ID |
| `ch.type` | `str` | Channel type (`"mic"`, `"display"`, `"system_audio"`) |
| `ch.name` | `str` | Human-readable channel name |
| `ch.store` | `bool` | Whether to persist the recording (set to `True` to save) |

Without `store = True`, streams are processed in real-time but not saved.

---

## RTStreams and AI Pipelines

After session is active, retrieve RTStream objects with `session.get_rtstream()`.

For RTStream methods (indexing, transcription, alerts, batch config), see [rtstream-reference.md](rtstream-reference.md).

---

## Session Lifecycle

---

Continue in `capture-reference-2.md`.
