import yaml from 'js-yaml'
import * as schemas from './schemas.js'

const mdFiles   = import.meta.glob('/content/**/*.md',    { eager: true, query: '?raw', import: 'default' })
const yamlFiles = import.meta.glob('/content/**/*.yaml',  { eager: true, query: '?raw', import: 'default' })
const imageUrls = import.meta.glob('/content/images/**/*', { eager: true, query: '?url', import: 'default' })

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!m) return { data: {}, content: raw.trim() }
  return { data: yaml.load(m[1]) || {}, content: (m[2] || '').trim() }
}

function pickLocaleFile(map, basePath, ext, locale, defaultLoc) {
  const candidates = [
    `${basePath}.${locale}.${ext}`,
    `${basePath}.${defaultLoc}.${ext}`,
    `${basePath}.${ext}`,
  ]
  for (const c of candidates) if (c in map) return c
  return null
}

function readMd(basePath, locale, defaultLoc) {
  const path = pickLocaleFile(mdFiles, basePath, 'md', locale, defaultLoc)
  if (!path) throw new Error(`Missing markdown content: ${basePath}.md`)
  const { data, content } = parseFrontmatter(mdFiles[path])
  return { path, data, body: content }
}

function readYaml(basePath, locale, defaultLoc) {
  const path = pickLocaleFile(yamlFiles, basePath, 'yaml', locale, defaultLoc)
  if (!path) throw new Error(`Missing yaml content: ${basePath}.yaml`)
  return { path, data: yaml.load(yamlFiles[path]) }
}

function readBareYaml(path) {
  if (!(path in yamlFiles)) throw new Error(`Missing yaml content: ${path}`)
  return yaml.load(yamlFiles[path])
}

function resolveCover(coverPath, mdAbsPath) {
  if (!coverPath) return undefined
  if (/^https?:\/\//.test(coverPath)) return coverPath
  if (coverPath.startsWith('/')) return imageUrls[coverPath]
  const dir = mdAbsPath.replace(/\/[^/]+$/, '/')
  const resolved = new URL(coverPath, `https://x${dir}`).pathname
  return imageUrls[resolved]
}

function deriveAllTags(items, tagOrder) {
  const seen = new Set()
  for (const p of items) for (const t of p.tags) seen.add(t)
  const ordered = []
  for (const t of tagOrder) if (seen.has(t)) { ordered.push(t); seen.delete(t) }
  for (const t of [...seen].sort()) ordered.push(t)
  return ordered
}

function loadProjects(locale, defaultLoc) {
  const buckets = new Map()
  for (const [path, raw] of Object.entries(mdFiles)) {
    if (!path.startsWith('/content/projects/')) continue
    const filename = path.split('/').pop()
    if (filename.startsWith('_')) continue
    const stem = filename.replace(/\.md$/, '')
    const m = stem.match(/^(.+)\.([a-z]{2})$/)
    const base = m ? m[1] : stem
    const fileLocale = m ? m[2] : 'none'
    if (!buckets.has(base)) buckets.set(base, {})
    buckets.get(base)[fileLocale] = { path, raw }
  }
  const items = []
  for (const byLocale of buckets.values()) {
    const chosen = byLocale[locale] || byLocale[defaultLoc] || byLocale.none
    if (!chosen) continue
    const { data, content } = parseFrontmatter(chosen.raw)
    const fm = schemas.ProjectFrontmatterSchema.parse(data)
    items.push({ ...fm, body: content, coverUrl: resolveCover(fm.cover, chosen.path) })
  }
  items.sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.slug.localeCompare(b.slug))
  return items
}

// --- bootstrap: locale-independent config read once ---
const siteRaw = readBareYaml('/content/site.yaml')
export const defaultLocale = siteRaw.defaultLocale
export const availableLocales = siteRaw.availableLocales

const _cache = new Map()

// Build the full, validated content tree for a locale. Memoized per locale.
// Falls back to defaultLocale files when a translation is missing (see pickLocaleFile).
export function getContent(locale) {
  if (_cache.has(locale)) return _cache.get(locale)
  const dl = defaultLocale

  const siteParsed = schemas.SiteSchema.parse(siteRaw)
  const meta = schemas.MetaSchema.parse(readYaml('/content/meta', locale, dl).data)
  const site = {
    ...siteParsed,
    site: { ...siteParsed.site, title: meta.title, description: meta.description },
  }

  const nav = schemas.NavSchema.parse(readYaml('/content/nav', locale, dl).data)
  const footer = schemas.FooterSchema.parse(readYaml('/content/footer', locale, dl).data)

  const heroRaw = readMd('/content/hero/hero', locale, dl)
  const hero = { ...schemas.HeroFrontmatterSchema.parse(heroRaw.data), body: heroRaw.body }

  const aboutRaw = readMd('/content/about/about', locale, dl)
  const about = {
    ...schemas.AboutFrontmatterSchema.parse(aboutRaw.data),
    body: aboutRaw.body,
    stats: schemas.AboutStatsSchema.parse(readYaml('/content/about/stats', locale, dl).data).stats,
    philosophy: schemas.AboutPhilosophySchema.parse(readYaml('/content/about/philosophy', locale, dl).data).items,
  }

  const projects = loadProjects(locale, dl)
  const projectsIndex = schemas.ProjectsIndexSchema.parse(readYaml('/content/projects/_index', locale, dl).data)
  const projectsMeta = { ...projectsIndex, allTags: deriveAllTags(projects, projectsIndex.tagOrder) }

  const githubProjects = schemas.GithubProjectsSchema
    .parse(readYaml('/content/projects/github', locale, dl).data).projects

  const experience = {
    ...schemas.ExperienceIndexSchema.parse(readYaml('/content/experience/_index', locale, dl).data),
    jobs: schemas.JobsSchema.parse(readYaml('/content/experience/jobs', locale, dl).data).jobs,
  }

  const skills = {
    ...schemas.SkillsIndexSchema.parse(readYaml('/content/skills/_index', locale, dl).data),
    groups: schemas.SkillsGroupsSchema.parse(readYaml('/content/skills/groups', locale, dl).data).groups,
  }

  const contactRaw = readMd('/content/contact/contact', locale, dl)
  const contact = { ...schemas.ContactFrontmatterSchema.parse(contactRaw.data), body: contactRaw.body }

  const content = {
    site, nav, footer, hero, about,
    projects, projectsMeta, githubProjects,
    experience, skills, contact,
  }
  _cache.set(locale, content)
  return content
}
