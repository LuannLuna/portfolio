---
slug: "ltk-search"
title: "LTK: Search"
company: "LikeToKnow.It"
period: "2025 — 2026"
order: 1
featured: true
tagline: "Worked on improving the search experience, modernizing async flows, and supporting the migration to Swift Concurrency."
role: "Senior iOS Engineer contributing to the search experience across data layer and UI improvements."
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
  - "The search flow depended on multiple legacy endpoints with different response structures and behaviors."
  - "Part of the project involved adapting flows to newer Swift Concurrency patterns."
  - "The search experience touched multiple screens, which increased the risk of regressions during changes."
decisions:
  - "Contributed to improvements in the async data layer to simplify how search data was consumed by the UI."
  - "Worked with shared UI components and design-system patterns to keep the experience more consistent."
  - "Helped improve automated test coverage for important user flows involving search and navigation."
impact:
  - { metric: "Improved performance", label: "Search experience and async flow optimizations" }
  - { metric: "Shared components", label: "Contributions to reusable UI patterns" }
  - { metric: "Better coverage", label: "Expanded UI and flow testing" }
seo:
  title: "LTK Search case study"
  description: "Contributions to improving the LTK search experience using SwiftUI and modern concurrency patterns."
---

## Overview

At LTK, I worked as part of the team responsible for the search experience inside the app. The project involved improving existing search flows, modernizing parts of the async data layer, and supporting UI updates built with SwiftUI.

I also contributed to test improvements and reusable UI components that helped keep the experience more consistent across the app.

## Lessons learned

One thing I learned during this project is how much modern concurrency features can improve code readability and maintainability when introduced carefully into existing projects. I also reinforced the importance of collaboration when working on flows shared across multiple teams and features.