# Luann Luna — Portfolio

Personal portfolio for **Luann Luna**, Senior iOS Engineer.
React + Vite + TailwindCSS · deploys to GitHub Pages via GitHub Actions.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run validate # content schemas + image assets + SEO config
npm run build    # validates, then outputs to ./dist
npm run preview  # serve the production build locally
npm run og:image # regenerate public/og-image.png from scripts/og-image.html
```

Node 20+ recommended.

---

## Project structure

```
.
├── index.html                 # SEO + OG + JSON-LD + theme bootstrap
├── public/
│   ├── favicon.svg            # editorial "LL" mark
│   ├── og-image.png           # 1200x630 social card (generated)
│   ├── 404.html               # SPA fallback for GitHub Pages deep links
│   ├── robots.txt
│   └── sitemap.xml
├── content/
│   ├── site.yaml              # profile, links, locales
│   ├── hero/ about/ projects/ experience/ skills/ contact/
│   └── images/                # profile photo + project covers/galleries
├── src/
│   ├── main.jsx
│   ├── App.jsx                # page composition + skip link
│   ├── index.css              # editorial tokens, grid, prose, motion
│   ├── hooks/useTheme.js      # light-first dark mode (persisted)
│   ├── i18n/locale.jsx        # EN / PT content context
│   ├── content/
│   │   ├── loader.js          # MD/YAML loader with locale fallback
│   │   └── schemas.js         # Zod content contracts
│   └── components/
│       ├── Navbar.jsx         # sticky masthead + mobile index
│       ├── Hero.jsx           # oversized name, portrait, spec table
│       ├── About.jsx          # bio, philosophy, stats table
│       ├── Section.jsx        # numbered editorial section shell
│       ├── Projects.jsx       # project index rows → case-study sheet
│       ├── TagFilter.jsx      # text filter with counts
│       ├── Skills.jsx         # ruled stack matrix
│       ├── Experience.jsx     # ruled career table
│       ├── Contact.jsx
│       └── Footer.jsx
├── scripts/
│   ├── validate-content.mjs   # build-time content + asset validator
│   ├── og-image.html          # social card template
│   ├── generate-og-image.mjs  # renders the template with headless Chrome
│   ├── *-banner*.html         # PT/EN project banner templates
│   ├── render-*.mjs           # Playwright/cwebp renderers
│   └── lib/render-cover.mjs   # shared banner renderer
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js             # honors BASE_PATH env var
└── .github/workflows/deploy.yml
```

---

## Editing content

Almost everything is data-driven. Update these files and the UI follows:

| What                    | Where                                    |
| ----------------------- | ---------------------------------------- |
| Name, links, photo      | `content/site.yaml`                      |
| Hero copy + spec        | `content/hero/hero.<locale>.md`          |
| Project case studies    | `content/projects/<slug>.<locale>.md`    |
| Experience              | `content/experience/jobs.<locale>.yaml`  |
| Skills                  | `content/skills/groups.<locale>.yaml`    |
| About / contact / nav   | `content/about/`, `contact/`, `nav.*`    |

To swap the resume PDF, drop a file at `public/resume-en.pdf` (referenced from `profile.links.resume`).

`npm run validate` (also run automatically by `npm run build`) checks every content file against the Zod
schemas, verifies that referenced images exist, and keeps `index.html`, `og-image`, `robots.txt`, and
`sitemap.xml` consistent with `content/site.yaml`. Missing assets and invalid frontmatter fail the build
instead of rendering a blank page in production.

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

> **Project-page note:** GitHub Pages serves this repo under `/portfolio/`, so `robots.txt` is published at
> `/portfolio/robots.txt` and crawlers will ignore it (they only read the domain root). Submit
> `https://luannluna.github.io/portfolio/sitemap.xml` directly in Search Console instead. The sitemap and
> `robots.txt` are kept in sync with `site.url` by `npm run validate`.

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
- **Tailwind with CSS-variable tokens** — palette roles (`paper`, `surface`, `ink`, `muted`, `rule`, `signal`) live as CSS custom properties in `index.css` and are consumed by Tailwind. Editorial patterns (`container-grid`, `display`, `eyebrow`, `btn`, `prose-editorial`) are small CSS components, so components stay readable without a CSS-in-JS runtime.
- **Light-first dark mode with no-flash bootstrap** — the inline `<script>` in `index.html` reads `localStorage` before React mounts. The paper system is the default; dark mode is an explicit persisted choice, so there is never a flash.
- **Data-driven content modules** — copy and case studies live in `content/` as Markdown/YAML and are validated by Zod at build time. Non-engineers can edit the site through one PR without touching layout code.
- **CSS-only motion** — the hero line rise, hover states and modal entrance are CSS keyframes/transitions. No animation runtime; `prefers-reduced-motion` is respected globally.
- **Case-study sheet, not a route** — keeps the one-URL model, removes a router, and gives the work a print-like reading surface. It traps focus, closes on Escape/backdrop, locks body scroll and restores the trigger.
- **Accessibility** — semantic landmarks, skip link, 44px mobile targets, visible focus rings, `aria-modal`, keyboard trap, `aria-pressed` filters and AA contrast in both themes.
- **SEO** — title, description, Open Graph, Twitter card, JSON-LD `Person`, sitemap, robots. The site is fully static, so crawlers index it without JS execution after the first paint.

