# VideoDB Skill

**Perception + memory + actions for video, live streams, and desktop sessions.**

## When to use

### Desktop Perception
- Start/stop a **desktop session** capturing **screen, mic, and system audio**
- Stream **live context** and store **episodic session memory**
- Run **real-time alerts/triggers** on what's spoken and what's happening on screen
- Produce **session summaries**, a searchable timeline, and **playable evidence links**

### Video ingest + stream
- Ingest a **file or URL** and return a **playable web stream link**
- Transcode/normalize: **codec, bitrate, fps, resolution, aspect ratio**

### Index + search (timestamps + evidence)
- Build **visual**, **spoken**, and **keyword** indexes
- Search and return exact moments with **timestamps** and **playable evidence**
- Auto-create **clips** from search results

### Timeline editing + generation
- Subtitles: **generate**, **translate**, **burn-in**
- Overlays: **text/image/branding**, motion captions
- Audio: **background music**, **voiceover**, **dubbing**
- Programmatic composition and exports via **timeline operations**

### Live streams (RTSP) + monitoring
- Connect **RTSP/live feeds**
- Run **real-time visual and spoken understanding** and emit **events/alerts** for monitoring workflows

## How it works

### Common inputs
- Local **file path**, public **URL**, or **RTSP URL**
- Desktop capture request: **start / stop / summarize session**
- Desired operations: get context for understanding, transcode spec, index spec, search query, clip ranges, timeline edits, alert rules

### Common outputs
- **Stream URL**
- Search results with **timestamps** and **evidence links**
- Generated assets: subtitles, audio, images, clips
- **Event/alert payloads** for live streams
- Desktop **session summaries** and memory entries

### Running Python code

Before running any VideoDB code, change to the project directory and load environment variables:

[See code example 1 in `code-examples.md`]

This reads `VIDEO_DB_API_KEY` from:
1. Environment (if already exported)
2. Project's `.env` file in current directory

If the key is missing, `videodb.connect()` raises `AuthenticationError` automatically.

Do NOT write a script file when a short inline command works.

When writing inline Python (`python -c "..."`), always use properly formatted code — use semicolons to separate statements and keep it readable. For anything longer than ~3 statements, use a heredoc instead:

[See code example 2 in `code-examples.md`]

### Setup

When the user asks to "setup videodb" or similar:

### 1. Install SDK

[See code example 3 in `code-examples.md`]

If `videodb[capture]` fails on Linux, install without the capture extra:

[See code example 4 in `code-examples.md`]

### 2. Configure API key

The user must set `VIDEO_DB_API_KEY` using **either** method:

- **Export in terminal** (before starting Claude): `export VIDEO_DB_API_KEY=your-key`
- **Project `.env` file**: Save `VIDEO_DB_API_KEY=your-key` in the project's `.env` file

Get a free API key at [console.videodb.io](https://console.videodb.io) (50 free uploads, no credit card).

**Do NOT** read, write, or handle the API key yourself. Always let the user set it.

### Quick Reference

### Upload media

[See code example 5 in `code-examples.md`]

### Transcript + subtitle

[See code example 6 in `code-examples.md`]

### Search inside videos

[See code example 7 in `code-examples.md`]

### Scene search

[See code example 8 in `code-examples.md`]

### Timeline editing

---

For additional details, continue reading `summary-1.md`, `summary-2.md`.
