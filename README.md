# TMS — Sistema de Gestión de Transportes

<div align="center">

[![Status](https://img.shields.io/badge/Status-Planificaci%C3%B3n%20(v0.1.0--draft)-f39c12?style=for-the-badge)]()
[![Platform](https://img.shields.io/badge/Stack-NestJS_%7C_PostgreSQL_%7C_React-informational?style=for-the-badge)]()
[![Standard](https://img.shields.io/badge/Unimar%20Arch-042139?style=for-the-badge)](https://github.com/mhernandez-unimar/unimar_arch)
[![License](https://img.shields.io/badge/License-MIT-0f3e67?style=for-the-badge)]()

<br/>

**TMS gestiona la planificación y ejecución del transporte de carga de UNIMAR.**<br/>
Cubre el ciclo de descarga de contenedores desde puerto: relación detallada, asignación de viajes,<br/>
emisión de guía de remisión electrónica y seguimiento. Pertenece a la capa **Apoyo al Negocio**<br/>
de la [Suite Operativa UNIMAR](https://github.com/mhernandez-unimar/unimar_arch).

> *Sistema de Gestión de Transportes · Operador Logístico Aduanero desde 1978*

</div>

---

## Inicio Rápido

<details>
<summary><strong>Primeros pasos</strong></summary>

```bash
# Validar documentación
node .harness/scripts/validate-docs.mjs

# Ver skills BMAD disponibles
ls .claude/skills/
```

📖 [Guía de inicio por rol](reference/getting-started/README.md) — onboarding autoguiado para PM, arquitectos, desarrolladores y agentes IA.

</details>

<details>
<summary><strong>Por rol — guía de entrada</strong></summary>

- **Product Manager / PO:** comenzar por [PRD](./_bmad-output/planning-artifacts/prd-sistema-gestion-transportes.es.md) y [Diagramas del sistema](./docs/diagramas-tms.md).
- **Arquitectos:** comenzar por [DECISIONS.md](./DECISIONS.md), [ADRs locales](./reference/architecture/adrs/) y [Stack Tecnológico](./reference/architecture/stack/stack-tecnologico-autorizado-tms.es.md).
- **Desarrolladores:** revisar [Estrategia de Ramificación](./reference/governance/sdlc/estrategia-ramificacion.es.md) y [CONTRIBUTING.md](./CONTRIBUTING.md). Código pendiente — fase de construcción no iniciada.
- **Agentes IA (BMAD):** revisar [AGENTS.md](./AGENTS.md) y skills en `.claude/skills/`.
- **DevOps / SRE:** pendiente — se definirá en fase de construcción.

</details>

---

## Navegación SDLC

Abre la fase del ciclo de vida en la que trabajas. Cada sección agrupa los documentos y enlaces relevantes.

<details>
<summary><strong>Fase 00 — Concepción y Descubrimiento</strong></summary>

| Documento | Descripción | Tipo |
|---|---|---|
| [PRD — Sistema de Gestión de Transportes](./_bmad-output/planning-artifacts/prd-sistema-gestion-transportes.es.md) | Visión, alcance MVP, actores, flujos, historias de usuario, reglas de negocio, NFRs | PRD |
| [Diagramas del Sistema (Mermaid)](./docs/diagramas-tms.md) | Vistas conceptuales, C4 de contexto, flujos de proceso, prototipos (renderizable en GitHub) | Modelo |

</details>

<details>
<summary><strong>Fase 01 — Diseño y Arquitectura</strong></summary>

| Documento | Descripción | Tipo |
|---|---|---|
| [DECISIONS.md](./DECISIONS.md) | Triaje Adopt/Extend/Override/N/A de patrones unimar_arch | Registro |
| [ADR-0001 — Stack Tecnológico TMS](./reference/architecture/adrs/0001-stack-tecnologico-tms.es.md) | NestJS, PostgreSQL, Redis, RabbitMQ, React, Flutter (post-MVP) | Decisión |
| [ADR-0002 — Actores del Dominio TMS](./reference/architecture/adrs/0002-actores-dominio-tms.es.md) | Gestor de Transportes, Transportista, Operador de Transmisiones, Gestor Comercial | Decisión |
| [ADR-0003 — GitFlow TMS Extendido](./reference/architecture/adrs/0003-gitflow-tms-extendido.es.md) | Ramas `feature/TMS-*`, `release/v*`, `hotfix/TMS-*` | Decisión |
| [Stack Tecnológico Autorizado TMS](./reference/architecture/stack/stack-tecnologico-autorizado-tms.es.md) | Lista aprobada de lenguajes, frameworks, herramientas | Estándar |
| [Glosario TMS](./reference/governance/glosario-tms.es.md) | Terminología controlada del dominio de transporte | Referencia |
| [Estrategia de Ramificación](./reference/governance/sdlc/estrategia-ramificacion.es.md) | GitFlow extendido para el TMS | Guía |

</details>

<details>
<summary><strong>Fase 02 — Construcción</strong></summary>

*Pendiente — fase iniciada al completar Diseño y Arquitectura.*

</details>

<details>
<summary><strong>Fase 03 — Validación y QA</strong></summary>

*Pendiente — se completará durante la fase de construcción.*

</details>

<details>
<summary><strong>Fase 04 — Entrega y Operaciones</strong></summary>

*Pendiente — se completará después de la validación.*

</details>

---

## Referencias Transversales

<details>
<summary><strong>Navegación y Hubs</strong></summary>

| Documento | Descripción | Tipo |
|---|---|---|
| [Master Index Global](reference/navigation/MASTER_INDEX.md) | Ruteo exhaustivo de todos los documentos del repositorio | Índice |
| [Guía de inicio por rol](reference/getting-started/README.md) | Onboarding autoguiado para cada perfil | Guía |
| [Documentation Versions](DOCUMENTATION_VERSIONS.md) | Changelog de la documentación del repositorio | Registro |

</details>

<details>
<summary><strong>Arquitectura y Diseño</strong></summary>

| Documento | Descripción | Tipo |
|---|---|---|
| [DECISIONS.md](./DECISIONS.md) | Registro de decisiones arquitectónicas activas | Decisión |
| [Suite UNIMAR (upstream)](https://github.com/mhernandez-unimar/unimar_arch) | Repositorio del estándar corporativo y arquitectura de referencia | Estándar |
| [ADRs locales](./reference/architecture/adrs/) | ADR-0001 (Stack), ADR-0002 (Actores), ADR-0003 (GitFlow) | Decisión |
| [Stack Tecnológico Autorizado](./reference/architecture/stack/stack-tecnologico-autorizado-tms.es.md) | Lista aprobada de tecnologías para el TMS | Estándar |

</details>

<details>
<summary><strong>Governance y Calidad</strong></summary>

| Documento | Descripción | Tipo |
|---|---|---|
| [Reglas Globales (R-02 a R-30)](.harness/rules/global-rules.md) | Reglas corporativas | Regla |
| [Reglas Satélite (S-01 a S-15)](.harness/rules/satellite-repo-rules.md) | Reglas específicas para satélites | Regla |
| [Validador de Documentación](.harness/scripts/validate-docs.mjs) | Script node para validar enlaces, anclas y Mermaid | Herramienta |
| [Validador de Base Satélite](.harness/scripts/validate-satellite-base.mjs) | Script node para validar estructura vs unimar_arch | Herramienta |

</details>

---

## Contribución

Antes de contribuir, revisa los siguientes documentos:

| Documento | Descripción | Tipo |
|---|---|---|
| [Estándar Unimar Arch](https://github.com/mhernandez-unimar/unimar_arch) | Referencia corporativa heredada por el TMS | Estándar |
| [AGENTS.md](./AGENTS.md) | Reglas de proyecto y convenciones del repositorio para agentes IA | Regla |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Guía de contribución: commits, PRs, merging | Guía |

---

<div align="center">

**© Unimar S.A.** · RUC 20100412447 · Operador Logístico Aduanero desde 1978<br/>
Estándar: [Unimar Arch](https://github.com/mhernandez-unimar/unimar_arch) · [BMAD Method](https://bmadcode.com/)

</div>
