// Renders scripts/og-image.html to public/og-image.png (1200x630) with headless Chrome.
// Usage: npm run og:image
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const source = resolve(root, 'scripts/og-image.html')
const output = resolve(root, 'public/og-image.png')

const candidates = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
].filter(Boolean)

const chrome = candidates.find(bin => existsSync(bin))
if (!chrome) {
  console.error('Could not find Chrome/Chromium. Set CHROME_PATH to its executable.')
  process.exit(1)
}

mkdirSync(dirname(output), { recursive: true })
rmSync(output, { force: true })

execFileSync(chrome, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
  '--window-size=1200,630',
  '--virtual-time-budget=8000',
  `--screenshot=${output}`,
  pathToFileURL(source).href,
], { stdio: 'inherit' })

console.log(`Wrote ${output}`)
