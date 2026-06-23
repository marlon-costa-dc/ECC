# Swift Actors for Thread-Safe Persistence — Reference

## Actor-Based Repository

The actor model guarantees serialized access and eliminates data races at compile time.

```swift
public actor LocalRepository<T: Codable & Identifiable> where T.ID == String {
    private var cache: [String: T] = [:]
    private let fileURL: URL

    public init(directory: URL = .documentsDirectory, filename: String = "data.json") {
        self.fileURL = directory.appendingPathComponent(filename)
        self.cache = Self.loadSynchronously(from: fileURL)
    }

    public func save(_ item: T) throws {
        cache[item.id] = item
        try persistToFile()
    }

    public func delete(_ id: String) throws {
        cache[id] = nil
        try persistToFile()
    }

    public func find(by id: String) -> T? { cache[id] }
    public func loadAll() -> [T] { Array(cache.values) }

    private func persistToFile() throws {
        let data = try JSONEncoder().encode(Array(cache.values))
        try data.write(to: fileURL, options: .atomic)
    }

    private static func loadSynchronously(from url: URL) -> [String: T] {
        guard let data = try? Data(contentsOf: url),
              let items = try? JSONDecoder().decode([T].self, from: data) else {
            return [:]
        }
        return Dictionary(uniqueKeysWithValues: items.map { ($0.id, $0) })
    }
}
```

## Usage

All calls are automatically async due to actor isolation:

```swift
let repository = LocalRepository<Question>()
let question = await repository.find(by: "q-001")
let allQuestions = await repository.loadAll()
try await repository.save(newQuestion)
try await repository.delete("q-001")
```

## @Observable ViewModel Integration

```swift
@Observable
final class QuestionListViewModel {
    private(set) var questions: [Question] = []
    private let repository: LocalRepository<Question>

    init(repository: LocalRepository<Question> = LocalRepository()) {
        self.repository = repository
    }

    func load() async { questions = await repository.loadAll() }

    func add(_ question: Question) async throws {
        try await repository.save(question)
        questions = await repository.loadAll()
    }
}
```

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| Actor (not class + lock) | Compiler-enforced thread safety |
| In-memory cache + file persistence | Fast reads from cache, durable writes to disk |
| Synchronous init loading | Avoids async initialization complexity |
| Dictionary keyed by ID | O(1) lookups by identifier |
| Generic over `Codable & Identifiable` | Reusable across any model type |
| Atomic file writes (`.atomic`) | Prevents partial writes on crash |

## Anti-Patterns

- Using `DispatchQueue` or `NSLock` instead of actors for new Swift concurrency code
- Exposing the internal cache dictionary to external callers
- Making the file URL configurable without validation
- Forgetting that all actor method calls require `await`
- Using `nonisolated` to bypass actor isolation
