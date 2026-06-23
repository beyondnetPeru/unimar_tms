name: Documentation
about: Documentación nueva o actualizada (arquitectura, gobernanza, dominio, etc.)
title: "docs: "
labels: ["documentation"]
body:
  - type: checkboxes
    id: checks
    options:
      - label: Leí AGENTS.md antes de abrir
      - label: La documentación está en español
      - label: Los enlaces relativos resuelven y las anclas existen
      - label: Los bloques Mermaid son válidos
  - type: textarea
    id: area
    attributes:
      label: Área afectada
      description: ¿Qué área del corpus? (architecture, governance, knowledge, dominio, etc.)
    validations:
      required: true
