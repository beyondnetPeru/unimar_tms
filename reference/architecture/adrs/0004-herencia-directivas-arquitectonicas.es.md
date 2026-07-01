# ADR-0004 — Herencia de Directivas Arquitectónicas de unimar_arch

> **Status:** Accepted
> **Fecha:** 2026-06-25
> **Autores:** Winston (Arquitecto), John (PM)
> **Relacionado con:** [ADR-0001](0001-stack-tecnologico-tms.es.md)

---

## Contexto

`unimar_tms` es un repositorio satélite de la suite Unimar. El repositorio canónico `unimar_arch` define las Directivas Arquitectónicas que gobiernan todos los proyectos de la suite: principios de diseño, patrones obligatorios, contratos de capa, estándares de código y reglas de calidad.

Como satélite, `unimar_tms` no redefine estas reglas ni las duplica localmente. La fuente de verdad es `unimar_arch`.

---

## Decisión

**`unimar_tms` adopta íntegramente las Directivas Arquitectónicas de `unimar_arch` sin overrides locales.**

Esto incluye, pero no se limita a:

| Directiva | Descripción |
|-----------|-------------|
| Arquitectura Hexagonal | Domain / Application / Infrastructure / API — sin saltarse capas |
| SOLID | Aplicado en todo módulo y servicio |
| Data Mapper (TypeORM) | Entidades desacopladas de la lógica de dominio |
| `neverthrow` Result | Manejo explícito de errores sin excepciones en capa de aplicación |
| DTOs con `class-validator` | Validación en frontera de entrada (API) |
| Soft Delete obligatorio | `eliminado = true`; nunca `DELETE` físico |
| Columnas de auditoría | `usuario_creacion`, `fecha_creacion`, `usuario_actualizacion`, `fecha_actualizacion`, `estado`, `eliminado` en toda tabla |
| `BIGINT GENERATED ALWAYS AS IDENTITY` | PK estándar; prohibido `SERIAL` |
| Convención de nombres | Español, snake_case en BD; español, kebab-case en archivos |

---

## Overrides locales

Ninguno en este momento. Cualquier desviación futura requiere un nuevo ADR local que lo justifique explícitamente.

Las únicas adiciones específicas de TMS están en:
- **ADR-0001** — extensiones de stack (NestJS, PostgreSQL, Redis, RabbitMQ, React, Flutter)

---

## Consecuencias

- Todos los agentes constructores (`unimar-backend`, `unimar-frontend`, `unimar-analista`) consultan `unimar_arch` como fuente de verdad para decisiones de diseño.
- El auditor (`unimar-auditor`) evalúa cumplimiento contra `unimar_arch` + este ADR.
- Si `unimar_arch` actualiza una directiva, `unimar_tms` la hereda automáticamente sin necesidad de sincronizar documentos locales.
- Cualquier propuesta de override debe pasar por el Architecture Board antes de un nuevo ADR.
