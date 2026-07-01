# PHASE_TRACKING.md — Gobernanza de Ciclo de Vida MVP

Este documento registra el **cierre formal de cada fase SDLC**. Es el audit trail de gobernanza del proyecto.

> **Numeración alineada al canon `unimar_arch`** (Mapeo SDLC–Artefactos): las fases van de **1 a 5**, no de 0 a 4.
> Modelo: **Fase 1 Concepción → Fase 2 Diseño → Fase 3 Construcción → Fase 4 Validación/QA → Fase 5 Entrega.**

---

## Fase 1 — Concepción y Descubrimiento (2026-06-23 a 2026-06-25)

**Objetivo:** Generar y aprobar PRD + Historias de Usuario + Backlog Ágil. Establecer requisitos base.
**Gate de salida (canon):** Aprobación de Negocio — Alcance Congelado.

### Artefactos Esperados (canon Fase 1)
- [x] PRD-TMS-001 generado
- [ ] PRD aprobado por John (PM)
- [ ] PRD aprobado por Architecture Board
- [x] **Historias de Usuario** generadas (18 US, `plantilla-historia-usuario`) — `stories/us-tms-01..18` — artefacto `Req` de Fase 1
- [x] **Backlog Ágil** generado (`plantilla-backlog-agil`) — `backlog-agil-tms-mvp-fase1.es.md` — artefacto `Req` de Fase 1
- [x] ADR-0001 (Stack Tech) generado
- [x] ADR-0002 (Actores) generado
- [x] ADR-0003 (GitFlow) generado
- [x] Plan de avance generado (`plan-avance-mvp-fase1.es.md`)

> **Nota de alcance:** Las **Historias Funcionales** (gherkin, 11 secciones) y las **Épicas** son artefacto de **Fase 2 (Diseño y Arquitectura)** según el canon, NO de Fase 1. No se generan en esta fase.

### Criterios de Aceptación del PRD (§10)
- [ ] CA-01 — Resumen ejecutivo validado negocio
- [ ] CA-02 — Métricas de éxito con valores reales
- [ ] CA-03 — Alcance firmado Producto + Arquitectura
- [ ] CA-04 — Reglas de negocio sin contradicciones
- [ ] CA-05 — Restricciones y supuestos validados
- [ ] CA-06 — Actores validados con stakeholders
- [ ] CA-07 — Diagramas consistentes
- [ ] CA-08 — Funcionalidades con CA individuales
- [ ] CA-09 — Reglas de negocio priorizadas (Must/Should/Could)
- [ ] CA-10 — Glosario completo
- [ ] CA-11 — Prototipos Figma aprobados UX
- [ ] CA-12 — ADR-0001 aprobado
- [ ] CA-13 — Contratos SAP definidos
- [ ] CA-14 — Contratos DPWORLD/APM definidos
- [ ] CA-15 — Plan de datos maestros aprobado
- [ ] CA-16 — Cronograma del MVP definido
- [ ] CA-17 — Recursos asignados
- [ ] CA-18 — Plan de testing definido
- [ ] CA-19 — Plan de despliegue definido

### Datos Operativos (PRD §2.1, §3.1)
- [ ] Contenedores/mes: {X} → `[VALOR PENDIENTE]`
- [ ] Viajes/mes: {Y} → `[VALOR PENDIENTE]`
- [ ] Transportistas activos: {Z} → `[VALOR PENDIENTE]`
- [ ] Tiempo asignación actual: {X} horas → `[VALOR PENDIENTE]`
- [ ] Tasa errores actual: {X}% → `[VALOR PENDIENTE]`

### Cierre de Fase 1
- **Fecha estimada:** 2026-06-25 (Reunión con John + Architecture Board)
- **Responsable de aprobación:** John (PM) + Arquitecto
- **Evidencia requerida:** Email/Slack/signed approval PRD + CA completadas
- **Status actual:** ⏳ Pendiente reunión de cierre
- **Bloqueador:** Datos operativos {X}/{Y}/{Z} sin llenar

