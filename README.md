# Luann Luna — Portfolio

Personal portfolio for **Luann Luna**, Senior iOS Engineer.
React + Vite + TailwindCSS · deploys to GitHub Pages via GitHub Actions.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to ./dist
npm run preview  # serve the production build locally
```

Node 20+ recommended.

---

## Project structure

```
.
├── index.html                 # SEO + OG + JSON-LD + theme bootstrap
├── public/
│   ├── favicon.svg            # gradient "LL" mark
│   ├── 404.html               # SPA fallback for GitHub Pages deep links
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── main.jsx
│   ├── App.jsx                # ambient background + section composition
│   ├── index.css              # Tailwind layers + design tokens
│   ├── hooks/useTheme.js      # dark mode (class strategy, persisted)
│   ├── data/
│   │   ├── profile.js         # name, links, philosophy, shippedTo
│   │   ├── projects.js        # case studies (overview / decisions / impact / lessons)
│   │   ├── experience.js      # timeline
│   │   └── skills.js          # grouped tech stack
│   └── components/
│       ├── Navbar.jsx         # sticky, blur-on-scroll, mobile menu
│       ├── Hero.jsx           # gradient headline + CTA + logo strip
│       ├── About.jsx          # bio + philosophy + stat tiles
│       ├── Section.jsx        # shared section shell
│       ├── Projects.jsx       # cards → modal case study
│       ├── Skills.jsx
│       ├── Experience.jsx     # vertical timeline
│       ├── Contact.jsx
│       └── Footer.jsx
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js             # honors BASE_PATH env var
└── .github/workflows/deploy.yml
```

---

## Editing content

Almost everything is data-driven. Update these files and the UI follows:

| What                    | Where                       |
| ----------------------- | --------------------------- |
| Name, bio, links        | `src/data/profile.js`       |
| Project case studies    | `src/data/projects.js`      |
| Experience timeline     | `src/data/experience.js`    |
| Skills (grouped chips)  | `src/data/skills.js`        |

To swap the resume PDF, drop a file at `public/resume-en.pdf` (referenced from `profile.links.resume`).

---

## Deploying to GitHub Pages

The included workflow (`.github/workflows/deploy.yml`) builds on every push to `main` and publishes via GitHub Pages.

### One-time setup

1. Push this repo to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. If the repo name is **NOT** `<your-username>.github.io`, set a repo variable so assets resolve:
   - **Settings → Secrets and variables → Actions → Variables → New repository variable**
   - Name: `BASE_PATH`  ·  Value: `/<repo-name>/` (e.g. `/portfolio/`)
4. Push to `main` — the workflow runs and the URL appears in the Pages settings.

### User/org page (`luannluna.github.io`)

Leave `BASE_PATH` unset. Build base stays `/`.

### Project page (`luannluna.github.io/portfolio/`)

Set repo variable `BASE_PATH=/portfolio/`. The 404 fallback already keeps deep links working.

### Custom domain (optional)

Add a `public/CNAME` file containing your domain, then configure DNS as described in
GitHub's Pages docs. Update the `og:url` and `sitemap.xml` to match.

---

## Architecture decisions

- **Vite + React over Next.js static export** — the site is a single page with anchor sections. Next's SSR/routing would be overhead with no payoff; Vite gives a faster dev loop and a smaller bundle.
- **Tailwind with a tiny custom layer** — design tokens live in `tailwind.config.js`; reusable patterns (`section`, `card`, `chip`, `eyebrow`) are CSS components in `index.css`. This keeps JSX readable without a CSS-in-JS runtime.
- **Class-based dark mode with no-flash bootstrap** — the inline `<script>` in `index.html` reads `localStorage` and the OS preference *before* React mounts, so there's no light flash on a dark refresh.
- **Data-driven content modules** — copy lives in `src/data/*` so non-engineers can edit the site through a single PR without touching layout code.
- **Framer Motion for in-view reveals** — used sparingly. Animation amplifies hierarchy; it doesn't create it.
- **Modal case studies, not separate routes** — keeps deep linking simple, removes a router dependency, and respects the "one URL, fast load" model that suits a portfolio.
- **Accessibility** — semantic landmarks (`header`/`main`/`section`/`footer`), focusable controls, `aria-label`s on icon-only buttons, modal closes on backdrop click. Color contrast meets WCAG AA in both themes.
- **SEO** — title, description, Open Graph, Twitter card, JSON-LD `Person`, sitemap, robots. The site is fully static, so crawlers index it without JS execution after the first paint.

---

## Suggested visual direction

- **Color palette** — deep ink (`#0f1320`) base, indigo `#6366f1` as the accent, cyan `#22d3ee` for the gradient highlight. The palette is calm in light mode and confident in dark — the intended default.
- **Typography** — `Space Grotesk` for display (modern, slightly geometric, friendly), `Inter` for UI body (boring on purpose — readable at every size), `JetBrains Mono` for eyebrows and metadata (signals craft).
- **Spacing** — generous vertical rhythm (`py-24 sm:py-32` per section) so each section reads as a chapter, not a row.

---

## Project screenshots / mockups (next iteration)

You currently have copy-only project cards. The strongest next move:

1. Pick **one** "hero image" per case study — for LTK Search, a SwiftUI search screen mock; for Petz, the loyalty flow; for Next, an auth/loading sequence.
2. Render at iPhone aspect ratio (e.g. 390×844 @2x), export as `webp`, drop into `public/projects/<slug>.webp`.
3. Add an `image` field to each entry in `src/data/projects.js`, then render it inside the project card and modal header.

If you can't share real product screens, build minimal SwiftUI/Figma mockups that show the *idea* of the screen (a search field, a results list, a loading state) — recruiters skim images before they read text.

---

## Future improvements

- **Case-study pages** — promote the modal content into routed pages (`/projects/ltk-search`) with og:image-per-project once you have screenshots. Adds React Router and per-page OG tags.
- **MDX-powered writing** — a `/notes` section for short technical posts (Swift 6 strict-concurrency lessons, SwiftUI migration notes). Compounding personal-brand value.
- **Talks & open source** — once you publish a few, lift them to first-class sections.
- **Analytics** — Plausible or Umami (self-hostable, privacy-respecting) over GA.
- **Live "now" widget** — a single line ("Currently shipping LTK search v2") that you update monthly. Cheap signal that you're active.
- **Internationalization** — your CV exists in EN; a Portuguese variant doubles addressable audience for LATAM-remote roles.

---

## Becoming a personal-brand platform over time

The site is the durable surface. To compound, point everything else at it:

1. **Own the writing**. Publish 4–6 short, opinionated posts per year on iOS architecture, performance, or migrations. Cross-post to LinkedIn and dev.to with a canonical link back to the site.
2. **Rebuild the LinkedIn headline as a positioning statement**, not a job title — the same one that's in the hero. Consistency is the brand.
3. **Show the work in motion**. Loom or short videos for the harder case studies (LTK Maestro suite, Petz crash war room). Stronger than screenshots.
4. **Engage publicly**. A weekly comment on `swiftlang/swift` or a SwiftUI-focused thread does more for visibility than a blog post.
5. **Treat the portfolio like a product**. One small ship per quarter (new case study, new post, new section). Compounding small updates beat a big once-a-year redesign.
