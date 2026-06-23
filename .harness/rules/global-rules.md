# Global Rules — unimar_tms

> **Herencia:** Adopt desde [`unimar_arch/.harness/rules/global-rules.md`](https://github.com/mhernandez-unimar/unimar_arch/blob/main/.harness/rules/global-rules.md)
> **Alcance:** Repositorio satélite unimar_tms

Este repositorio **hereda y adopta** las 30 reglas globales (R-02 a R-30) de `unimar_arch`. Las reglas se aplican en su totalidad, sin modificaciones locales, salvo lo registrado en [`DECISIONS.md`](../../DECISIONS.md).

| ID | Regla | Restricción |
|---|---|---|
| **R-02** | Context7 | Consultar `context7` para límites de arquitectura en vivo antes de tareas técnicas |
| **R-03** | UTF-8 Limpio | Salidas documentales en UTF-8 puro; sin BOM, CRLF, mojibake |
| **R-04** | Idioma Único | Toda la documentación en español; sin pares bilingües |
| **R-05** | Etiquetas en Español | Etiquetas de diagramas en español; excepción: identificadores de código |
| **R-06** | Stack Tecnológico | Validar contra `reference/architecture/stack-tecnologico-autorizado-tms.es.md` |
| **R-07** | Separar Historias | Separar FUNCTIONAL, TECHNICAL y ENABLER |
| **R-08** | Trazabilidad | Cuando un UC cambie, actualizar todos los diagramas relevantes |
| **R-09** | Camino de Auth | Diseños de autenticación deben mostrar flujos IDP e Interno |
| **R-10** | Legibilidad | Documentos funcionales en lenguaje plano |
| **R-11** | Formato de Auditoría | Auditorías emiten: [Documento, Ubicación, Tipo de Issue, Severidad, Fix] |
| **R-12** | Orden | PO (funcional) → Arquitecto (técnico). Sin ejecución en paralelo |
| **R-13** | Convenciones | Prefijos de nomenclatura, taxonomías, enlaces relativos, anclas antes de merges |
| **R-14** | Estructura Funcional | Narrativa de negocio legible + sección `Requisitos Técnicos` |
| **R-21** | Registro de Decisiones | Cada decisión arquitectónica en `DECISIONS.md` |
| **R-26** | Base de Satélite | `unimar_arch` como fuente autoritativa |
| **R-27** | Herencia de Plantillas | Plantillas SDLC desde `unimar_arch` sin modificar estructura canónica |
| **R-28** | Diagramas Obligatorios | Toda historia funcional y épica con diagrama Mermaid |
| **R-29** | Requisitos Técnicos Completos | Sección 3 de historia de usuario: Bounded Context, Dependencias, Restricciones, ADRs, Notas |
| **R-30** | Actores Documentados | Sección 2 de historia de usuario: Actor Principal, Secundarios, Diagrama, Interacciones |

## Gates de Validación Obligatorios

1. Ejecutar `node .harness/scripts/validate-docs.mjs`.
2. Corregir enlaces rotos, anclas faltantes, Mermaid malformados, violaciones UTF-8 antes del merge.

## Autoridad Heredada

Estas reglas se heredan de `unimar_arch` bajo el modelo de herencia definido en [`DECISIONS.md`](../../DECISIONS.md). Cualquier divergencia se registra con operación `Override` y ADR local.