**Checklist Pre-Fase 2:**
- [ ] Todos los CA-* arriba tienen ☑
- [ ] Valores {X}/{Y}/{Z} están llenos
- [ ] PRD no tiene placeholders
- [ ] Historias de Usuario + Backlog Ágil aprobados
- [ ] Contrato SAP está firmado (inicio/responsable)
- [ ] Contrato DPWORLD está firmado (inicio/responsable)

---

## Fase 2 — Diseño & Arquitectura (2026-06-26 a 2026-07-07)

**Objetivo:** Definir Épicas, Historias Funcionales, modelo de datos, contratos, diagramas, DESIGN.md. Preparar ejecutables.
**Gate de salida (canon):** Baseline de Diseño Aprobado.

### Artefactos Esperados (canon Fase 2)
- [ ] **Épicas** generadas (`plantilla-epica`) — agrupan las Historias Funcionales
- [ ] **Historias Funcionales** generadas (`plantilla-historia-funcional`, gherkin 11 secciones)
- [ ] Mapa de Contextos Acotados (bounded contexts)
- [ ] Schema PostgreSQL (10 entidades, migraciones TypeORM)
- [ ] DESIGN.md con sistema de diseño (colores, tipografía, componentes)
- [ ] DESIGN.json sidecar (paleta OKLCH, sombras, motion)
- [ ] Prototipos Figma validados (6 pantallas MVP)
- [ ] Contratos SAP BAPI (entrada/salida, campos, frecuencia)
- [ ] Contratos DPWORLD/APM (proceso manual, campos, validaciones)
- [ ] Docker Compose (postgres + backend + frontend locales)
- [ ] Diagramas arquitectura C4 (contexto, contenedor, componentes)
- [ ] Documentación de integración (SAP, DPWORLD, XMS)

### Estructura Backend
- [ ] Repo `apps/backend` creado (NestJS scaffold)
- [ ] Carpeta `domain/` con módulos por entidad
- [ ] Carpeta `infrastructure/` con SAP client + DPWORLD client
- [ ] Carpeta `database/migrations/` con 10 migraciones
- [ ] `TransformInterceptor` global (wrapper respuesta)
- [ ] `HttpExceptionFilter` global (manejo errores)
- [ ] `environment.ts` + `.env.example`

### Estructura Frontend
- [ ] Repo `apps/frontend` creado (React 18 + TypeScript scaffold)
- [ ] Estructura de carpetas: `components/`, `pages/`, `hooks/`, `services/`
- [ ] Tailwind CSS configurado
- [ ] Librería de componentes UI definida (a decidir en Fase 2)

### Validación Técnica (Architecture Board)
- [ ] Schema sigue estándar CLAUDE.md (IDENTITY PK, columnas audit, timezone)
- [ ] Todas las relaciones FK están documentadas
- [ ] Índices diseñados para queries críticas
- [ ] Migraciones reversibles (rollback viable)

### Cierre de Fase 2
- **Fecha estimada:** 2026-07-07
- **Responsable de aprobación:** Arquitecto
- **Evidencia requerida:**
  - Épicas + Historias Funcionales aprobadas (formato canon)
  - PR con schema + migraciones mergeado a main
  - DESIGN.md + DESIGN.json en repo
  - Figma link activo y accesible
  - Docker Compose levanta stack sin errores
- **Status actual:** ⏳ Bloqueado por Fase 1 (no aprobado PRD)

**Checklist Pre-Fase 3:**
- [ ] `docker-compose up -d` levanta todo sin errores
- [ ] PostgreSQL inicializa schema completo
- [ ] Backend responde en localhost:3000/api/health
- [ ] Frontend carga en localhost:4200
- [ ] Figma compartido y aprobado UX
- [ ] Contratos SAP tienen responsables asignados

---

## Fase 3 — Construcción (2026-07-08 a 2026-07-28)

**Objetivo:** Codificar F-01 a F-07 en backend + frontend. Historias Técnicas + tests unitarios en verde.
**Gate de salida (canon):** Build Exitoso — Merge de PR Autorizado.

