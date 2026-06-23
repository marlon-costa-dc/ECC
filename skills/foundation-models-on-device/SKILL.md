---
name: foundation-models-on-device
description: "Use when the user is building privacy-preserving, on-device Apple Intelligence features in iOS 26+ with the FoundationModels framework, including text generation, structured output with @Generable, custom tool calling, and snapshot streaming."
---

# FoundationModels: On-Device LLM (iOS 26)

Patterns for integrating Apple's on-device language model using the FoundationModels framework for privacy and offline support.

## When to Activate

- Building Apple Intelligence features on-device.
- Generating or summarizing text without cloud dependency.
- Extracting structured data from natural language.
- Implementing custom tool calling for domain actions.
- Streaming structured responses for real-time UI.
- Needing privacy-preserving AI where no data leaves the device.

## Core Patterns

1. **Availability Check** — Verify `SystemLanguageModel.default.availability` before creating a session.
2. **Basic Session** — Create `LanguageModelSession()` with `instructions` for role, task, style, and safety.
3. **Guided Generation** — Define `@Generable` types with `@Guide` constraints; request structured output via `session.respond(to:generating:)` and read `response.content`.
4. **Tool Calling** — Conform to `Tool` with `@Generable` arguments and handle `LanguageModelSession.ToolCallError`.
5. **Snapshot Streaming** — Use `session.streamResponse(to:generating:)` for progressive `PartiallyGenerated` snapshots.

## Rules

- Check availability before creating a session.
- Use `instructions` to guide behavior.
- Verify `isResponding` is false before a new request.
- Access results via `response.content`, not `.output`.
- Respect the 4,096 token budget.
- Prefer `@Generable` over parsing raw strings.
- Tune with `GenerationOptions(temperature:)`.
- Profile with Xcode Instruments.

## Anti-Patterns

- Creating sessions without checking availability.
- Exceeding the context window.
- Concurrent requests on one session.
- Reading `.output` instead of `.content`.
- Parsing raw strings when `@Generable` fits.
- Packing complex logic into one prompt.
- Assuming the model is always available.

## References

- Full code examples, design decisions, and SwiftUI snippets: [references/foundation-models-on-device-reference.md](references/foundation-models-on-device-reference.md)