---

## Design system

The rebrand follows the **web-design-engineer** workflow from
[`ConardLi/garden-skills`](https://github.com/ConardLi/garden-skills), using the Swiss editorial /
Pentagram–Vignelli school as the anchor.

- **Palette** — paper `#F3F0E9`, surface `#EAE6DD`, ink `#12120F`, muted `#6E6A61`, rule `#CFC9BC`,
  signal red `#D7261E`. Dark mode swaps the same roles to ink paper, cream type and `#FF3B30`.
- **Typography** — Archivo for display (112% width, tight tracking), IBM Plex Sans for body,
  IBM Plex Mono for metadata. No serif, no gradients.
- **Layout** — 12-column grid, max 1440px, asymmetric 3/9 section headers, numbered index, 1px rules.
  Zero border radius, zero shadows, no card grids.
- **Signature** — the oversized name, project index rows whose grayscale covers colorize on hover, and
  a full-width case-study sheet with a metadata rail.
- **Motion** — a single hero line-rise plus 200–500ms hover/modal transitions; everything respects
  `prefers-reduced-motion`.

---

## Images

All site images live under `content/images/`. They are bundled (fingerprinted) by Vite through
`import.meta.glob('/content/images/**/*')` in `src/content/loader.js`, so any path you write in YAML
or markdown frontmatter becomes a real URL at build time.

```
content/images/
├── profile/                  # personal photos (hero portrait, etc.)
└── projects/<slug>/          # per-project covers and screenshots
    ├── cover.jpg
    └── screen-*.png
```

Reference them from content using an **absolute path from the repo root**:

```yaml
# content/site.yaml
profile:
  photo: "/content/images/profile/luann.jpg"

# content/projects/<slug>.<locale>.md
cover: "/content/images/projects/<slug>/cover.png"
```

Relative paths (`./cover.jpg`) also work and resolve against the source file. External `https://` URLs
pass through. See `content/images/README.md` for size/format conventions.

### Adding project screenshots

1. Render at iPhone aspect ratio (e.g. 390×844 @2x), export as `.webp`.
2. Drop the file at `content/images/projects/<slug>/cover.png` (or any name you like).
3. Set `cover: "/content/images/projects/<slug>/cover.png"` in the project markdown frontmatter.
4. Card and modal pick it up automatically through `coverUrl`.

If you can't share real product screens, build minimal SwiftUI/Figma mockups that show the *idea* of the
screen (a search field, a results list, a loading state) — recruiters skim images before they read text.

### Social card

`public/og-image.png` (1200×630) is rendered from `scripts/og-image.html`. Edit the template and run
`npm run og:image` to regenerate it. Keep `site.ogImage` in `content/site.yaml` and the `og:image` /
`twitter:image` tags in `index.html` pointing at the **absolute** deployed URL — Vite does not rewrite meta
tags for `BASE_PATH`, and `npm run validate` will fail if they drift.

### Project banners

Project covers are Playwright compositions of the real case-study screenshots:

- **LTK** — `scripts/ltk-banner.html` (PT) and `scripts/ltk-banner-en.html` (EN). Run `npm run banner:ltk`.
- **Petz EN** — `scripts/petz-banner-en.html` renders over `scripts/assets/petz-base-en.webp`, the original
  artwork with the Portuguese copy inpainted out. Run `npm run banner:petz-en`. The PT cover stays
  `content/images/projects/petz-loyalty/cover.png`.
- **Next** — `scripts/next-banner.html` (PT) and `scripts/next-banner-en.html` (EN). Run `npm run banner:next`.
  Raw captures stay in `scripts/assets/next-private/` (gitignored); `npm run next:assets` regenerates the
  anonymized home/login screenshots and optimized gallery assets.
- **Globo G1/GE** — `scripts/globo-banner.html` (PT) and `scripts/globo-banner-en.html` (EN). Run
  `npm run banner:globo`. Raw captures stay in `scripts/assets/globo-private/` (gitignored);
  `npm run globo:assets` regenerates the optimized gallery assets.

Both commands use the installed Google Chrome through the `playwright-core` dev dependency. WebP outputs
require `cwebp` (`brew install webp`).

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
