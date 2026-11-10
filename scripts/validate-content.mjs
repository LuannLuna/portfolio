#!/usr/bin/env node
// Validates all content against the same Zod schemas the app uses at runtime,
// plus asset existence and SEO config consistency. Runs before every build.
//
// Usage: npm run validate
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import yaml from 'js-yaml'
import * as schemas from '../src/content/schemas.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const errors = []
const warnings = []
const referencedImages = new Set()

const rel = (p) => relative(root, p)
const fail = (msg) => errors.push(msg)
const warn = (msg) => warnings.push(msg)

function read(file) {
  try {
    return readFileSync(file, 'utf8')
  } catch {
    fail(`Cannot read ${rel(file)}`)
    return null
  }
}

function parseYaml(file) {
  const raw = read(file)
  if (raw === null) return null
  try {
    return yaml.load(raw)
  } catch (err) {
    fail(`Invalid YAML in ${rel(file)}: ${err.message}`)
    return null
  }
}

function parseFrontmatter(file) {
  const raw = read(file)
  if (raw === null) return null
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!m) {
    fail(`Missing or malformed frontmatter in ${rel(file)}`)
    return null
  }
  try {
    return { data: yaml.load(m[1]) || {}, body: (m[2] || '').trim() }
  } catch (err) {
    fail(`Invalid frontmatter YAML in ${rel(file)}: ${err.message}`)
    return null
  }
}

function validate(label, schema, data, file) {
  const result = schema.safeParse(data)
  if (result.success) return result.data
  for (const issue of result.error.issues) {
    const where = issue.path.length ? issue.path.join('.') : '(root)'
    fail(`${label}${file ? ` (${rel(file)})` : ''}: ${where}: ${issue.message}`)
  }
  return null
}

// Mirrors pickLocaleFile() in src/content/loader.js.
function pickFile(base, ext, locale, defaultLocale) {
  const candidates = [
    `${base}.${locale}.${ext}`,
    `${base}.${defaultLocale}.${ext}`,
    `${base}.${ext}`,
  ]
  for (const candidate of candidates) {
    const file = join(root, candidate)
    if (existsSync(file)) return file
  }
  return null
}

function readYaml(base, ext, locale, defaultLocale, label, schema) {
  const file = pickFile(base, ext, locale, defaultLocale)
  if (!file) {
    fail(`Missing ${base}.${ext} for locale "${locale}"`)
    return null
  }
  const data = parseYaml(file)
  return data === null ? null : validate(label, schema, data, file)
}

function readMd(base, locale, defaultLocale, label, schema) {
  const file = pickFile(base, 'md', locale, defaultLocale)
  if (!file) {
    fail(`Missing ${base}.md for locale "${locale}"`)
    return null
  }
  const parsed = parseFrontmatter(file)
  if (!parsed) return null
  const fm = validate(label, schema, parsed.data, file)
  return fm ? { ...fm, body: parsed.body, file } : null
}

// Resolves an image reference the same way loader.js does, and records it for
// the unused-asset report. Returns the absolute path, or null when invalid.
function resolveImage(ref, fromFile) {
  if (!ref) return null
  if (/^https?:\/\//.test(ref)) return null
  const target = ref.startsWith('/') ? join(root, ref) : resolve(dirname(fromFile), ref)
  if (!existsSync(target) || !statSync(target).isFile()) {
    fail(`Missing image "${ref}" referenced from ${rel(fromFile)}`)
    return null
  }
  referencedImages.add(target)
  return target
}

function walk(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name)
    return entry.isDirectory() ? walk(full) : [full]
  })
}

const withTrailingSlash = (value) => (value.endsWith('/') ? value : `${value}/`)

// ---------------------------------------------------------------- site config
const siteFile = join(root, 'content/site.yaml')
const siteRaw = parseYaml(siteFile)
const site = siteRaw ? validate('site', schemas.SiteSchema, siteRaw, siteFile) : null

if (!site) {
  for (const message of errors) console.error(`error: ${message}`)
  console.error('\nContent validation failed: content/site.yaml is invalid.')
  process.exit(1)
}

const defaultLocale = site.defaultLocale
const locales = site.availableLocales

resolveImage(site.profile.photo, siteFile)

// ------------------------------------------------------------- per-locale copy
for (const locale of locales) {
  readYaml('content/meta', 'yaml', locale, defaultLocale, 'meta', schemas.MetaSchema)
  readYaml('content/nav', 'yaml', locale, defaultLocale, 'nav', schemas.NavSchema)
  readYaml('content/footer', 'yaml', locale, defaultLocale, 'footer', schemas.FooterSchema)

  const hero = readMd('content/hero/hero', locale, defaultLocale, 'hero', schemas.HeroFrontmatterSchema)
  if (hero && !hero.body.trim()) fail(`hero (${rel(hero.file)}): body is empty`)

  const about = readMd('content/about/about', locale, defaultLocale, 'about', schemas.AboutFrontmatterSchema)
  if (about && !about.body.trim()) fail(`about (${rel(about.file)}): body is empty`)

  readYaml('content/about/stats', 'yaml', locale, defaultLocale, 'about.stats', schemas.AboutStatsSchema)
  readYaml('content/about/philosophy', 'yaml', locale, defaultLocale, 'about.philosophy', schemas.AboutPhilosophySchema)
  readYaml('content/projects/_index', 'yaml', locale, defaultLocale, 'projects.index', schemas.ProjectsIndexSchema)
  readYaml('content/projects/github', 'yaml', locale, defaultLocale, 'projects.github', schemas.GithubProjectsSchema)
  readYaml('content/experience/_index', 'yaml', locale, defaultLocale, 'experience.index', schemas.ExperienceIndexSchema)
  readYaml('content/experience/jobs', 'yaml', locale, defaultLocale, 'experience.jobs', schemas.JobsSchema)
  readYaml('content/skills/_index', 'yaml', locale, defaultLocale, 'skills.index', schemas.SkillsIndexSchema)
  readYaml('content/skills/groups', 'yaml', locale, defaultLocale, 'skills.groups', schemas.SkillsGroupsSchema)

  const contact = readMd('content/contact/contact', locale, defaultLocale, 'contact', schemas.ContactFrontmatterSchema)
  if (contact && !contact.body.trim()) fail(`contact (${rel(contact.file)}): body is empty`)
}

