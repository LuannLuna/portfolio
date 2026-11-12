---
slug: "besafe-protection"
title: "BeSafe: Betting-block protection"
company: "BeSafe"
period: "2026"
order: 1
featured: true
tagline: "I shipped the iOS app that blocks betting sites at the DNS layer — and keeps protection alive when the VPN drops."
role: "I was the main iOS contributor: DNS blocking, VPN recovery, telemedicine, subscriptions, modular architecture and the release pipeline."
cover: "/content/images/projects/besafe-protection/cover-en.webp"
coverFit: "contain"
gallery:
  - { src: "/content/images/projects/besafe-protection/01-landing.webp",       caption: "Landing — value proposition and entry into the 7-day free trial." }
  - { src: "/content/images/projects/besafe-protection/02-home.webp",          caption: "Home — protection switch, blocked-site counter, days without betting, money and time recovered." }
  - { src: "/content/images/projects/besafe-protection/03-mood.webp",          caption: "Mood analysis — 30-day emotional check-ins and a 12-day streak." }
  - { src: "/content/images/projects/besafe-protection/04-appointments.webp",  caption: "Telemedicine — scheduled and available psychology and psychiatry consultations." }
  - { src: "/content/images/projects/besafe-protection/05-plans.webp",         caption: "Plans — annual, semester and quarterly subscriptions with 60% off the annual plan." }
  - { src: "/content/images/projects/besafe-protection/06-dns-diagnostics.webp", caption: "DNS diagnostics — active tunnel path, local blocklist state and live request counters." }
  - { src: "/content/images/projects/besafe-protection/07-request-block.webp", caption: "Request a block — users submit betting domains for review and track each status." }
  - { src: "/content/images/projects/besafe-protection/08-chat.webp",          caption: "Support — 24-hour human chat and a hand-off to psychological care." }
tags: ["iOS", "Architecture", "Security", "Performance"]
stack:
  - "Swift"
  - "SwiftUI"
  - "Network Extension"
  - "Tuist"
  - "Swift Testing"
  - "Firebase"
  - "RevenueCat"
  - "Fastlane"
challenges:
  - "iOS gives an app no public API to inspect another app's traffic, so blocking betting sites had to happen at the DNS layer, inside a Network Extension."
  - "The tunnel drops when the phone moves between Wi-Fi and cellular; without recovery, the user keeps betting while the app still looks protected."
  - "Subscriptions, telemedicine and guardian flows lived in one target, so a change in one area could break a release-critical flow in another."
  - "App Review scrutinizes DNS interception and background networking, and the extension had to stay free of tracking SDKs."
decisions:
  - "Forward DNS through a packet tunnel to BeSafe's DoT resolver, apply the downloaded global blocklist, and answer locally blocked domains on device before they leave the phone."
  - "Keep a per-user blocklist in the App Group so a reported domain blocks in seconds, and expose the active path, blocklist generation and error counters in diagnostics."
  - "Migrate the UIKit/MVC codebase to SwiftUI with Clean Architecture, screen by screen, instead of rewriting it."
  - "Add tunnel reconnection and recovery for network changes, with health checks that surface when protection is off."
  - "Split the app into 25 Tuist modules with compiler-enforced boundaries; a CI gate blocks third-party SDKs from the network extension."
  - "Standardize tests on Swift Testing and delivery on fastlane plus TestFlight, then submit v1.1.0 for App Review."
impact:
  - { metric: "200k+ sites", label: "Betting domains blocked at the DNS layer" }
  - { metric: "25 modules", label: "Tuist modules with compiler-enforced boundaries" }
  - { metric: "3,169 tests", label: "Swift Testing cases across 352 suites" }
  - { metric: "125 PRs", label: "Merged in five months as the main iOS contributor" }
seo:
  title: "BeSafe — DNS-level betting blocker for iOS"
  description: "DNS blocking inside a Network Extension, VPN recovery, telemedicine and subscriptions in a 25-module app with 3,169 tests."
---

## The work

BeSafe blocks betting sites on iPhone. iOS does not let one app read another app's traffic, so the block lives in a Network Extension: a packet tunnel captures DNS queries, forwards them to BeSafe's DoT resolver, and answers blocked domains on device. The app downloads a global blocklist and keeps each user's reported domains in the App Group, so a new site can be blocked in seconds instead of waiting for an app release.

I joined in May 2026 and became the main iOS contributor — about 1,400 of the repository's 1,499 commits, with 128 pull requests opened and 125 merged in five months. I split the app into 25 Tuist modules with enforced boundaries, kept the extension free of third-party SDKs behind a CI gate, and grew the suite to 3,169 Swift Testing cases. I also ran the fastlane and TestFlight pipeline through 33 builds and submitted v1.1.0 for App Review. The contract ended in November 2026, with the app delivered to the App Store by the agreed launch deadline.

The product work covered tunnel reconnection across network changes, telemedicine appointments through Conexa, mood check-ins, guardian mode, subscriptions with PIX and the support chat. The screens below come from the shipped app and its snapshot suite.
