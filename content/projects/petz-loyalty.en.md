---
slug: "petz-loyalty"
title: "Petz: Loyalty & SwiftUI Migration"
company: "Petz (via Sebratec)"
period: "2022 — 2025"
order: 2
featured: true
tagline: "Worked on Petz's loyalty experience, SwiftUI adoption, and production stability improvements."
role: "Senior iOS Engineer contributing across architecture, SwiftUI migration, and crash investigation."
cover: ""
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