import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail, FileText, MapPin } from 'lucide-react'
import { profile } from '../data/profile.js'

export default function Hero() {
  return (
    <section id="top" className="relative pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div className="container-prose">
        <motion.p
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="eyebrow">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          Available for senior iOS roles · Q3 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-5 font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight">
          Senior iOS engineer who treats{' '}
          <span className="bg-gradient-to-r from-accent-500 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            milliseconds
          </span>{' '}
          like product features.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 max-w-2xl text-lg sm:text-xl text-ink-600 dark:text-ink-300 leading-relaxed">
          {profile.shortBio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#projects"
             className="group inline-flex items-center gap-2 rounded-xl bg-ink-900 dark:bg-white px-5 py-3
                        text-sm font-medium text-white dark:text-ink-900 hover:opacity-90 transition">
            See selected work
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a href={profile.links.resume} target="_blank" rel="noreferrer"
             className="inline-flex items-center gap-2 rounded-xl border border-ink-200 dark:border-white/10
                        px-5 py-3 text-sm font-medium hover:bg-ink-100/60 dark:hover:bg-white/5 transition">
            <FileText size={16} /> Resume
          </a>
          <div className="ml-2 flex items-center gap-1">
            <IconLink href={profile.links.github} label="GitHub"><Github size={18} /></IconLink>
            <IconLink href={profile.links.linkedin} label="LinkedIn"><Linkedin size={18} /></IconLink>
            <IconLink href={`mailto:${profile.email}`} label="Email"><Mail size={18} /></IconLink>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 flex items-center gap-2 text-sm text-ink-500 dark:text-ink-400">
          <MapPin size={14} /> {profile.location}
        </motion.div>

        {/* Logo strip */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">
            Shipped to production
          </p>
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3 text-ink-500 dark:text-ink-300">
            {profile.shippedTo.map(name => (
              <span key={name} className="font-display text-lg sm:text-xl tracking-tight opacity-80 hover:opacity-100 transition">
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function IconLink({ href, label, children }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label}
       className="grid h-10 w-10 place-items-center rounded-lg border border-ink-200 dark:border-white/10
                  hover:bg-ink-100 dark:hover:bg-white/5 transition">
      {children}
    </a>
  )
}
