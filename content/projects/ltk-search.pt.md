---
slug: "ltk-search"
title: "LTK: Busca"
company: "LikeToKnow.It"
period: "2025 — 2026"
order: 1
featured: true
tagline: "Atuei na melhoria da experiência de busca, na modernização de fluxos assíncronos e no apoio à migração para Swift Concurrency."
role: "Engenheiro iOS Sênior contribuindo com a experiência de busca, em melhorias na camada de dados e na UI."
gallery:
  - { src: "/content/images/projects/ltk-search/02-search-empty.png",       caption: "Estado vazio da busca — prompt inicial com filtros rápidos." }
  - { src: "/content/images/projects/ltk-search/03-search-suggestions.png", caption: "Sugestões de busca — recentes, populares e criadores vistos recentemente." }
tags: ["iOS", "SwiftUI", "Concurrency", "Performance"]
stack:
  - "Swift"
  - "SwiftUI"
  - "Async/Await"
  - "Swift Concurrency"
  - "Design System"
  - "Maestro"
  - "XCTest"
challenges:
  - "O fluxo de busca dependia de vários endpoints legados com estruturas de resposta e comportamentos diferentes."
  - "Parte do projeto envolveu adaptar fluxos para os padrões mais recentes de Swift Concurrency."
  - "A experiência de busca passava por várias telas, o que aumentava o risco de regressões durante as mudanças."
decisions:
  - "Contribuí com melhorias na camada de dados assíncrona para simplificar como a UI consumia os dados de busca."
  - "Trabalhei com componentes de UI compartilhados e padrões de design system para manter a experiência mais consistente."
  - "Ajudei a melhorar a cobertura de testes automatizados em fluxos importantes envolvendo busca e navegação."
impact:
  - { metric: "Mais performance", label: "Otimizações na experiência de busca e em fluxos assíncronos" }
  - { metric: "Componentes compartilhados", label: "Contribuições para padrões de UI reutilizáveis" }
  - { metric: "Mais cobertura", label: "Ampliação dos testes de UI e de fluxos" }
seo:
  title: "Estudo de caso: busca da LTK"
  description: "Contribuições para melhorar a experiência de busca da LTK com SwiftUI e padrões modernos de concorrência."
---

## Visão geral

Na LTK, fiz parte do time responsável pela experiência de busca dentro do app. O projeto envolveu melhorar fluxos de busca existentes, modernizar partes da camada de dados assíncrona e apoiar atualizações de UI construídas com SwiftUI.

Também contribuí com melhorias de testes e componentes de UI reutilizáveis que ajudaram a manter a experiência mais consistente no app.

## Lições aprendidas

Uma coisa que aprendi nesse projeto é o quanto recursos modernos de concorrência podem melhorar a legibilidade e a manutenibilidade do código quando introduzidos com cuidado em projetos existentes. Também reforcei a importância da colaboração ao trabalhar em fluxos compartilhados entre vários times e features.
