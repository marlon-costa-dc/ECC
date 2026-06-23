# Healthcare PHI/PII Compliance Patterns

Patterns for protecting patient data, clinician data, and financial data in healthcare applications. Applicable to HIPAA (US), DISHA (India), GDPR (EU), and general healthcare data protection.

## When to Use

- Building any feature that touches patient records
- Implementing access control or authentication for clinical systems
- Designing database schemas for healthcare data
- Building APIs that return patient or clinician data
- Implementing audit trails or logging
- Reviewing code for data exposure vulnerabilities
- Setting up Row-Level Security (RLS) for multi-tenant healthcare systems

## How It Works

Healthcare data protection operates on three layers: **classification** (what is sensitive), **access control** (who can see it), and **audit** (who did see it).

### Data Classification

**PHI (Protected Health Information)** — any data that can identify a patient AND relates to their health: patient name, date of birth, address, phone, email, national ID numbers (SSN, Aadhaar, NHS number), medical record numbers, diagnoses, medications, lab results, imaging, insurance policy and claim details, appointment and admission records, or any combination of the above.

**PII (Non-patient-sensitive data)** in healthcare systems: clinician/staff personal details, doctor fee structures and payout amounts, employee salary and bank details, vendor payment information.

### Access Control: Row-Level Security

[See code example 1 in `code-examples.md`]

### Audit Trail

Every PHI access or modification must be logged:

[See code example 2 in `code-examples.md`]

### Common Leak Vectors

**Error messages:** Never include patient-identifying data in error messages thrown to the client. Log details server-side only.

**Console output:** Never log full patient objects. Use opaque internal record IDs (UUIDs) — not medical record numbers, national IDs, or names.

**URL parameters:** Never put patient-identifying data in query strings or path segments that could appear in logs or browser history. Use opaque UUIDs only.

**Browser storage:** Never store PHI in localStorage or sessionStorage. Keep PHI in memory only, fetch on demand.

**Service role keys:** Never use the service_role key in client-side code. Always use the anon/publishable key and let RLS enforce access.

**Logs and monitoring:** Never log full patient records. Use opaque record IDs only (not medical record numbers). Sanitize stack traces before sending to error tracking services.

### Database Schema Tagging

Mark PHI/PII columns at the schema level:

[See code example 3 in `code-examples.md`]

### Deployment Checklist

Before every deployment:
- No PHI in error messages or stack traces
- No PHI in console.log/console.error
- No PHI in URL parameters
- No PHI in browser storage
- No service_role key in client code
- RLS enabled on all PHI/PII tables
- Audit trail for all data modifications
- Session timeout configured
- API authentication on all PHI endpoints
- Cross-facility data isolation verified

## Examples

### Example 1: Safe vs Unsafe Error Handling

[See code example 4 in `code-examples.md`]

### Example 2: RLS Policy for Multi-Facility Isolation

[See code example 5 in `code-examples.md`]

### Example 3: Safe Logging

```typescript
// BAD — logs identifiable patient data
console.log('Processing patient:', patient);

---

For additional details, continue reading `summary-1.md`.
