#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const repoRoot = path.join(__dirname, '..');
const srcDir = path.join(repoRoot, 'src');

/**
 * Recursively scan for .ts / .tsx files.
 * @param {string} dir
 * @returns {boolean}
 */
function hasTypeScriptSources(dir) {
  if (!fs.existsSync(dir)) {
    return false;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (hasTypeScriptSources(entryPath)) {
        return true;
      }
      continue;
    }

    if (entry.isFile() && /\.tsx?$/i.test(entry.name)) {
      return true;
    }
  }

  return false;
}

if (!hasTypeScriptSources(srcDir)) {
  console.log('No TypeScript sources detected under src/, skipping build step.');
  process.exit(0);
}

const tscBin = require.resolve('typescript/bin/tsc');
const result = spawnSync(process.execPath, [tscBin, '-p', path.join(repoRoot, 'tsconfig.build.json')], {
  stdio: 'inherit'
});

process.exit(result.status ?? 0);
