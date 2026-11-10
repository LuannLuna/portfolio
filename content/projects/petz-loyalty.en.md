---
slug: "petz-loyalty"
title: "Petz: Loyalty & SwiftUI Migration"
company: "Petz (via Sebratec)"
period: "2022 — 2025"
order: 2
featured: true
tagline: "Worked on Petz's loyalty experience, SwiftUI adoption, and production stability improvements."
role: "Senior iOS Engineer contributing across architecture, SwiftUI migration, and crash investigation."
cover: "/content/images/projects/petz-loyalty/cover.png"
coverFit: "contain"
gallery:
  - { src: "/content/images/projects/petz-loyalty/04-cashpetz-history.jpg", caption: "CashPetz history — earned, used, refunded, and expiring balance." }
  - { src: "/content/images/projects/petz-loyalty/05-offers.jpg",       caption: "Personalised offers — recommended products with activation flow." }
  - { src: "/content/images/projects/petz-loyalty/06-coupons.jpg",      caption: "Coupons — single-use discounts tied to the loyalty program." }
  - { src: "/content/images/projects/petz-loyalty/08-orders-list.jpg",  caption: "Orders list — status-coded history with reorder shortcut." }
  - { src: "/content/images/projects/petz-loyalty/09-order-completed.jpg", caption: "Completed pickup order — confirmation, address, and feedback prompt." }
  - { src: "/content/images/projects/petz-loyalty/10-order-cancelled.jpg", caption: "Cancelled order — refund status and itemised payment details." }
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
  - "The app still had many UIKit-based flows while the team was starting to introduce SwiftUI into production."
  - "Some features depended heavily on remote configuration, which increased the complexity of debugging production issues."
  - "Part of the migration work needed to happen without blocking feature delivery for the business."
decisions:
  - "Contributed to one of the first production SwiftUI flows in the app, helping establish patterns the team could reuse later."
  - "Worked on improving architecture and module organization to make the migration between UIKit and SwiftUI more manageable."
  - "Participated in production incident investigations involving crashes and remote configuration behavior."
impact:
  - { metric: "SwiftUI adoption", label: "Helped introduce production SwiftUI flows" }
  - { metric: "Improved maintainability", label: "Migration and architecture improvements" }
  - { metric: "Production stability", label: "Support during crash investigations and fixes" }
  - { metric: "Faster delivery", label: "Migration work alongside feature development" }
---

## Overview

At **Petz**, I worked on features related to the loyalty experience, architecture improvements, and the gradual adoption of **SwiftUI** inside the app. Part of the work involved modernizing existing UIKit flows while keeping feature delivery moving for the business team.

I also participated in production issue investigations, especially around crashes and Remote Config behavior, working together with the team to identify causes and stabilize affected flows.

## Lessons learned

One thing this project reinforced for me is that introducing new technologies into an existing product is rarely just a technical challenge. The biggest part is creating patterns that the rest of the team can understand, maintain, and feel comfortable adopting over time.