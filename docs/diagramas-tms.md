# Diagramas del Sistema TMS

> Traducción del archivo `tms-figma.drawio` (8 páginas) a diagramas Mermaid renderizables en GitHub.

---

## Página 1 — Vista Conceptual General

```mermaid
flowchart LR
    subgraph SAP[SAP GTS - Back Office]
        OS[Orden de Servicio]
        MD[Master Data<br/>Transportistas, Choferes, Placas,<br/>Guías, Manifiestos, BL, Contenedores]
    end

    subgraph TMS[TMS - Nuevo Sistema]
        WA[Web App TMS<br/>Planificación y Gestión]
        MA[Mobile App TMS<br/>Checkpoints y Consulta]
    end

    subgraph EX[Systems]
        TT[Track & Trace App<br/>Consulta por Placa]
        TX[Transmisiones<br/>Emisión de Guías]
        SU[SUNAT]
        DP[DPWORLD]
        AP[APM]
    end

    SAP -->|Lista: Entrega de Salidas| TX
    TX -->|GRE| SU
    TX -->|Query: Entregas de Salida| SAP
    SAP -->|Master Data| TMS
    MA -->|Tracking| TT
    WA -->|Tracking| TT
    WA -->|Reportes Solicitudes| TT
    WA -->|Confirma Arribo/Zarpe / Citas| DP
    WA -->|Citas| AP
    MA -->|GRE PDF| NP[Notificaciones]

    TT -->|Query by Placa| WA
```

**Actores:**
- Gestor de Transportes — consulta T&T, coordina citas DPWORLD/APM
- Operador de Transmisiones — emite GRE hasta obtener OCR
- Transportista — consulta solicitudes, confirma contenedor, genera guía, inicia/fin ruta
- Gestor Comercial — consulta tracking

---

## Página 2 — Vista Conceptual de Proceso

```mermaid
flowchart LR
    subgraph IN[Entrada]
        SAP[SAP] -->|Relación Detallada<br/>por Nave + BL| RD[Relación Detallada]
    end

    subgraph PLAN[Planificación]
        RD --> ST[Solicitud de Transportes]
        ST --> VJ[Viaje]
    end

    subgraph ASIG[Asignación]
        TP[Transportistas] --> VJ
        CH[Choferes] --> VJ
        UV[Unidades Vehiculares] --> VJ
        CA[Citas / Autorización] --> VJ
    end

    subgraph EJEC[Ejecución]
        VJ --> GR[Guía de Remisión]
        VJ --> CM[Carga / Mercadería]
        VJ --> CP[CheckPoints]
    end

    subgraph SAL[Salida]
        GR --> EM[Servicio Transaccional<br/>Emisión GRE]
        EM --> TR[Transmisión a SUNAT]
        TR --> SN[Sistema de Transmisiones]
        SN -->|Notifica Aprobación| EM
    end

    subgraph MON[Monitoreo]
        ST --> MO[Monitor de Operaciones]
        VJ --> MO
    end
```

**Reglas de negocio:**
- Un manifiesto puede tener más de una relación detallada
- Fase 1 contempla relación detallada de **descarga de contenedores**
- Una relación detallada puede pertenecer a diferentes orígenes: depósito, almacenes, etc.
- Una OS puede tener múltiples pedidos de transporte en diferentes momentos

**Atributos de Relación Detallada:**
ID+NRO, Nave, IP, Manifiesto, Puerto ETB, Puerto SUNAT, Fecha Almacenaje, Fecha RD, Tipo IMO, Avance de Contenedores, Estado de Servicio

**Atributos de Viaje:**
Número Viaje, Origen/Destino, Relación Detallada, Transportista, Chofer, Unidad Vehicular (Placa)

---

## Página 3 — C4 Context View

```mermaid
C4Context
    title C4 Context - Sistema TMS

    Person(at, "Analista de Transportes", "Planifica y asigna viajes")
    Person(tc, "Transportista", "Ejecuta viajes y registra checkpoints")

    System(tms, "TMS", "Sistema de Gestión de Transportes")

    System_Ext(sap, "SAP GTS", "Back Office - Órdenes de Servicio")
    System_Ext(sunat, "SUNAT Middleware", "Interfaces - GRE")
    System_Ext(tnt, "Track and Trace", "Sistema de Tracking existente")
    System_Ext(ns, "Notification Service", "Notificaciones")
    System_Ext(dpw, "DP World Web Portal", "Terminal Portuaria")

    Rel(at, tms, "Gestiona viajes y transportistas")
    Rel(tc, tms, "Ejecuta viajes y consulta solicitudes")
    Rel(tms, sap, "Registra guías, actualiza placas", "BAPI")
    Rel(tms, tnt, "Consulta tracking", "API")
    Rel(tms, sunat, "Transmite GRE", "WS")
    Rel(tms, ns, "Notifica eventos", "API")
    Rel(tms, dpw, "Coordina citas", "Portal")
```

---

## Páginas 4–8 — Prototipos de Pantallas

Los prototipos de interfaz cubren las siguientes pantallas del flujo de planificación:

| Pantalla | Descripción |
| :------- | :---------- |
| **Dashboard de Planificación** | Resumen de viajes por estado, accesos rápidos |
| **Listado de Relaciones Detalladas** | Tabla con filtros por nave, puerto, fecha |
| **Creación de Solicitud de Transporte** | Wizard: seleccionar contenedores, definir origen/destino, fecha |
| **Asignación de Viaje** | Selectores encadenados: Transportista → Chofer → Unidad |
| **Detalle de Viaje** | Cabecera, datos generales, transportista, contenedores, historial |

> **Nota:** Los prototipos visuales detallados se encuentran en el archivo `tms-figma.drawio`. Para visualizarlos, abrir el archivo en [app.diagrams.net](https://app.diagrams.net).

---

## Flujo de Planificación (MVP)

```mermaid
flowchart TD
    RD[Relación Detallada] -->|Gestor selecciona contenedores| ST[Solicitud de Transporte]
    ST -->|Gestor asigna| VJ[Viaje]
    VJ -->|Seleccionar| TP[Transportista]
    TP -->|Seleccionar| CH[Chofer]
    CH -->|Seleccionar| UV[Unidad Vehicular / Placa]
    UV -->|Confirmar| OK[Viaje Confirmado]

    style OK fill:#27ae60,color:#fff
```

---

> **Archivo fuente:** `docs/tms-figma.drawio` — 8 páginas editables en draw.io
> **Última actualización:** 2026-06-23
