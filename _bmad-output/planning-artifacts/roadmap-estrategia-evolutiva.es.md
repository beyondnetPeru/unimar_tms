# Roadmap de Estrategia Evolutiva — TMS

<p align="right">
  <img src="https://img.shields.io/badge/UNIMAR%20S.A.-TMS-0f3e67?style=flat-square" alt="Unimar S.A.">
  <img src="https://img.shields.io/badge/Documento-roadmap--estrategia--evolutiva-003c6b?style=flat-square" alt="Roadmap">
  <img src="https://img.shields.io/badge/Estado-Draft-f39c12?style=flat-square" alt="Estado">
</p>

> **Padre:** [PRD-TMS-001](prd-sistema-gestion-transportes.es.md)  
> **Relacionado:** [ADR-0005 — Topología Inicial](../../reference/architecture/adrs/0005-topologia-inicial-monolito-modular.es.md)  
> **Horizonte total:** Q3 2026 (MVP) → 2028 (escala)  
> **Generado:** 2026-06-30

---

## 1. Principio Rector

> **"La arquitectura evoluciona con el negocio, no adelante de él."**

El TMS arranca con la topología más simple que resuelve el problema real. Cada salto de complejidad requiere un trigger medible — nunca se evoluciona por anticipación especulativa.

---

## 2. Estado Actual — Horizonte 0 (MVP)

**Período:** Q3 2026 (Fase 1–5 del SDLC)  
**Topología:** Monolito Modular en VPS único  
**Referencia:** [ADR-0005](../../reference/architecture/adrs/0005-topologia-inicial-monolito-modular.es.md)

```
VPS único
├── Nginx               ← Proxy + React estático
├── NestJS (PM2)        ← Monolito con módulos internos
└── PostgreSQL (nativo) ← BD única compartida
```

### Módulos internos del Monolito (Horizonte 0)

| Módulo | Responsabilidad |
|---|---|
| `relacion-detallada` | Recepción y consulta de datos SAP |
| `solicitud-transporte` | Gestión de solicitudes de transporte |
| `viaje` | Planificación y confirmación de viajes |
| `transportista` | Maestro de transportistas |
| `chofer` | Maestro de conductores |
| `unidad-vehicular` | Maestro de unidades vehiculares |
| `cita-portuaria` | Coordinación de citas en terminales |
| `auditoria` | Historial de cambios |

### Características del Horizonte 0

- ✅ 1 proceso backend, 1 base de datos, 1 servidor
- ✅ Despliegue directo: `pm2 start` + Nginx config
- ✅ Sin mensajería asíncrona (comunicación interna directa)
- ✅ Sin caché distribuida (PostgreSQL como única fuente de verdad)
- ⚠️ Escalado disponible: **vertical** (subir specs del VPS)

---

## 3. Horizonte 1 — Mensajería + Caché

**Trigger:** Cualquiera de los siguientes:
- Tiempo de respuesta p95 > 1.5s de forma sostenida
- VPS al 70% de CPU/RAM bajo carga normal de negocio
- Módulo SAP genera latencia que bloquea requests de usuario

**Estimado:** Post-MVP, si aplica en 2026-Q4 o 2027-Q1

```
VPS único (ampliado verticalmente si es necesario)
├── Nginx
├── NestJS (PM2)
│   └── RabbitMQ consumer integrado ← NUEVO
├── RabbitMQ (nativo o VPS separado) ← NUEVO
├── Redis (caché de maestros)        ← NUEVO
└── PostgreSQL (nativo)
```

### Cambios respecto a Horizonte 0

| Cambio | Qué resuelve |
|---|---|
| Introducir **RabbitMQ** para eventos de dominio | Desacoplar la sincronización SAP del ciclo de request HTTP |
| Introducir **Redis** para caché de maestros | Reducir queries a BD para transportistas, choferes, unidades (datos que cambian poco) |
| Eventos de dominio para viaje confirmado, cita registrada | Base para notificaciones y auditoría reactiva |

### Regla de implementación

Los módulos NestJS ya deben tener fronteras claras (Horizonte 0). La introducción de RabbitMQ **no requiere refactorizar la lógica de negocio** — solo agrega publishers/consumers en la capa de infraestructura.

---

## 4. Horizonte 2 — BD Dedicada

**Trigger:** Cualquiera de los siguientes:
- Disco del VPS al 70% de uso sostenido
- Queries lentas impactan disponibilidad del proceso NestJS
- Requerimiento de réplica de lectura para reportes

**Estimado:** 2027 si el volumen de datos crece significativamente

```
VPS backend
├── Nginx
├── NestJS (PM2)
├── RabbitMQ
└── Redis

VPS BD (separado) ← NUEVO
├── PostgreSQL primario
└── PostgreSQL réplica lectura (opcional)
```

### Cambios respecto a Horizonte 1

