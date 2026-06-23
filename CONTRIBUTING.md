# Contributing — unimar_tms

## Repositorio Satélite

Este repositorio es un satélite de `unimar_arch`. Toda contribución debe respetar las reglas de herencia definidas en la [Guía de Herencia](https://github.com/mhernandez-unimar/unimar_arch/blob/main/reference/governance/standards/onboarding/guia-herencia-repositorio-hijo.md).

## Operaciones Permitidas

| Operación | Significado |
|-----------|-------------|
| **Adopt** | Tomar el patrón de `unimar_arch` tal cual |
| **Extend** | Añadir extensiones locales (requiere ADR con `Extends:`) |
| **Override** | Diverge del patrón de referencia (requiere ADR con `Overrides:` + justificación) |
| **N/A** | El patrón no aplica (solo registro en `DECISIONS.md`) |

## Proceso

1. Las decisiones arquitectónicas se registran en `DECISIONS.md`.
2. Los ADRs locales se almacenan en `reference/architecture/adrs/`.
3. Las historias y épicas siguen las plantillas SDLC de `unimar_arch`.
4. Diagramas Mermaid obligatorios en historias funcionales y épicas.
5. Validación pre-commit: ejecutar `node .harness/scripts/validate-docs.mjs`.
