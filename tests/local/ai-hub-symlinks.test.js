#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const HOME = require('os').homedir();
const HUB = path.join(HOME, '.ai-hub');

const expected = [
  { agent: 'kimi', link: path.join(HOME, '.kimi-code', 'mcp.json'), target: path.join(HUB, 'mcp', 'generated', 'kimi.mcp.json') },
  { agent: 'claude', link: path.join(HOME, '.claude', 'mcp-config.json'), target: path.join(HUB, 'mcp', 'generated', '.mcp.json') },
];

let passed = 0;
let failed = 0;

function remediationHint(agent) {
  return `(Run ~/.ai-hub/sync/generate-${agent}.sh to recreate)`;
}

for (const { agent, link, target } of expected) {
  let stats;
  try {
    stats = fs.lstatSync(link);
  } catch (err) {
    console.error(`FAIL: symlink missing: ${link} (Error: ${err.message}) ${remediationHint(agent)}`);
    failed++;
    continue;
  }

  if (!stats.isSymbolicLink()) {
    const type = stats.isDirectory() ? 'directory' : 'regular file';
    console.error(`FAIL: expected symlink but found ${type}: ${link}`);
    failed++;
    continue;
  }

  let real;
  try {
    real = fs.realpathSync(link);
  } catch (err) {
    console.error(`FAIL: symlink broken: ${link} (Error: ${err.message}) ${remediationHint(agent)}`);
    failed++;
    continue;
  }

  if (real !== target) {
    console.error(`FAIL: ${link} resolves to ${real}, expected ${target}`);
    failed++;
    continue;
  }

  passed++;
}

if (failed > 0) {
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  process.exit(1);
}

console.log('PASS: AI-Hub MCP symlinks are healthy');
console.log(`Verified ${passed} symlinks`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
