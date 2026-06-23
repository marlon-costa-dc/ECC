# Content-Hash File Cache Pattern

Cache expensive file processing results (PDF parsing, text extraction, image analysis) using SHA-256 content hashes as cache keys. Unlike path-based caching, this approach survives file moves/renames and auto-invalidates when content changes.

## When to Activate

- Building file processing pipelines (PDF, images, text extraction)
- Processing cost is high and same files are processed repeatedly
- Need a `--cache/--no-cache` CLI option
- Want to add caching to existing pure functions without modifying them

## Core Pattern

### 1. Content-Hash Based Cache Key

Use file content (not path) as the cache key:

[See code example 1 in `code-examples.md`]

**Why content hash?** File rename/move = cache hit. Content change = automatic invalidation. No index file needed.

### 2. Frozen Dataclass for Cache Entry

[See code example 2 in `code-examples.md`]

### 3. File-Based Cache Storage

Each cache entry is stored as `{hash}.json` — O(1) lookup by hash, no index file required.

[See code example 3 in `code-examples.md`]

### 4. Service Layer Wrapper (SRP)

Keep the processing function pure. Add caching as a separate service layer.

[See code example 4 in `code-examples.md`]

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| SHA-256 content hash | Path-independent, auto-invalidates on content change |
| `{hash}.json` file naming | O(1) lookup, no index file needed |
| Service layer wrapper | SRP: extraction stays pure, cache is a separate concern |
| Manual JSON serialization | Full control over frozen dataclass serialization |
| Corruption returns `None` | Graceful degradation, re-processes on next run |
| `cache_dir.mkdir(parents=True)` | Lazy directory creation on first write |

## Best Practices

- **Hash content, not paths** — paths change, content identity doesn't
- **Chunk large files** when hashing — avoid loading entire files into memory
- **Keep processing functions pure** — they should know nothing about caching
- **Log cache hit/miss** with truncated hashes for debugging
- **Handle corruption gracefully** — treat invalid cache entries as misses, never crash

## Anti-Patterns to Avoid

[See code example 5 in `code-examples.md`]

## When to Use

- File processing pipelines (PDF parsing, OCR, text extraction, image analysis)
- CLI tools that benefit from `--cache/--no-cache` options
- Batch processing where the same files appear across runs
- Adding caching to existing pure functions without modifying them

## When NOT to Use

- Data that must always be fresh (real-time feeds)
- Cache entries that would be extremely large (consider streaming instead)
- Results that depend on parameters beyond file content (e.g., different extraction configs)
