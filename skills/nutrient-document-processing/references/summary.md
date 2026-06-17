# Nutrient Document Processing

> **Note:** This skill integrates with the Nutrient commercial API. Review their terms before use.

Process documents with the [Nutrient DWS Processor API](https://www.nutrient.io/api/). Convert formats, extract text and tables, OCR scanned documents, redact PII, add watermarks, digitally sign, and fill PDF forms.

## Setup

Get a free API key at **[nutrient.io](https://dashboard.nutrient.io/sign_up/?product=processor)**

[See code example 1 in `code-examples.md`]

All requests go to `https://api.nutrient.io/build` as multipart POST with an `instructions` JSON field.

## Operations

### Convert Documents

[See code example 2 in `code-examples.md`]

Supported inputs: PDF, DOCX, XLSX, PPTX, DOC, XLS, PPT, PPS, PPSX, ODT, RTF, HTML, JPG, PNG, TIFF, HEIC, GIF, WebP, SVG, TGA, EPS.

### Extract Text and Data

[See code example 3 in `code-examples.md`]

### OCR Scanned Documents

[See code example 4 in `code-examples.md`]

Languages: Supports 100+ languages via ISO 639-2 codes (e.g., `eng`, `deu`, `fra`, `spa`, `jpn`, `kor`, `chi_sim`, `chi_tra`, `ara`, `hin`, `rus`). Full language names like `english` or `german` also work. See the [complete OCR language table](https://www.nutrient.io/guides/document-engine/ocr/language-support/) for all supported codes.

### Redact Sensitive Information

[See code example 5 in `code-examples.md`]

Presets: `social-security-number`, `email-address`, `credit-card-number`, `international-phone-number`, `north-american-phone-number`, `date`, `time`, `url`, `ipv4`, `ipv6`, `mac-address`, `us-zip-code`, `vin`.

### Add Watermarks

[See code example 6 in `code-examples.md`]

### Digital Signatures

[See code example 7 in `code-examples.md`]

### Fill PDF Forms

[See code example 8 in `code-examples.md`]

## MCP Server (Alternative)

For native tool integration, use the MCP server instead of curl:

[See code example 9 in `code-examples.md`]

## When to Use

- Converting documents between formats (PDF, DOCX, XLSX, PPTX, HTML, images)
- Extracting text, tables, or key-value pairs from PDFs
- OCR on scanned documents or images
- Redacting PII before sharing documents
- Adding watermarks to drafts or confidential documents
- Digitally signing contracts or agreements
- Filling PDF forms programmatically

## Links

- [API Playground](https://dashboard.nutrient.io/processor-api/playground/)
- [Full API Docs](https://www.nutrient.io/guides/dws-processor/)
- [npm MCP Server](https://www.npmjs.com/package/@nutrient-sdk/dws-mcp-server)
