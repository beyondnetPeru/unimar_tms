# Stack Tecnológico Autorizado — unimar_tms

> **Herencia:** Extiende el [Stack Tecnológico Autorizado de unimar_arch](https://github.com/mhernandez-unimar/unimar_arch/blob/main/reference/architecture/stack-tecnologico-autorizado-agnostico.es.md)
> **Estado:** Borrador inicial | **ADR Local:** ADR-0001

## Extensión TMS

El stack agnóstico de `unimar_arch` se complementa con las siguientes tecnologías específicas del dominio TMS:

| Capa | Tecnología | Versión | Justificación |
| :--- | :--------- | :------ | :------------ |
| Backend | NestJS | 12+ | Framework corporativo |
| API | REST/GraphQL híbrido | — | Según R-19 de unimar_arch |
| Base de Datos Operacional | PostgreSQL | 16+ | Transaccional TMS |
| Cache | Redis | 7+ | Sesiones, rate limiting |
| Mensajería | RabbitMQ | — | Eventos de dominio TMS |
| Frontend | React | 19+ | SPA de escritorio TMS |
| Testing | Vitest + Playwright | — | Testing unitario y E2E |
| Móvil | Flutter | — | App de conductor (futuro) |

## Restricciones

- Toda tecnología nueva debe pasar por ADR en `unimar_arch` primero (S-07).
- No usar tecnologías fuera del stack autorizado sin `Override` registrado en `DECISIONS.md`.
