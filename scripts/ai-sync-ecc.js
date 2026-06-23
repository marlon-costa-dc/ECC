#!/usr/bin/env node

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const TARGETS = ['claude', 'codex', 'kimi'];
const DEFAULT_REPOSITORY_URL = 'https://github.com/marlon-costa-dc/ECC';
const LINKED_KIMI_PATHS = [
  'agents',
  'commands',
  'hooks',
  'mcp-configs',
  'rules',
  'skills',
  'AGENTS.md',
];

function showHelp(exitCode = 0) {
  console.log(`
ECC AI sync automation

Usage: node scripts/ai-sync-ecc.js [options]

Options:
  --apply                 Write generated assets and run target sync commands
  --dry-run               Plan only (default)
  --target <name>         Target to sync: claude, codex, kimi, or all
  --source <path>         ECC source root (default: repo root)
  --home <path>           Home directory for local AI tooling (default: $HOME)
  --generated-dir <path>  Output directory (default: ~/.ai-hub/ecc/generated)
  --skip-mcp              Do not run the central MCP sync/apply automation
  --json                  Emit machine-readable JSON
  --help                  Show this help

Examples:
  node scripts/ai-sync-ecc.js --json
  node scripts/ai-sync-ecc.js --apply --target kimi --skip-mcp
  node scripts/ai-sync-ecc.js --apply --target codex
`);
  process.exit(exitCode);
}

function parseArgs(argv) {
  const options = {
    apply: false,
    generatedDir: null,
    homeDir: process.env.HOME || process.env.USERPROFILE || os.homedir(),
    json: false,
    skipMcp: false,
    sourceRoot: path.resolve(__dirname, '..'),
    targets: TARGETS.slice(),
  };

  for (let index = 2; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--help' || arg === '-h') {
      showHelp(0);
    } else if (arg === '--apply') {
      options.apply = true;
    } else if (arg === '--dry-run') {
      options.apply = false;
    } else if (arg === '--json') {
      options.json = true;
    } else if (arg === '--skip-mcp') {
      options.skipMcp = true;
    } else if (arg === '--target') {
      index += 1;
      if (index >= argv.length) {
        throw new Error('--target requires a value');
      }
      options.targets = normalizeTargets(argv[index]);
    } else if (arg === '--source') {
      index += 1;
      if (index >= argv.length) {
        throw new Error('--source requires a value');
      }
      options.sourceRoot = path.resolve(argv[index]);
    } else if (arg === '--home') {
      index += 1;
      if (index >= argv.length) {
        throw new Error('--home requires a value');
      }
      options.homeDir = path.resolve(argv[index]);
    } else if (arg === '--generated-dir') {
      index += 1;
      if (index >= argv.length) {
        throw new Error('--generated-dir requires a value');
      }
      options.generatedDir = path.resolve(argv[index]);
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  if (!options.generatedDir) {
    options.generatedDir = path.join(options.homeDir, '.ai-hub', 'ecc', 'generated');
  }

  return options;
}

function normalizeTargets(rawValue) {
  if (rawValue === 'all') {
    return TARGETS.slice();
  }

  const targets = rawValue.split(',')
    .map(value => value.trim())
    .filter(Boolean);

  if (targets.length === 0) {
    throw new Error('--target must include at least one target');
  }

  const unknownTargets = targets.filter(target => !TARGETS.includes(target));
  if (unknownTargets.length > 0) {
    throw new Error(`Unknown target(s): ${unknownTargets.join(', ')}`);
  }

  return [...new Set(targets)];
}

function readJson(filePath, label) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    throw new Error(`Failed to read ${label} at ${filePath}: ${error.message}`);
  }
}

function normalizeRepositoryUrl(repository) {
  const rawValue = typeof repository === 'string'
    ? repository
    : repository && repository.url;

  if (!rawValue) {
    return null;
  }

  const withoutGitPrefix = rawValue.replace(/^git\+/, '');
  const httpsFromSsh = withoutGitPrefix.replace(/^git@github\.com:/, 'https://github.com/');
  return httpsFromSsh.replace(/\.git$/, '').replace(/#readme$/, '');
}

function countFiles(dirPath, predicate) {
  if (!fs.existsSync(dirPath)) {
    return 0;
  }

  let count = 0;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const absolutePath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      count += countFiles(absolutePath, predicate);
    } else if (entry.isFile() && predicate(absolutePath, entry.name)) {
      count += 1;
    }
  }
  return count;
}

