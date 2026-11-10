// Renders the Next banner variants (PT + EN) with Playwright.
// Usage: npm run banner:next
import { renderCover } from './lib/render-cover.mjs'

await renderCover({
  source: 'scripts/next-banner.html',
  output: 'content/images/projects/next-banking/cover.webp',
})

await renderCover({
  source: 'scripts/next-banner-en.html',
  output: 'content/images/projects/next-banking/cover-en.webp',
})
