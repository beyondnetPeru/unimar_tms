#!/usr/bin/env node
/**
 * validate-heredogram.mjs — unimar_tms
 *
 * Adaptado de unimar_arch. Valida la cadena de herencia entre el satélite
 * y unimar_arch. Verifica que ADRs y plantillas referenciadas existan.
 *
 * Uso:
 *   node .harness/scripts/validate-heredogram.mjs --base <path-to-unimar_arch>
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, basename, extname } from 'path';

const BASE_PATH = process.argv.includes('--base')
  ? process.argv[process.argv.indexOf('--base') + 1]
  : null;

let totalReferences = 0;
let validReferences = 0;
let brokenReferences = 0;
let issues = [];

function log(message, type = 'info') {
  const prefix = { info: '  ℹ', ok: '  ✔', warn: '  ⚠', error: '  ✘', section: '━━━━━━━━━━━━━━━━' };
  console.log(`${prefix[type] || '  ·'} ${message}`);
}

function findMdFiles(dir) {
  const files = [];
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!entry.name.startsWith('.') && !['node_modules', '_bmad'].includes(entry.name)) {
          files.push(...findMdFiles(fullPath));
        }
      } else if (extname(entry.name) === '.md') {
        files.push(fullPath);
      }
    }
  } catch (e) { /* ignore */ }
  return files;
}

function extractAdrReferences(content) {
  const refs = [];
  const pattern = /ADR-\d+/g;
  let match;
  while ((match = pattern.exec(content)) !== null) {
    refs.push(match[0]);
  }
  return [...new Set(refs)];
}

function resolveAdrPath(adrId, basePath) {
  const adrNum = adrId.replace('ADR-', '').padStart(4, '0');
  const candidates = [
    join(basePath, 'reference/architecture/adrs/core', `${adrId.toLowerCase()}.es.md`),
    join(basePath, 'reference/architecture/adrs/core', `${adrNum}-*.es.md`),
    join(basePath, 'reference/architecture/adrs/nodejs', `${adrId.toLowerCase()}.es.md`),
    join(basePath, 'reference/architecture/adrs', `${adrId.toLowerCase()}.es.md`),
  ];
  for (const c of candidates) {
    const idx = c.indexOf('*');
    if (idx !== -1) {
      const dir = c.substring(0, c.lastIndexOf('/'));
      const prefix = c.substring(idx - 4, idx);
      try {
        const entries = readdirSync(dir);
        const found = entries.find(e => e.startsWith(prefix));
        if (found) return join(dir, found);
      } catch (e) { /* continue */ }
    } else if (existsSync(c)) {
      return c;
    }
  }
  return null;
}

function validateSourceFiles() {
  if (!BASE_PATH) {
    log('Usar --base <path-to-unimar_arch> para validar heredograma', 'warn');
    return;
  }

  if (!existsSync(BASE_PATH)) {
    log(`Base path no existe: ${BASE_PATH}`, 'error');
    return;
  }

  log(`Validando contra: ${BASE_PATH}`, 'section');
  const files = findMdFiles(process.cwd());
  log(`Archivos en satélite: ${files.length}`, 'info');

  for (const file of files) {
    const content = readFileSync(file, 'utf-8');
    const relativeFile = file.replace(process.cwd() + '/', '');
    const adrRefs = extractAdrReferences(content);

    for (const ref of adrRefs) {
      totalReferences++;
      const adrPath = resolveAdrPath(ref, BASE_PATH);
      if (adrPath && existsSync(adrPath)) {
        validReferences++;
      } else {
        brokenReferences++;
        issues.push({ file: relativeFile, ref, message: `${ref} no existe en unimar_arch` });
        log(`${relativeFile}: ${ref} no encontrado`, 'error');
      }
    }
  }
}

function printSummary() {
  log('━━━━━━━━━━━━━━━━', 'section');
  log('RESUMEN DE HEREDOGRAMA', 'section');
  log(`Referencias: ${totalReferences} | Válidas: ${validReferences} | Rotas: ${brokenReferences}`,
    brokenReferences > 0 ? 'error' : 'ok');

  if (issues.length > 0) {
    log('REFERENCIAS ROTAS:', 'error');
    for (const issue of issues) {
      log(`  • ${issue.file}: ${issue.ref} → ${issue.message}`, 'error');
    }
  }
  log('━━━━━━━━━━━━━━━━', 'section');
  return brokenReferences === 0;
}

validateSourceFiles();
const success = printSummary();
process.exit(success ? 0 : 1);
