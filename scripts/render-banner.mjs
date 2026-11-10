// Renders both LTK banner variants (PT + EN) with Playwright.
// Usage: npm run banner:ltk
import { renderCover } from './lib/render-cover.mjs'

await renderCover({
  source: 'scripts/ltk-banner.html',
  output: 'content/images/projects/ltk-search/cover.png',
})

await renderCover({
  source: 'scripts/ltk-banner-en.html',
  output: 'content/images/projects/ltk-search/cover-en.webp',
})
