# Quality & Non-Conformance — Core Knowledge

## NCR Lifecycle

- **Identification:** record who, where, standard violated, quantity, lot/batch traceability; quarantine immediately with physical and electronic hold
- **Documentation:** NCR number, part/revision/PO/spec, measurement data, photos, inspector ID; satisfy FDA 21 CFR 820.90 and IATF 16949 §8.7 as applicable
- **Investigation:** determine isolated vs systemic scope; check upstream/downstream lots, WIP, finished goods; containment precedes root cause analysis
- **MRB Disposition:** use-as-is (engineering justification; customer approval often required); rework (approved procedure, re-inspect); repair (permanent deviation, concession); RTV (SCAR/CAR, debit/replacement, update scorecard); scrap (traceability, authorized approval, witness destruction for safety-critical parts)

## Root Cause Analysis

- **5 Whys:** simple linear failures; verify each "why" with data
- **Ishikawa (Fishbone):** 6M framework for hypothesis generation
- **Fault Tree Analysis (FTA):** top-down deductive; required for aerospace and medical device safety events
- **8D Methodology:** team-based D0-D8 problem-solving expected by automotive OEMs

## CAPA System

- **Initiation triggers:** repeat NCs, complaints, audit findings, field failures, SPC trends, regulatory observations
- **Effective CAPAs:** specific, measurable, root-cause-aligned, with owner and target date
- **Verification vs validation:** verification = implemented as planned; validation = prevented recurrence
- **Closure criteria:** objective evidence of implementation AND effectiveness; 90 days / 3 lots / one audit cycle
- **Regulatory expectations:** FDA 21 CFR 820.100, IATF 16949, AS9100, ISO 13485

## Statistical Process Control

- **Chart selection:** X-bar/R for n=2-10; X-bar/S for n>10; I-MR for n=1; p/np/c/u for attribute data
- **Capability:** Cp = potential; Cpk = centered; Pp/Ppk = long-term. Automotive typically requires Cpk ≥ 1.33, Ppk ≥ 1.67
- **Western Electric Rules:** Rule 1 (beyond 3σ) demands action; Rules 2-4 indicate systematic causes
- **Common vs special cause:** common cause needs fundamental change; special cause is assignable. Tampering with a stable process increases variation.

## Incoming Inspection

- **AQL sampling (ANSI/ASQ Z1.4 / ISO 2859-1):** Level II standard; tightened after 2 of 5 rejected; reduced after 10 accepted. Critical AQL = 0; major 1.0-2.5; minor 2.5-6.5
- **Skip-lot:** typically 10+ consecutive accepted lots; revert immediately on rejection
- **CoC reliance:** new supplier = inspect; qualified supplier = CoC + reduced verification; critical dimensions = always inspect

## Supplier Quality Management

- **Audit types:** process, system, product; risk-based schedule
- **Scorecards:** PPM, OTD, SCAR response time, SCAR effectiveness, lot acceptance
- **CARs/SCARs:** expect 8D or equivalent; 10 days initial response, 30 days full plan
- **ASL:** entry requires qualification; removal requires transition plan
- **Develop vs switch:** invest when capability is unique and gaps are addressable; switch when trend deteriorates or alternatives exist

## Regulatory Frameworks

- **FDA 21 CFR 820 (QSR):** 820.90 nonconforming product, 820.100 CAPA, 820.198 complaints, 820.250 statistical techniques
- **IATF 16949 (Automotive):** control plans, PPAP, MSA, 8D, special characteristics
- **AS9100 (Aerospace):** product safety, counterfeit prevention, configuration management, FAI per AS9102
- **ISO 13485 (Medical Devices):** risk management ISO 14971, traceability, design controls

## Cost of Quality

- **Prevention:** training, validation, design reviews, supplier qualification, SPC, poka-yoke
- **Appraisal:** inspection, testing, calibration, audits
- **Internal failure:** scrap, rework, re-inspection, delays
- **External failure:** returns, warranty, recalls, regulatory actions, reputation
