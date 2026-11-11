---
slug: "petz-loyalty"
title: "Petz: Loyalty & SwiftUI Migration"
company: "Petz (via Sebratec)"
period: "2022 — 2025"
order: 3
featured: true
tagline: "I shipped Petz's first production SwiftUI loyalty flow, migrated eight screens, and helped restore service during a crash affecting 1.5M+ users."
role: "I architected the loyalty module, led an eight-screen UIKit-to-SwiftUI migration, and joined production crash response."
cover: "/content/images/projects/petz-loyalty/cover-en.webp"
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
  - "Petz still relied on UIKit across the app; the loyalty flow would be its first production SwiftUI feature with business logic."
  - "A bad Remote Config value could affect the live app and was not obvious from the crash alone."
  - "We had to move eight screens to SwiftUI without pausing feature delivery."
decisions:
  - "Built the loyalty module with MVVM and Clean Architecture, then shipped it as Petz's first production SwiftUI flow with real business logic."
  - "Migrated the eight screens in stages with a two-developer team; feature delivery went from three months to six weeks."
  - "In the crash war room, traced the incident to a misconfigured Remote Config value and restored service in about three hours."
impact:
  - { metric: "1,000+ sales", label: "Organic sales in the loyalty flow's first week" }
  - { metric: "~3 hours", label: "To restore service after the production crash" }
  - { metric: "8 screens", label: "Moved from UIKit to SwiftUI with a two-developer team" }
  - { metric: "3 months → 6 weeks", label: "Feature delivery time after the migration" }
---

## The work

The loyalty module was Petz's first production SwiftUI flow with real business logic. I designed it with MVVM and Clean Architecture; it generated more than 1,000 organic sales in its first week.

I also led a UIKit-to-SwiftUI migration across eight screens with one other developer. We kept feature work moving and cut delivery time from three months to six weeks.

When a production crash hit an app used by more than 1.5M people, I joined the war room, found a misconfigured Remote Config value, and helped restore service in about three hours. I then triaged the 12 most frequent crashes with Crashlytics and Instruments; crash-free sessions stayed around 99%.
