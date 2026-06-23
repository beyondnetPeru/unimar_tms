# ADR-0001 — Stack Tecnológico del Sistema de Gestión de Transportes

> **Status:** Draft
> **Date:** 2026-06-23
> **Extends:** ADR del stack tecnológico agnóstico de unimar_arch

## Context

El repositorio satélite `unimar_tms` requiere un stack tecnológico específico para el dominio de gestión de transportes. El stack agnóstico de `unimar_arch` define la base, pero el dominio TMS añade requisitos de geolocalización, planificación de rutas, tracking en tiempo real y facturación de fletes que deben reflejarse en las tecnologías autorizadas.

## Decision

Se adopta el stack agnóstico de `unimar_arch` como base y se extiende con las tecnologías listadas en `reference/architecture/stack/stack-tecnologico-autorizado-tms.es.md`. Las adiciones se limitan a:

- Backend transaccional: NestJS con PostgreSQL
- Mensajería asíncrona: RabbitMQ para eventos de dominio
- Cache distribuido: Redis
- Frontend de escritorio: React
- App móvil de conductor: Flutter (post-MVP)
- Testing: Vitest (unitario) + Playwright (E2E)

## Consequences

- El stack TMS debe ser revisado por el Architecture Board antes de su adopción formal.
- Cualquier desviación requiere un nuevo ADR.
- Las tecnologías no listadas en `stack-tecnologico-autorizado-tms.es.md` están prohibidas sin autorización explícita.
