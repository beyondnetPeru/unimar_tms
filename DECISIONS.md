# DECISIONS.md — unimar_tms

Propietario del repositorio: **Unimar** (<https://www.unimar.com.pe/>)

Este documento registra el **triaje de patrones** del estándar corporativo `unimar_arch` para este repositorio satélite. Las operaciones (Adopt / Extend / Override / N/A) siguen la [Guía de Herencia del Repositorio Hijo](https://github.com/mhernandez-unimar/unimar_arch/blob/main/reference/governance/standards/onboarding/guia-herencia-repositorio-hijo.md).

## Triage de Reglas Globales (unimar_arch)

| ID | Título | Operación | ADR Local | Notas |
| :-- | :----- | :-------- | :-------- | :---- |
| R-04 | Idioma único español | Adopt | — | Sin divergencia |
| R-06 | Stack tecnológico autorizado | Extend | ADR-0001 | Stack TMS específico; ver `reference/architecture/stack-tecnologico-autorizado-tms.es.md` |
| R-07 | Separar FUNCTIONAL / TECHNICAL / ENABLER | Adopt | — | Sin divergencia |
| R-08 | Trazabilidad documento-diagrama | Adopt | — | Sin divergencia |
| R-10 | Legibilidad en documentos funcionales | Adopt | — | Sin divergencia |
| R-12 | Orden PO → Arquitecto | Adopt | — | Sin divergencia |
| R-13 | Convenciones de nomenclatura | Adopt | — | Sin divergencia |
| R-14 | Estructura funcional con Requisitos Técnicos | Adopt | — | Sin divergencia |
| R-21 | Registro de decisiones en DECISIONS.md | Adopt | — | Sin divergencia |
| R-26 | `unimar_arch` como base autoritativa | Adopt | — | Este repositorio es satélite |
| R-27 | Herencia de plantillas sin modificar canónica | Adopt | — | Plantillas desde `unimar_arch` |
| R-28 | Diagramas Mermaid obligatorios en FS y épicas | Adopt | — | Sin divergencia |
| R-29 | Sección 3 completa (Requisitos Técnicos) | Adopt | — | Sin divergencia |
| R-30 | Sección 2 completa (Actores) | Adopt | — | Sin divergencia |

## Triage de Reglas de Satélite (unimar_arch)

| ID | Título | Operación | ADR Local | Notas |
| :-- | :----- | :-------- | :-------- | :---- |
| S-01 | Plantillas Base SDLC | Adopt | — | Heredadas de `unimar_arch` |
| S-02 | Formato Canónico de Historias | Adopt | — | Sin divergencia |
| S-03 | Diagramas Mermaid Obligatorios | Adopt | — | Sin divergencia |
| S-04 | Requisitos Técnicos Aislados | Adopt | — | Sin divergencia |
| S-05 | Actores y Stakeholders | Extend | ADR-0002 | Actor "Conductor" y "Operador Logístico" específicos del dominio TMS |
| S-06 | Trazabilidad a ADRs de `unimar_arch` | Adopt | — | ADRs referenciados desde `unimar_arch` |
| S-07 | Stack Tecnológico Autorizado | Extend | ADR-0001 | Stack TMS definido localmente |
| S-08 | Versión SemVer en Plantillas | Adopt | — | Sin divergencia |
| S-09 | Idioma Único | Adopt | — | Sin divergencia |
| S-10 | Referencias Relativas | Adopt | — | Sin divergencia |
| S-11 | Badges Uniformados | Adopt | — | Sin divergencia |
| S-12 | Validación Pre-Commit | Adopt | — | Sin divergencia |
| S-13 | Historial de Cambios | Adopt | — | Sin divergencia |
| S-14 | Guía de Estilo | Adopt | — | Sin divergencia |
| S-15 | Decisiones Locales | Adopt | — | Este documento |

## Convención para ADRs Locales

Los ADRs locales siguen el formato estándar corporativo de `unimar_arch`:

- `Extends: ADR-NNNN` — cuando se construye sobre un ADR de referencia sin contradecirlo
- `Overrides: ADR-NNNN` — cuando se diverge explícitamente (requiere sección `Divergence Justification`)

Los ADRs se almacenan bajo `reference/architecture/adrs/` usando el patrón `NNNN-descriptive-title.md`.
