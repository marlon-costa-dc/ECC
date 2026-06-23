```
Doctor opens encounter for Patient #4521
  → Sticky header shows: "Rajesh M, 58M, Allergies: Penicillin, Active Meds: Metformin 500mg"
  → Chief Complaint: selects "Chest Pain" template
    → Clicks chips: "substernal", "radiating to left arm", "crushing"
    → Red flag "crushing substernal chest pain" triggers non-dismissable alert
  → Examination: CVS system — "S1 S2 normal, no murmur"
  → Vitals: HR 110, BP 90/60, SpO2 94%
    → NEWS2 auto-calculates: score 8, risk HIGH, escalation alert shown
  → Diagnosis: searches "ACS" → selects ICD-10 I21.9
  → Medications: selects Aspirin 300mg
    → CDSS checks against Metformin: no interaction
  → Signs encounter → locked, addendum-only from this point
```

### Example 2: Medication Safety Workflow

```
Doctor prescribes Warfarin for Patient #4521
  → CDSS detects: Warfarin + Aspirin = CRITICAL interaction
  → UI: red non-dismissable modal blocks prescribing
  → Doctor clicks "Override with reason"
  → Types: "Benefits outweigh risks — monitored INR protocol"
  → Override reason + alert stored in audit trail
  → Prescription proceeds with documented override
```

### Example 3: Locked Encounter + Addendum

```
Encounter #E-2024-0891 signed by Dr. Shah at 14:30
  → All fields locked — no edit buttons visible
  → "Add Addendum" button available
  → Dr. Shah clicks addendum, adds: "Lab results received — Troponin elevated"
  → New record E-2024-0891-A1 linked to original
  → Timeline shows both: original encounter + addendum with timestamps
```
