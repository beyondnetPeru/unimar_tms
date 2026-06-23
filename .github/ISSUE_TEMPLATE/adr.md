name: Architectural Decision (ADR)
about: Nuevo o actualizado Architecture Decision Record
title: "adr: "
labels: ["adr", "architecture"]
body:
  - type: checkboxes
    id: checks
    options:
      - label: La decisión sigue el formato ADR local
      - label: Cabecera de herencia (Extends / Overrides) configurada si aplica
      - label: DECISIONS.md actualizado
  - type: input
    id: id
    attributes:
      label: ADR ID
      description: Identificador de 4 dígitos (ej. 0004)
    validations:
      required: true
  - type: input
    id: upstream
    attributes:
      label: Referencia upstream
      description: ADR de unimar_arch que extiende o sobrescribe
    validations:
      required: false
