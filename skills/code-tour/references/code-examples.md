# Code Examples

## Example 1

```text
.tours/<persona>-<focus>.tour
```

## Example 2

```json
{ "title": "Next Steps", "description": "You can now trace the request path end to end." }
```

## Example 3

```json
{ "directory": "src/services", "title": "Service Layer", "description": "The core orchestration logic lives here." }
```

## Example 4

```json
{ "file": "src/auth/middleware.ts", "line": 42, "title": "Auth Gate", "description": "Every protected request passes here first." }
```

## Example 5

```json
{
  "file": "src/core/pipeline.ts",
  "selection": {
    "start": { "line": 15, "character": 0 },
    "end": { "line": 34, "character": 0 }
  },
  "title": "Request Pipeline",
  "description": "This block wires validation, auth, and downstream execution."
}
```

## Example 6

```json
{ "file": "src/app.ts", "pattern": "export default class App", "title": "Application Entry" }
```

## Example 7

```json
{ "uri": "https://github.com/org/repo/pull/456", "title": "The PR" }
```