| Cambio | Qué resuelve |
|---|---|
| Separar PostgreSQL a servidor dedicado | Libera recursos del VPS backend; permite escalar BD independientemente |
| Réplica de lectura (opcional) | Reportes y dashboards sin impactar la BD transaccional |

### Sin cambios en el código

La separación de BD es **puramente de infraestructura** — solo cambia el `DATABASE_URL` en las variables de entorno. El código NestJS no necesita modificación.

---

## 5. Horizonte 3 — Extracción de Módulos (si aplica)

**Trigger:** Todos los siguientes deben cumplirse simultáneamente:
- Equipo crece a 5+ desarrolladores con ownership claro por módulo
- Módulo específico tiene carga desproporcionada que no se resuelve con escalado vertical
- Requerimiento de despliegue independiente por módulo

**Estimado:** 2028 en adelante — solo si el negocio lo justifica

```
Load Balancer (Nginx o externo)
├── NestJS instancia A (módulos core)
├── NestJS instancia B (módulos core)   ← escalado horizontal
└── cita-portuaria-service (separado)   ← primer módulo extraído
    └── PostgreSQL propio (BD por servicio)

Servicios compartidos:
├── RabbitMQ cluster
├── Redis cluster
└── PostgreSQL primario + réplicas
```

### Primer candidato para extracción

El módulo `cita-portuaria` es el candidato natural para ser el primer microservicio por:
- Integración con sistemas externos (DPWORLD/APM) — frontera de dominio clara
- Ciclo de despliegue potencialmente diferente al resto del sistema
- Carga concentrada en ventanas horarias específicas (horas de puerto)

### Patrón de extracción: Strangler Fig

No se reescribe de golpe. Se extrae el módulo progresivamente:
1. Módulo sigue existiendo en el monolito
2. Se crea el servicio separado con la misma lógica
3. El tráfico se redirige gradualmente (Nginx upstream)
4. El módulo en el monolito se elimina cuando el servicio es estable

---

## 6. Lo que NO cambia en ningún horizonte

Independientemente de la topología, estas reglas son invariantes:

| Regla | Por qué es invariante |
|---|---|
| `BIGINT GENERATED ALWAYS AS IDENTITY` en toda PK | Estándar PostgreSQL del proyecto |
| Columnas de auditoría en toda tabla | Trazabilidad obligatoria de negocio |
| Soft delete — nunca borrar físicamente | Requisito de cumplimiento operativo |
| Respuestas HTTP estandarizadas (TransformInterceptor) | Contrato de API estable para el frontend |
| Arquitectura hexagonal interna por módulo | Permite extracción futura sin reescritura |
| Español, snake_case en BD | Convención del proyecto |

---

## 7. Tabla de Decisión — Cuándo evolucionar

| Situación observada | Respuesta recomendada | Horizonte |
|---|---|---|
| VPS lento bajo carga | Escalar verticalmente (más RAM/CPU) | 0 → 0+ |
| BD lenta en consultas | Optimizar índices primero, luego réplica lectura | 0 → 2 |
| SAP sync bloquea requests | Introducir RabbitMQ para async | 0 → 1 |
| Maestros se consultan mucho | Introducir Redis caché | 0 → 1 |
| Disco lleno | Separar BD a VPS dedicado | 0/1 → 2 |
| Equipo crece + ownership claro | Evaluar extracción de módulo | 1/2 → 3 |
| SLA > 99.9% requerido | Load Balancer + múltiples instancias | 2 → 3 |

---

## 8. Principios de Gobierno de la Evolución

1. **Medir antes de migrar.** Ningún salto de horizonte se hace por intuición — requiere métricas observadas.
2. **Vertical antes que horizontal.** Subir el VPS siempre es más barato y rápido que agregar servidores.
3. **Un cambio a la vez.** No se introduce RabbitMQ y Redis y BD separada al mismo tiempo.
4. **El código no debe saber dónde corre.** Las variables de entorno (DATABASE_URL, RABBITMQ_URL, REDIS_URL) abstraen la topología del código fuente.
5. **Las fronteras modulares de Horizonte 0 son el activo más valioso.** Si se rompen (módulos acoplados), los horizontes 2 y 3 son imposibles.

---

## 9. Estado de Aprobación

- [ ] Revisado por Winston (Arquitecto)
- [ ] Aprobado por John (PM)
- [ ] Aprobado por Architecture Board

---

## 10. Historial de Cambios

| Versión | Fecha | Autor | Cambios |
|---|---|---|---|
| 0.1.0 | 2026-06-30 | John + Winston | Versión inicial — 4 horizontes, triggers, invariantes |

---

<p align="center">
  <strong>© Unimar S.A.</strong> · Sistema de Gestión de Transportes (TMS)<br>
  Roadmap de Estrategia Evolutiva · Estándar: <a href="https://evolutionaryarchitecture.com">Evolutionary Architecture</a>
</p>
