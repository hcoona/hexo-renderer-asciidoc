#!/usr/bin/env node
/**
 * Copyright 2015 Shuai Zhang
 * SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
 */


// Swap README.md with README.npm.md during `npm pack` / `npm publish` so that
// the npm package shows the end-user oriented README, while the repository
// keeps its own root README.md for contributors.

const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
const readmePath = path.join(rootDir, "README.md");
const npmReadmePath = path.join(rootDir, "README.npm.md");
// Use a dot-prefixed backup file name so that it is not auto-included by npm
// (which eagerly includes any top-level README* files in the tarball).
const backupPath = path.join(rootDir, ".README.md.npm-backup");

/**
 * Simple logger with prefix so it is easy to spot in npm output.
 * @param {string} message
 */
function log(message) {
  // eslint-disable-next-line no-console
  console.log(`[npm-readme] ${message}`);
}

/**
 * Simple error logger.
 * @param {string} message
 */
function logError(message) {
  // eslint-disable-next-line no-console
  console.error(`[npm-readme] ${message}`);
}

/**
 * Replace README.md with README.npm.md, keeping a backup.
 */
function handlePrepack() {
  if (!fs.existsSync(npmReadmePath)) {
    // Nothing to do if there is no README.npm.md in the repo.
    return;
  }

  if (fs.existsSync(backupPath)) {
    logError(
      "Backup file already exists. Aborting to avoid overwriting it. Please check README.md and remove .README.md.npm-backup if everything looks fine.",
    );
    process.exitCode = 1;
    return;
  }

  if (fs.existsSync(readmePath)) {
    fs.copyFileSync(readmePath, backupPath);
  }

  fs.copyFileSync(npmReadmePath, readmePath);
  log("Swapped README.md with README.npm.md for npm pack/publish.");
}

/**
 * Restore original README.md from backup, if any.
 */
function handlePostpack() {
  if (!fs.existsSync(backupPath)) {
    // Nothing to restore.
    return;
  }

  fs.copyFileSync(backupPath, readmePath);
  fs.rmSync(backupPath);
  log("Restored original README.md after npm pack/publish.");
}

function main() {
  const mode = process.argv[2];

  if (!mode) {
    logError("Expected mode argument: prepack | postpack");
    process.exitCode = 1;
    return;
  }

  if (mode === "prepack") {
    handlePrepack();
    return;
  }

  if (mode === "postpack") {
    handlePostpack();
    return;
  }

  logError(`Unknown mode: ${mode}`);
  process.exitCode = 1;
}

main();
