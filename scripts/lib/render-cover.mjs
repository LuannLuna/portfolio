// Shared Playwright renderer for 1983x793 banner covers.
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { chromium } from 'playwright-core'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')

function commandAvailable(command) {
  try {
    execFileSync('which', [command], { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

export async function renderCover({ source, output }) {
  const sourcePath = resolve(root, source)
  const outputPath = resolve(root, output)
  const outputKey = relative(root, outputPath).replace(/[\\/]/g, '-')
  const tmpBase = resolve(root, 'scripts/assets', `${outputKey.replace(/\.[^.]+$/, '')}@2x.png`)
  const tmpOneX = tmpBase.replace(/@2x\.png$/, '@1x.png')

  if (!existsSync(sourcePath)) throw new Error(`Missing banner source: ${source}`)
  mkdirSync(dirname(outputPath), { recursive: true })
  mkdirSync(dirname(tmpBase), { recursive: true })
  rmSync(tmpBase, { force: true })
  rmSync(tmpOneX, { force: true })

  const browser = await chromium.launch({
    channel: 'chrome',
    args: ['--allow-file-access-from-files'],
  })

  try {
    const page = await browser.newPage({
      viewport: { width: 1983, height: 793 },
      deviceScaleFactor: 2,
    })
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
    await page.screenshot({ path: tmpBase })
    await page.close()
  } finally {
    await browser.close()
  }

  if (outputPath.endsWith('.webp')) {
    if (!commandAvailable('cwebp')) {
      throw new Error('cwebp is required to write WebP covers (brew install webp)')
    }
    execFileSync('/usr/bin/sips', ['-z', '793', '1983', tmpBase, '--out', tmpOneX], { stdio: 'ignore' })
    execFileSync('cwebp', ['-quiet', '-q', '90', '-m', '6', tmpOneX, '-o', outputPath], { stdio: 'ignore' })
    rmSync(tmpOneX, { force: true })
  } else if (process.platform === 'darwin' && existsSync('/usr/bin/sips')) {
    execFileSync('/usr/bin/sips', ['-z', '793', '1983', tmpBase, '--out', outputPath], { stdio: 'ignore' })
  } else {
    execFileSync('cp', [tmpBase, outputPath])
  }

  rmSync(tmpBase, { force: true })
  console.log(`Wrote ${output}`)
}
