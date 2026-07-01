# ADR-0005 — Topología Inicial: Monolito Modular en VPS

<p align="right">
  <img src="https://img.shields.io/badge/UNIMAR%20S.A.-TMS-0f3e67?style=flat-square" alt="Unimar S.A.">
  <img src="https://img.shields.io/badge/ADR-0005-003c6b?style=flat-square" alt="ADR-0005">
  <img src="https://img.shields.io/badge/Estado-Draft-f39c12?style=flat-square" alt="Estado">
</p>

> **Status:** Draft  
> **Fecha:** 2026-06-30  
> **Autores:** Winston (Arquitecto) + John (PM)  
> **Extiende:** ADR-0001 (Stack Tecnológico TMS)

---

## Contexto

El MVP del TMS debe desplegarse en un **único VPS** con instalación directa (sin Docker en producción). El equipo es pequeño (2-3 desarrolladores), el volumen inicial de operaciones es bajo (datos operativos {Y} viajes/mes — pendiente de datos reales) y la prioridad es velocidad de entrega sobre escalabilidad horizontal.

Esta decisión **no está cubierta por ADR-0001** (que define el stack tecnológico) ni por el canon `unimar_arch` (que no prescribe topología de infraestructura). Es una decisión local del proyecto TMS.

### Restricciones conocidas

| Restricción | Detalle |
|---|---|
| Infraestructura | Un único VPS (especificaciones mínimas viables — a definir post aprobación PRD) |
| Despliegue | Instalación directa — sin Docker en producción |
| Equipo | 2-3 desarrolladores en MVP |
| Plazo | MVP en Q3 2026 |
| Volumen | {Y} viajes/mes (dato operativo pendiente) |

---

## Alternativas Evaluadas

### Opción A — Monolito Modular ✅ **(Elegida)**

Un único proceso NestJS con módulos internos con fronteras explícitas. React compilado como archivos estáticos servidos por Nginx. PostgreSQL instalado nativamente.

**Ventajas:**
- Despliegue simple: 1 servidor, 1 proceso backend, 1 BD
- Onboarding rápido de nuevos desarrolladores
- Sin overhead operativo (orquestación, service discovery, etc.)
- Costo de infraestructura mínimo
- Fronteras modulares internas (NestJS modules) permiten extracción futura sin reescritura total

**Desventajas:**
- Si el volumen crece mucho, un módulo saturado afecta a los demás
- Escalado horizontal requiere repensar la arquitectura (ver roadmap evolutivo)

---

### Opción B — Microservicios desde el inicio ❌

Múltiples servicios NestJS independientes (viajes-service, citas-service, maestros-service).

**Descartado porque:**
- Overhead operativo desproporcionado para el equipo actual
- Requiere service discovery, API Gateway, comunicación inter-servicio
- Complejidad de despliegue en VPS único sin orquestador (Kubernetes/Nomad)
- Tiempo de setup aleja el MVP del Q3 2026

---

### Opción C — Monolito sin módulos ❌

Un único proceso NestJS sin separación interna de módulos.

**Descartado porque:**
- No escala internamente: cualquier cambio afecta todo el código base
- No prepara el camino para extracción futura de servicios
- Viola el principio de separación de responsabilidades

---

## Decisión

**Se adopta Monolito Modular** con la siguiente topología de despliegue en VPS:

```
VPS (producción)
├── Nginx                          ← Reverse proxy + servidor de estáticos
│   ├── /                         → Sirve React dist/ (build estático)
│   └── /api/                     → Proxy a NestJS :3000
├── NestJS (PM2)                   ← Proceso backend gestionado por PM2
│   ├── Módulo: relacion-detallada
│   ├── Módulo: solicitud-transporte
│   ├── Módulo: viaje
│   ├── Módulo: transportista
│   ├── Módulo: chofer
│   └── Módulo: unidad-vehicular
└── PostgreSQL (nativo)            ← Base de datos instalada en el mismo VPS
```

### Stack de despliegue (producción)

| Componente | Tecnología | Rol |
|---|---|---|
| Servidor web / proxy | **Nginx** | Sirve React build + proxy a API |
| Gestor de procesos | **PM2** | Mantiene NestJS en ejecución, auto-restart |
| Backend | **NestJS** (1 proceso) | Lógica de negocio + API REST |
| Base de datos | **PostgreSQL** (nativo VPS) | Persistencia |
| Frontend | **React** (dist estático) | UI servida por Nginx |

> **Nota:** Docker Compose se usa únicamente para desarrollo local. En producción, los servicios corren como procesos directos en el VPS.

### Fronteras modulares internas (obligatorias)

Los módulos NestJS deben comunicarse **únicamente a través de sus interfaces públicas exportadas**, nunca por imports directos a servicios internos de otro módulo. Esta regla es el fundamento que permite extraer módulos a microservicios en el futuro sin reescritura total.

```
✅ viaje.service.ts importa TransportistaService (exportado por TransportistaModule)
❌ viaje.service.ts importa TransportistaRepository directamente
```

---

## Consecuencias

### Positivas
- Despliegue en producción desde día 1 con `pm2 start` + Nginx config
- Costo de infraestructura mínimo durante MVP
- Todo el equipo puede trabajar en el mismo repositorio sin coordinación de servicios
- Las fronteras de módulo NestJS preparan la extracción futura

### Negativas / Trade-offs
- El VPS debe tener capacidad suficiente para todos los componentes (BD + backend + archivos estáticos)
- Un leak de memoria en el proceso NestJS afecta toda la aplicación
- Si la BD crece mucho, compartir disco con el proceso puede ser limitante

### Mitigaciones
- PM2 configurado con `--max-memory-restart` para reinicio automático ante leaks
- Monitoreo de disco y memoria (alertas antes de saturar)
- Backups automáticos de PostgreSQL hacia almacenamiento externo

---

## Trigger de Revisión

**Esta decisión debe revisarse si ocurre alguno de los siguientes:**

| Trigger | Acción sugerida |
|---|---|
| Tiempo de respuesta p95 > 2s bajo carga normal | Escalar VPS verticalmente (más RAM/CPU) |
| VPS al 80% de capacidad de forma sostenida | Escalar VPS verticalmente |
| Equipo crece a 5+ desarrolladores con ownership por módulo | Evaluar extracción de módulos a microservicios |
| Volumen supera 10x el estimado inicial ({Y} viajes/mes) | Evaluar separar BD a servidor dedicado |
| Requerimiento de alta disponibilidad (SLA > 99.9%) | Evaluar Load Balancer + réplicas |

> **Estrategia de escalado preferida:** vertical primero (subir specs del VPS) antes de escalar horizontalmente. Ver [roadmap-estrategia-evolutiva.es.md](../../planning-artifacts/../../../_bmad-output/planning-artifacts/roadmap-estrategia-evolutiva.es.md).

---

## Estado de Aprobación

- [ ] Revisado por Winston (Arquitecto)
- [ ] Aprobado por John (PM)
- [ ] Aprobado por Architecture Board

---

## Referencias

| Documento | Ruta |
|---|---|
| ADR-0001 Stack Tecnológico | `reference/architecture/adrs/0001-stack-tecnologico-tms.es.md` |
| Roadmap Estrategia Evolutiva | `_bmad-output/planning-artifacts/roadmap-estrategia-evolutiva.es.md` |
| PHASE_TRACKING.md | `PHASE_TRACKING.md` |
| AUDITORIA-FASE-1.md | `AUDITORIA-FASE-1.md` |

---

## Historial

| Versión | Fecha | Autor | Cambios |
|---|---|---|---|
| 0.1.0 | 2026-06-30 | John + Winston | Versión inicial |
