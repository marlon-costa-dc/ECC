Default to isolation. Joint only when there's a specific reason (e.g., explicit batch-aware diversity).

### 3. Online vs offline

- **Request-time (online)**: pipeline runs on each request. Latency budget: 100–300ms. Default.
- **Pre-computed (offline batch)**: pipeline runs periodically, results cached. Lower latency, lower freshness.
- **Hybrid**: candidate retrieval offline, ranking online.

## Hard rules

1. **Do not invent benchmark numbers.** "How much faster?" → "depends on workload, run it yourself."
2. **Attribution discipline.** When the pattern is referenced, attribute as "popularized by xAI's open-sourced For You algorithm" / `github.com/xai-org/x-algorithm` (Apache 2.0).
3. **No trademark use.** Do not name the user's artifact "X-like" or use "For You" branding. Pattern is free; brand is not. Suggested naming: "candidate pipeline", "feed pipeline", "ranking pipeline", "recsys pipeline".
4. **Surface trade-offs.** Multi-action vs single, isolation vs joint, online vs offline — never default silently.
5. **The generated scaffold must run.** No pseudocode passing as code.
6. **Filter order matters.** Cheap before expensive. Universal before user-specific.
7. **Side effects never block.** Wrap in fire-and-forget patterns (goroutines / promises without await / asyncio tasks).

## Anti-Patterns

- Scoring before filtering (wastes compute on candidates that will be dropped anyway)
- Synchronous side effects (cache writes / impression emits blocking the response)
- A single "relevance" score when the product needs to tune for multiple objectives (engagement vs safety vs diversity vs ads)
- Joint scoring as default (non-deterministic, harder to cache, doesn't compose with reranking stages)
- Generating pseudocode "for illustration" — the scaffold must actually run

## Upstream contents

The upstream repository at <https://github.com/mturac/recsys-pipeline-architect> ships:

- Full `SKILL.md` with the complete 8-step workflow
- 5 load-on-demand reference docs: interfaces in 4 languages (TS/Go/Python/Rust), multi-action scoring pattern, candidate isolation, filter cookbook (12 patterns), scorer cookbook (weighted sum, MMR, diversity penalty, position debiasing)
- 3 runnable example scaffolds, every one green on its test suite:
  - Strapi v5 plugin (TypeScript / Jest — 3/3 pass)
  - Zentra-compatible pipeline (Go with generics — 3/3 pass)
  - PMAI task prioritizer (Python / FastAPI / pytest — 3/3 pass)
- v0.1.0 release tagged
- MIT license; pattern attributed to xAI X For You algorithm (Apache 2.0)

Install via skills.sh: `npx skills add mturac/recsys-pipeline-architect`
