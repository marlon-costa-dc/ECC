# Extended guidance


Apply these rules throughout every module:

1. **One question at a time.** Never present a list of questions.
2. **After each answer:** short paraphrase → one deepening probe OR close
   the thread if the topic is saturated. Never move on silently.
3. **Laddering:** for every "what" answer, follow with "Why does that
   matter to you?" until a core value surfaces (typically two to four
   iterations).
4. **5 Whys:** for beliefs or positioning claims — push until the root
   reason, not the surface declaration, is on the table.
5. **Detect thin answers:** if generic, jargon-heavy, or vague, ask for
   one concrete example, a client story, or a number.
6. **Projective techniques** (use once per module to break a plateau):
   - "If the brand were a person, how would they walk into a room?"
   - Brand obituary: "If the organization closed in five years, what would
     customers miss? What would you regret not having said?"
   - Competitive contrast: "Name one peer you admire but would never want
     to become. What specifically makes them the wrong model?"
7. **Saturation signal:** when two consecutive probes produce no new
   information, summarise and close the module.
8. **End of module:** write a structured module file with two sections:
   - `## Raw` — verbatim quotes and examples.
   - `## Synthesis` — your interpretation, three candidate formulations,
     open questions, contradictions between participants.
   Then update the `state.json` checkpoint (see State protocol below).

## Module sequence

| File | Label | Frameworks used |
|------|-------|-----------------|
| `10_purpose-why.md` | Purpose / Why | Sinek Golden Circle, Lencioni |
| `20_positioning.md` | Positioning | Dunford "Obviously Awesome", Moore template |
| `30_audience-niche.md` | Audience & Niche | Baker "Business of Expertise", ICP |
| `40_personality-archetype.md` | Personality & Archetype | Mark & Pearson 12 archetypes, J. Aaker 5 dims |
| `50_voice-tone.md` | Voice & Tone | Brand voice guidelines |
| `60_narrative-story.md` | Narrative / Story | Neumeier trueline, brand story arc |
| `70_founder-tension.md` | Founder Brands vs Studio Brand | Enns "Win Without Pitching" |
| `90_SYNTHESIS.md` | Master Brandbook | Kapferer prism, Aaker brand system |

Complete modules in order. Honour a user request to jump modules and note
the skip in `state.json`.

## State write protocol

After each module reaches saturation or done status, write two files:

**Module file** at `modules/{moduleFile}` — full Raw and Synthesis content.

**`state.json`** — a lightweight checkpoint so a later session can resume.
Update `completedModules`, `inProgressModule`, `nextModule`, `lastUpdated`.
Schema:

```json
{
  "session": "{brand_name}-brand-{YYYY-MM}",
  "outputPath": "{path_to_brand_identity_directory}",
  "completedModules": [],
  "inProgressModule": "10_purpose-why.md",
  "nextModule": "20_positioning.md",
  "participants": ["founder-A"],
  "lastUpdated": "{ISO-8601}"
}
```

After writing, confirm: "Module X saved. State updated. Next: Y."

**Terminal module (90_SYNTHESIS.md):** when writing the final synthesis,
set `inProgressModule` to `"90_SYNTHESIS.md"` and `nextModule` to `null`
in `state.json`. After writing, set `completedModules` to include
`"90_SYNTHESIS.md"`, then set `inProgressModule` to `null` — leaving it
populated would cause a future resumption to treat the completed brandbook
as still in progress. Confirm: "Brandbook complete. All modules saved."

## Multi-founder mode

> Continued in [`summary-2.md`](summary-2.md)
