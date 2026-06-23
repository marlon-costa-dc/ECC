/**
 * Tests for scripts/ai-sync-ecc.js
 */

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const SCRIPT = path.join(__dirname, '..', '..', 'scripts', 'ai-sync-ecc.js');
const REPO_ROOT = path.join(__dirname, '..', '..');

function createTempDir(prefix) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

function cleanup(dirPath) {
  fs.rmSync(dirPath, { recursive: true, force: true });
}

function run(args = [], options = {}) {
  const homeDir = options.homeDir || createTempDir('ai-sync-home-');
  const env = {
    ...process.env,
    HOME: homeDir,
    USERPROFILE: homeDir,
    ...(options.env || {}),
  };

  const result = spawnSync('node', [SCRIPT, ...args], {
    cwd: options.cwd || REPO_ROOT,
    encoding: 'utf8',
    env,
    maxBuffer: 10 * 1024 * 1024,
  });

  return {
    code: result.status,
    stdout: result.stdout || '',
    stderr: result.stderr || '',
    homeDir,
  };
}

function parseJson(stdout) {
  return JSON.parse(stdout.trim());
}

function createMinimalSourceRoot() {
  const root = createTempDir('ai-sync-source-');
  fs.mkdirSync(path.join(root, 'agents'), { recursive: true });
  fs.mkdirSync(path.join(root, 'skills', 'tdd-workflow'), { recursive: true });
  fs.mkdirSync(path.join(root, 'commands'), { recursive: true });
  fs.mkdirSync(path.join(root, '.claude-plugin'), { recursive: true });
  fs.mkdirSync(path.join(root, '.codex'), { recursive: true });

  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify({
    name: 'ecc-universal',
    version: '9.9.9',
  }, null, 2));
  fs.writeFileSync(path.join(root, 'agents', 'planner.md'), '# planner\n');
  fs.writeFileSync(path.join(root, 'skills', 'tdd-workflow', 'SKILL.md'), '# tdd\n');
  fs.writeFileSync(path.join(root, 'commands', 'plan.md'), '# plan\n');
  fs.writeFileSync(path.join(root, 'AGENTS.md'), '# agents\n');
  fs.writeFileSync(path.join(root, '.codex', 'AGENTS.md'), '# codex\n');
  fs.writeFileSync(path.join(root, '.claude-plugin', 'plugin.json'), JSON.stringify({
    name: 'ecc',
    version: '9.9.9',
    skills: ['./skills/'],
    commands: ['./commands/'],
    mcpServers: {},
  }, null, 2));

  return root;
}

function test(name, fn) {
  try {
    fn();
    console.log(`  \u2713 ${name}`);
    return true;
  } catch (error) {
    console.log(`  \u2717 ${name}`);
    console.log(`    Error: ${error.message}`);
    return false;
  }
}

