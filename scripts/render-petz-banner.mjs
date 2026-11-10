// Renders the PT and EN Petz banners over the inpainted original artwork.
// Usage: npm run banner:petz
import { renderCover } from './lib/render-cover.mjs'

await renderCover({
  source: 'scripts/petz-banner-pt.html',
  output: 'content/images/projects/petz-loyalty/cover-pt.webp',
})

await renderCover({
  source: 'scripts/petz-banner-en.html',
  output: 'content/images/projects/petz-loyalty/cover-en.webp',
})
