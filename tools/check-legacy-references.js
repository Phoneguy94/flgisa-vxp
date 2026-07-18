#!/usr/bin/env node

/**
 * Fails when legacy personal-host references remain in repository text files.
 * Run from the repository root with: node tools/check-legacy-references.js
 *
 * During parallel testing, use:
 *   ALLOW_LEGACY_REFERENCES=1 node tools/check-legacy-references.js
 * to print the inventory without failing.
 */

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const needles = [/phoneguy94/gi, /\/0924\b/gi];
const ignoredDirs = new Set(['.git', 'node_modules']);
const allowedExtensions = new Set(['.html', '.js', '.css', '.json', '.md', '.txt', '.yml', '.yaml']);
const findings = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoredDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (!allowedExtensions.has(path.extname(entry.name).toLowerCase())) continue;
    const rel = path.relative(root, full).replaceAll(path.sep, '/');
    if (rel === 'tools/check-legacy-references.js') continue;
    const lines = fs.readFileSync(full, 'utf8').split(/\r?\n/);
    lines.forEach((line, index) => {
      if (needles.some((pattern) => pattern.test(line))) {
        findings.push(`${rel}:${index + 1}: ${line.trim()}`);
      }
      needles.forEach((pattern) => { pattern.lastIndex = 0; });
    });
  }
}

walk(root);

if (!findings.length) {
  console.log('PASS: no legacy personal-host references found.');
  process.exit(0);
}

console.log(`Found ${findings.length} legacy reference(s):`);
findings.forEach((finding) => console.log(`- ${finding}`));

if (process.env.ALLOW_LEGACY_REFERENCES === '1') {
  console.log('\nParallel-test mode: references are inventoried but temporarily allowed.');
  process.exit(0);
}

console.error('\nFAIL: replace every listed reference before final Veytec handoff.');
process.exit(1);
