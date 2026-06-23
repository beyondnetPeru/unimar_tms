#!/usr/bin/env node
/**
 * validate-satellite-base.mjs — unimar_tms
 *
 * Adaptado de unimar_arch. Valida artefactos SDLC contra reglas S-02 a S-14.
 *
 * Uso:
 *   node .harness/scripts/validate-satellite-base.mjs [--base <url>] [--verbose]
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, relative, extname, basename } from 'path';

const BASE_URL = process.argv.includes('--base')
  ? process.argv[process.argv.indexOf('--base') + 1]
  : null;

const VERBOSE = process.argv.includes('--verbose');
const FIX = process.argv.includes('--fix');
const REPORT = process.argv.includes('--report');

const RULES = {
  S02: { name: 'Formato Canónico', pattern: /##\s+\d+\.\s+\w+/, required: true },
  S03: { name: 'Diagrama Mermaid', pattern: /```mermaid/, required: true },
  S04: { name: 'Requisitos Técnicos', sections: ['3.', 'Bounded Context', 'Dependencias', 'Restricciones'], required: true },
  S05: { name: 'Actores y Stakeholders', sections: ['2.', 'Actor Principal', 'Actores Secundarios', 'Diagrama de Interacción'], required: true },
  S09: { name: 'Idioma Español', pattern: /^[^\n]*[à-ÿÀ-ÿ]+[^\n]*$/m, required: false },
  S10: { name: 'Referencias Relativas', pattern: /\]\(\.\.\//, required: true },
  S11: { name: 'Badges Uniformados', pattern: /img\.shields\.io/, required: false },
  S13: { name: 'Historial de Cambios', sections: ['Historial de Cambios', 'Versión', 'Fecha', 'Autor'], required: false },
  S14: { name: 'Guía de Estilo', pattern: /\[#[\w-]+\]\(#[\w-]+\)/, required: true }
};

const ARTEFACT_TYPES = ['historia-funcional', 'historia-usuario', 'historia-tecnica', 'epica', 'prd'];

let totalFiles = 0;
let passedFiles = 0;
let failedFiles = 0;
let issues = [];

function log(message, type = 'info') {
  const prefix = { info: '  ℹ', ok: '  ✔', warn: '  ⚠', error: '  ✘', section: '━━━━━━━━━━━━━━━━' };
  console.log(`${prefix[type] || '  ·'} ${message}`);
}

function getAllMdFiles(dir, baseDir = dir) {
  const files = [];
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!entry.name.startsWith('.') && !['node_modules', '_bmad'].includes(entry.name)) {
          files.push(...getAllMdFiles(fullPath, baseDir));
        }
      } else if (extname(entry.name) === '.md') {
        files.push({ path: fullPath, relative: relative(baseDir, fullPath) });
      }
    }
  } catch (e) { /* ignore */ }
  return files;
}

function isArtefactFile(filepath) {
  return ARTEFACT_TYPES.some(type => filepath.toLowerCase().includes(type));
}

function isPortadaFile(filepath) {
  const name = basename(filepath, '.md').toLowerCase();
  return name.startsWith('plantilla-') && !name.includes('fuente');
}

function isSourceOrExample(filepath) {
  const rel = filepath.toLowerCase();
  return rel.includes('/fuente/') || rel.includes('/ejemplos/');
}

function extractSections(content) {
  const sections = [];
  const regex = /^#{1,6}\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    sections.push(match[1].toLowerCase());
  }
  return sections;
}

function validateFile(file) {
  const content = readFileSync(file.path, 'utf-8');
  const fileIssues = [];

  if (!content || content.length === 0) {
    fileIssues.push({ rule: 'EMPTY', severity: 'high', message: 'Archivo vacío' });
    return fileIssues;
  }

  if (content.charCodeAt(0) === 0xFEFF) {
    fileIssues.push({ rule: 'R-03', severity: 'high', message: 'BOM detectado' });
  }

  if (content.includes('\r\n')) {
    fileIssues.push({ rule: 'R-03', severity: 'medium', message: 'CRLF detectado (debe ser LF)' });
  }

  if (isArtefactFile(file.path)) {
    if (VERBOSE) log(file.relative, 'section');

    for (const [ruleId, rule] of Object.entries(RULES)) {
      if (['S02', 'S03', 'S04', 'S05'].includes(ruleId) && isPortadaFile(file.path)) continue;

      if (rule.pattern && !rule.pattern.test(content) && rule.required) {
        fileIssues.push({ rule: ruleId, severity: 'high', message: `Falta: ${rule.name}` });
      }

      if (rule.sections && rule.required) {
        const missing = rule.sections.filter(s => !content.toLowerCase().includes(s.toLowerCase()));
        if (missing.length > 0) {
          fileIssues.push({ rule: ruleId, severity: 'high', message: `Falta sección: ${missing.join(', ')}` });
        }
      }
    }

    if (isSourceOrExample(file.path) && !content.includes('```mermaid')) {
      fileIssues.push({ rule: 'S03', severity: 'high', message: 'Falta diagrama Mermaid' });
    }

    if (!content.includes('Historial de Cambios')) {
      fileIssues.push({ rule: 'S13', severity: 'low', message: 'Falta Historial de Cambios' });
    }
  }

  return fileIssues;
}

function printSummary() {
  log('━━━━━━━━━━━━━━━━', 'section');
  log('RESUMEN DE VALIDACIÓN', 'section');
  log(`Total: ${totalFiles} | Aprobados: ${passedFiles} | Con problemas: ${failedFiles}`, failedFiles > 0 ? 'error' : 'ok');

  if (issues.length > 0) {
    log('PROBLEMAS DETECTADOS', 'error');
    for (const issue of issues) {
      log(`  • ${issue.file} [${issue.rule}] ${issue.message}`, 'error');
    }
  }
  log('━━━━━━━━━━━━━━━━', 'section');
  return failedFiles === 0;
}

const files = getAllMdFiles(process.cwd());
log(`Archivos Markdown: ${files.length}`, 'info');

for (const file of files) {
  totalFiles++;
  const fileIssues = validateFile(file);
  if (fileIssues.length === 0) {
    passedFiles++;
  } else {
    failedFiles++;
    if (VERBOSE) log(file.relative, 'error');
    for (const issue of fileIssues) {
      issues.push({ file: file.relative, ...issue });
    }
  }
}

const success = printSummary();
process.exit(success ? 0 : 1);
