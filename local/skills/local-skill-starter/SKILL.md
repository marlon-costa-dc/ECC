---
name: local-skill-starter
description: Generate a new project-local skill from the canonical template.
---

# local-skill-starter

## When to Activate

Use when you need to add a new skill that is specific to this repository or workflow and is not covered by ECC or `~/.ai-hub`.

## Steps

1. Choose a unique name prefixed with `local-`.
2. Run the generator command or copy `local/templates/skill-starter.template.md` to `local/skills/<name>/SKILL.md`.
3. Fill in `name`, `description`, and the skill body.
4. Run `node tests/local/local-deduplicate.test.js` to ensure no collisions.
5. Run `node tests/local/local-frontmatter.test.js` to validate frontmatter.
6. Run `npm test` before committing.

## Generator command

```bash
name="local-my-skill"
description="My project-specific skill"
mkdir -p "local/skills/${name}"
sed -e "s/{{NAME}}/${name}/g" -e "s/{{DESCRIPTION}}/${description}/g" \
  local/templates/skill-starter.template.md > "local/skills/${name}/SKILL.md"
```
