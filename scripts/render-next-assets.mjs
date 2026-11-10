// Builds the public Next screenshots: anonymizes home/login and optimizes the rest.
// Source captures live in scripts/assets/next-private/ and are gitignored.
// Usage: npm run next:assets
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { chromium } from 'playwright-core'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, 'content/images/projects/next-banking')
const tmpDir = resolve(root, 'scripts/assets')
const privateDir = resolve(tmpDir, 'next-private')

mkdirSync(outDir, { recursive: true })
mkdirSync(tmpDir, { recursive: true })

function cwebp(input, output, lossless = false) {
  const args = lossless
    ? ['-quiet', '-lossless', '-z', '9', '-m', '6', input, '-o', output]
    : ['-quiet', '-q', '88', '-m', '6', input, '-o', output]
  execFileSync('cwebp', args, { stdio: 'ignore' })
}

const renderJobs = [
  { source: 'scripts/next-home-anon.html', output: '01-home.webp' },
  { source: 'scripts/next-login-anon.html', output: '03-login.webp', lossless: true },
]

const browser = await chromium.launch({
  channel: 'chrome',
  args: ['--allow-file-access-from-files'],
})

try {
  for (const job of renderJobs) {
    const sourcePath = resolve(root, job.source)
    const outputPath = resolve(outDir, job.output)
    const tmp2x = resolve(tmpDir, `next-${job.output.replace('.webp', '')}@2x.png`)
    const tmp1x = tmp2x.replace(/@2x\.png$/, '@1x.png')
    rmSync(tmp2x, { force: true })
    rmSync(tmp1x, { force: true })

    const page = await browser.newPage({ viewport: { width: 828, height: 1792 }, deviceScaleFactor: 2 })
    await page.goto(pathToFileURL(sourcePath).href, { waitUntil: 'load' })
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
    await page.screenshot({ path: tmp2x })
    await page.close()

    execFileSync('/usr/bin/sips', ['-z', '1792', '828', tmp2x, '--out', tmp1x], { stdio: 'ignore' })
    cwebp(tmp1x, outputPath, Boolean(job.lossless))
    rmSync(tmp2x, { force: true })
    rmSync(tmp1x, { force: true })
    console.log(`Wrote ${job.output}`)
  }
} finally {
  await browser.close()
}

for (const [input, output] of [
  ['IMG_7857.PNG', '02-chat-bia.webp'],
  ['IMG_7859.PNG', '04-onboarding.webp'],
]) {
  const source = resolve(privateDir, input)
  if (!existsSync(source)) throw new Error(`Missing private source: ${input}`)
  cwebp(source, resolve(outDir, output))
  console.log(`Wrote ${output}`)
}
