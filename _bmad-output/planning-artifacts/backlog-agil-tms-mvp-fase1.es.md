# Backlog Ágil: TMS — MVP Planificación (Fase 1)

> **Fase:** 1 — Concepción y Descubrimiento (y refinamiento continuo)
> **Responsable:** John (Product Manager / Product Owner)
> **Quality Gate:** Sprint Planning / Backlog Grooming
> **PRD Origen:** PRD-TMS-001 § 5.1 (Alcance MVP)

---

## 1. Información General

- **Product Owner:** John (PM)
- **Producto:** TMS (Sistema de Gestión de Transportes)
- **Estado:** Draft (pendiente aprobación reunión 2026-06-25)
- **Alcance:** 18 Historias de Usuario que cubren las 18 funcionalidades del MVP Fase 1 (F-01–F-12, F-14, F-17–F-21).

> ⚠️ **Priorización preliminar.** La priorización definitiva Must/Should/Could (CA-09 del PRD) y los puntos de talla se confirman en grooming con el equipo. Las tallas (S/M/L) son estimación relativa inicial del PM.

---

## 2. Listado Priorizado (Iteración 1 — MVP)

| ID | Tipo | Título | Func. | Talla | Prioridad (1-Alta) | Estado |
|---|---|---|---|---|---|---|
| US-TMS-01 | Funcional | Consultar relaciones detalladas | F-01 | M | 1 | Listo |
| US-TMS-03 | Funcional | Crear solicitud de transporte | F-02 | M | 1 | Listo |
| US-TMS-05 | Funcional | Asignar viaje | F-03 | L | 1 | Listo |
| US-TMS-06 | Funcional | Seleccionar transportista | F-04 | S | 1 | Listo |
| US-TMS-07 | Funcional | Asignar chofer al viaje | F-05 | M | 1 | Listo |
| US-TMS-08 | Funcional | Asignar unidad vehicular | F-06 | M | 1 | Listo |
| US-TMS-09 | Funcional | Confirmar viaje | F-07 | M | 1 | Listo |
| US-TMS-10 | Funcional | Consultar viajes planificados | F-08 | S | 1 | Listo |
| US-TMS-14 | Funcional | Dashboard de planificación | F-10 | M | 2 | Listo |
| US-TMS-11 | Funcional | Editar viaje | F-09 | M | 2 | Listo |
| US-TMS-12 | Funcional | Coordinar cita portuaria | F-11 | M | 2 | Listo |
| US-TMS-16 | Funcional | Cancelar solicitud o viaje | F-12 | S | 2 | Listo |
| US-TMS-18 | Funcional | Historial de cambios | F-14 | M | 2 | Listo |
| US-TMS-02 | Funcional | Buscar contenedor por número | F-17 | S | 3 | Listo |
| US-TMS-04 | Funcional | Clonar solicitud | F-18 | S | 3 | Listo |
| US-TMS-13 | Funcional | Vista calendario de citas | F-19 | M | 3 | Listo |
| US-TMS-15 | Funcional | Alertas de vencimiento | F-20 | M | 3 | Listo |
| US-TMS-17 | Funcional | Exportar datos (Excel/PDF) | F-21 | S | 3 | Listo |

**Leyenda de prioridad (preliminar):**
- **1 — Núcleo del flujo:** sin esto no hay planificación de viajes (relación → solicitud → asignación → confirmación → consulta).
- **2 — Soporte operativo:** visibilidad, control y trazabilidad (dashboard, edición, citas, cancelación, auditoría).
- **3 — Productividad/calidad de vida:** búsqueda, clonado, calendario, alertas, exportes.

---

## 3. Agrupación Temática (precursora de Épicas — Fase 2)

> Las **Épicas formales** se crean en Fase 2 (Diseño). Esta agrupación es orientativa.

| Grupo | Historias | Funcionalidades |
|---|---|---|
| A. Datos desde SAP | US-TMS-01, US-TMS-02 | F-01, F-17 |
| B. Solicitudes | US-TMS-03, US-TMS-04 | F-02, F-18 |
| C. Asignación y confirmación de viajes | US-TMS-05 … US-TMS-11 | F-03–F-09 |
| D. Citas portuarias | US-TMS-12, US-TMS-13 | F-11, F-19 |
| E. Visibilidad y control | US-TMS-14, US-TMS-15, US-TMS-16, US-TMS-17 | F-10, F-20, F-12, F-21 |
| F. Auditoría | US-TMS-18 | F-14 |

---

## 4. Cobertura del Alcance MVP

| Funcionalidad PRD | US que la cubre |
|---|---|
| F-01 | US-TMS-01 |
| F-02 | US-TMS-03 |
| F-03 | US-TMS-05 |
| F-04 | US-TMS-06 |
| F-05 | US-TMS-07 |
| F-06 | US-TMS-08 |
| F-07 | US-TMS-09 |
| F-08 | US-TMS-10 |
| F-09 | US-TMS-11 |
| F-10 | US-TMS-14 |
| F-11 | US-TMS-12 |
| F-12 | US-TMS-16 |
| F-14 | US-TMS-18 |
| F-17 | US-TMS-02 |
| F-18 | US-TMS-04 |
| F-19 | US-TMS-13 |
| F-20 | US-TMS-15 |
| F-21 | US-TMS-17 |

**Cobertura: 18/18 funcionalidades MVP.** Fuera de alcance (Fase 2+): F-13, F-15, F-16, F-22, F-23.

---

## 5. Pendientes de la Reunión 2026-06-25

- [ ] Confirmar priorización definitiva Must/Should/Could (CA-09).
- [ ] Validar tallas/puntos con el equipo de desarrollo.
- [ ] Resolver umbral "{X} días" de contenedor huérfano (RN-38 → US-TMS-15).
- [ ] Confirmar acceso a Figma para las pantallas referenciadas en las US.
- [ ] Aprobar el set de Historias de Usuario como cierre de Fase 1.

---

## 6. Historial de Cambios

| Versión | Fecha | Autor | Cambios |
|---|---|---|---|
| 0.1.0 | 2026-06-24 | John (PM) | Versión inicial — 18 US del MVP priorizadas |

---

<p align="center">
  <strong>© Unimar S.A.</strong> · RUC 20100412447 · Operador Logístico Aduanero desde 1978
</p>
