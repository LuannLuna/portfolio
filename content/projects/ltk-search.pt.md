---
slug: "ltk-search"
title: "LTK: Busca"
company: "LikeToKnow.It"
period: "2025 — 2026"
order: 1
featured: true
tagline: "A busca caiu de 900ms para 200ms depois que unifiquei três endpoints legados."
role: "Fiquei responsável pela camada de dados da busca, entreguei três componentes SwiftUI e testes ponta a ponta com Maestro."
cover: "/content/images/projects/ltk-search/cover.png"
coverFit: "contain"
gallery:
  - { src: "/content/images/projects/ltk-search/01-home-feed.webp",        caption: "Home — hub editorial de “Pesquisar” com edits sazonais, categorias e posts populares." }
  - { src: "/content/images/projects/ltk-search/02-search-empty.webp",     caption: "Estado vazio da busca — prompt inicial com filtros rápidos." }
  - { src: "/content/images/projects/ltk-search/03-search-suggestions.webp", caption: "Sugestões de busca — recentes, populares e criadores vistos recentemente." }
  - { src: "/content/images/projects/ltk-search/08-search-typing.webp",    caption: "Digitando — pesquisas populares enquanto a query é inserida." }
  - { src: "/content/images/projects/ltk-search/07-search-matches.webp",   caption: "Correspondências — criadores, marcas e buscas relacionadas." }
  - { src: "/content/images/projects/ltk-search/04-search-results.webp",   caption: "Resultados — visão geral da LTK AI, abas Posts / Creators e carrosséis de produtos." }
  - { src: "/content/images/projects/ltk-search/05-creator-profile.webp",  caption: "Perfil de criador — seguidores, posts, produtos e guias de presentes." }
  - { src: "/content/images/projects/ltk-search/06-brand-profile.webp",    caption: "Perfil de marca — produtos em alta e itens recentes." }
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
  - "Três endpoints legados de busca retornavam estruturas diferentes e tinham comportamentos próprios."
  - "O app adotava strict concurrency do Swift 6 enquanto a busca ainda dependia de fluxos assíncronos antigos."
  - "A jornada passava por login, abas, resultados e loja do criador; testes unitários não cobriam todas as regressões entre telas."
decisions:
  - "Coloquei os três endpoints atrás de uma camada única com async/await na base com strict concurrency do Swift 6."
  - "Entreguei três componentes SwiftUI no design system da LTK para que outros times pudessem reutilizá-los."
  - "Montei uma jornada no Maestro do login até a loja do criador e mantive a cobertura de telas com XCTest."
impact:
  - { metric: "900 → 200ms", label: "Tempo de resposta da busca após unificar três endpoints" }
  - { metric: "3 componentes", label: "Componentes SwiftUI entregues ao design system da LTK" }
  - { metric: "Ponta a ponta", label: "Cobertura Maestro do login até a loja do criador" }
seo:
  title: "Busca da LTK — de 900ms para 200ms"
  description: "Três endpoints de busca unificados com async/await. O tempo de resposta caiu de 900ms para 200ms."
---

## O trabalho

A busca chamava três endpoints legados. Cada um tinha estrutura de resposta e tempo próprios, e a UI precisava lidar com essas diferenças. Coloquei os três atrás de uma camada única com async/await na base com strict concurrency do Swift 6. O tempo de resposta caiu de 900ms para 200ms.

Também entreguei três componentes SwiftUI no design system da LTK. Para cobrir a jornada inteira, montei um fluxo no Maestro do login à busca e à loja do criador; o XCTest continuou cobrindo as telas individuais.
