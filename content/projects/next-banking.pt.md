---
slug: "next-banking"
title: "Next: Autenticação & Integrações de Chat"
company: "Next (via Capgemini)"
period: "2021 — 2022"
order: 4
featured: true
tagline: "Prototipei autenticação sob demanda em RxSwift e fiz pair com o time de Chat na integração do SDK da Bia."
role: "Criei o protótipo de autenticação e documentei o ciclo de vida do login; também apoiei a integração do SDK da Bia."
cover: "/content/images/projects/next-banking/cover.webp"
coverFit: "contain"
tags: ["iOS", "Architecture", "RxSwift", "Security"]
gallery:
  - { src: "/content/images/projects/next-banking/01-home.webp",        caption: "Home — visão da conta, ações rápidas e atalhos de serviços." }
  - { src: "/content/images/projects/next-banking/02-chat-bia.webp",    caption: "Assistente BIA — chat no app com orientação proativa sobre a conta." }
  - { src: "/content/images/projects/next-banking/03-login.webp",       caption: "Login — entrada de autenticação com atalhos, token e PIX." }
  - { src: "/content/images/projects/next-banking/04-onboarding.webp",  caption: "Onboarding — fluxo de abertura de conta digital Next." }
stack:
  - "Swift"
  - "RxSwift"
  - "UIKit"
  - "Clean Architecture"
  - "UML Modeling"
  - "SDK Integration"
challenges:
  - "O login existente pedia permissões antes de o usuário precisar delas."
  - "A proposta precisava de alinhamento entre o Principal Engineer do cliente e o time do app antes da implementação."
  - "O novo SDK da assistente Bia precisava transferir a conversa para o atendimento humano sem quebrar o fluxo do chat."
decisions:
  - "Prototipei em RxSwift a escalada de privilégio sob demanda, em vez de carregar todas as permissões no login."
  - "Revisei a proposta com o Principal Engineer do cliente e documentei o ciclo de vida do login com diagramas UML e de sequência."
  - "Fiz pair com o squad de Chat na integração do SDK da Bia, participando de code reviews e triagem de bugs."
impact:
  - { metric: "RxSwift", label: "Protótipo de autenticação entregue como parte da proposta" }
  - { metric: "UML", label: "Diagramas do ciclo de vida do login para revisão" }
  - { metric: "Bia", label: "Apoio à integração do SDK junto com o squad de Chat" }
---

## O trabalho

O login pedia permissões antes de o usuário precisar delas. Prototipei outra abordagem em RxSwift: pedir o privilégio quando a pessoa chega ao recurso que precisa dele. Revisei a proposta com o Principal Engineer do cliente e desenhei diagramas UML e de sequência para o ciclo de vida do login. O protótipo e os diagramas foram entregues como proposta; não chegaram ao app.

Em paralelo, fiz pair com o squad de Chat na integração do SDK da Bia, a assistente virtual da Next. Participei de code reviews e triagem de bugs, inclusive no fluxo de transferência do bot para uma pessoa do atendimento.
