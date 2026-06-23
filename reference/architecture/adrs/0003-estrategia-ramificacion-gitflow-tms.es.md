# ADR-0003 — Estrategia de Ramificación GitFlow para el TMS

> **Status:** Draft
> **Date:** 2026-06-23
> **Extends:** [ADR-0050](https://github.com/mhernandez-unimar/unimar_arch/blob/main/reference/architecture/adrs/core/0050-estrategia-ramificacion-gitflow.es.md) — Estrategia de Ramificación GitFlow

## Context

El repositorio satélite `unimar_tms` adopta el modelo GitFlow extendido de `unimar_arch`. Este ADR documenta las adaptaciones específicas del contexto TMS: identificador de tracker, ausencia de monorepo Nx, y tooling mínimo para un repositorio satélite.

## Decision

Se adopta el modelo GitFlow extendido de ADR-0050 en su totalidad, con las siguientes adaptaciones:

### 1. Identificador de Tracker

El prefijo de tracker cambia de `UNIMAR-` a `TMS-` para reflejar el contexto satélite:

| Tipo | Patrón | Ejemplo |
| :--- | :----- | :------ |
| Feature | `feature/TMS-<id>-<kebab-case>` | `feature/TMS-123-checkout` |
| Sub-feature | `feature/TMS-<id>-<nombre>/<area>` | `feature/TMS-123-checkout/ui` |
| Bug desde develop | `fix/TMS-<id>-<kebab-case>` | `fix/TMS-456-iva-incorrecto` |
| Release | `release/v<major>.<minor>.<patch>` | `release/v1.2.0` |
| Hotfix | `hotfix/TMS-<id>-<kebab-case>` | `hotfix/TMS-789-hotfix-pago` |
| Chore | `chore/<kebab-case>` | `chore/actualizar-jest-config` |

### 2. Tooling Adaptado

Sin monorepo Nx. El tooling se simplifica a lo mínimo requerido:

| Herramienta | Propósito | Comando |
| :---------- | :-------- | :------ |
| commitlint | Validación de commits Conventional Commits | `npx commitlint --edit $1` |
| husky | Git hooks (commit-msg, pre-commit) | `npx husky` |

### 3. Protección de Ramas

Mismas reglas que ADR-0050 para `main` y `develop`. Las ramas `qa` y `uat` se configuran cuando los entornos existan.

### 4. Pull Request Template

Se adopta el template de ADR-0050 con adaptación mínima.

## Consequences

- Todo commit debe seguir Conventional Commits v1.0.0.
- Toda feature branch usa prefijo `TMS-`.
- El modelo de 4 ramas permanentes (`main`, `develop`, `qa`, `uat`) se aplica cuando los entornos estén disponibles.
- release/* y hotfix/* usan `--no-ff`; feature/* usa `squash` a develop.
- La validación pre-commit incluye lint de commits via commitlint + husky.
