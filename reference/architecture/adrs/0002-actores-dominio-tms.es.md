# ADR-0002 — Actores del Dominio de Transportes

> **Status:** Accepted
> **Date:** 2026-06-23 · **Última revisión:** 2026-06-30
> **Extends:** S-05 — Actores y Stakeholders (unimar_arch)

## Context

El estándar S-05 de `unimar_arch` exige documentar los actores que intervienen en las historias de usuario y funcionales. S-05 fija la *práctica* (documentar actores), no la *lista*: cada dominio define sus propios actores canónicos.

La versión inicial de este ADR (2026-06-23, `Draft`) se rellenó con una lista genérica de TMS de flota de carretera (Conductor, Operador Logístico, Cliente Carga, Supervisor de Flota, Administrador TMS). Esa lista **no corresponde al dominio real de Unimar** —operador/depósito de contenedores que coordina transportistas externos desde puerto— y quedó en contradicción con el resto de la planificación:

- El **PRD §6.1** (PRD-TMS-001) y las **18 historias de usuario** usan otro vocabulario de actores.
- Evidencia: 18/18 US declaran "Gestor de Transportes"; **0/18** usan los actores genéricos del borrador anterior.

Hallazgo registrado como **W1** en `AUDITORIA-FASE-1.md §9` (Winston, 2026-06-30).

## Decision

Se adoptan como **actores canónicos del dominio TMS** los 5 actores reales que ya emplean el PRD y las historias. Esta lista **reemplaza** (supersedes) la lista genérica del borrador anterior.

| Actor | Rol en el Sistema | Responsabilidades principales | Fase |
| :---- | :---------------- | :---------------------------- | :--- |
| **Gestor de Transportes** | Planifica, asigna y monitorea viajes | Crear solicitudes, asignar transportistas, coordinar citas, gestionar excepciones, operar el dashboard | MVP (F1) |
| **Transportista** | Ejecuta los viajes asignados | Consultar solicitudes asignadas, proponer/confirmar chofer y unidad; aceptar/rechazar viaje | MVP (consulta) · F2 (aceptación) |
| **Operador de Documentación** | Recibe y valida datos desde SAP | Verificar relaciones detalladas, mantener datos de nave/BL/BK, sincronización de maestros | MVP (F1) |
| **Gestor Comercial** | Consulta el estado de las operaciones | Visualizar dashboard, consultar tracking, generar reportes para clientes | MVP (consulta) · F2+ (reportería) |
| **Operador de Transmisiones** | Emite las guías de remisión | Transmitir GRE a SUNAT | Fase 2 |

### Notas de alcance
- **Actores activos en el MVP (Fase 1):** Gestor de Transportes, Operador de Documentación; con participación de consulta de Transportista y Gestor Comercial.
- **Actores que se activan en Fase 2:** Operador de Transmisiones (GRE/SUNAT) y la operación plena del Transportista (aceptación/rechazo, registro fotográfico).

## Consequences

- Toda historia (de usuario y funcional) debe mapear al menos un actor de esta tabla. **Cumplimiento actual: 18/18 US** ✅.
- Esta lista es la fuente canónica de la que derivan, en Fase 2, los bounded contexts, el modelo de datos y la matriz de permisos por rol.
- Cualquier actor nuevo o cambio de rol requiere actualizar este ADR (control de cambios).
- Cierra los hallazgos **W1** y **W2** de `AUDITORIA-FASE-1.md`.

## Change Log

| Fecha | Cambio | Autor |
| :---- | :----- | :---- |
| 2026-06-23 | Versión inicial (Draft) con lista genérica de TMS de carretera. | — |
| 2026-06-30 | Reescritura: lista alineada a los 5 actores reales del PRD §6.1 y las 18 US. Status → Accepted. Cierra W1/W2. | Winston (Arquitecto) |
