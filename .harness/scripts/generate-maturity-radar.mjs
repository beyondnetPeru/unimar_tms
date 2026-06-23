#!/usr/bin/env node
/**
 * generate-maturity-radar.mjs — unimar_tms
 *
 * Adaptado de unimar_arch. Genera radar de madurez SDLC del TMS.
 *
 * Uso:
 *   node .harness/scripts/generate-maturity-radar.mjs
 */

console.log("=========================================");
console.log("UNIMAR TMS - GENERADOR DE MADUREZ SDLC");
console.log("=========================================\n");

const mermaidChart = `
## Radar de Madurez SDLC — unimar_tms

\`\`\`mermaid
pie title Nivel de Adopción de Prácticas SDLC (Escala 1-100)
    "Planificación (PRD/Épicas)" : 85
    "Diseño (ADR/Arquitectura)" : 90
    "Desarrollo (GitFlow/Commits)" : 80
    "Calidad (Testing/Cobertura)" : 70
    "Documentación (BMAD/Validación)" : 85
\`\`\`
`;
console.log(mermaidChart);
console.log("=========================================");
