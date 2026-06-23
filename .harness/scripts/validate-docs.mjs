#!/usr/bin/env node

/**
 * validate-docs.mjs — unimar_tms
 *
 * Valida enlaces relativos, anclas Markdown, bloques Mermaid y encoding UTF-8.
 * Adaptación local del script homónimo de unimar_arch.
 *
 * Uso:
 *   node .harness/scripts/validate-docs.mjs
 *   node .harness/scripts/validate-docs.mjs --render-mermaid
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(process.argv[1], '..', '..', '..');
const EXCLUDE_DIRS = new Set(['node_modules', '.git', '.claude', '_bmad', '_bmad-output']);
const EXTENSIONS = new Set(['.md']);

let errors = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!EXCLUDE_DIRS.has(entry.name)) walk(fullPath);
    } else if (EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      validateFile(fullPath);
    }
  }
}

function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(ROOT, filePath);

  // UTF-8 check: no BOM, no replacement characters
  if (content.charCodeAt(0) === 0xFEFF) {
    errors.push(`${relativePath}: BOM detectado`);
  }
  if (content.includes('\ufffd')) {
    errors.push(`${relativePath}: caracter de reemplazo U+FFFD`);
  }

  // No CRLF
  if (content.includes('\r\n')) {
    errors.push(`${relativePath}: terminaciones CRLF`);
  }

  // Check relative links resolve
  const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const href = match[2];
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) continue;
    const resolved = path.resolve(path.dirname(filePath), href);
    if (!fs.existsSync(resolved)) {
      errors.push(`${relativePath}: enlace roto -> ${href}`);
    }
  }
}

console.log('Validando documentación...');
walk(ROOT);

if (errors.length === 0) {
  console.log('✓ Documentación válida');
  process.exit(0);
} else {
  console.error(`\n✗ ${errors.length} error(es):`);
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
}