function runTests() {
  console.log('\n=== Testing ai-sync-ecc.js ===\n');

  let passed = 0;
  let failed = 0;

  if (test('shows help', () => {
    const result = run(['--help']);
    cleanup(result.homeDir);
    assert.strictEqual(result.code, 0, result.stderr);
    assert.ok(result.stdout.includes('Usage: node scripts/ai-sync-ecc.js'));
    assert.ok(result.stdout.includes('--apply'));
    assert.ok(result.stdout.includes('--target'));
  })) passed++; else failed++;

  if (test('plans all harnesses without writing generated files by default', () => {
    const homeDir = createTempDir('ai-sync-home-');
    const generatedDir = path.join(homeDir, '.ai-hub', 'ecc', 'generated');
    try {
      const result = run(['--json', '--generated-dir', generatedDir], { homeDir });
      assert.strictEqual(result.code, 0, result.stderr);
      const payload = parseJson(result.stdout);
      assert.strictEqual(payload.mode, 'plan');
      assert.deepStrictEqual(payload.targets, ['claude', 'codex', 'kimi']);
      assert.strictEqual(payload.source.repository, 'https://github.com/marlon-costa-dc/ECC');
      assert.ok(payload.source.counts.agents > 0);
      assert.ok(payload.source.counts.skills > 0);
      assert.ok(payload.source.counts.commands > 0);
      assert.ok(payload.operations.some(operation => operation.target === 'kimi'));
      assert.ok(!fs.existsSync(path.join(generatedDir, 'manifest.json')));
    } finally {
      cleanup(homeDir);
    }
  })) passed++; else failed++;

  if (test('applies Kimi generated package from the source root', () => {
    const homeDir = createTempDir('ai-sync-home-');
    const generatedDir = path.join(homeDir, '.ai-hub', 'ecc', 'generated');
    try {
      const result = run([
        '--apply',
        '--target', 'kimi',
        '--skip-mcp',
        '--generated-dir', generatedDir,
      ], { homeDir });
      assert.strictEqual(result.code, 0, result.stderr);

      const manifest = JSON.parse(fs.readFileSync(path.join(generatedDir, 'manifest.json'), 'utf8'));
      const plugin = JSON.parse(fs.readFileSync(path.join(generatedDir, 'kimi', 'kimi.plugin.json'), 'utf8'));

      assert.deepStrictEqual(manifest.targets, ['kimi']);
      assert.strictEqual(plugin.$schema, 'https://code.kimi.com/schema/kimi.plugin.json');
      assert.strictEqual(plugin.name, 'ecc');
      assert.strictEqual(plugin.homepage, 'https://github.com/marlon-costa-dc/ECC');
      assert.strictEqual(plugin.repository, 'https://github.com/marlon-costa-dc/ECC');
      assert.strictEqual(plugin.interface.websiteURL, 'https://github.com/marlon-costa-dc/ECC');
      assert.strictEqual(plugin.skills, './skills/');
      assert.deepStrictEqual(plugin.mcpServers, {});
      assert.ok(fs.lstatSync(path.join(generatedDir, 'kimi', 'skills')).isSymbolicLink());
      assert.ok(fs.lstatSync(path.join(generatedDir, 'kimi', 'agents')).isSymbolicLink());
      assert.ok(fs.lstatSync(path.join(generatedDir, 'kimi', 'commands')).isSymbolicLink());
    } finally {
      cleanup(homeDir);
    }
  })) passed++; else failed++;

  if (test('rejects a Claude plugin manifest that would duplicate native surfaces', () => {
    const homeDir = createTempDir('ai-sync-home-');
    const sourceRoot = createMinimalSourceRoot();
    try {
      const pluginPath = path.join(sourceRoot, '.claude-plugin', 'plugin.json');
      const plugin = JSON.parse(fs.readFileSync(pluginPath, 'utf8'));
      plugin.agents = ['./agents/'];
      fs.writeFileSync(pluginPath, JSON.stringify(plugin, null, 2));

      const result = run(['--source', sourceRoot, '--target', 'claude'], { homeDir });
      assert.strictEqual(result.code, 1);
      assert.ok(result.stderr.includes('must not declare agents'));
    } finally {
      cleanup(homeDir);
      cleanup(sourceRoot);
    }
  })) passed++; else failed++;

  if (test('plans Codex sync with central MCP ownership', () => {
    const homeDir = createTempDir('ai-sync-home-');
    try {
      const result = run(['--json', '--target', 'codex'], { homeDir });
      assert.strictEqual(result.code, 0, result.stderr);
      const payload = parseJson(result.stdout);
      const codexOperation = payload.operations.find(operation => operation.target === 'codex');
      assert.ok(codexOperation, 'Expected Codex operation');
      assert.ok(codexOperation.command.includes('scripts/sync-ecc-to-codex.sh'));
      assert.ok(codexOperation.args.includes('--skip-mcp'));
      assert.ok(payload.operations.some(operation => operation.kind === 'mcp-sync'));
    } finally {
      cleanup(homeDir);
    }
  })) passed++; else failed++;

  console.log(`\nResults: Passed: ${passed}, Failed: ${failed}`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
