export const experience = [
  {
    role: 'Senior iOS Software Engineer',
    company: 'Hi-Tech Talents → LikeToKnow.It (LTK)',
    period: 'Oct 2025 — Apr 2026',
    bullets: [
      'Consolidated 3 legacy search endpoints behind a unified async/await data layer in Swift 6 strict concurrency, cutting search response time from 900ms to 200ms (-78%).',
      'Designed and shipped 3 SwiftUI components into the LTK design system, powering the rebuilt search experience and adopted by other feature teams.',
      'Built an end-to-end Maestro suite simulating the full journey (login → tabbar → search → creator shop), complementing XCTest UI to catch cross-screen regressions.',
    ],
  },
  {
    role: 'Senior iOS Software Engineer',
    company: 'Sebratec → Petz',
    period: 'Aug 2022 — Sep 2025',
    bullets: [
      "Architected the loyalty program module (MVVM + Clean Architecture); shipped as Petz's first production SwiftUI flow with real business logic, driving 1,000+ organic sales in week one.",
      'Led war-room triage for a production crash affecting all 1.5M+ users — diagnosed a misconfigured remote config value and restored service in ~3 hours; sustained ~99% crash-free sessions.',
      'Led UIKit-to-SwiftUI migration across 8 screens with a 2-dev team, halving feature delivery from 3 months to 1.5 and establishing SwiftUI as team standard.',
    ],
  },
  {
    role: 'iOS Engineer / Digital Solutions Architect',
    company: 'Capgemini → Next',
    period: 'Jul 2021 — Jun 2022',
    bullets: [
      'Re-architected the auth flow for a 15M-customer banking app: authored an RFC, then migrated from upfront permission loading to lazy, interaction-driven privilege escalation in RxSwift — cutting login time from 4.2s to 1.5s.',
      'Embedded with the Chat squad as cross-team iOS contributor, integrating a new intelligent-assistant SDK alongside the legacy one to enable seamless bot-to-human handoff within the same app.',
      'Mentored a junior iOS developer on Clean Architecture and SwiftUI through code reviews and pair programming.',
    ],
  },
  {
    role: 'Mid-Level iOS Developer',
    company: 'Dextra Digital → Globo and Dafiti',
    period: 'Oct 2019 — Jun 2021',
    bullets: [
      'Built geolocation-based news discovery (CoreLocation, MapKit, GraphQL), doubling average session time from 4.2 to 8.7 minutes.',
      'Grew test coverage from 18% to 67% with XCTest and Quick/Nimble, preventing 25+ production bugs over 18 months.',
      'Implemented critical security fixes in Objective-C across Dafiti Group apps (Dafiti, Kanui, Tricae) — session control and cryptographic protections required for credit-card compliance.',
    ],
  },
  {
    role: 'Junior iOS Developer',
    company: 'Verité Soluções',
    period: 'Jul 2018 — Sep 2019',
    bullets: [
      'Built 3 interconnected iOS apps for business management (Swift, UIKit), supporting 500+ daily operations.',
      'Integrated CoreLocation for nearest-store discovery paired with push notifications (40% DAU lift); applied Firebase Performance optimizations for 45% faster load times.',
    ],
  },
]
