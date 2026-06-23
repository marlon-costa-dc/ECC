# Swift 6.2 Approachable Concurrency — Reference

## Problem: Implicit Background Offloading

```swift
// Swift 6.1: ERROR
@MainActor
final class StickerModel {
    let photoProcessor = PhotoProcessor()

    func extractSticker(_ item: PhotosPickerItem) async throws -> Sticker? {
        guard let data = try await item.loadTransferable(type: Data.self) else { return nil }
        // Sending 'self.photoProcessor' risks causing data races
        return await photoProcessor.extractSticker(data: data, with: item.itemIdentifier)
    }
}
```

```swift
// Swift 6.2: OK
@MainActor
final class StickerModel {
    let photoProcessor = PhotoProcessor()

    func extractSticker(_ item: PhotosPickerItem) async throws -> Sticker? {
        guard let data = try await item.loadTransferable(type: Data.self) else { return nil }
        return await photoProcessor.extractSticker(data: data, with: item.itemIdentifier)
    }
}
```

## Isolated Conformances

```swift
protocol Exportable { func export() }

extension StickerModel: @MainActor Exportable {
    func export() { photoProcessor.exportAsPNG() }
}
```

```swift
@MainActor
struct ImageExporter {
    var items: [any Exportable]
    mutating func add(_ item: StickerModel) { items.append(item) } // OK
}

nonisolated struct ImageExporter {
    var items: [any Exportable]
    mutating func add(_ item: StickerModel) { items.append(item) } // ERROR
}
```

## Global and Static Variables

```swift
// Swift 6.1: ERROR
final class StickerLibrary {
    static let shared: StickerLibrary = .init() // Error
}

// Fix
@MainActor
final class StickerLibrary {
    static let shared: StickerLibrary = .init() // OK
}
```

### MainActor Default Inference

```swift
final class StickerLibrary {
    static let shared: StickerLibrary = .init() // Implicitly @MainActor
}

final class StickerModel {
    let photoProcessor: PhotoProcessor
    var selection: [PhotosPickerItem] // Implicitly @MainActor
}

extension StickerModel: Exportable { // Implicitly @MainActor conformance
    func export() { photoProcessor.exportAsPNG() }
}
```

Recommended for apps, scripts, and executable targets.

## @concurrent for Background Work

> Requires Approachable Concurrency build settings. Without them, this code has a data race.

```swift
nonisolated final class PhotoProcessor {
    private var cachedStickers: [String: Sticker] = [:]

    func extractSticker(data: Data, with id: String) async -> Sticker {
        if let sticker = cachedStickers[id] { return sticker }
        let sticker = await Self.extractSubject(from: data)
        cachedStickers[id] = sticker
        return sticker
    }

    @concurrent
    static func extractSubject(from data: Data) async -> Sticker { /* ... */ }
}

let processor = PhotoProcessor()
processedPhotos[item.id] = await processor.extractSticker(data: data, with: item.id)
```

## Migration Steps

1. Enable in Xcode: Swift Compiler > Concurrency section
2. Enable in SPM: use `SwiftSettings` API in package manifest
3. Use migration tooling at swift.org/migration
4. Start with MainActor defaults for app targets
5. Add `@concurrent` only after profiling
6. Test thoroughly; data-race issues become compile-time errors

## Anti-Patterns

- Applying `@concurrent` to every async function
- Using `nonisolated` to suppress compiler errors without understanding isolation
- Keeping legacy `DispatchQueue` patterns when actors provide the same safety
- Skipping `model.availability` checks in Foundation Models concurrency code
- Fighting the compiler — data-race warnings indicate real issues
- Assuming all async code runs in the background
