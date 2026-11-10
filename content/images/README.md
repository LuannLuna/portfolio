# Images

All site images live under this directory. They are bundled by Vite (fingerprinted, cache-busted) through
`import.meta.glob('/content/images/**/*')` in `src/content/loader.js`, so any path written below
becomes a real URL at build time.

## Layout

```
content/images/
├── profile/        # personal photos (hero portrait, etc.)
└── projects/       # per-project covers and in-app screenshots
    └── <slug>/     # one folder per project slug — e.g. ltk-search/, petz-loyalty/
        ├── cover.webp
        ├── cover-en.webp  # optional English variant
        ├── screen-search.png
        └── screen-results.png
```

`<slug>` matches the `slug:` field in `content/projects/<slug>.<locale>.md`.

## Referencing images from content

In YAML and markdown frontmatter use an **absolute path from the repo root**:

```yaml
# content/site.yaml
profile:
  photo: "/content/images/profile/luann.jpg"

# content/projects/ltk-search.en.md
cover: "/content/images/projects/ltk-search/cover-en.webp"

# content/projects/ltk-search.pt.md
cover: "/content/images/projects/ltk-search/cover.png"
```

Relative paths (`./cover.jpg`, `../foo.png`) also work and resolve against the source file's directory.
External URLs (`https://…`) pass through untouched.

## Formats and sizes

- **Portrait / avatar** — square crop, ≥ 512×512, `.jpg` or `.webp`.
- **Project cover** — 16:9, 1600×900 max, `.webp` preferred (`.jpg`/`.png` fine).
- **In-app screenshots** — keep device aspect ratio (e.g. 390×844 @2x for iPhone), export as `.webp`.

Keep individual files under ~300 KB; the dev server reloads slow when large binaries land in the glob.

## Adding a new image

1. Drop the file under the right subdirectory.
2. Reference it from YAML/markdown using the absolute path above.
3. `npm run dev` picks it up automatically.
