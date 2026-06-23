# ADR-0002 — Actores del Dominio de Transportes

> **Status:** Draft
> **Date:** 2026-06-23
> **Extends:** S-05 — Actores y Stakeholders (unimar_arch)

## Context

El estándar S-05 requiere documentar actores en las historias de usuario. El dominio TMS introduce actores específicos que no cubre el estándar genérico de `unimar_arch`.

## Decision

Se definen los siguientes actores canónicos del dominio TMS para usar en todas las historias funcionales y de usuario:

| Actor | Descripción |
| :---- | :---------- |
| Conductor | Operador de unidad de transporte. Interactúa con app móvil para asignaciones, check-in, check-out, incidencias |
| Operador Logístico | Planificador de rutas y asignaciones. Usa el escritorio TMS para optimizar operaciones |
| Cliente Carga | Contrata servicios de transporte. Consulta tracking, documentación y facturación |
| Supervisor de Flota | Monitorea en tiempo real la operación. Gestiona incidencias y desviaciones |
| Administrador TMS | Configuración del sistema: tarifas, unidades, zonas, usuarios |

## Consequences

- Toda historia funcional debe mapear al menos un actor canónico TMS.
- Los actores pueden tener subtipos según el bounded context.
- Nuevos actores requieren actualización de este ADR.