### Funcionalidades por Completar
- [ ] F-01 Relaciones Detalladas (listado, filtro por nave/BL/puerto)
- [ ] F-02 Creación Solicitud (seleccionar contenedores de relación)
- [ ] F-03 Asignación Viaje (crear viaje + transportista)
- [ ] F-04 Selección Transportista (dropdown dinámico, maestro)
- [ ] F-05 Selección Chofer (dropdown, validación FK a transportista)
- [ ] F-06 Selección Unidad (dropdown, validación operativa)
- [ ] F-07 Confirmación Viaje (cambio estado, notificación simulada)

### Backend (NestJS)
- [ ] Módulo `relacion-detallada` (entity, service, controller, DTOs)
- [ ] Módulo `solicitud-transporte` (entity, service, controller, DTOs)
- [ ] Módulo `viaje` (entity, service, controller, DTOs)
- [ ] Módulo `transportista` (entity, service, controller, DTOs)
- [ ] Módulo `chofer` (entity, service, controller, DTOs)
- [ ] Módulo `unidad-vehicular` (entity, service, controller, DTOs)
- [ ] Endpoints GET/POST/PATCH según funcionalidades
- [ ] Tests unitarios (service layer) — target 80% coverage

### Frontend (React)
- [ ] Feature `relaciones` con lista y detalle
- [ ] Feature `solicitudes` con creación y lista
- [ ] Feature `viajes` con asignación y lista
- [ ] Feature `dashboard` con resumen estados
- [ ] Componentes reutilizables (dropdowns, datepickers, etc.)
- [ ] Integración HTTP con backend
- [ ] Tests unitarios (component + service) — target 80% coverage

### Integración
- [ ] SAP batch mock (simular descarga de relaciones diarias)
- [ ] DPWORLD portal fallback (manual por ahora)
- [ ] RabbitMQ puerto abierto (para fase posterior)

### Cierre de Fase 3
- **Fecha estimada:** 2026-07-28
- **Responsable de aprobación:** Tech Lead Backend + Frontend
- **Evidencia requerida:**
  - F-01 a F-07 en main con commits descriptivos
  - Tests en verde (`npm run test` → 0 failures)
  - Coverage report > 80%
  - CI/CD pipeline en verde (GitHub Actions)
  - Feature flags para rollback si aplica
- **Status actual:** ⏳ Bloqueado por Fase 2

**Checklist Pre-Fase 4:**
- [ ] `npm run test:unit` en backend → 0 failures
- [ ] `npm run test:unit` en frontend → 0 failures
- [ ] Coverage report exportado en `/coverage/`
- [ ] SonarQube análisis corrido (si aplica)
- [ ] Aplicación levanta sin errores: `npm run start:dev`
- [ ] Swaggerdocs genera en `/api-docs`

---

## Fase 4 — Validación & QA (2026-07-29 a 2026-08-11)

**Objetivo:** Tests E2E, cobertura > 80%, bugs críticos a 0.
**Gate de salida (canon):** RC Sellado.

### Testing Strategy
- [ ] E2E tests (Playwright) para F-01 a F-07
- [ ] Tests de integración (DB real, no mocks)
- [ ] Tests de reglas de negocio (RN-01 a RN-40)
- [ ] Tests de performance (volumen {X} contenedores/mes)
- [ ] Tests de seguridad (SQL injection, XSS, auth)

### Reportes Esperados
- [ ] Coverage > 80% (backend + frontend)
- [ ] Cero blockers de seguridad
- [ ] SonarQube quality gate pasado
- [ ] Load testing con {X} viajes simulados
- [ ] Accessibility audit (WCAG 2.1 Level AA)

### Cierre de Fase 4
- **Fecha estimada:** 2026-08-11
- **Responsable de aprobación:** QA Lead
- **Evidencia requerida:**
  - Test Summary Report con coverage > 80%
  - Cero bugs de severidad Crítica
  - Cero vulnerabilidades OWASP Top 10
  - Performance test results (respuesta < 2s)
- **Status actual:** ⏳ Bloqueado por Fase 3

**Checklist Pre-Fase 5:**
- [ ] `npm run test:e2e` corre sin errores
- [ ] `npm run test:coverage` genera reporte HTML
- [ ] SonarQube dashboard GREEN
- [ ] OWASP ZAP scan completado
- [ ] UAT checklist de stakeholders firmado

---

## Fase 5 — Entrega & Operaciones (2026-08-12 a 2026-08-25)

