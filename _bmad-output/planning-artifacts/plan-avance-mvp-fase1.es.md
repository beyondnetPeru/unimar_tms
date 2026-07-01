# Plan de Avance — MVP Fase 1 (Planificación de Transportes)

<p align="right">
  <img src="https://img.shields.io/badge/UNIMAR%20S.A.-TMS-0f3e67?style=flat-square" alt="Unimar S.A.">
  <img src="https://img.shields.io/badge/Documento-plan--avance--mvp--fase1-003c6b?style=flat-square" alt="Plan Avance">
  <img src="https://img.shields.io/badge/Estado-Activo-4caf50?style=flat-square" alt="Estado">
</p>

> **Padre:** [PRD-TMS-001](prd-sistema-gestion-transportes.es.md)  
> **Horizonte:** Q3 2026  
> **Generado:** 2026-06-24

---

## 1. Contexto

El PRD (`PRD-TMS-001`) está en **estado borrador** a la espera de aprobación en reunión mañana. Sin embargo, existen **secciones ya cerradas** y requisitos confirmados que permiten **avanzar YA** en infraestructura, modelo de datos y contratos de integración. Este plan documenta qué se puede iniciar inmediatamente y qué depende de la aprobación final del PRD.

### Objetivos de este plan
1. Desbloquear trabajo de infraestructura, BD y contratos sin esperar PRD 100%
2. Establecer hitos claros para mañana post-reunión
3. Reducir riesgos de retraso del MVP (Q3 2026)

---

## 2. ¿QUÉ PODEMOS HACER YA? — VERDE ✅

Estas iniciativas **NO dependen** de datos operativos reales ni aprobación final:

### 2.1 Stack Tecnológico Confirmado

**Referencia:** [ADR-0001](../../reference/architecture/adrs/0001-stack-tecnologico-tms.es.md) (Draft — listo para ejecutar)

| Componente | Tecnología | Versión | Propósito |
|:-----------|:-----------|:--------|:----------|
| **Backend** | NestJS | 10.x | API transaccional, lógica de negocio |
| **Runtime** | Node.js | 20.x | Ejecución backend |
| **Base de datos** | PostgreSQL | 15+ | Persistencia de datos operacionales |
| **ORM** | TypeORM | 0.3.x | Data Mapper pattern |
| **Validación** | class-validator | 0.14.x | DTOs y class-based validation |
| **Manejo de errores** | neverthrow | 6.x | Result<T, E> type-safe |
| **Mensajería** | RabbitMQ | 3.x | Eventos de dominio (fase posterior) |
| **Cache** | Redis | 7.x | Sesiones, datos maestros (fase posterior) |
| **Frontend web** | React | 18+ | Interfaz de usuario |
| **Estilos** | Tailwind CSS | 3.x | Utilidades CSS obligatorias |
| **UI Components** | A definir en Fase 2 | — | Librería de componentes React |
| **Testing** | Vitest | 1.x | Tests unitarios |
| **E2E Testing** | Playwright | 1.x | Automatización full-stack |
| **Docs API** | Swagger/OpenAPI | 7.x | Documentación automática de endpoints |

**Acción:** Nada pendiente — stack está aprobado en ADR-0001.

### 2.2 Modelo de Datos Core

