# AGENTS.md — unimar_tms

> **Estado:** Aceptado | **Alcance:** Todos los agentes de IA y contribuidores humanos que trabajen en este repositorio

## Proyecto

`unimar_tms` es un **repositorio satélite** de Unimar (<https://www.unimar.com.pe/>) para un Sistema de Gestión de Transportes (TMS). Hereda la taxonomía, reglas, plantillas y skills del repositorio autoritativo [`unimar_arch`](https://github.com/mhernandez-unimar/unimar_arch).

## Repositorio Autoritativo

Este repositorio deriva de `unimar_arch` como fuente autoritativa de:

- **Taxonomía:** estructura de directorios, nomenclatura `kebab-case`, capas de autoridad documental
- **Reglas:** [Global Rules](https://github.com/mhernandez-unimar/unimar_arch/blob/main/.harness/rules/global-rules.md) (R-02 a R-30) y [Satellite Rules](https://github.com/mhernandez-unimar/unimar_arch/blob/main/.harness/rules/satellite-repo-rules.md) (S-01 a S-15)
- **Skills (habilidades):** 46 skills BMAD Method para agentes especializados (ver `.claude/skills/`)
- **Plantillas SDLC:** historias funcionales, de usuario, técnicas, épicas, ADRs, PRDs desde `unimar_arch`
- **Stack Tecnológico:** lista aprobada, con extensiones específicas del dominio TMS

## Idioma de la Documentación

**Toda la documentación de este repositorio se mantiene exclusivamente en español.** No se generan pares bilingües. Excepciones: acrónimos, identificadores de código, nombres propios de proyectos externos, marcas, referencias bibliográficas.

## Build & Run

- BMAD Method v6.9.0 instalado en `_bmad/`
- Workflows: invocar skills `bmad-*` desde el agente de IA (ver `bmad-help`)
- Documentación: empezar en `README.md` → `MASTER_INDEX.md`

## Reglas para Agentes

1. Leer [DECISIONS.md](./DECISIONS.md) antes de cualquier intervención para conocer el triaje local.
2. Leer las reglas globales y de satélite de `unimar_arch` (enlaces en sección Repositorio Autoritativo).
3. Toda decisión arquitectónica se registra en `DECISIONS.md`.
4. Verificar enlaces relativos y anclas antes de completar cualquier tarea de documentación.
5. Idioma único español para todo contenido nuevo.
6. Diagramas Mermaid obligatorios en historias funcionales y épicas.
7. Trazabilidad: cualquier cambio en un caso de uso debe actualizar los diagramas relevantes.
8. Stack tecnológico validado contra `reference/architecture/stack-tecnologico-autorizado-tms.es.md`.

## Frontera de Carpetas

| Capa | Carpeta | Propósito |
| :--- | :------ | :-------- |
| Corpus de referencia | `reference/` | Reutilizable, normativo |
| Artefactos BMAD | `_bmad-output/` | PRDs, épicas, historias, retrospectivas |
| Conocimiento de dominio | `docs/` | Documentación del dominio TMS |

## Calidad

- `node .harness/scripts/validate-docs.mjs` — validación completa de documentación
- Enlaces relativos rotos, anclas faltantes, bloques Mermaid malformados deben corregirse antes del merge
