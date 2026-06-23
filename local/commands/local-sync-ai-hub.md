---
name: local-sync-ai-hub
description: Regenerate all AI-Hub configs and verify harness symlinks.
---

# /local-sync-ai-hub

Regenerate every AI-Hub MCP config and verify the symlinks from harness config paths back to `~/.ai-hub/mcp/generated/`.

## Usage

```
/local-sync-ai-hub
```

## Steps

1. Run `~/.ai-hub/sync/generate-claude.sh`
2. Run `~/.ai-hub/sync/generate-kimi.sh`
3. Run `~/.ai-hub/sync/generate-codex.py`
4. Run `~/.ai-hub/sync/generate-cursor.sh`
5. Run `~/.ai-hub/sync/generate-opencode.sh`
6. Run `~/.ai-hub/sync/generate-gemini.sh`
7. Run `~/.ai-hub/sync/generate-aider.sh`
8. Run `node tests/local/ai-hub-symlinks.test.js`
9. Run `node tests/local/ai-hub-schema.test.js`

Alternatively, run `~/.ai-hub/sync/generate-configs.sh` to execute all generators in one step, then run the two verification tests.

## Verification

All generators exit 0 and both the symlink test and the schema test report PASS.
