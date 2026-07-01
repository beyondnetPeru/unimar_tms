# TMS — Sistema de Gestión de Transportes

<div align="center">

[![Status](https://img.shields.io/badge/Fase%201-Cierre%20Condicional-f39c12?style=for-the-badge)](./AUDITORIA-FASE-1.md)
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

> **Numeración canon `unimar_arch`:** las fases van de **1 a 5** (Mapeo SDLC–Artefactos). **No existe "Fase 0".** Seguimiento de cierre por fase en [PHASE_TRACKING.md](./PHASE_TRACKING.md).

<details open>
<summary><strong>Fase 1 — Concepción y Descubrimiento</strong> · 🟡 Cierre Condicional</summary>

| Documento | Descripción | Tipo |
|---|---|---|
| [PRD — Sistema de Gestión de Transportes](./_bmad-output/planning-artifacts/prd-sistema-gestion-transportes.es.md) | Visión, alcance MVP, actores, flujos, reglas de negocio, NFRs (v0.2.0-draft) | PRD |
| [Historias de Usuario (18)](./_bmad-output/planning-artifacts/stories/) | `us-tms-01..18` — plantilla canon, cobertura 18/18 MVP | Historia |
| [Backlog Ágil MVP](./_bmad-output/planning-artifacts/backlog-agil-tms-mvp-fase1.es.md) | 18 US priorizadas | Backlog |
| [Plan de Avance MVP](./_bmad-output/planning-artifacts/plan-avance-mvp-fase1.es.md) | Modelo de datos core, contratos de integración, hitos | Plan |
| [Roadmap de Estrategia Evolutiva](./_bmad-output/planning-artifacts/roadmap-estrategia-evolutiva.es.md) | 4 horizontes con triggers medibles | Roadmap |
| [Diagramas del Sistema (Mermaid)](./docs/diagramas-tms.md) | Vistas conceptuales, C4 de contexto, flujos de proceso | Modelo |
| [Auditoría Fase 1](./AUDITORIA-FASE-1.md) | Gate de gobernanza, hallazgos (W1–W3), veredicto — documento vivo | Auditoría |

**Gate:** *Aprobación de Negocio — Alcance Congelado.* Arquitectura ✅ (con observación W3); negocio ⏳ (0/19 CA firmados, datos `{X}/{Y}/{Z}` pendientes). Detalle en la auditoría.

</details>

<details>
<summary><strong>Fase 2 — Diseño y Arquitectura</strong></summary>

*Desbloqueada para diseño en paralelo (ver §8/§9 de la [Auditoría Fase 1](./AUDITORIA-FASE-1.md)). Épicas e Historias Funcionales pendientes de generar. Cierre formal del gate de negocio aún no firmado.*

</details>

<details>
<summary><strong>Fase 3 — Construcción</strong></summary>

*Pendiente — se inicia al cerrar Diseño y Arquitectura. Código aún no iniciado.*

</details>

<details>
<summary><strong>Fase 4 — Validación y QA</strong></summary>

*Pendiente — se completará durante la fase de construcción.*

</details>

<details>
<summary><strong>Fase 5 — Entrega y Operaciones</strong></summary>

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
| [PHASE_TRACKING.md](./PHASE_TRACKING.md) | Cierre formal por fase SDLC (canon 1–5) — audit trail de gobernanza | Gobernanza |
| [Auditoría Fase 1](./AUDITORIA-FASE-1.md) | Cumplimiento del gate de Fase 1 contra canon `unimar_arch` | Auditoría |

</details>

<details>
<summary><strong>Arquitectura y Diseño</strong></summary>

| Documento | Descripción | Tipo |
|---|---|---|
| [DECISIONS.md](./DECISIONS.md) | Registro de decisiones arquitectónicas activas | Decisión |
| [Suite UNIMAR (upstream)](https://github.com/mhernandez-unimar/unimar_arch) | Repositorio del estándar corporativo y arquitectura de referencia | Estándar |
| [ADRs locales](./reference/architecture/adrs/) | ADR-0001 (Stack, *Draft*), ADR-0002 (Actores, *Accepted*), ADR-0003 (GitFlow), ADR-0004 (Herencia Directivas, *Accepted*), ADR-0005 (Topología Monolito Modular, *Draft*) | Decisión |
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