// ------------------------------------------------------------------- projects
const projectsDir = join(root, 'content/projects')
const projectBuckets = new Map()

for (const name of readdirSync(projectsDir)) {
  if (!name.endsWith('.md') || name.startsWith('_')) continue
  const file = join(projectsDir, name)
  const stem = name.replace(/\.md$/, '')
  const match = stem.match(/^(.+)\.([a-z]{2})$/)
  const base = match ? match[1] : stem
  const locale = match ? match[2] : 'none'
  if (!projectBuckets.has(base)) projectBuckets.set(base, {})
  projectBuckets.get(base)[locale] = file
}

for (const [base, byLocale] of projectBuckets) {
  if (!byLocale[defaultLocale] && !byLocale.none) {
    fail(`Project "${base}" has no ${defaultLocale} base file (found: ${Object.keys(byLocale).join(', ')})`)
  }

  for (const [locale, file] of Object.entries(byLocale)) {
    const parsed = parseFrontmatter(file)
    if (!parsed) continue
    const fm = validate(`project ${base}.${locale}`, schemas.ProjectFrontmatterSchema, parsed.data, file)
    if (!fm) continue

    if (fm.slug !== base) {
      fail(`project ${rel(file)}: slug "${fm.slug}" does not match filename "${base}"`)
    }

    resolveImage(fm.cover, file)
    for (const item of fm.gallery) resolveImage(item.src, file)
  }
}

// ------------------------------------------------------------ SEO / publishing
const publicDir = join(root, 'public')
const siteUrl = site.site.url

const ogImage = site.site.ogImage
if (!/^https?:\/\//.test(ogImage)) {
  fail(`site.ogImage must be an absolute URL (found "${ogImage}")`)
} else {
  const ogName = decodeURIComponent(new URL(ogImage).pathname.split('/').pop() || '')
  const ogFile = join(publicDir, ogName)
  if (!ogName || !existsSync(ogFile)) {
    fail(`site.ogImage points to a missing file: public/${ogName || '(none)'}`)
  } else {
    const png = readFileSync(ogFile)
    if (png.length > 24 && png.readUInt32BE(16) === 1200 && png.readUInt32BE(20) === 630) {
      // expected size
    } else if (extname(ogFile) === '.png') {
      warn(`public/${ogName} is not 1200x630 (most social cards prefer that size)`)
    }
  }
}

const sitemapFile = join(publicDir, 'sitemap.xml')
if (!existsSync(sitemapFile)) {
  fail('Missing public/sitemap.xml')
} else {
  const loc = read(sitemapFile)?.match(/<loc>([^<]+)<\/loc>/)?.[1]
  if (!loc) fail('public/sitemap.xml has no <loc> entry')
  else if (withTrailingSlash(loc) !== withTrailingSlash(siteUrl)) {
    fail(`public/sitemap.xml <loc> (${loc}) does not match site.site.url (${siteUrl})`)
  }
}

const robotsFile = join(publicDir, 'robots.txt')
if (!existsSync(robotsFile)) {
  fail('Missing public/robots.txt')
} else {
  const declared = read(robotsFile)?.match(/^Sitemap:\s*(\S+)/im)?.[1]
  const expected = new URL('sitemap.xml', withTrailingSlash(siteUrl)).href
  if (!declared) warn('public/robots.txt does not declare a Sitemap URL')
  else if (declared !== expected) fail(`public/robots.txt Sitemap (${declared}) should be ${expected}`)
}

const indexFile = join(root, 'index.html')
if (!existsSync(indexFile)) {
  fail('Missing index.html')
} else {
  const html = read(indexFile) || ''
  const ogUrl = html.match(/property="og:url" content="([^"]+)"/)?.[1]
  const ogMetaImage = html.match(/property="og:image" content="([^"]+)"/)?.[1]
  if (ogUrl !== siteUrl) fail(`index.html og:url (${ogUrl || 'missing'}) does not match site.site.url (${siteUrl})`)
  if (ogMetaImage !== ogImage) fail(`index.html og:image (${ogMetaImage || 'missing'}) does not match site.ogImage (${ogImage})`)
}

// ----------------------------------------------------------- unused image assets
const imageFiles = walk(join(root, 'content/images')).filter((file) =>
  /\.(png|jpe?g|webp|gif|svg|avif)$/i.test(file)
)
for (const file of imageFiles) {
  if (!referencedImages.has(file)) warn(`Unused image: ${rel(file)}`)
}

report()

function report() {
  for (const message of warnings) console.warn(`warning: ${message}`)
  for (const message of errors) console.error(`error: ${message}`)

  if (errors.length) {
    console.error(`\nContent validation failed with ${errors.length} error(s).`)
    process.exit(1)
  }

  const summary = `${projectBuckets.size} project(s), ${locales.length} locale(s), ${imageFiles.length} image(s)`
  console.log(`Content valid — ${summary}${warnings.length ? `, ${warnings.length} warning(s)` : ''}.`)
  process.exit(0)
}
