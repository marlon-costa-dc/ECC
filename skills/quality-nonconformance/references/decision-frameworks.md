# Quality & Non-Conformance — Decision Frameworks

## NCR Disposition Decision Logic

Evaluate in sequence; first path that applies governs:

1. **Safety/regulatory critical:** do not use-as-is; rework to full conformance or scrap; formal risk assessment and regulatory notification as required
2. **Customer-specific requirements:** contact customer for concession before disposing when customer spec is tighter than design spec
3. **Functional impact:** no functional impact → use-as-is with engineering justification; functional impact → rework or scrap
4. **Reworkability:** rework if approved process exists and cost < 60% of replacement; else scrap
5. **Supplier accountability:** supplier-caused → RTV with SCAR; if production cannot wait, use-as-is/rework with cost recovery

## RCA Method Selection

| Situation | Method | Budget |
|---|---|---|
| Single-event, simple causal chain | 5 Whys | 1-2 hours |
| Single-event, multiple cause categories | Ishikawa + 5 Whys | 4-8 hours |
| Recurring issue, process-related | 8D full team | 20-40 hours |
| Safety-critical or high-severity | Fault Tree Analysis + quantitative risk | 40-80 hours |
| Customer-mandated format | Use customer's required format | as required |

## CAPA Effectiveness Verification

Before closing any CAPA:

1. **Implementation evidence:** documented proof the action was completed
2. **Monitoring period:** minimum 90 days production data, 3 consecutive lots, or one full audit cycle
3. **Recurrence check:** zero recurrences of the specific failure mode; if recurrence occurs, reopen — do not open a new CAPA
4. **Leading indicators:** related metrics improved (PPM, complaint rate)

## Inspection Level Adjustment

| Condition | Action |
|---|---|
| New supplier, first 5 lots | Tightened (Level III or 100%) |
| 10+ consecutive lots accepted at normal | Qualify for reduced/skip-lot |
| 1 lot rejected under reduced | Revert to normal immediately |
| 2 of 5 consecutive lots rejected under normal | Switch to tightened |
| 5 consecutive lots accepted under tightened | Revert to normal |
| 10 consecutive lots rejected under tightened | Suspend supplier; escalate to procurement |
| Customer complaint traced to incoming material | Revert to tightened regardless of current level |

## Supplier Corrective Action Escalation

| Stage | Trigger | Action | Timeline |
|---|---|---|---|
| Level 1: SCAR issued | Single significant NC or 3+ minor NCs in 90 days | Formal SCAR requiring 8D response | 10 days response, 30 days implementation |
| Level 2: Supplier on watch | Late or ineffective SCAR response | Increased inspection, probation, procurement notified | 60 days to improve |
| Level 3: Controlled shipping | Continued failures during watch | Supplier inspection data with each shipment or third-party sort | 90 days sustained improvement |
| Level 4: New source qualification | No improvement under controlled shipping | Initiate alternate supplier qualification; reduce allocation | 3-12 months |
| Level 5: ASL removal | Failure to improve or unwillingness to invest | Formal ASL removal; transition all parts | before final PO |
