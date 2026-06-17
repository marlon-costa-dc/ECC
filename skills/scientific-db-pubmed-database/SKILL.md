---
name: pubmed-database
description: Use when the task needs biomedical literature from PubMed rather than general web search, including building MeSH-aware queries, looking up PMIDs, and using NCBI E-utilities for repeatable, API-backed literature monitoring.
metadata: {}
---

# PubMed Database

Use this skill when a task needs biomedical literature from PubMed rather than general web search.

## When to Use

- Searching MEDLINE or life-sciences literature.
- Building MeSH-aware queries with field tags, dates, or article types.
- Looking up PMIDs, abstracts, metadata, or related citations.

## Query Construction

Split the question into concepts, then combine with Boolean operators.

Common tags: `[ti]` title, `[ab]` abstract, `[tiab]` title/abstract, `[au]` author, `[ta]` journal, `[mh]` MeSH, `[majr]` major MeSH, `[pt]` type, `[dp]` date, `[la]` language.

Example: `diabetes mellitus[mh] AND treatment[tiab] AND systematic review[pt] AND 2023:2026[dp]`

## E-utilities Workflow

Use NCBI E-utilities (`esearch`, `esummary`, `efetch`, `elink`) with `NCBI_EMAIL` and `NCBI_API_KEY` from environment variables:

```python
import os, requests
BASE = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils"
r = requests.get(f"{BASE}/esearch.fcgi", params={
    "db": "pubmed", "term": query, "retmode": "json",
    "retmax": 20, "email": os.environ.get("NCBI_EMAIL", ""),
    "api_key": os.environ.get("NCBI_API_KEY"),
}, timeout=30)
r.raise_for_status()
```

## Output Discipline

Record exact search string, database, date, filters, result count, export format, and exclusions.

## References

- [PubMed help](https://pubmed.ncbi.nlm.nih.gov/help/)
- [NCBI E-utilities documentation](https://www.ncbi.nlm.nih.gov/books/NBK25501/)
- [NCBI API key guidance](https://support.nlm.nih.gov/kbArticle/?pn=KA-05317)