function countSkillDirs(skillsRoot) {
  if (!fs.existsSync(skillsRoot)) {
    return 0;
  }

  return fs.readdirSync(skillsRoot, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .filter(entry => fs.existsSync(path.join(skillsRoot, entry.name, 'SKILL.md')))
    .length;
}

function inspectSource(sourceRoot) {
  const packageJsonPath = path.join(sourceRoot, 'package.json');
  const packageJson = readJson(packageJsonPath, 'package.json');
  const repositoryUrl = normalizeRepositoryUrl(packageJson.repository)
    || normalizeRepositoryUrl(packageJson.homepage)
    || DEFAULT_REPOSITORY_URL;

  for (const requiredPath of ['AGENTS.md', 'agents', 'commands', 'skills']) {
    const absolutePath = path.join(sourceRoot, requiredPath);
    if (!fs.existsSync(absolutePath)) {
      throw new Error(`Missing required ECC source path: ${absolutePath}`);
    }
  }

  return {
    name: packageJson.name || 'ecc-universal',
    repositoryUrl,
    version: packageJson.version || '0.0.0',
    counts: {
      agents: countFiles(path.join(sourceRoot, 'agents'), (_file, name) => name.endsWith('.md')),
      commands: countFiles(path.join(sourceRoot, 'commands'), (_file, name) => name.endsWith('.md')),
      skills: countSkillDirs(path.join(sourceRoot, 'skills')),
    },
  };
}

function validateClaudePlugin(sourceRoot) {
  const pluginPath = path.join(sourceRoot, '.claude-plugin', 'plugin.json');
  const plugin = readJson(pluginPath, 'Claude plugin manifest');

  if (Object.prototype.hasOwnProperty.call(plugin, 'agents')) {
    throw new Error('Claude plugin manifest must not declare agents; Claude discovers agents by convention');
  }

  if (Object.prototype.hasOwnProperty.call(plugin, 'hooks')) {
    throw new Error('Claude plugin manifest must not declare hooks; hooks/hooks.json is auto-loaded by convention');
  }

  if (
    plugin.mcpServers
    && typeof plugin.mcpServers === 'object'
    && !Array.isArray(plugin.mcpServers)
    && Object.keys(plugin.mcpServers).length > 0
  ) {
    throw new Error('Claude plugin manifest must keep mcpServers empty; central MCP sync owns MCP config');
  }

  for (const key of ['commands', 'skills']) {
    if (Object.prototype.hasOwnProperty.call(plugin, key) && !Array.isArray(plugin[key])) {
      throw new Error(`Claude plugin manifest field ${key} must be an array`);
    }
  }

  return {
    path: pluginPath,
    version: plugin.version || null,
  };
}

function createKimiPlugin(source) {
  const description = [
    `Enhanced Cognitive Controller (ECC) for Kimi Code CLI.`,
    `${source.counts.agents} agent workflows, ${source.counts.skills} skills,`,
    `${source.counts.commands} command prompts, reusable hooks, rules, and operator workflows.`,
  ].join(' ');

  return {
    $schema: 'https://code.kimi.com/schema/kimi.plugin.json',
    name: 'ecc',
    version: source.version,
    description,
    author: {
      name: 'Affaan Mustafa',
      url: 'https://x.com/affaan',
    },
    homepage: source.repositoryUrl,
    repository: source.repositoryUrl,
    license: 'MIT',
    keywords: [
      'kimi-code',
      'agents',
      'skills',
      'hooks',
      'rules',
      'tdd',
      'code-review',
      'security',
      'workflow',
      'automation',
      'best-practices',
    ],
    skills: './skills/',
    sessionStart: {
      skill: 'ecc-session-start',
    },
    skillInstructions: [
      'You are operating with ECC capabilities.',
      'Prefer ECC skills for planning, code review, security-sensitive work, and verification loops.',
      'Use the central MCP configuration generated by mcp-sync; do not duplicate MCP servers in this plugin.',
    ].join(' '),
    interface: {
      displayName: 'ECC',
      shortDescription: 'Harness workflow substrate for Kimi Code CLI',
      longDescription: description,
      developerName: 'Affaan Mustafa',
      websiteURL: source.repositoryUrl,
    },
    mcpServers: {},
  };
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function writeText(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value);
}

function archivePath(targetPath) {
  if (!fs.existsSync(targetPath)) {
    return;
  }

  const backupPath = `${targetPath}.bak.${Date.now()}`;
  fs.renameSync(targetPath, backupPath);
}

function linkPath(sourcePath, destinationPath) {
  if (!fs.existsSync(sourcePath)) {
    return false;
  }

  if (fs.existsSync(destinationPath)) {
    const current = fs.lstatSync(destinationPath);
    if (current.isSymbolicLink() && fs.readlinkSync(destinationPath) === sourcePath) {
      return true;
    }
    archivePath(destinationPath);
  }

  fs.symlinkSync(sourcePath, destinationPath);
  return true;
}

function findExecutable(homeDir, executableName) {
  const preferredPath = path.join(homeDir, '.agents', 'bin', executableName);
  if (fs.existsSync(preferredPath)) {
    return preferredPath;
  }

  const pathEntries = String(process.env.PATH || '').split(path.delimiter).filter(Boolean);
  for (const entry of pathEntries) {
    const candidate = path.join(entry, executableName);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return preferredPath;
}

function commandLine(command, args) {
  return [command, ...args].map(part => (
    /\s/.test(part) ? JSON.stringify(part) : part
  )).join(' ');
}

function createOperations(options, source, claudeValidation) {
  const operations = [];
  const targets = options.targets;

  operations.push({
    kind: 'write-json',
    target: 'all',
    path: path.join(options.generatedDir, 'manifest.json'),
  });

  if (targets.includes('claude')) {
    operations.push({
      kind: 'validate',
      target: 'claude',
      path: claudeValidation.path,
      reason: 'Claude plugin must not duplicate agents, hooks, or MCP servers',
    });
    operations.push({
      kind: 'write-file',
      target: 'claude',
      path: path.join(options.generatedDir, 'claude', 'README.md'),
    });
  }

  if (targets.includes('codex')) {
    const command = path.join(options.sourceRoot, 'scripts', 'sync-ecc-to-codex.sh');
    operations.push({
      kind: 'run-script',
      target: 'codex',
      command,
      args: ['--skip-mcp'],
    });
  }

  if (targets.includes('kimi')) {
    operations.push({
      kind: 'write-json',
      target: 'kimi',
      path: path.join(options.generatedDir, 'kimi', 'kimi.plugin.json'),
    });
    for (const relativePath of LINKED_KIMI_PATHS) {
      operations.push({
        kind: 'link',
        target: 'kimi',
        source: path.join(options.sourceRoot, relativePath),
        path: path.join(options.generatedDir, 'kimi', relativePath),
      });
    }
  }

  if (!options.skipMcp) {
    for (const target of targets.filter(candidate => ['codex', 'kimi'].includes(candidate))) {
      const syncCommand = findExecutable(options.homeDir, 'mcp-sync');
      const applyCommand = findExecutable(options.homeDir, 'mcp-sync-apply');
      operations.push({
        kind: 'mcp-sync',
        target,
        command: syncCommand,
        args: ['--agent', target],
      });
      operations.push({
        kind: 'mcp-apply',
        target,
        command: applyCommand,
        args: ['--agent', target],
      });
    }
  }

  return operations.map(operation => ({
    ...operation,
    commandLine: operation.command ? commandLine(operation.command, operation.args || []) : undefined,
    sourceVersion: source.version,
  }));
}

function createManifest(options, source) {
  return {
    schemaVersion: 'ecc.ai-sync.v1',
    generatedAt: new Date().toISOString(),
    source: {
      root: options.sourceRoot,
      name: source.name,
      repository: source.repositoryUrl,
      version: source.version,
      counts: source.counts,
    },
    targets: options.targets,
    mcp: {
      skipped: options.skipMcp,
      registry: path.join(options.homeDir, '.agents', 'mcp', 'servers.json'),
    },
  };
}

function ensureCodexScriptSupportsCentralMcp(sourceRoot) {
  const scriptPath = path.join(sourceRoot, 'scripts', 'sync-ecc-to-codex.sh');
  if (!fs.existsSync(scriptPath)) {
    throw new Error(`Missing Codex sync script: ${scriptPath}`);
  }

  const source = fs.readFileSync(scriptPath, 'utf8');
  if (!source.includes('--skip-mcp')) {
    throw new Error('Codex sync script must support --skip-mcp before central AI sync can own MCP');
  }
}

function runOperation(operation, env) {
  const result = spawnSync(operation.command, operation.args || [], {
    cwd: env.sourceRoot,
    env: {
      ...process.env,
      HOME: env.homeDir,
      USERPROFILE: env.homeDir,
    },
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.stdout) {
    process.stdout.write(result.stdout);
  }

  if (result.stderr) {
    process.stderr.write(result.stderr);
  }

  if (result.status !== 0) {
    throw new Error(`${operation.commandLine} exited with ${result.status}`);
  }
}

function applyOperations(options, source, operations, manifest) {
  writeJson(path.join(options.generatedDir, 'manifest.json'), manifest);

  if (options.targets.includes('claude')) {
    const body = [
      '# ECC Claude Sync',
      '',
      'Claude uses the ECC plugin surface directly.',
      'This generated note exists so AI sync has a local audit artifact without duplicating Claude hooks or MCP servers.',
      '',
      `Source: ${options.sourceRoot}`,
      `Version: ${source.version}`,
      '',
    ].join('\n');
    writeText(path.join(options.generatedDir, 'claude', 'README.md'), body);
  }

  if (options.targets.includes('kimi')) {
    const kimiDir = path.join(options.generatedDir, 'kimi');
    fs.mkdirSync(kimiDir, { recursive: true });
    writeJson(path.join(kimiDir, 'kimi.plugin.json'), createKimiPlugin(source));
    for (const relativePath of LINKED_KIMI_PATHS) {
      linkPath(path.join(options.sourceRoot, relativePath), path.join(kimiDir, relativePath));
    }
  }

  for (const operation of operations) {
    if (operation.kind === 'run-script' || operation.kind === 'mcp-sync' || operation.kind === 'mcp-apply') {
      runOperation(operation, {
        homeDir: options.homeDir,
        sourceRoot: options.sourceRoot,
      });
    }
  }
}

function main() {
  const options = parseArgs(process.argv);
  const source = inspectSource(options.sourceRoot);
  const claudeValidation = validateClaudePlugin(options.sourceRoot);

  if (options.targets.includes('codex')) {
    ensureCodexScriptSupportsCentralMcp(options.sourceRoot);
  }

  const manifest = createManifest(options, source);
  const operations = createOperations(options, source, claudeValidation);
  const payload = {
    schemaVersion: 'ecc.ai-sync.v1',
    mode: options.apply ? 'apply' : 'plan',
    source: manifest.source,
    generatedDir: options.generatedDir,
    targets: options.targets,
    operations,
    mcp: manifest.mcp,
  };

  if (options.apply) {
    applyOperations(options, source, operations, manifest);
  }

  if (options.json) {
    process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
    return;
  }

  console.log(`ECC AI sync ${payload.mode}`);
  console.log(`Source: ${options.sourceRoot}`);
  console.log(`Generated dir: ${options.generatedDir}`);
  console.log(`Targets: ${options.targets.join(', ')}`);
  console.log('');
  for (const operation of operations) {
    if (operation.commandLine) {
      console.log(`- ${operation.kind} ${operation.target}: ${operation.commandLine}`);
    } else {
      console.log(`- ${operation.kind} ${operation.target}: ${operation.path}`);
    }
  }
}

try {
  main();
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
