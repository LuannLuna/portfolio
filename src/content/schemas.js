import { z } from 'zod'

const Link = z.object({ href: z.string(), label: z.string() })
const Cta = z.object({ label: z.string(), href: z.string() })

export const SiteSchema = z.object({
  locale: z.string(),
  defaultLocale: z.string(),
  availableLocales: z.array(z.string()).min(1),
  site: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().url(),
    ogImage: z.string(),
    themeColor: z.string(),
  }),
  profile: z.object({
    name: z.string(),
    title: z.string(),
    location: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    shippedTo: z.array(z.string()),
    links: z.object({
      linkedin: z.string().url(),
      github: z.string().url(),
      resume: z.string(),
      schedule: z.string().url().optional(),
    }),
  }),
})

export const NavSchema = z.object({
  brand: z.object({ short: z.string(), full: z.string() }),
  links: z.array(Link).min(1),
})

export const FooterSchema = z.object({
  copy: z.string(),
  craftedIn: z.string(),
})

export const HeroFrontmatterSchema = z.object({
  availability: z.string(),
  headline: z.object({
    lead: z.string(),
    highlight: z.string(),
    trail: z.string(),
  }),
  ctaPrimary: Cta,
  ctaSecondary: Cta,
  shippedToLabel: z.string(),
})

export const AboutFrontmatterSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  lede: z.string(),
  howIWorkLabel: z.string(),
})

export const AboutStatsSchema = z.object({
  stats: z.array(z.object({ value: z.string(), label: z.string() })).min(1),
})

export const AboutPhilosophySchema = z.object({
  items: z.array(z.string()).min(1),
})

export const ProjectsIndexSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  lede: z.string(),
  allLabel: z.string().default('All'),
  tagOrder: z.array(z.string()).default([]),
})

export const ImpactSchema = z.object({
  metric: z.string(),
  label: z.string(),
})

export const ProjectFrontmatterSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  company: z.string().min(1),
  period: z.string().min(1),
  order: z.number().int().optional(),
  featured: z.boolean().optional().default(false),
  tagline: z.string().min(1),
  role: z.string().min(1),
  cover: z.string().optional().default(''),
  tags: z.array(z.string()).default([]),
  stack: z.array(z.string()).min(1),
  challenges: z.array(z.string()).default([]),
  decisions: z.array(z.string()).default([]),
  impact: z.array(ImpactSchema).default([]),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }).optional(),
})

export const ExperienceIndexSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  lede: z.string(),
})

export const JobsSchema = z.object({
  jobs: z.array(z.object({
    role: z.string(),
    company: z.string(),
    period: z.string(),
    current: z.boolean().optional().default(false),
    appLinks: z.array(z.object({ name: z.string(), url: z.string().url() })).optional(),
    bullets: z.array(z.string()).min(1),
  })).min(1),
})

export const GithubProjectSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  description: z.string(),
  stack: z.array(z.string()),
})

export const GithubProjectsSchema = z.object({
  projects: z.array(GithubProjectSchema),
})

export const SkillsIndexSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  lede: z.string(),
})

export const SkillsGroupsSchema = z.object({
  groups: z.array(z.object({
    title: z.string(),
    items: z.array(z.string()).min(1),
  })).min(1),
})

export const ContactFrontmatterSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  lede: z.string(),
  linkedinDisplay: z.string(),
  githubDisplay: z.string(),
})
