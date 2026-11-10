// Renders scripts/ltk-banner.html to the LTK project cover with Playwright.
// Usage: node scripts/render-banner.mjs
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { chromium } from 'playwright-core'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const source = resolve(root, 'scripts/ltk-banner.html')
const output = resolve(root, 'content/images/projects/ltk-search/cover.png')
const tmp = resolve(root, 'scripts/assets/ltk-banner@2x.png')

mkdirSync(dirname(tmp), { recursive: true })
mkdirSync(dirname(output), { recursive: true })
rmSync(tmp, { force: true })

const browser = await chromium.launch({
  channel: 'chrome',
  args: ['--allow-file-access-from-files'],
})
const page = await browser.newPage({
  viewport: { width: 1983, height: 793 },
  deviceScaleFactor: 2,
})

await page.goto(pathToFileURL(source).href, { waitUntil: 'load' })
await page.evaluate(async () => {
  await document.fonts.ready
  await Promise.all(
    [...document.images].map((img) =>
      img.complete
        ? null
        : new Promise((done) => {
            img.addEventListener('load', done, { once: true })
            img.addEventListener('error', done, { once: true })
          })
    )
  )
})
await page.waitForTimeout(300)
await page.screenshot({ path: tmp })
await browser.close()

if (process.platform === 'darwin' && existsSync('/usr/bin/sips')) {
  execFileSync('/usr/bin/sips', ['-z', '793', '1983', tmp, '--out', output], { stdio: 'ignore' })
  rmSync(tmp, { force: true })
} else {
  execFileSync('cp', [tmp, output])
}

console.log(`Wrote ${output}`)
