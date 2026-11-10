---
slug: "petz-loyalty"
title: "Petz: Fidelidade & Migração para SwiftUI"
company: "Petz (via Sebratec)"
period: "2022 — 2025"
order: 2
featured: true
tagline: "Atuei na experiência de fidelidade da Petz, na adoção de SwiftUI e em melhorias de estabilidade em produção."
role: "Engenheiro iOS Sênior contribuindo em arquitetura, migração para SwiftUI e investigação de crashes."
cover: "/content/images/projects/petz-loyalty/cover.png"
coverFit: "contain"
gallery:
  - { src: "/content/images/projects/petz-loyalty/04-cashpetz-history.jpg", caption: "Histórico do CashPetz — créditos, usos, estornos e saldo a expirar." }
  - { src: "/content/images/projects/petz-loyalty/05-offers.jpg",       caption: "Minhas ofertas — produtos recomendados com fluxo de ativação." }
  - { src: "/content/images/projects/petz-loyalty/06-coupons.jpg",      caption: "Cupons — descontos vinculados ao programa de fidelidade." }
  - { src: "/content/images/projects/petz-loyalty/08-orders-list.jpg",  caption: "Lista de pedidos — histórico com status e atalho para recomprar." }
  - { src: "/content/images/projects/petz-loyalty/09-order-completed.jpg", caption: "Pedido retirado — confirmação, endereço e prompt de feedback." }
  - { src: "/content/images/projects/petz-loyalty/10-order-cancelled.jpg", caption: "Pedido cancelado — status do reembolso e itens do pagamento." }
tags: ["iOS", "SwiftUI", "Architecture", "Performance"]
stack:
  - "Swift"
  - "SwiftUI"
  - "UIKit"
  - "MVVM"
  - "Clean Architecture"
  - "Crashlytics"
  - "Firebase"
  - "Remote Config"
challenges:
  - "O app ainda tinha muitos fluxos baseados em UIKit enquanto o time começava a introduzir SwiftUI em produção."
  - "Algumas features dependiam bastante de remote config, o que aumentava a complexidade de debugar problemas em produção."
  - "Parte do trabalho de migração precisava acontecer sem bloquear a entrega de features para o negócio."
decisions:
  - "Contribuí com um dos primeiros fluxos SwiftUI em produção no app, ajudando a estabelecer padrões que o time pôde reutilizar depois."
  - "Trabalhei na melhoria da arquitetura e da organização de módulos para tornar a migração entre UIKit e SwiftUI mais gerenciável."
  - "Participei de investigações de incidentes em produção envolvendo crashes e comportamento de remote config."
impact:
  - { metric: "Adoção de SwiftUI", label: "Ajudei a introduzir fluxos SwiftUI em produção" }
  - { metric: "Mais manutenibilidade", label: "Melhorias de migração e arquitetura" }
  - { metric: "Estabilidade em produção", label: "Apoio em investigações e correções de crashes" }
  - { metric: "Entrega mais rápida", label: "Migração junto com o desenvolvimento de features" }
---

## Visão geral

Na **Petz**, trabalhei em features ligadas à experiência de fidelidade, melhorias de arquitetura e a adoção gradual de **SwiftUI** dentro do app. Parte do trabalho envolveu modernizar fluxos existentes em UIKit mantendo a entrega de features fluindo para o time de negócio.

Também participei de investigações de problemas em produção, especialmente em torno de crashes e do comportamento do Remote Config, trabalhando junto com o time para identificar causas e estabilizar os fluxos afetados.

## Lições aprendidas

Uma coisa que esse projeto reforçou para mim é que introduzir novas tecnologias em um produto existente raramente é só um desafio técnico. A maior parte é criar padrões que o resto do time consiga entender, manter e se sentir confortável em adotar ao longo do tempo.
