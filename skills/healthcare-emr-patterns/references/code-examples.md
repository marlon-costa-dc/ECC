# Code Examples

## Example 1

```
Patient Header (sticky — always visible)
├── Demographics, allergies, active medications
│
Encounter Flow (vertical scroll)
├── 1. Chief Complaint (structured templates + free text)
├── 2. History of Present Illness
├── 3. Physical Examination (system-wise)
├── 4. Vitals (auto-trigger clinical scoring)
├── 5. Diagnosis (ICD-10/SNOMED search)
├── 6. Medications (drug DB + interaction check)
├── 7. Investigations (lab/radiology orders)
├── 8. Plan & Follow-up
└── 9. Sign / Lock / Print
```

## Example 2

```typescript
interface ClinicalTemplate {
  id: string;
  name: string;             // e.g., "Chest Pain"
  chips: string[];          // clickable symptom chips
  requiredFields: string[]; // mandatory data points
  redFlags: string[];       // triggers non-dismissable alert
  icdSuggestions: string[]; // pre-mapped diagnosis codes
}
```

## Example 3

```
User selects drug
  → Check current medications for interactions
  → Check encounter medications for interactions
  → Check patient allergies
  → Validate dose against weight/age/renal function
  → If CRITICAL interaction: BLOCK prescribing entirely
  → Clinician must document override reason to proceed past a block
  → If MAJOR interaction: display warning, require acknowledgment
  → Log all alerts and override reasons in audit trail
```
