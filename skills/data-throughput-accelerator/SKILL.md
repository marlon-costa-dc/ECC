---
name: data-throughput-accelerator
description: Use when large data ingestion, backfill, export, ETL, warehouse loading, manifest catch-up, or table synchronization must become faster while preserving correctness and producing auditable accounting of rows, files, and tail.
origin: ECC
---

# Data Throughput Accelerator

Use this skill when the bottleneck is moving, transforming, or saving lots of data.

## First Distinction

Separate before optimizing:

- source extraction speed
- network transfer speed
- warehouse/load speed
- transform speed
- serving-table freshness
- live tail growth during the run

## Fast Path Heuristics

- Move compute to where the data already is.
- Prefer warehouse-native scans, joins, and appends for large landed files.
- Use manifests or checkpoints to skip completed files/partitions.
- Partition and cluster by read and append patterns.
- Batch small files, requests, and writes.
- Make writes idempotent with unique keys, manifests, or replaceable staging.
- Keep raw, derived, and serving tables separately accountable.

## Workflow

1. Read source, target, and manifest contracts.
2. Measure backlog: files, manifest rows, raw rows, derived rows, timestamps, unprocessed counts.
3. Run a safe catch-up or sample benchmark.
4. Compare variants: batch size, workers, warehouse SQL, file grouping, staging shape, manifest method.
5. Promote only the fastest path that keeps counts and timestamps coherent.
6. Codify the path as a CLI, job, workflow, or runbook.
7. Rerun final accounting after execution.

## Accounting Output

```text
Data throughput result:
- Source files discovered: 294
- Files processed this run: 294
- Raw rows added: 9,683,598
- Derived rows added: 8,917,585
- Remaining tail: 24 files at readback time
- Runtime: 38.7s
- Correctness gate: manifest counts and table max timestamps match
```

## Guardrails

- Do not delete raw data to make a metric look better.
- Do not skip failed files silently.
- Do not mix historical backfill status with live-tail freshness.
- Do not call a pipeline complete until target tables and manifest agree.
- For regulated or customer-impacting data, preserve replay evidence and approval gates.
