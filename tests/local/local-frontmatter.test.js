/**
 * Tests that every local skill and agent has valid YAML frontmatter with the
 * required fields and sane values.
 *
 * Local skills (local/skills/.../SKILL.md) require:
 *   - name: non-empty string
 *   - description: non-empty string
 * Local agents (local/agents/*.md) require:
 *   - name: non-empty string
 *   - description: non-empty string
 *   - model: non-empty string
 * tools is optional for both; when present it must be a non-empty string or a
 * non-empty array of non-empty strings.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ROOT = path.resolve(__dirname, '..', '..');
const LOCAL = path.join(ROOT, 'local');
const FIXTURES = path.join(__dirname, 'fixtures', 'frontmatter');

let passed = 0;
let failed = 0;

function fail(message) {
  console.error(`  ✗ ${message}`);
  failed++;
}

function pass(message) {
  console.log(`  ✓ ${message}`);
  passed++;
}

function relative(filePath) {
  return path.relative(ROOT, filePath);
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function extractFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    return { present: false, data: null };
  }

  let data;
  try {
    data = yaml.load(match[1]);
  } catch (err) {
    return { present: true, data: null, yamlError: err.message };
  }

  if (data === null || typeof data !== 'object' || Array.isArray(data)) {
    return { present: true, data: null, notMapping: true };
  }

  return { present: true, data, error: false };
}

function checkStringField(data, field) {
  if (!(field in data)) {
    return { ok: false, error: `missing required frontmatter field "${field}"` };
  }
  if (!isNonEmptyString(data[field])) {
    return { ok: false, error: `"${field}" must be a non-empty string` };
  }
  return { ok: true };
}

function checkToolsField(data) {
  if (!('tools' in data)) {
    return { ok: true };
  }

  const tools = data.tools;

  if (isNonEmptyString(tools)) {
    return { ok: true };
  }

  if (Array.isArray(tools)) {
    if (tools.length === 0) {
      return { ok: false, error: '"tools" array must not be empty' };
    }
    for (let i = 0; i < tools.length; i++) {
      if (!isNonEmptyString(tools[i])) {
        return { ok: false, error: `"tools[${i}]" must be a non-empty string` };
      }
    }
    return { ok: true };
  }

  return { ok: false, error: '"tools" must be a non-empty string or array of strings' };
}

function checkSkill(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');
  const { present, data, yamlError, notMapping } = extractFrontmatter(source);

  if (!present) {
    return { ok: false, error: 'missing frontmatter block' };
  }
  if (yamlError) {
    return { ok: false, error: `invalid YAML frontmatter — ${yamlError}` };
  }
  if (notMapping) {
    return { ok: false, error: 'frontmatter must be a YAML mapping' };
  }

  const checks = [
    checkStringField(data, 'name'),
    checkStringField(data, 'description'),
    checkToolsField(data),
  ];

  for (const check of checks) {
    if (!check.ok) {
      return check;
    }
  }

  return { ok: true };
}

function checkAgent(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');
  const { present, data, yamlError, notMapping } = extractFrontmatter(source);

  if (!present) {
    return { ok: false, error: 'missing frontmatter block' };
  }
  if (yamlError) {
    return { ok: false, error: `invalid YAML frontmatter — ${yamlError}` };
  }
  if (notMapping) {
    return { ok: false, error: 'frontmatter must be a YAML mapping' };
  }

  const checks = [
    checkStringField(data, 'name'),
    checkStringField(data, 'description'),
    checkStringField(data, 'model'),
    checkToolsField(data),
  ];

  for (const check of checks) {
    if (!check.ok) {
      return check;
    }
  }

  return { ok: true };
}

function validateSkill(filePath) {
  const result = checkSkill(filePath);
  if (result.ok) {
    pass(`${relative(filePath)}: valid skill frontmatter`);
  } else {
    fail(`${relative(filePath)}: ${result.error}`);
  }
}

function validateAgent(filePath) {
  const result = checkAgent(filePath);
  if (result.ok) {
    pass(`${relative(filePath)}: valid agent frontmatter`);
  } else {
    fail(`${relative(filePath)}: ${result.error}`);
  }
}

function walkSkills(dir, acc = []) {
  if (!fs.existsSync(dir)) {
    return acc;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkSkills(fullPath, acc);
    } else if (entry.isFile() && entry.name === 'SKILL.md') {
      acc.push(fullPath);
    }
  }
  return acc;
}

function walkAgents(dir, acc = []) {
  if (!fs.existsSync(dir)) {
    return acc;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isFile() && entry.name.endsWith('.md')) {
      acc.push(fullPath);
    }
  }
  return acc;
}

function runFixtureTests() {
  if (!fs.existsSync(FIXTURES)) {
    return;
  }

  const fixtureFiles = fs.readdirSync(FIXTURES, { withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.endsWith('.md'))
    .map(entry => path.join(FIXTURES, entry.name));

  for (const filePath of fixtureFiles) {
    const fileName = path.basename(filePath);
    const isInvalid = fileName.startsWith('invalid-');
    const isSkill = fileName.includes('skill-');
    const isAgent = fileName.includes('agent-');

    if (!isSkill && !isAgent) {
      continue;
    }

    const checkFn = isSkill ? checkSkill : checkAgent;
    const result = checkFn(filePath);

    if (isInvalid) {
      if (result.ok) {
        fail(`${relative(filePath)}: expected validation to fail but it passed`);
      } else {
        pass(`${relative(filePath)}: correctly rejected invalid frontmatter (${result.error})`);
      }
    } else {
      if (result.ok) {
        pass(`${relative(filePath)}: valid ${isSkill ? 'skill' : 'agent'} frontmatter`);
      } else {
        fail(`${relative(filePath)}: ${result.error}`);
      }
    }
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
const skillFiles = walkSkills(path.join(LOCAL, 'skills'));
const agentFiles = walkAgents(path.join(LOCAL, 'agents'));

for (const f of skillFiles) {
  validateSkill(f);
}
for (const f of agentFiles) {
  validateAgent(f);
}

runFixtureTests();

console.log(`\nPassed: ${passed}`);
console.log(`Failed: ${failed}`);
process.exit(failed > 0 ? 1 : 0);
