import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import Section from './Section.jsx'
import { experience } from '../content/loader.js'

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow={experience.eyebrow}
      title={experience.title}
      lede={experience.lede}>
      <ol className="relative border-l border-ink-200 dark:border-white/10 ml-3">
        {experience.jobs.map((job, i) => (
          <motion.li
            key={job.role + job.period}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="relative pl-8 pb-12 last:pb-0">
            <span className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-accent ring-4 ring-white dark:ring-ink-950" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-xl font-semibold">{job.role}</h3>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">
                {job.period}
              </span>
            </div>
            <p className="mt-1 text-accent-600 dark:text-accent-300">{job.company}</p>

            {job.appLinks && job.appLinks.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {job.appLinks.map(link => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-accent-500/20 dark:border-accent-400/20 bg-accent-500/5 hover:bg-accent-500/15 text-xs text-accent-600 dark:text-accent-300 px-2.5 py-1.5 transition font-medium">
                    <span>App Store: <strong>{link.name}</strong></span>
                    <ExternalLink size={12} className="opacity-80" />
                  </a>
                ))}
              </div>
            )}

            <ul className="mt-4 space-y-2 text-ink-700 dark:text-ink-200">
              {job.bullets.map((b, j) => (
                <li key={j} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-ink-400 dark:bg-ink-500" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </Section>
  )
}
