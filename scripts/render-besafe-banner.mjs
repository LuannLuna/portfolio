// Renders the BeSafe banner variants (PT + EN) with Playwright.
// Usage: npm run banner:besafe
import { renderCover } from './lib/render-cover.mjs'

await renderCover({
  source: 'scripts/besafe-banner-pt.html',
  output: 'content/images/projects/besafe-protection/cover.webp',
})

await renderCover({
  source: 'scripts/besafe-banner-en.html',
  output: 'content/images/projects/besafe-protection/cover-en.webp',
})
