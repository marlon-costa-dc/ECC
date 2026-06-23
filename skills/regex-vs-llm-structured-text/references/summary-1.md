- Sending all text to an LLM when regex handles 95%+ of cases (expensive and slow)
- Using regex for free-form, highly variable text (LLM is better here)
- Skipping confidence scoring and hoping regex "just works"
- Mutating parsed objects during cleaning/validation steps
- Not testing edge cases (malformed input, missing fields, encoding issues)

## When to Use

- Quiz/exam question parsing
- Form data extraction
- Invoice/receipt processing
- Document structure parsing (headers, sections, tables)
- Any structured text with repeating patterns where cost matters
