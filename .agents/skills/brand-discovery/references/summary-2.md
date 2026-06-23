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
