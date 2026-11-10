---
slug: "ltk-search"
title: "LTK: Search"
company: "LikeToKnow.It"
period: "2025 — 2026"
order: 1
featured: true
tagline: "Search response time fell from 900ms to 200ms after I unified three legacy endpoints."
role: "I owned the search data layer, shipped three SwiftUI components, and added end-to-end Maestro coverage."
cover: "/content/images/projects/ltk-search/cover-en.webp"
coverFit: "contain"
gallery:
  - { src: "/content/images/projects/ltk-search/01-home-feed.webp",        caption: "Home feed — “Pesquisar” editorial hub with seasonal edits, categories, and popular posts." }
  - { src: "/content/images/projects/ltk-search/02-search-empty.webp",     caption: "Search empty state — entry prompt with quick filters." }
  - { src: "/content/images/projects/ltk-search/03-search-suggestions.webp", caption: "Search suggestions — recent searches, popular queries, recently viewed creators." }
  - { src: "/content/images/projects/ltk-search/08-search-typing.webp",    caption: "Typing state — popular searches while the query is entered." }
  - { src: "/content/images/projects/ltk-search/07-search-matches.webp",   caption: "Query matches — corresponding creators, brands, and related searches." }
  - { src: "/content/images/projects/ltk-search/04-search-results.webp",   caption: "Search results — LTK AI overview, Posts / Creators tabs, and product carousels." }
  - { src: "/content/images/projects/ltk-search/05-creator-profile.webp",  caption: "Creator profile — follower stats, posts, products, and gift guides." }
  - { src: "/content/images/projects/ltk-search/06-brand-profile.webp",    caption: "Brand profile — products in high demand and recent items." }
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
  - "Three legacy search endpoints returned different response shapes and behaved differently."
  - "The app was adopting Swift 6 strict concurrency while search still depended on older async flows."
  - "The journey crossed login, tabs, search results, and creator shops; unit tests could not catch every cross-screen regression."
decisions:
  - "Put the three endpoints behind one async/await data layer in the Swift 6 strict-concurrency codebase."
  - "Shipped three SwiftUI components in the LTK design system so other feature teams could reuse them."
  - "Built a Maestro journey from login to creator shop and kept XCTest UI coverage for individual screens."
impact:
  - { metric: "900 → 200ms", label: "Search response time after consolidating three endpoints" }
  - { metric: "3 components", label: "SwiftUI components shipped to the LTK design system" }
  - { metric: "End to end", label: "Maestro coverage from login through creator shop" }
seo:
  title: "LTK Search — 900ms to 200ms"
  description: "Three legacy search endpoints unified behind async/await. Search response time dropped from 900ms to 200ms."
---

## The work

Search called three legacy endpoints. Each had its own response shape and timing, so the UI had to deal with the differences. I put them behind one async/await data layer in the Swift 6 strict-concurrency codebase. Search response time dropped from 900ms to 200ms.

I also shipped three SwiftUI components into the LTK design system. To cover the full journey, I built a Maestro flow from login through search to a creator shop; XCTest continued to cover individual screens.
