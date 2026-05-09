export const projects = [
  {
    slug: 'ltk-search',
    name: 'LTK — Unified Search',
    company: 'LikeToKnow.It',
    period: '2025 — 2026',
    tagline: 'Cut search latency 78% and shipped 3 design-system components powering the rebuilt experience.',
    overview:
      "LTK's discovery flow was fragmented across three legacy search endpoints, each with its own response shape, error model, and cache strategy. I consolidated them behind a single async/await data layer in a Swift 6 strict-concurrency codebase, then rebuilt the UI on top of three new design-system components adopted across feature teams.",
    role: 'Senior iOS Engineer — owned the search experience end-to-end (data layer, UI, and test harness).',
    stack: ['Swift 6', 'Strict Concurrency', 'SwiftUI', 'Async/Await', 'Design System', 'Maestro', 'XCTest'],
    challenges: [
      'Three legacy endpoints with overlapping but inconsistent payloads, called from many call sites with no shared contract.',
      'Strict-concurrency migration meant every Sendable boundary had to be deliberate — no shortcuts.',
      'UI tests alone could not catch the cross-screen regressions that the rebuilt flow risked.',
    ],
    decisions: [
      'A single async repository fronted the three endpoints with a unified Result type, isolating callers from the migration.',
      'Pushed shared visual primitives into the design system instead of one-off views, so other teams inherited the rebuild for free.',
      'Layered Maestro on top of XCTest UI to simulate the full journey — login → tabbar → search → creator shop.',
    ],
    impact: [
      { metric: '900ms → 200ms', label: 'Search response time (-78%)' },
      { metric: '3 components', label: 'Shipped into the design system' },
      { metric: 'Full journey', label: 'Maestro suite covering login → search → shop' },
    ],
    lessons:
      'Strict concurrency forces honest API design. The endpoints I had been "managing" with conventions became typed boundaries, and the bugs that survived the migration were the ones I was already afraid of.',
  },
  {
    slug: 'petz-loyalty',
    name: 'Petz — Loyalty & Crash War Room',
    company: 'Petz (via Sebratec)',
    period: '2022 — 2025',
    tagline: "Architected Petz's first production SwiftUI flow and led war-room triage for a 1.5M-user crash.",
    overview:
      "I architected Petz's loyalty program module — MVVM + Clean Architecture, shipped as the company's first production SwiftUI flow with real business logic. Separately, I led war-room triage for a launch-blocking crash affecting all 1.5M+ users, diagnosing a misconfigured remote config value and restoring service in roughly three hours.",
    role: 'Senior iOS Engineer — module owner, on-call lead for crashes, and SwiftUI migration champion.',
    stack: ['Swift', 'SwiftUI', 'UIKit', 'MVVM', 'Clean Architecture', 'Crashlytics', 'Instruments', 'Remote Config'],
    challenges: [
      'No SwiftUI flow had ever been shipped to production with real business logic — the team needed proof and patterns.',
      'A single remote config flip surfaced a latent crash across the entire user base; every minute mattered.',
      'A 2-developer migration of 8 screens from UIKit to SwiftUI without slowing down feature delivery.',
    ],
    decisions: [
      'Picked the loyalty module as the SwiftUI beachhead — high enough value to matter, contained enough to roll back.',
      'During the incident, started with the most recent change rather than the most likely code path; the misconfigured flag was identified inside the first 90 minutes.',
      'Ran the migration as a parallel track with a clear adoption gate, so feature work continued uninterrupted.',
    ],
    impact: [
      { metric: '1,000+', label: 'Organic loyalty sales in week one' },
      { metric: '~3 hours', label: 'From war-room start to full restoration' },
      { metric: '~99%', label: 'Crash-free sessions sustained' },
      { metric: '3 mo → 1.5 mo', label: 'Feature delivery after migration' },
    ],
    lessons:
      'SwiftUI in production is mostly a people problem. Once one revenue-driving flow shipped and stayed up, the rest of the team stopped asking whether — and started asking where next.',
  },
  {
    slug: 'next-banking',
    name: 'Next — Auth Re-architecture',
    company: 'Next (via Capgemini)',
    period: '2021 — 2022',
    tagline: 'Cut login time from 4.2s to 1.5s for a 15M-customer banking app.',
    overview:
      "The Next banking app loaded every customer permission upfront at login, paying the cost whether the user needed those features or not. I authored an RFC, then migrated the auth flow in RxSwift to lazy, interaction-driven privilege escalation — fetching permissions only when the user reached for the feature that needed them.",
    role: 'iOS Engineer / Digital Solutions Architect — wrote the proposal, drove team alignment, and shipped the migration.',
    stack: ['Swift', 'RxSwift', 'UIKit', 'Clean Architecture', 'RFC process'],
    challenges: [
      '15M customers, zero tolerance for regressions in a banking authentication path.',
      'The upfront permission load was deeply assumed across many call sites.',
      'Convincing the team that "lazy" was safer than "eager" in a security-sensitive context.',
    ],
    decisions: [
      'Wrote a written RFC first; the conversation it produced caught two edge cases before any code shipped.',
      'Kept the permission cache shape stable so call sites read the same way — only the population changed.',
      'Shipped behind a staged rollout with login-time telemetry as the primary success metric.',
    ],
    impact: [
      { metric: '4.2s → 1.5s', label: 'Login time (-64%)' },
      { metric: '15M', label: 'Customers on the new flow' },
    ],
    lessons:
      'Async permission loading reframed login from "wait for everything" to "open the door, then unlock rooms as needed." Most users never needed half of what we used to fetch.',
  },
  {
    slug: 'globo-dafiti',
    name: 'Globo G1 / GE — Geolocated News & Dafiti Security',
    company: 'Globo & Dafiti Group (via Dextra)',
    period: '2019 — 2021',
    tagline: 'Doubled session time on G1/GE and shipped credit-card-grade security fixes across Dafiti, Kanui, Tricae.',
    overview:
      "Two parallel storylines: on Globo's news products I built geolocation-based discovery (CoreLocation + MapKit + GraphQL), doubling average session time. On the Dafiti Group apps I led critical Objective-C security work — session control and cryptographic protections required for credit-card compliance.",
    role: 'Mid-Level iOS Developer — feature owner on Globo, security implementer on Dafiti.',
    stack: ['Swift', 'Objective-C', 'CoreLocation', 'MapKit', 'GraphQL', 'XCTest', 'Quick/Nimble'],
    challenges: [
      'Surface "news that matters here, now" without becoming a privacy or battery liability.',
      'Lift test coverage from 18% to a number that actually prevented production bugs.',
      'Apply security fixes to legacy Objective-C code paths used by three brands without breaking any of them.',
    ],
    decisions: [
      'Treated location as a permission gradient, not a binary — coarse first, precise only when the feature demanded it.',
      'Drove coverage upward in the modules with the highest crash rates first, not the ones easiest to test.',
      'Kept brand-specific differences in thin adapters so the security core stayed identical across the three apps.',
    ],
    impact: [
      { metric: '4.2 → 8.7 min', label: 'Average session time on Globo apps' },
      { metric: '18% → 67%', label: 'Test coverage on shared modules' },
      { metric: '25+ bugs', label: 'Prevented in production over 18 months' },
    ],
    lessons:
      "Test coverage is a leading indicator only when you're honest about which modules need it. The first 30% of coverage we added probably saved us more than the next 30%.",
  },
]
