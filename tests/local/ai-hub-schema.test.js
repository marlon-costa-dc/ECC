#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const HUB = path.join(require('os').homedir(), '.ai-hub');
const SCHEMA_PATH = path.join(HUB, 'schema.json');
const REGISTRY_PATH = path.join(HUB, 'mcp', 'registry.json');

function readJson(p, label) {
  if (!fs.existsSync(p)) {
    console.error(`SKIP: ${label} not found at ${p}`);
    process.exit(0);
  }
  const text = fs.readFileSync(p, 'utf8');
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error(`FAIL: invalid JSON in ${p}: ${err.message}`);
    process.exit(1);
  }
}

const schema = readJson(SCHEMA_PATH, 'AI-Hub schema');
const registry = readJson(REGISTRY_PATH, 'AI-Hub MCP registry');

const enumPath = schema?.definitions?.server?.properties?.compatibility?.items?.enum;
if (!Array.isArray(enumPath)) {
  console.error('FAIL: schema enum path missing');
  process.exit(1);
}

const allowed = new Set(enumPath);
const allowedValues = [...allowed].sort().map((v) => `"${v}"`).join(', ');
const violations = [];
for (const [name, server] of Object.entries(registry.servers || {})) {
  const compatibility = server.compatibility;
  if (!Array.isArray(compatibility)) {
    violations.push(`${name}: compatibility is not an array`);
    continue;
  }
  for (const agent of compatibility) {
    if (!allowed.has(agent)) {
      violations.push(`${name}: "${agent}"`);
    }
  }
}

if (violations.length) {
  console.error('FAIL: registry compatibility values not in schema enum:');
  for (const v of violations) console.error(`  ${v}`);
  console.error(`Allowed enum values: ${allowedValues}`);
  console.error('Passed: 0');
  console.error('Failed: 1');
  process.exit(1);
}

console.log('PASS: AI-Hub registry compatibility values match schema enum');
console.log('Passed: 1');
console.log('Failed: 0');
