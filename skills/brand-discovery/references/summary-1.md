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

When more than one founder participates, write each founder's answers to
`founders/{participant}.md` instead of the main module files. Validate the
`participant` name before writing: accept only alphanumeric characters and
hyphens (e.g. `founder-a`, `anna`); reject names containing path separators
(`/`, `\`, `..`) or special characters. Validate `moduleFile` against the
enumerated module sequence (10 through 90 only). Validate `outputPath` to
ensure it is an absolute path within the project directory — reject relative
paths and paths that escape via `..` segments. After all founders complete a
module, run a reconciliation pass: summarise convergences and divergences in
the module file, flag "productive tensions" for the group alignment workshop.

## Anti-Patterns

- **Starting without reading state first.** Every session must open by checking for existing module files and `state.json`. Skipping this loses all continuity from prior sessions.
- **Asking multiple questions at once.** One question at a time is not optional — lists produce checklist answers, not real insight.
- **Moving to Synthesis before saturation.** If the last two probes produced no new information, the module is done. If they did — it isn't.
- **Skipping multi-founder reconciliation.** When multiple stakeholders are involved, individual interviews must complete before reconciliation. Discussing the brand collectively first introduces anchoring bias.
- **Treating this as a one-shot session.** This skill is designed for multiple sessions. Rushing to `90_SYNTHESIS.md` in one conversation produces shallow output.

## Related Skills

- `competitive-platform-analysis` — after brand-discovery establishes the positioning brief, use this to scope and categorise the competitor set.
- `brand-voice` (ECC) — if the brand-discovery voice-and-tone module needs a separate, source-derived writing-style profile.
