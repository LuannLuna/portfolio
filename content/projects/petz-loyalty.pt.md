---
slug: "petz-loyalty"
title: "Petz: Fidelidade & Migração para SwiftUI"
company: "Petz (via Sebratec)"
period: "2022 — 2025"
order: 2
featured: true
tagline: "Entreguei o primeiro fluxo SwiftUI da Petz em produção, migrei oito telas e ajudei a restabelecer o serviço durante um crash que afetou mais de 1,5M de usuários."
role: "Arquitetei o módulo de fidelidade, liderei a migração de oito telas de UIKit para SwiftUI e participei da resposta a incidentes."
cover: "/content/images/projects/petz-loyalty/cover-pt.webp"
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
  - "A Petz ainda usava UIKit em boa parte do app; o fluxo de fidelidade seria a primeira feature SwiftUI em produção com lógica de negócio."
  - "Um valor incorreto no Remote Config podia afetar o app no ar e não era óbvio olhando só para o crash."
  - "Precisávamos migrar oito telas sem parar a entrega de novas features."
decisions:
  - "Desenhei o módulo de fidelidade com MVVM e Clean Architecture. Ele virou o primeiro fluxo SwiftUI em produção da Petz com lógica de negócio real."
  - "Migramos as oito telas em etapas, em uma dupla de desenvolvimento; o prazo de entrega caiu de três meses para seis semanas."
  - "No war room do crash, encontrei um valor incorreto no Remote Config e ajudei a restabelecer o serviço em cerca de três horas."
impact:
  - { metric: "1.000+ vendas", label: "Vendas orgânicas na primeira semana do fluxo de fidelidade" }
  - { metric: "~3 horas", label: "Para restabelecer o serviço após o crash em produção" }
  - { metric: "8 telas", label: "Migradas de UIKit para SwiftUI por uma dupla de devs" }
  - { metric: "3 meses → 6 semanas", label: "Prazo de entrega de features após a migração" }
---

## O trabalho

O módulo de fidelidade foi o primeiro fluxo SwiftUI da Petz em produção com lógica de negócio real. Desenhei a arquitetura com MVVM e Clean Architecture; na primeira semana, o fluxo gerou mais de 1.000 vendas orgânicas.

Também liderei, com mais uma pessoa, a migração de oito telas de UIKit para SwiftUI. Mantivemos a entrega de features e reduzimos o prazo de três meses para seis semanas.

Quando um crash atingiu um app usado por mais de 1,5M de pessoas, entrei no war room, encontrei um valor incorreto no Remote Config e ajudei a restabelecer o serviço em cerca de três horas. Depois tratei os 12 crashes mais frequentes com Crashlytics e Instruments; as sessões sem crash ficaram em torno de 99%.
