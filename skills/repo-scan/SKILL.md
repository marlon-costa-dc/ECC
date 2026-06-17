---
name: repo-scan
description: Cross-stack source code audit that classifies files, detects embedded third-party libraries, and delivers four-level module verdicts with interactive HTML reports.
origin: community
---

# repo-scan

## Quando usar
- Taking over a large legacy codebase and need a structural overview.
- Before major refactoring — identify core code, duplicates, and dead weight.
- Auditing third-party dependencies embedded directly in source.
- Preparing architecture decision records for monorepo reorganization.

## O que fazer
1. Enumerate the repo surface and tag each file as project code, embedded third-party code, or build artifact.
2. Detect embedded libraries by inspecting directory names, headers, license files, and version markers.
3. Group files by module or subsystem and assign one verdict: **Core Asset**, **Extract & Merge**, **Rebuild**, or **Deprecate**.
4. Highlight structural risks: dead-weight artifacts, duplicated wrappers, outdated vendored code, and high-maintenance modules.
5. Return a concise summary plus an interactive HTML report with per-module drill-down.

## Regras críticas
- Start with `standard` depth; use `fast` for 100+ module monorepos and `deep` only on flagged modules.
- Review embedded libraries for outdated versions and security exposure before recommending reuse.
- Never treat build artifacts (obj, ipch, Debug, node_modules) as project code.
- Verify duplicate wrappers by comparing actual content, not just directory names.
- Review the generated HTML report asynchronously; the summary is not the full audit.

## Exemplo
On a 50,000-file C++ monorepo:
- Found FFmpeg 2.x (2015 vintage) still in production.
- Discovered the same SDK wrapper duplicated 3 times.
- Identified 636 MB of committed Debug/ipch/obj build artifacts.
- Classified: 3 MB project code vs 596 MB third-party.

Install from the pinned source: `https://github.com/haibindev/repo-scan` (commit `2742664`).
