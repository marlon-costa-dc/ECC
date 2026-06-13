---
name: local-bad-tools-agent
description: This agent has an invalid tools field.
model: opus
tools:
  - Read
  - ""
  - Write
---

# Bad Tools

This fixture should fail because one tool entry is an empty string.
