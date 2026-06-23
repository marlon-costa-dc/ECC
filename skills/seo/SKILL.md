---
name: seo
description: Use when the user wants to audit, plan, and implement SEO improvements across technical SEO, on-page optimization, structured data, Core Web Vitals, and content strategy to improve search visibility, schema markup, sitemaps, robots, and keyword mapping.
origin: ECC
---

# SEO

Improve search visibility through technical correctness, performance, and content relevance.

## When to Use

- Auditing crawlability, indexability, canonicals, or redirects.
- Improving title tags, meta descriptions, and heading structure.
- Adding or validating structured data.
- Improving Core Web Vitals.
- Doing keyword research and mapping keywords to URLs.
- Planning internal linking or sitemap / robots changes.

## Principles

1. Fix technical blockers before content optimization.
2. One page should have one clear primary search intent.
3. Prefer long-term quality signals over manipulative patterns.
4. Mobile-first assumptions matter because indexing is mobile-first.
5. Recommendations should be page-specific and implementable.

## Checklist Summary

- **Crawlability:** robots.txt allows important pages, no accidental `noindex`, shallow click depth, short redirect chains, consistent canonicals.
- **Indexability:** consistent URLs, correct hreflang, sitemap matches public surface, no uncanonicalized duplicates.
- **Performance:** LCP < 2.5s, INP < 200ms, CLS < 0.1.
- **Structured data:** match schema to page reality (`Article`, `Product`, `BreadcrumbList`, `FAQPage`).
- **On-page:** title ~50-60 chars, meta description ~120-160 chars, one clear `H1`, logical heading hierarchy.
- **Keywords:** define intent, gather variants, prioritize by value, map one primary theme per URL, avoid cannibalization.
- **Internal linking:** link from strong pages to target pages with descriptive anchor text.

## Anti-Patterns

- Keyword stuffing, thin near-duplicate pages, schema for absent content, advice without reading the real page, generic "improve SEO" outputs.

## References

- Detailed examples, JSON-LD snippets, and audit output templates: [references/seo-reference.md](references/seo-reference.md)
- Related skills: `frontend-patterns`, `brand-voice`, `market-research`
