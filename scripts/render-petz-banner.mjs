// Renders the English Petz banner over the inpainted original artwork.
// Usage: npm run banner:petz-en
import { renderCover } from './lib/render-cover.mjs'

await renderCover({
  source: 'scripts/petz-banner-en.html',
  output: 'content/images/projects/petz-loyalty/cover-en.webp',
})
