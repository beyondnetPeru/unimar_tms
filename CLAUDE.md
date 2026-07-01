# CLAUDE.md — unimar_tms

Instrucciones para Claude Code y cualquier agente de IA que trabaje en este proyecto.

---

## Proyecto

**unimar_tms** es un sistema de gestión de transporte (TMS) para Unimar.
Gestionado con el framework **BMAD Method v6.8.0**.

---

## BMAD Method — Agentes del equipo

Este proyecto usa BMAD Method. Los agentes tienen **nombres propios**.
Cuando alguien mencione uno de estos nombres en contexto técnico, referirse al agente BMAD — no a librerías, herramientas u otras personas con el mismo nombre.

| Nombre | Rol | Skill para activar |
|--------|-----|--------------------|
| **Winston** | System Architect 🏗️ | `/bmad-agent-architect` |
| **Mary** | Business Analyst 📊 | `/bmad-agent-analyst` |
| **John** | Product Manager 📋 | `/bmad-agent-pm` |
| **Sally** | UX Designer 🎨 | `/bmad-agent-ux-designer` |
| **Amelia** | Senior Software Engineer 💻 | `/bmad-agent-dev` |
| **Paige** | Technical Writer 📚 | `/bmad-agent-tech-writer` |

> **Ejemplo:** "¿Winston está?" → activar `/bmad-agent-architect`, no buscar la librería `winston` de npm.

### Flujo de trabajo BMAD

```
1. Análisis    → brainstorming, market research, PRFAQ, product brief
2. Planning    → PRD (/bmad-prd), UX (/bmad-ux), Architecture (/bmad-architecture)
3. Solutioning → epics & stories (/bmad-create-epics-and-stories)
4. Impl.       → sprint plan → create story → dev story → code review
```

Artefactos en `_bmad-output/`. Documentación en `docs/`.

---

## Stack tecnológico

- **Backend**: NestJS 10 + TypeScript 5 + TypeORM + PostgreSQL
- **Frontend**: React 18+ con TypeScript + Tailwind CSS
- **Runtime**: Node.js 20
- **Arquitectura**: Hexagonal (domain / application / infrastructure / api)

---

## Reglas críticas

- IDs PostgreSQL: `BIGINT GENERATED ALWAYS AS IDENTITY` — nunca `SERIAL`
- Columnas de auditoría obligatorias en toda tabla: `usuario_creacion`, `fecha_creacion`, `estado`, `eliminado`
- Soft delete siempre — nunca borrar registros físicamente
- Respuestas HTTP estandarizadas con `TransformInterceptor` + `HttpExceptionFilter`
