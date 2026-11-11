---
slug: "next-banking"
title: "Next: Authentication & Chat Integrations"
company: "Next (via Capgemini)"
period: "2021 — 2022"
order: 4
featured: true
tagline: "I prototyped on-demand authentication in RxSwift and paired with the Chat team on Bia's SDK integration."
role: "I built the authentication prototype and documented the login lifecycle; I also supported the Bia SDK integration."
cover: "/content/images/projects/next-banking/cover-en.webp"
coverFit: "contain"
tags: ["iOS", "Architecture", "RxSwift", "Security"]
gallery:
  - { src: "/content/images/projects/next-banking/01-home.webp",        caption: "Home — account overview, quick actions, and service shortcuts." }
  - { src: "/content/images/projects/next-banking/02-chat-bia.webp",    caption: "BIA assistant — in-app chat with proactive account guidance." }
  - { src: "/content/images/projects/next-banking/03-login.webp",       caption: "Login — authentication entry with shortcuts, token, and PIX access." }
  - { src: "/content/images/projects/next-banking/04-onboarding.webp",  caption: "Onboarding — Next digital account acquisition flow." }
stack:
  - "Swift"
  - "RxSwift"
  - "UIKit"
  - "Clean Architecture"
  - "UML Modeling"
  - "SDK Integration"
challenges:
  - "The existing login flow requested permissions up front, before the user needed them."
  - "The proposal needed agreement between the client Principal Engineer and the app team before implementation."
  - "Bia's new assistant SDK had to hand conversations off to human support without breaking the chat flow."
decisions:
  - "Prototyped on-demand privilege escalation in RxSwift instead of loading every permission at login."
  - "Reviewed the proposal with the client's Principal Engineer and documented the login lifecycle with UML and sequence diagrams."
  - "Paired with the Chat squad on Bia's SDK integration through code reviews and bug triage."
impact:
  - { metric: "RxSwift", label: "Authentication prototype delivered as part of the proposal" }
  - { metric: "UML", label: "Login lifecycle and sequence diagrams for review" }
  - { metric: "Bia", label: "SDK integration support with the Chat squad" }
---

## The work

The login flow requested permissions before the user needed them. I prototyped a different approach in RxSwift: ask for a privilege when the user reaches the feature that needs it. I reviewed the proposal with the client's Principal Engineer and drew UML and sequence diagrams for the login lifecycle. The prototype and diagrams were delivered as a proposal, not shipped as a feature.

I also paired with the Chat squad on the SDK for Bia, Next's virtual assistant. I reviewed code and triaged bugs, including the handoff from the bot to a human support agent.
