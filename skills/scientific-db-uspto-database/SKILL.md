---
name: uspto-database
description: Use when the task needs official United States patent or trademark records from USPTO systems, including patent searches, application-status checks, TSDR lookups, assignment records, and reproducible IP research logs.
metadata: {}
---

# USPTO Database

Use this skill when a task needs official United States patent or trademark records from USPTO systems.

## When to Use

- Searching granted patents or pre-grant publications.
- Checking patent application status, file-wrapper data, assignments, or prosecution history.
- Looking up trademark status, documents, or assignment history.
- Building reproducible prior-art, portfolio, or IP landscape research logs.

Do not give legal advice; treat this as data-gathering and record verification.

## Source Selection

Prefer official USPTO sources first: Open Data Portal (ODP), Patent File Wrapper, PatentSearch API (PatentsView), TSDR Data API, and Patent and Trademark Assignment Search. Cross-check secondary sources against the official record.

## Authentication and Secrets

Store API keys in environment variables. For PatentSearch, send the key with the `X-Api-Key` header.

## Workflows

**PatentSearch**: identify the live endpoint, build a JSON query with explicit filters, request only needed fields, sort and paginate deterministically, and record endpoint, query, date, and result count.

**TSDR**: normalize the serial/registration number, check current API instructions and key header, fetch status first, respect lower rate limits for documents, and capture retrieval date and identifier.

**File wrapper and assignments**: start with ODP Patent File Wrapper for prosecution history; search official assignment data by number, assignor, assignee, or reel/frame. Flag ownership conclusions for legal review.

## Reproducible Output

Log every pass: source, date searched, identifier/query, filters, results, and notes. Separate official facts, inferred analysis, secondary-source matches, and unresolved gaps that need legal review.

## References

- [USPTO APIs catalog](https://developer.uspto.gov/api-catalog)
- [USPTO Open Data Portal](https://data.uspto.gov/)
- [PatentSearch API reference](https://search.patentsview.org/docs/docs/Search%20API/SearchAPIReference/)
- [Detailed USPTO workflows](references/uspto-workflows.md)
