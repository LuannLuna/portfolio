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

function pickLocaleFile(map, basePath, ext, locale, defaultLocale) {
  const candidates = [
    `${basePath}.${locale}.${ext}`,
    `${basePath}.${defaultLocale}.${ext}`,
    `${basePath}.${ext}`,
  ]
  for (const c of candidates) if (c in map) return c
  return null
}

function readMd(basePath, locale, defaultLocale) {
  const path = pickLocaleFile(mdFiles, basePath, 'md', locale, defaultLocale)
  if (!path) throw new Error(`Missing markdown content: ${basePath}.md`)
  const { data, content } = parseFrontmatter(mdFiles[path])
  return { path, data, body: content }
}

function readYaml(basePath, locale, defaultLocale) {
  const path = pickLocaleFile(yamlFiles, basePath, 'yaml', locale, defaultLocale)
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

const siteRaw = readBareYaml('/content/site.yaml')
const locale = siteRaw.locale
const defaultLocale = siteRaw.defaultLocale

export const site = schemas.SiteSchema.parse(siteRaw)
export const nav = schemas.NavSchema.parse(readBareYaml('/content/nav.yaml'))
export const footer = schemas.FooterSchema.parse(readBareYaml('/content/footer.yaml'))

const heroRaw = readMd('/content/hero/hero', locale, defaultLocale)
export const hero = {
  ...schemas.HeroFrontmatterSchema.parse(heroRaw.data),
  body: heroRaw.body,
}

const aboutRaw = readMd('/content/about/about', locale, defaultLocale)
const aboutStatsRaw = readYaml('/content/about/stats', locale, defaultLocale)
const aboutPhilosophyRaw = readYaml('/content/about/philosophy', locale, defaultLocale)
export const about = {
  ...schemas.AboutFrontmatterSchema.parse(aboutRaw.data),
  body: aboutRaw.body,
  stats: schemas.AboutStatsSchema.parse(aboutStatsRaw.data).stats,
  philosophy: schemas.AboutPhilosophySchema.parse(aboutPhilosophyRaw.data).items,
}

function loadProjects() {
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
    const chosen = byLocale[locale] || byLocale[defaultLocale] || byLocale.none
    if (!chosen) continue
    const { data, content } = parseFrontmatter(chosen.raw)
    const fm = schemas.ProjectFrontmatterSchema.parse(data)
    items.push({
      ...fm,
      body: content,
      coverUrl: resolveCover(fm.cover, chosen.path),
    })
  }
  items.sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.slug.localeCompare(b.slug))
  return items
}

export const projects = loadProjects()

const projectsIndexRaw = readYaml('/content/projects/_index', locale, defaultLocale)
const _projectsMeta = schemas.ProjectsIndexSchema.parse(projectsIndexRaw.data)

function deriveAllTags(items, tagOrder) {
  const seen = new Set()
  for (const p of items) for (const t of p.tags) seen.add(t)
  const ordered = []
  for (const t of tagOrder) if (seen.has(t)) { ordered.push(t); seen.delete(t) }
  for (const t of [...seen].sort()) ordered.push(t)
  return ordered
}

export const projectsMeta = {
  ..._projectsMeta,
  allTags: deriveAllTags(projects, _projectsMeta.tagOrder),
}

const githubProjectsRaw = readYaml('/content/projects/github', locale, defaultLocale)
export const githubProjects = schemas.GithubProjectsSchema.parse(githubProjectsRaw.data).projects

const expIndexRaw = readYaml('/content/experience/_index', locale, defaultLocale)
const jobsRaw = readYaml('/content/experience/jobs', locale, defaultLocale)
export const experience = {
  ...schemas.ExperienceIndexSchema.parse(expIndexRaw.data),
  jobs: schemas.JobsSchema.parse(jobsRaw.data).jobs,
}

const skillsIndexRaw = readYaml('/content/skills/_index', locale, defaultLocale)
const skillsGroupsRaw = readYaml('/content/skills/groups', locale, defaultLocale)
export const skills = {
  ...schemas.SkillsIndexSchema.parse(skillsIndexRaw.data),
  groups: schemas.SkillsGroupsSchema.parse(skillsGroupsRaw.data).groups,
}

const contactRaw = readMd('/content/contact/contact', locale, defaultLocale)
export const contact = {
  ...schemas.ContactFrontmatterSchema.parse(contactRaw.data),
  body: contactRaw.body,
}
