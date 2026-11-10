import { z } from 'zod'

const Link = z.object({ href: z.string(), label: z.string() })
const Cta = z.object({ label: z.string(), href: z.string() })

export const SiteSchema = z.object({
  locale: z.string(),
  defaultLocale: z.string(),
  availableLocales: z.array(z.string()).min(1),
  site: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    url: z.string().url(),
    ogImage: z.string(),
    themeColor: z.string(),
  }),
  profile: z.object({
    name: z.string(),
    title: z.string().optional(),
    location: z.string().optional(),
    email: z.string().email(),
    phone: z.string().optional(),
    photo: z.string().optional(),
    photoAlt: z.string().optional(),
    shippedTo: z.array(z.string()),
    links: z.object({
      linkedin: z.string().url(),
      github: z.string().url(),
      resume: z.string(),
      schedule: z.string().url().optional(),
    }),
  }),
})

export const MetaSchema = z.object({
  title: z.string(),
  description: z.string(),
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
  location: z.string(),
  spec: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
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

export const ProjectLabelsSchema = z.object({
  filter: z.string().default('Filter'),
  openSource: z.string().default('Open source'),
  repositories: z.string().default('Selected repositories'),
  caseStudy: z.string().default('Case study'),
  role: z.string().default('My role'),
  challenges: z.string().default('Challenges'),
  decisions: z.string().default('Architecture & decisions'),
  impact: z.string().default('Impact'),
  stack: z.string().default('Stack'),
  tags: z.string().default('Tags'),
  screens: z.string().default('Screens'),
  close: z.string().default('Close'),
  next: z.string().default('Next project'),
})

export const ProjectsIndexSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  lede: z.string(),
  allLabel: z.string().default('All'),
  tagOrder: z.array(z.string()).default([]),
  labels: ProjectLabelsSchema.default({}),
})

export const ImpactSchema = z.object({
  metric: z.string(),
  label: z.string(),
})

export const GalleryItemSchema = z.object({
  src: z.string().min(1),
  alt: z.string().optional(),
  caption: z.string().optional(),
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
  coverFit: z.enum(['cover', 'contain']).optional().default('cover'),
  gallery: z.array(GalleryItemSchema).default([]),
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
