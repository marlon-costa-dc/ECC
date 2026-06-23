---
name: gget
description: Use when the task needs quick bioinformatics lookup across genomic reference databases with the gget CLI or Python package, including sequence lookup, BLAST-style searches, enrichment checks, and reproducible evidence logs.
metadata: {}
---

# gget

Use this skill when a task needs quick bioinformatics lookup across genomic reference databases with the `gget` CLI or Python package.

## When to Use

- Finding Ensembl IDs, gene metadata, transcript details, or sequences.
- Running quick BLAST or BLAT lookups without a full local pipeline.
- Fetching reference genome links and annotations from Ensembl.
- Querying protein structure, pathway, cancer, expression, or disease-association modules.
- Creating a reproducible first-pass evidence log before heavier tools.

Use a dedicated workflow for regulated clinical interpretation or high-throughput production pipelines.

## Installation

Use a clean Python environment:

```bash
python -m venv .venv
. .venv/bin/activate
python -m pip install --upgrade gget
```

## Basic Patterns

CLI: `gget <module> [arguments] [options]`

Python:

```python
import gget
result = gget.search(["BRCA1"], species="human")
```

Common workflow: identify species/assembly/ID type, check current module docs, run a small query, save output with date, record module/version/arguments. See [references/gget-reference.md](references/gget-reference.md) for module list and examples.

## Reproducibility Log

| Date | gget version | Module | Query | Species/assembly | Output | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-05-11 | `gget --version` | search | `BRCA1 DNA repair` | human | `brca1-search.json` | Docs checked |

## References

- [gget documentation](https://pachterlab.github.io/gget/)
- [gget updates](https://pachterlab.github.io/gget/en/updates.html)
- [gget GitHub repository](https://github.com/pachterlab/gget)
- [gget Bioinformatics paper](https://doi.org/10.1093/bioinformatics/btac836)
- [gget module reference](references/gget-reference.md)
