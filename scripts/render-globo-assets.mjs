// Optimizes the Globo G1/GE captures into public WebP gallery assets.
// Raw captures live in scripts/assets/globo-private/ and are gitignored.
// Usage: npm run globo:assets
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const privateDir = resolve(root, 'scripts/assets/globo-private')
const outDir = resolve(root, 'content/images/projects/globo-dafiti')

const mapping = [
  ['IMG_7860.PNG', '01-g1-home'],
  ['IMG_7861.PNG', '02-g1-region'],
  ['IMG_7862.PNG', '03-g1-menu'],
  ['IMG_7864.PNG', '04-ge-splash'],
  ['IMG_7865.PNG', '05-ge-team-picker'],
  ['IMG_7866.PNG', '06-ge-championships'],
  ['IMG_7867.PNG', '07-ge-notifications'],
  ['IMG_7868.PNG', '08-ge-home'],
  ['IMG_7869.PNG', '09-ge-tables'],
]

for (const [input, output] of mapping) {
  const source = resolve(privateDir, input)
  if (!existsSync(source)) throw new Error(`Missing private source: ${input}`)
  execFileSync('cwebp', ['-quiet', '-q', '88', '-m', '6', source, '-o', resolve(outDir, `${output}.webp`)], {
    stdio: 'ignore',
  })
  console.log(`Wrote ${output}.webp`)
}