**Objetivo:** Desplegar MVP a producción, capacitar usuarios, cerrar proyecto.
**Gate de salida (canon):** Producción Activa — Monitoreo Nominal.

### Artefactos de Despliegue
- [ ] Notas de Lanzamiento v1.0.0 (`plantilla-notas-lanzamiento`)
- [ ] Guía de instalación (Docker + Kubernetes si aplica)
- [ ] Playbook de despliegue (infraestructura, variables, rollback)
- [ ] Documentación de usuario (manual, videos, screenshots)
- [ ] Plan de capacitación (Gestores, Transportistas)

### Producción
- [ ] Base de datos creada en prod
- [ ] Backend deployado y saludable
- [ ] Frontend servido (CDN o servidor estático)
- [ ] DNS apuntando a prod
- [ ] SSL/TLS certificado activo
- [ ] Monitoreo activado (logs, métricas, alertas)

### Go-Live
- [ ] Usuarios capacitados en 2 sesiones
- [ ] Datos maestros (transportistas, choferes, unidades) cargados desde SAP
- [ ] Primera relación detallada sincronizada exitosamente
- [ ] Primer viaje creado y confirmado en producción
- [ ] Incidentes en operación < 5

### Cierre de Fase 5
- **Fecha estimada:** 2026-08-25
- **Responsable de aprobación:** Product Manager + Operaciones
- **Evidencia requerida:**
  - Dashboards operativos en vivo
  - Usuarios activos en sistema > 90%
  - Tasa errores < 1%
  - MVP metrics vs. baseline (tiempo asignación, trazabilidad)
  - Notas de Lanzamiento publicadas
- **Status actual:** ⏳ Bloqueado por Fase 4

**Checklist Cierre MVP:**
- [ ] Reunión de Go-Live completada
- [ ] Acta de entrega firmada
- [ ] Handover a Operations Team
- [ ] Roadmap siguiente fase de producto iniciado
- [ ] Retrospective completada

---

## Acciones por Fase Actual

### HOY (2026-06-24) — Fase 1 (Concepción)
```
☑ John genera Historias de Usuario MVP (18 US, plantilla-historia-usuario canon) en stories/
☑ John arma el Backlog Ágil (plantilla-backlog-agil canon)
☐ Distribuir plan-avance-mvp-fase1.es.md a John + Arquitecto
☐ Preparar respuestas {X}/{Y}/{Z} de operaciones
☐ Confirmar acceso Figma con UX Designer
```

### REUNIÓN (2026-06-25) — Cierre Fase 1 (Concepción)
```
☐ Cerrar CA-01 a CA-19 (completar ☑)
☐ Validar datos operativos reales {X}/{Y}/{Z}
☐ Aprobar Historias de Usuario + Backlog Ágil
☐ Firmar aprobación PRD
☐ Autorizar inicio Fase 2 (Diseño y Arquitectura)
```

### SEMANA 1 (2026-06-26 a 2026-06-30) — Fase 2 Inicio (Diseño)
```
☐ Generar Épicas + Historias Funcionales (formato canon)
☐ Crear repos backend + frontend con scaffold
☐ Implementar schema PostgreSQL
☐ Generar DESIGN.md con tokens
☐ Validar docker-compose.yml
```

---

## Gobernanza

**Guardian:** Skill `/unimar-tms`
**Validador:** Architecture Board + PM
**Frecuencia de revisión:** Semanal (viernes)
**Numeración de fases:** Alineada al canon `unimar_arch` (Mapeo SDLC–Artefactos), fases 1–5.
**Auditoría de cumplimiento:** Ver [AUDITORIA-FASE-1.md](./AUDITORIA-FASE-1.md) (documento vivo, gate 🔴 ABIERTO).

**Para avanzar a fase siguiente:**
```bash
/unimar-tms validate <fase-actual>
```

Si hay pending ☐, skill lista bloqueadores. No se continúa hasta cerrar.

---

<p align="center">
  <strong>© Unimar S.A.</strong> · Gobernanza SDLC MVP TMS<br>
  Generado: 2026-06-24 · Renumerado a canon 1–5: 2026-06-24
</p>
