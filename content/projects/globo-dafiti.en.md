---
slug: "globo-dafiti"
title: "Globo G1 / GE & Dafiti Group"
company: "Globo & Dafiti Group (via Dextra)"
period: "2019 — 2021"
order: 4
featured: true
tagline: "Location-based discovery doubled average session time from 4.2 to 8.7 minutes. I also raised test coverage and fixed card-compliance issues in Dafiti apps."
role: "I built location-based news discovery for G1/GE, raised test coverage, and fixed Objective-C security issues across Dafiti apps."
cover: "/content/images/projects/globo-dafiti/cover-en.webp"
coverFit: "contain"
tags: ["iOS", "Security", "Performance"]
gallery:
  - { src: "/content/images/projects/globo-dafiti/01-g1-home.webp",         caption: "G1 home — editorially curated headlines and local navigation." }
  - { src: "/content/images/projects/globo-dafiti/02-g1-region.webp",       caption: "Regional edition — Maranhão feed with local highlights." }
  - { src: "/content/images/projects/globo-dafiti/03-g1-menu.webp",         caption: "G1 navigation — editorials, elections, services, and account entry." }
  - { src: "/content/images/projects/globo-dafiti/04-ge-splash.webp",       caption: "GE launch — sports app identity and loading state." }
  - { src: "/content/images/projects/globo-dafiti/05-ge-team-picker.webp",  caption: "Team selection — Série A/B, Europe, and other clubs." }
  - { src: "/content/images/projects/globo-dafiti/06-ge-championships.webp", caption: "Competition preferences — Libertadores, Brasileirão, Copa do Brasil, and more." }
  - { src: "/content/images/projects/globo-dafiti/07-ge-notifications.webp", caption: "Notifications opt-in — match reminders and agenda updates." }
  - { src: "/content/images/projects/globo-dafiti/08-ge-home.webp",         caption: "GE home — personalized team feed, trending stories, and match shortcuts." }
  - { src: "/content/images/projects/globo-dafiti/09-ge-tables.webp",       caption: "Tables — favorite competitions, standings, and upcoming fixtures." }
stack:
  - "Swift"
  - "Objective-C"
  - "CoreLocation"
  - "MapKit"
  - "GraphQL"
  - "XCTest"
  - "Quick/Nimble"
challenges:
  - "G1 and GE needed local news and sports discovery based on the reader's location."
  - "Shared modules had 18% test coverage, leaving regressions to reach production."
  - "Dafiti, Kanui and Tricae shared Objective-C code with session and cryptography gaps that blocked card compliance."
decisions:
  - "Used CoreLocation, MapKit and GraphQL to build location-based news discovery for G1/GE."
  - "Raised test coverage from 18% to 67% with XCTest and Quick/Nimble."
  - "Fixed session-control and cryptographic issues in shared Objective-C code across Dafiti Group apps."
impact:
  - { metric: "4.2 → 8.7 min", label: "Average session time after location-based discovery" }
  - { metric: "18% → 67%", label: "Test coverage across shared modules" }
  - { metric: "25+ bugs", label: "Production bugs prevented over 18 months" }
---

## The work

At Globo, I built news discovery based on the reader's location using CoreLocation, MapKit and GraphQL. Average session time went from 4.2 to 8.7 minutes. I also raised test coverage in shared modules from 18% to 67% with XCTest and Quick/Nimble; those tests helped prevent more than 25 production bugs over 18 months.

At Dafiti, Kanui and Tricae, I fixed session-control and cryptographic issues in shared Objective-C code. The fixes were required for credit-card compliance.
