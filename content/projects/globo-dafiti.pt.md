---
slug: "globo-dafiti"
title: "Globo G1 / GE & Grupo Dafiti"
company: "Globo & Grupo Dafiti (via Dextra)"
period: "2019 — 2021"
order: 4
featured: true
tagline: "A descoberta por localização dobrou o tempo médio de sessão: de 4,2 para 8,7 minutos. Também ampliei a cobertura de testes e corrigi falhas exigidas para conformidade de cartão nos apps da Dafiti."
role: "Implementei descoberta de notícias por localização no G1/GE, ampliei a cobertura de testes e corrigi falhas de segurança em Objective-C nos apps da Dafiti."
cover: "/content/images/projects/globo-dafiti/cover.webp"
coverFit: "contain"
tags: ["iOS", "Security", "Performance"]
gallery:
  - { src: "/content/images/projects/globo-dafiti/01-g1-home.webp",         caption: "Home do G1 — manchetes editoriais e navegação local." }
  - { src: "/content/images/projects/globo-dafiti/02-g1-region.webp",       caption: "Edição regional — feed do Maranhão com destaques locais." }
  - { src: "/content/images/projects/globo-dafiti/03-g1-menu.webp",         caption: "Navegação do G1 — editorias, eleições, serviços e entrada na conta." }
  - { src: "/content/images/projects/globo-dafiti/04-ge-splash.webp",       caption: "Abertura do GE — identidade do app de esportes e estado de carregamento." }
  - { src: "/content/images/projects/globo-dafiti/05-ge-team-picker.webp",  caption: "Seleção de time — Série A/B, Europa e outros clubes." }
  - { src: "/content/images/projects/globo-dafiti/06-ge-championships.webp", caption: "Preferências de campeonatos — Libertadores, Brasileirão, Copa do Brasil e mais." }
  - { src: "/content/images/projects/globo-dafiti/07-ge-notifications.webp", caption: "Ativar notificações — lembretes de jogos e atualizações da agenda." }
  - { src: "/content/images/projects/globo-dafiti/08-ge-home.webp",         caption: "Home do GE — feed personalizado do time, notícias em alta e atalhos de jogos." }
  - { src: "/content/images/projects/globo-dafiti/09-ge-tables.webp",       caption: "Tabelas — competições favoritas, classificações e próximos jogos." }
stack:
  - "Swift"
  - "Objective-C"
  - "CoreLocation"
  - "MapKit"
  - "GraphQL"
  - "XCTest"
  - "Quick/Nimble"
challenges:
  - "G1 e GE precisavam mostrar notícias e conteúdo esportivo da região do leitor."
  - "Módulos compartilhados tinham 18% de cobertura de testes, deixando regressões chegarem à produção."
  - "Dafiti, Kanui e Tricae compartilhavam código Objective-C com falhas de sessão e criptografia que impediam a conformidade de cartão."
decisions:
  - "Usei CoreLocation, MapKit e GraphQL para implementar descoberta de notícias por localização no G1/GE."
  - "Elevei a cobertura de testes de 18% para 67% com XCTest e Quick/Nimble."
  - "Corrigi problemas de controle de sessão e criptografia no código Objective-C compartilhado pelos apps do Grupo Dafiti."
impact:
  - { metric: "4,2 → 8,7 min", label: "Tempo médio de sessão após a descoberta por localização" }
  - { metric: "18% → 67%", label: "Cobertura de testes nos módulos compartilhados" }
  - { metric: "25+ bugs", label: "Bugs de produção evitados em 18 meses" }
---

## O trabalho

Na Globo, implementei descoberta de notícias baseada na localização do leitor com CoreLocation, MapKit e GraphQL. O tempo médio de sessão passou de 4,2 para 8,7 minutos. Também levei a cobertura de testes dos módulos compartilhados de 18% para 67% com XCTest e Quick/Nimble; os testes ajudaram a evitar mais de 25 bugs em produção em 18 meses.

Na Dafiti, Kanui e Tricae, corrigi problemas de controle de sessão e criptografia em código Objective-C compartilhado. As correções eram necessárias para a conformidade de cartão de crédito.
