#!/usr/bin/env node
/**
 * Tests that local/ artifact names do not collide with canonical ECC surfaces.
 * All local artifacts must use the "local-" prefix; the prefix is stripped
 * before comparing names.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const LOCAL = path.join(ROOT, 'local');
const AGENTS = path.join(ROOT, 'agents');
const SKILLS = path.join(ROOT, 'skills');
const COMMANDS = path.join(ROOT, 'commands');
const RULES = path.join(ROOT, 'rules');

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

function listNames(dir, suffix = '') {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isFile() && e.name.endsWith(suffix))
    .map(e => path.basename(e.name, suffix));
}

function listSkillNames(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isDirectory() && fs.existsSync(path.join(dir, e.name, 'SKILL.md')))
    .map(e => e.name);
}

function checkNoOverlap(category, localNames, canonicalNames) {
  const collisions = localNames.filter(n => canonicalNames.includes(n.replace(/^local-/, '')));
  if (collisions.length) {
    fail(`local ${category} collide with canonical: ${collisions.join(', ')}`);
  } else {
    pass(`no collisions between local ${category} and canonical ${category}`);
  }
}

const localAgents = listNames(path.join(LOCAL, 'agents'), '.md');
const localSkills = listSkillNames(path.join(LOCAL, 'skills'));
const localCommands = listNames(path.join(LOCAL, 'commands'), '.md');
const localRules = listNames(path.join(LOCAL, 'rules'), '.md');

checkNoOverlap('agents', localAgents, listNames(AGENTS, '.md'));
checkNoOverlap('skills', localSkills, listSkillNames(SKILLS));
checkNoOverlap('commands', localCommands, listNames(COMMANDS, '.md'));
checkNoOverlap('rules', localRules, listNames(RULES, '.md'));

console.log(`\nPassed: ${passed}`);
console.log(`Failed: ${failed}`);
process.exit(failed > 0 ? 1 : 0);
