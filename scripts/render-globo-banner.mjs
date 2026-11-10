// Renders the Globo G1/GE banner variants (PT + EN) with Playwright.
// Usage: npm run banner:globo
import { renderCover } from './lib/render-cover.mjs'

await renderCover({
  source: 'scripts/globo-banner.html',
  output: 'content/images/projects/globo-dafiti/cover.webp',
})

await renderCover({
  source: 'scripts/globo-banner-en.html',
  output: 'content/images/projects/globo-dafiti/cover-en.webp',
})
