# AUDITORÍA-FASE-1.md — Cumplimiento de Gobernanza (Fase 1: Concepción y Descubrimiento)

> **Producto:** TMS (Sistema de Gestión de Transportes) · **Auditor:** Winston (Arquitecto)
> **Gate de salida:** Aprobación de Negocio — Alcance Congelado
> **Numeración de fases:** Canon `unimar_arch` (Mapeo SDLC–Artefactos), fases 1–5.
> **Estado del gate:** 🔴 **ABIERTO** (no cerrable hasta completar los pendientes marcados)
> **Última actualización:** 2026-06-25

Documento **vivo**: se actualiza cada vez que un artefacto o hallazgo cambia de estado. Ver §6 Bitácora.

---

## 1. Marco de Auditoría (contra qué se mide)

| Regla canónica | Qué gobierna |
|---|---|
| **Mapeo SDLC–Artefactos** | Qué artefactos son `Req`/`Opc`/`Cond` en Fase 1 |
| **Plantilla Historia de Usuario** | Estructura de las US (5 secciones) |
| **Plantilla Backlog Ágil** | Estructura del backlog |
| **Estándar de Redacción de Historias** | Reglas No Negociables de redacción |
| **Gate Fase 1** | "Aprobación de Negocio — Alcance Congelado" |

Leyenda de estado: ✅ Cumplido · ⏳ En proceso · ❌ Faltante · ❓ Por verificar · 🟡 Aceptado con observación

---

## 2. Artefactos `Req` de Fase 1 (Mapeo SDLC–Artefactos)

| # | Artefacto `Req` | Estado | Evidencia / Nota |
|---|---|---|---|
| 1 | Historia de Usuario | ✅ | 18 US en `_bmad-output/planning-artifacts/stories/us-tms-01..18` |
| 2 | PRD | ⏳ | `prd-sistema-gestion-transportes.es.md` — **borrador, sin aprobar** |
| 3 | Backlog Ágil | ✅ | `backlog-agil-tms-mvp-fase1.es.md` (18 US priorizadas) |
| 4 | Directivas Arquitectónicas | ❓ | No local; ¿heredada de `unimar_arch`? — confirmar suficiencia |
| 5 | Baseline Agnóstica (stack agnóstico) | ❓ | Vive en `unimar_arch`; confirmar referencia válida |
| 6 | ADR — Topología Inicial (equiv. ADR-0047) | ❌ | No existe ADR local que confirme Monolito Modular |
| 7 | Roadmap de Estrategia Evolutiva | ❌ | No existe; el PRD §2.5 lista fases pero no es el artefacto formal |

**Artefactos `Opc` (no bloquean gate):** Lienzo de Descubrimiento, Business Case ROI, Estimación Preliminar, Taxonomía de Repositorio, Manifiesto de Ingeniería.

---

## 3. Criterios de Aceptación del PRD (§10) — Gate de Negocio

| Estado | Detalle |
|---|---|
| ❌ 0/19 firmados | CA-01 … CA-19 pendientes (reunión 2026-06-25) |
| ❌ Datos operativos | {X}/{Y}/{Z} sin valor real |

> El cierre de estos CA es responsabilidad de la reunión con stakeholders, no de generación documental.

---

## 4. Auditoría de Calidad de las 18 Historias de Usuario

| ID | Hallazgo | Severidad | Estado |
|---|---|---|---|
| H1 | Mezcla de plantillas (secciones intrusas Reglas/Trazabilidad/Historial) | 🔴 Alta | ✅ **Resuelto** 2026-06-25 — reescritas a 5 secciones canon; RN movidas a §4 |
| H2 | Sustantivos tecnológicos (`PostgreSQL`) en diagramas de negocio | 🟠 Media | ✅ **Resuelto** 2026-06-25 — diagramas limpios (solo actores/sistemas de negocio) |
| H3 | US-16 "Cancelar Solicitud **o** Viaje" (un "o"); US-05 con 4 escenarios | 🟡 Baja | 🟡 **Aceptado** — el PRD une esas funcionalidades (F-12, F-03); revisable si se desea partir |

### Checklist de cumplimiento por US (las 18)

| Criterio (Estándar / Plantilla) | Estado |
|---|---|
| Estructura `plantilla-historia-usuario` (5 secciones exactas) | ✅ |
| Identificador y título estables | ✅ |
| Una sola idea de valor / un solo rol cliente | ✅ |
| ≥ 2 escenarios (feliz + alterno) | ✅ |
| Criterios deterministas, sin lenguaje visual ("bonito") | ✅ |
| Sin sustantivos tecnológicos en narrativa | ✅ |
| Trazabilidad al PRD (§7) | ✅ |
| Reglas de negocio referenciadas (RN-XX) | ✅ |

---

## 5. Cobertura del Alcance MVP

| Métrica | Valor |
|---|---|
| Funcionalidades MVP cubiertas | **18/18** (F-01–F-12, F-14, F-17–F-21) |
| US generadas | 18 |
| Fuera de alcance (Fase 2+) declaradas | F-13, F-15, F-16, F-22, F-23 |

---

## 6. Veredicto Actual

> **🔴 Fase 1 NO cerrable todavía.**
> **Listo:** Historias de Usuario (✅, en cumplimiento), Backlog Ágil (✅), cobertura 18/18.
> **Bloquea el gate:** PRD sin aprobar (CA 0/19), datos {X}/{Y}/{Z}, y artefactos `Req` #4–7 del Mapeo.

### Pendientes para cerrar el gate
- [ ] Aprobar PRD (CA-01 … CA-19) — reunión 2026-06-25
- [ ] Llenar datos operativos {X}/{Y}/{Z}
- [ ] Confirmar Directivas Arquitectónicas heredadas (#4)
- [ ] Confirmar Baseline Agnóstica heredada (#5)
- [ ] Crear ADR de Topología Inicial — Monolito Modular (#6)
- [ ] Crear Roadmap de Estrategia Evolutiva (#7)
- [ ] (Opcional) Resolver H3 partiendo US-16 / US-05

---

## 7. Bitácora de Actualizaciones

| Fecha | Cambio | Autor |
|---|---|---|
| 2026-06-25 | Creación del documento. Estado inicial: US 18/18 generadas y reescritas a canon (H1+H2 resueltos); Backlog ✅; PRD ⏳; artefactos #4–7 pendientes; gate 🔴 ABIERTO. | Winston |

---

<p align="center">
  <strong>© Unimar S.A.</strong> · Auditoría de Gobernanza SDLC — TMS · Fase 1
</p>