**Estándar obligatorio:** Ver [CLAUDE.md — PostgreSQL](../../.claude/CLAUDE.md#postgresql-estándares-obligatorios)

#### Entidades MVP (sin placeholders)

```sql
-- 1. MAESTRO: Transportista
CREATE TABLE transportista (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo_sap VARCHAR(20) NOT NULL UNIQUE,
    razon_social VARCHAR(255) NOT NULL,
    ruc VARCHAR(11) UNIQUE,
    contacto_principal VARCHAR(255),
    telefono VARCHAR(20),
    email VARCHAR(255),
    estado_maestro BOOLEAN DEFAULT true,
    
    usuario_creacion BIGINT NOT NULL,
    usuario_actualizacion BIGINT NOT NULL,
    fecha_creacion TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado BOOLEAN NOT NULL DEFAULT true,
    eliminado BOOLEAN NOT NULL DEFAULT false
);

-- 2. MAESTRO: Chofer
CREATE TABLE chofer (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo_sap VARCHAR(20),
    transportista_id BIGINT NOT NULL REFERENCES transportista(id),
    nombres VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL,
    numero_licencia VARCHAR(20) NOT NULL,
    tipo_licencia VARCHAR(5), -- A2, A3, B3, etc.
    vigencia_licencia DATE,
    estado_maestro BOOLEAN DEFAULT true,
    
    usuario_creacion BIGINT NOT NULL,
    usuario_actualizacion BIGINT NOT NULL,
    fecha_creacion TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado BOOLEAN NOT NULL DEFAULT true,
    eliminado BOOLEAN NOT NULL DEFAULT false
);

-- 3. MAESTRO: Unidad Vehicular
CREATE TABLE unidad_vehicular (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo_sap VARCHAR(20),
    transportista_id BIGINT NOT NULL REFERENCES transportista(id),
    placa VARCHAR(10) NOT NULL UNIQUE,
    tipo_contenedor VARCHAR(10), -- 20', 40'
    marca_modelo VARCHAR(255),
    anio_fabricacion SMALLINT,
    capacidad_contenedores SMALLINT,
    estado_operativo VARCHAR(20), -- Activo, Mantenimiento, Baja
    
    usuario_creacion BIGINT NOT NULL,
    usuario_actualizacion BIGINT NOT NULL,
    fecha_creacion TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado BOOLEAN NOT NULL DEFAULT true,
    eliminado BOOLEAN NOT NULL DEFAULT false
);

-- 4. DATOS SAP: Relación Detallada
CREATE TABLE relacion_detallada (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo_sap VARCHAR(50) NOT NULL UNIQUE,
    numero_nave VARCHAR(100),
    numero_viaje_nave VARCHAR(20),
    numero_bl VARCHAR(20),
    numero_manifiesto VARCHAR(50),
    puerto_origen VARCHAR(100),
    puerto_destino VARCHAR(100),
    fecha_arribo_estimada DATE,
    fecha_zarpe_estimada DATE,
    cantidad_contenedores SMALLINT,
    estado_relacion VARCHAR(20), -- Pendiente, En Tránsito, Completada
    sincronizada_en TIMESTAMP WITH TIME ZONE,
    
    usuario_creacion BIGINT NOT NULL,
    usuario_actualizacion BIGINT NOT NULL,
    fecha_creacion TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado BOOLEAN NOT NULL DEFAULT true,
    eliminado BOOLEAN NOT NULL DEFAULT false
);

-- 5. DATOS SAP: Detalle de Contenedor (línea en relación detallada)
CREATE TABLE contenedor (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    relacion_detallada_id BIGINT NOT NULL REFERENCES relacion_detallada(id),
    numero_contenedor VARCHAR(20) NOT NULL,
    tipo_contenedor VARCHAR(10), -- 20', 40', HC
    peso_kg NUMERIC(10,2),
    descripcion_carga VARCHAR(500),
    codigo_imo VARCHAR(10),
    estado_contenedor VARCHAR(20), -- Pendiente, Planificado, En Viaje, Completado
    
    usuario_creacion BIGINT NOT NULL,
    usuario_actualizacion BIGINT NOT NULL,
    fecha_creacion TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado BOOLEAN NOT NULL DEFAULT true,
    eliminado BOOLEAN NOT NULL DEFAULT false
);

-- 6. NEGOCIO: Solicitud de Transporte
CREATE TABLE solicitud_transporte (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    numero_solicitud VARCHAR(50) NOT NULL UNIQUE,
    relacion_detallada_id BIGINT NOT NULL REFERENCES relacion_detallada(id),
    referencia_os_sap VARCHAR(50), -- Orden de Servicio original
    cantidad_contenedores SMALLINT NOT NULL,
    estado_solicitud VARCHAR(20), -- Planificación, Asignada, Cancelada, Completada
    motivo_cancelacion VARCHAR(500),
    
    usuario_creacion BIGINT NOT NULL,
    usuario_actualizacion BIGINT NOT NULL,
    fecha_creacion TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado BOOLEAN NOT NULL DEFAULT true,
    eliminado BOOLEAN NOT NULL DEFAULT false
);

-- 7. NEGOCIO: Viaje
CREATE TABLE viaje (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    numero_viaje VARCHAR(50) NOT NULL UNIQUE,
    solicitud_transporte_id BIGINT NOT NULL REFERENCES solicitud_transporte(id),
    transportista_id BIGINT NOT NULL REFERENCES transportista(id),
    chofer_id BIGINT REFERENCES chofer(id), -- Opcional en planificación, obligatorio en ejecución
    unidad_vehicular_id BIGINT REFERENCES unidad_vehicular(id), -- Opcional en planificación
    
    origen VARCHAR(255) NOT NULL,
    destino VARCHAR(255) NOT NULL,
    fecha_viaje DATE NOT NULL,
    hora_salida_estimada TIME,
    
    estado_viaje VARCHAR(20), -- Planificado, Confirmado, En Ejecución, Completado, Cancelado
    confirmado_en TIMESTAMP WITH TIME ZONE,
    iniciado_en TIMESTAMP WITH TIME ZONE,
    completado_en TIMESTAMP WITH TIME ZONE,
    
    usuario_creacion BIGINT NOT NULL,
    usuario_actualizacion BIGINT NOT NULL,
    fecha_creacion TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado BOOLEAN NOT NULL DEFAULT true,
    eliminado BOOLEAN NOT NULL DEFAULT false
);

-- 8. NEGOCIO: Asignación Contenedor a Viaje
CREATE TABLE viaje_contenedor (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    viaje_id BIGINT NOT NULL REFERENCES viaje(id),
    contenedor_id BIGINT NOT NULL REFERENCES contenedor(id),
    
    usuario_creacion BIGINT NOT NULL,
    usuario_actualizacion BIGINT NOT NULL,
    fecha_creacion TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado BOOLEAN NOT NULL DEFAULT true,
    eliminado BOOLEAN NOT NULL DEFAULT false,
    
    UNIQUE(viaje_id, contenedor_id)
);

-- 9. INTEGRACIÓN: Cita Portuaria
CREATE TABLE cita_portuaria (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    numero_cita VARCHAR(50),
    relacion_detallada_id BIGINT NOT NULL REFERENCES relacion_detallada(id),
    terminal_portuaria VARCHAR(100), -- DPWORLD, APM, etc.
    tipo_cita VARCHAR(20), -- Retiro, Devolución
    fecha_cita DATE NOT NULL,
    hora_cita TIME,
    estado_cita VARCHAR(20), -- Solicitada, Confirmada, Realizada, Cancelada
    referencia_externa VARCHAR(100), -- ID externo del portal DPWORLD/APM
    
    usuario_creacion BIGINT NOT NULL,
    usuario_actualizacion BIGINT NOT NULL,
    fecha_creacion TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado BOOLEAN NOT NULL DEFAULT true,
    eliminado BOOLEAN NOT NULL DEFAULT false
);

-- 10. AUDITORÍA: Historial de Cambios
CREATE TABLE auditoria_cambio (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tabla_afectada VARCHAR(100) NOT NULL,
    registro_id BIGINT NOT NULL,
    tipo_operacion VARCHAR(10), -- INSERT, UPDATE, DELETE
    usuario_id BIGINT NOT NULL,
    campo_modificado VARCHAR(100),
    valor_anterior TEXT,
    valor_nuevo TEXT,
    
    usuario_creacion BIGINT NOT NULL,
    usuario_actualizacion BIGINT NOT NULL,
    fecha_creacion TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado BOOLEAN NOT NULL DEFAULT true,
    eliminado BOOLEAN NOT NULL DEFAULT false
);
```

**Regla de aplicación:**
- Todas las tablas incluyen las 6 columnas de auditoría obligatorias (CLAUDE.md)
- ID siempre `BIGINT GENERATED ALWAYS AS IDENTITY`
- Nombres en español, snake_case, singular
- Foreign keys con `NOT NULL` cuando la relación es obligatoria
- Estados con VARCHAR(20) para flexibilidad de enum en futuro

**Acción:** Iniciar creación de migraciones TypeORM en `src/database/migrations/` (backend).

### 2.3 Estructura de Repositorio Backend

```
apps/backend/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── config/
│   │   ├── database.config.ts          ← TypeORM connection
│   │   ├── environments.ts              ← Vars de entorno
│   │   └── app.config.ts                ← Configuración general
│   ├── common/
│   │   ├── decorators/
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts ← Error global
│   │   ├── interceptors/
│   │   │   └── transform.interceptor.ts ← Response wrapper global
│   │   ├── pipes/
│   │   └── guards/
│   ├── domain/
│   │   ├── transportista/
│   │   │   ├── transportista.module.ts
│   │   │   ├── transportista.entity.ts
│   │   │   ├── transportista.service.ts
│   │   │   ├── transportista.controller.ts
│   │   │   └── dto/
│   │   │       ├── crear-transportista.dto.ts
│   │   │       └── actualizar-transportista.dto.ts
│   │   ├── solicitud-transporte/
│   │   ├── viaje/
│   │   ├── relacion-detallada/
│   │   └── [otros-modulos]/
│   ├── infrastructure/
│   │   ├── persistence/
│   │   │   └── repositories/           ← TypeORM repositories (si aplica)
│   │   ├── integrations/
│   │   │   ├── sap/
│   │   │   │   ├── sap.service.ts      ← Cliente BAPI batch
│   │   │   │   └── sap.dto.ts
│   │   │   └── dpworld/
│   │   │       ├── dpworld.service.ts  ← Cliente portal web
│   │   │       └── dpworld.dto.ts
│   │   └── messaging/
│   │       └── rabbitmq.config.ts      ← Para fase 2
│   ├── database/
│   │   ├── migrations/
│   │   │   ├── 1-create-transportista.ts
│   │   │   ├── 2-create-chofer.ts
│   │   │   └── [...-migrations].ts
│   │   └── seeds/
│   │       └── seed-maestros.ts
│   └── shared/
│       ├── constants/
│       ├── utils/
│       └── types/
├── test/
│   ├── unit/
│   └── integration/
└── .env.example
```

**Acción:** Iniciar repo con `nest new` + estructura de carpetas.

### 2.4 Estructura de Repositorio Frontend

```
apps/frontend/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Layout.tsx
│   │   └── ui/                      ← Componentes reutilizables genéricos
│   ├── pages/                       ← Una carpeta por feature (page-first)
│   │   ├── relaciones/
│   │   │   ├── RelacionesListaPage.tsx
│   │   │   └── RelacionesDetallePage.tsx
│   │   ├── solicitudes/
│   │   │   ├── SolicitudesListaPage.tsx
│   │   │   └── SolicitudesCrearPage.tsx
│   │   ├── viajes/
│   │   │   ├── ViajesListaPage.tsx
│   │   │   ├── ViajesAsignarPage.tsx
│   │   │   └── ViajesDetallePage.tsx
│   │   └── dashboard/
│   │       └── DashboardPage.tsx
│   ├── hooks/                       ← Custom hooks (datos, estado, lógica)
│   │   ├── useRelaciones.ts
│   │   ├── useViajes.ts
│   │   └── [otros hooks]/
│   ├── services/                    ← Clientes HTTP hacia el backend
│   │   ├── api.ts                   ← Instancia base (axios/fetch)
│   │   ├── relaciones.service.ts
│   │   └── viajes.service.ts
│   ├── types/                       ← Interfaces TypeScript compartidas
│   │   ├── transportista.ts
│   │   ├── viaje.ts
│   │   └── [otros tipos]/
│   ├── styles/
│   │   ├── globals.css              ← Tailwind + reset global
│   │   └── variables.css            ← CSS vars (si hay DESIGN.md)
│   ├── App.tsx
│   ├── main.tsx
│   └── router.tsx                   ← Definición de rutas
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

**Nota:** Librería de componentes UI y solución de routing/data-fetching (React Query, React Router, etc.) se define en Fase 2 junto con DESIGN.md.

### 2.5 Contratos de Integración

#### 2.5.1 SAP — BAPI Batch (Entrada)

**Frecuencia:** Diaria, una vez/día (ej. 06:00)  
**Método:** BAPI SAP o tabla de extracción

| Campo | Tipo | Origen SAP | Mapeo TMS |
|:------|:-----|:-----------|:----------|
| Código Nave | VARCHAR(100) | BAPI_PO_GET_LIST | `relacion_detallada.numero_nave` |
| BL | VARCHAR(20) | BAPI_PO_GET_LIST | `relacion_detallada.numero_bl` |
| Contenedor | VARCHAR(20) | Tabla de líneas | `contenedor.numero_contenedor` |
| Transportista Cód. | VARCHAR(20) | Vendor Master | `transportista.codigo_sap` |
| Chofer Cód. | VARCHAR(20) | Employee Master | `chofer.codigo_sap` |
| Placa | VARCHAR(10) | Equipment Master | `unidad_vehicular.placa` |

**Responsable de contrato:** Arquitecto + Integración SAP  
**Estado:** Pendiente definición en reunión mañana

#### 2.5.2 DPWORLD/APM — Portal Web (Salida)

**Funcionalidad:** Coordinación de citas (manual por UI)  
**Método:** Portal web — sin API (MVP)

| Acción | Entrada | Manual/Auto | Destino |
|:-------|:--------|:-----------|:--------|
| Solicitar cita | Relación detallada | Manual por UI | Portal DPWORLD/APM |
| Confirmar cita | Respuesta manual | Manual por UI | Tabla `cita_portuaria` |

**Responsable de contrato:** Gestor + PM  
**Estado:** Pendiente validación en reunión

### 2.6 Docker Compose Local

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: tms_dev
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data

  pgadmin:
    image: dpage/pgadmin4
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@example.com
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - "5050:80"

  backend:
    build: ./apps/backend
    environment:
      NODE_ENV: development
      DATABASE_URL: postgres://postgres:postgres@postgres:5432/tms_dev
    ports:
      - "3000:3000"
    depends_on:
      - postgres

  frontend:
    build: ./apps/frontend
    ports:
      - "4200:4200"
    depends_on:
      - backend

volumes:
  postgres-data:
```

**Acción:** Crear archivo `docker-compose.yml` en raíz del repo.

---

## 3. ¿QUÉ ESPERA REUNIÓN? — ROJO 🛑

Estas iniciativas **dependen** de datos operativos o aprobación final del PRD:

### 3.1 Datos Operativos (§2.1, §3.1 del PRD)

**Placeholder sin valor:** {X}, {Y}, {Z}

| Dato | Para qué | Impacto si falta |
|:-----|:---------|:-----------------|
| Contenedores/mes | Dimensionar capacidad de BD, colas | Imposible estimar almacenamiento |
| Viajes/mes | Métricas de éxito, testing de volumen | No se puede validar performance |
| Transportistas activos | Tamaño maestro, gestión de permisos | No se sabe scope real |
| Tiempo asignación actual | Baseline para métrica de éxito | No se puede medir mejora |
| Tasa errores actual | Baseline para métrica de éxito | No se puede medir reducción |

**Responsable:** John (PM) — Obtener de operaciones  
**Impacto:** Sin estos datos, tests de volumen y métricas de éxito no se pueden escribir

### 3.2 Aprobación Formal (§10 del PRD)

**Criterios de Aceptación pendientes:**

| ID | Criterio | Responsable | Impacto |
|:---|:---------|:-----------|:--------|
| CA-01 | Resumen ejecutivo validado negocio | John (PM) | Scope funcional confirmado |
| CA-02 | Métricas de éxito con valores reales | John (PM) | KPIs para cierre de MVP |
| CA-03 | Alcance firmado por Producto + Arch | John (PM) + Arquitecto | Bloqueo scope creep |
| CA-08 | Funcionalidades (F-01 a F-23) con CA | John (PM) | Criterios de prueba |
| CA-11 | Prototipos Figma aprobados por UX | UX Designer | Referencia visual de desarrollo |
| CA-12 | ADR-0001 aprobado | Arquitecto | Stack confirmado (parcial — ya existe) |

**Acción mañana:** Cerrar todos los ☐ → ☑

### 3.3 Prototipos UI/UX (§A.4 del PRD)

**Referencia:** Figma — TMS / Planificación

**Pantallas MVP:**
- Dashboard de Planificación (F-10)
- Listado de Relaciones Detalladas (F-01)
- Creación de Solicitud (F-02)
- Asignación de Viaje (F-03—F-07)
- Detalle de Viaje (F-08, F-09)
- Calendario de Citas (F-19)

**Status actual:** Solo referencias en PRD, sin embeber.

**Acción:** Validar en reunión que Figma es la fuente de verdad; crear link en DESIGN.md si existe.

### 3.4 Reglas de Negocio Priorización

**Falta:** Priorizar RN-01 a RN-40 como Must/Should/Could  
**Impacto:** Necesario para definir MVP scope exacto vs. Fase 2  
**Acción mañana:** Cerrar priorización con John + Architecture Board

---

## 4. Hitos Próximos

### Hoy — Antes de reunión (2026-06-24)

| Tarea | Responsable | Estado |
|:------|:-----------|:-------|
| Generar plan-avance-mvp-fase1.md | Christian | ✅ HECHO |
| Revisar PRD con stakeholders clave | John | ⏳ |
| Preparar respuestas {X}/{Y}/{Z} | John + Operaciones | ⏳ |

### Mañana — Reunión (2026-06-25)

| Tarea | Resultado Esperado | Responsable |
|:------|:-------------------|:-----------|
| Validar alcance MVP (5.1 del PRD) | CA-03 ☑ | John + Arquitecto |
| Aprobar datos operativos | Valores reales para {X}/{Y}/{Z} | John + PM |
| Cerrar criterios aceptación | Todos CA-* → ☑ | John + Equipo |
| Confirmar Figma | Link a design system | UX Designer |
| Aprobación final PRD | Firma digital o correo | John + Arquitecto |

### Semana 1 (2026-06-26 a 2026-06-30) — POST-REUNIÓN

| Tarea | Responsable | Estimado |
|:------|:-----------|:---------|
| Crear repo backend (NestJS scaffold) | Backend Lead | 1 día |
| Crear repo frontend (React 18 + Vite scaffold) | Frontend Lead | 1 día |
| Implementar migraciones (10 entidades) | Backend Lead | 2 días |
| Crear docker-compose.yml | DevOps/Backend | 0.5 día |
| Implementar TransformInterceptor + HttpExceptionFilter global | Backend Lead | 0.5 día |
| Iniciar módulo `relacion-detallada` (entidad + service + controller) | Backend Lead | 1.5 días |
| Validar integración SAP BAPI (prototipo) | Backend Lead + SAP Team | 2 días |

### Sprint 1 (2026-07-01 a 2026-07-14) — FUNCIONALIDADES CORE

| Funcionalidad | Módulo Backend | Módulo Frontend | Estimado |
|:--------------|:---------------|:----------------|:---------|
| F-01 Relaciones Detalladas | `relacion-detallada` | `relaciones-lista` | 2 días |
| F-02 Creación Solicitud | `solicitud-transporte` | `solicitudes-crear` | 2 días |
| F-03 Asignación Viaje | `viaje` | `viajes-asignar` | 2 días |
| F-04 Selección Transportista | `viaje.transportista_id` | dropdown dinámico | 1 día |
| F-05 Selección Chofer | `viaje.chofer_id` | dropdown dinámico (+ API) | 1.5 días |
| F-06 Selección Unidad | `viaje.unidad_vehicular_id` | dropdown dinámico (+ API) | 1.5 días |
| F-07 Confirmación Viaje | `viaje.estado_viaje = Confirmado` | botón + notificación | 1 día |

---

## 5. Dependencias Críticas

| Dependencia | Proveedor | Impacto Alto | Mitigación |
|:-----------|:----------|:-----------|:-----------|
| BAPI SAP disponible | SAP Team | No hay datos maestros | Contacto temprano con integración |
| Figma compartido | UX Designer | No hay referencia visual | Crear placeholder en DESIGN.md |
| Datos operativos {X}/{Y}/{Z} | John + Operaciones | Tests de volumen inútiles | Usar valores estimados temporalmente |
| Aprobación Architecture Board | Arquitecto | Bloqueo de sprint | Reunión scheduled para mañana |
| Portal DPWORLD/APM acceso | Gestor + Terminal | Coordinación citas manual | Documentar proceso fallback |

---

## 6. Matriz de Responsabilidades (RACI)

| Artefacto | Genera | Aprueba | Consulta | Ejecuta |
|:----------|:-------|:--------|:---------|:--------|
| PRD-TMS-001 | John | John + Arquitecto | Equipo | — |
| ADR-0001 (Stack) | Arquitecto | Arquitecto Board | — | — |
| Modelo de datos | Backend Lead | Arquitecto | — | Backend Team |
| Contratos SAP/DPWORLD | Arquitecto | John + Arquitecto | Integraciones | Backend Team |
| Código Backend | Backend Team | — | Arquitecto | Backend Team |
| Código Frontend | Frontend Team | — | UX + Arquitecto | Frontend Team |
| DESIGN.md (tokens) | UX Designer | — | Frontend Team | UX Designer |
| Tests | QA + Dev Teams | — | — | Dev Teams |

---

## 7. Riesgos de Ejecución

| ID | Riesgo | Probabilidad | Impacto | Mitigación |
|:---|:------|:------------|:--------|:-----------|
| RX-01 | BAPI SAP no disponible a tiempo | Media | Alto | Contacto con SAP team hoy; mock data de respaldo |
| RX-02 | Aprobación retrasada post-reunión | Baja | Alto | Decisión expedita en reunión mañana |
| RX-03 | Figma no accesible o incomplete | Baja | Medio | Crear wireframes adicionales en Mermaid |
| RX-04 | Datos operativos {X}/{Y}/{Z} inexactos | Media | Medio | Usar rangos estimados hasta data real; revisar en Sprint 1 |
| RX-05 | Scope creep de funcionalidades | Alta | Alto | Control de cambios formal; solo Must del MVP |

---

## 8. Verificación

**Hitos de cierre:**

- [ ] PRD aprobado por John + Arquitecto (antes 2026-06-25)
- [ ] Repo backend creado con migraciones (antes 2026-06-30)
- [ ] Repo frontend creado con estructura (antes 2026-06-30)
- [ ] Docker Compose levanta stack local (antes 2026-06-30)
- [ ] Prototipo módulo `relacion-detallada` con endpoint GET (antes 2026-07-07)
- [ ] Sprint 1 cierra con F-01 a F-07 implementadas (antes 2026-07-14)

---

## 9. Referencias

| Documento | Ruta | Estado |
|:----------|:-----|:-------|
| PRD TMS 001 | `_bmad-output/planning-artifacts/prd-sistema-gestion-transportes.es.md` | Draft |
| ADR-0001 Stack Tech | `reference/architecture/adrs/0001-stack-tecnologico-tms.es.md` | Draft |
| ADR-0002 Actores | `reference/architecture/adrs/0002-actores-dominio-tms.es.md` | Draft |
| CLAUDE.md Estándares | `~/.claude/CLAUDE.md` | Vigente |
| DESIGN.md (pendiente) | `apps/frontend/DESIGN.md` | Pendiente |

---

## 10. Historial de Cambios

| Versión | Fecha | Autor | Cambios |
|:--------|:------|:------|:--------|
| 0.1.0 | 2026-06-24 | Christian | Versión inicial — Verde/Rojo, hitos, dependencias |

---

<p align="center">
  <strong>© Unimar S.A.</strong> · Sistema de Gestión de Transportes (TMS)<br>
  Documento generado por: Plan Avance — MVP Fase 1 · Estándar: <a href="https://github.com/mhernandez-unimar/unimar_arch">Unimar Arch</a>
</p>
