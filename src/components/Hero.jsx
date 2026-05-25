import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail, FileText, MapPin } from 'lucide-react'
import { useContent } from '../i18n/locale.jsx'

const APP_STORE_LINKS = {
  "Petz": "https://apps.apple.com/br/app/petz-tudo-que-seu-pet-precisa/id1250491446",
  "LTK": "https://apps.apple.com/br/app/ltk-liketoknow-it/id1154027990",
  "Next": "https://apps.apple.com/br/app/next-conta-digital-e-cart%C3%A3o/id1133682678",
  "G1": "https://apps.apple.com/br/app/g1-portal-de-not%C3%ADcias-da-globo/id413333281",
  "GE": "https://apps.apple.com/br/app/ge-not%C3%ADcias-de-esportes/id361393520",
  "Dafiti": "https://apps.apple.com/br/app/dafiti-shopping-no-seu-bolso/id564924168",
  "TocaLivros": "https://apps.apple.com/br/app/audiolivros-da-tocalivros/id919766261"
}

export default function Hero() {
  const { hero, site } = useContent()
  const { profile } = site
  return (
    <section id="top" className="relative pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div className="container-prose">
        <motion.p
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="eyebrow">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          {hero.availability}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-5 font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight">
          {hero.headline.lead}{' '}
          <span className="bg-gradient-to-r from-accent-500 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            {hero.headline.highlight}
          </span>{' '}
          {hero.headline.trail}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 max-w-2xl text-lg sm:text-xl text-ink-600 dark:text-ink-300 leading-relaxed">
          {hero.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex flex-wrap items-center gap-3">
          <a href={hero.ctaPrimary.href}
             className="group inline-flex items-center gap-2 rounded-xl bg-ink-900 dark:bg-white px-5 py-3
                        text-sm font-medium text-white dark:text-ink-900 hover:opacity-90 transition">
            {hero.ctaPrimary.label}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a href={hero.ctaSecondary.href} target="_blank" rel="noreferrer"
             className="inline-flex items-center gap-2 rounded-xl border border-ink-200 dark:border-white/10
                        px-5 py-3 text-sm font-medium hover:bg-ink-100/60 dark:hover:bg-white/5 transition">
            <FileText size={16} /> {hero.ctaSecondary.label}
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
          <MapPin size={14} /> {hero.location}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">
            {hero.shippedToLabel}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3 text-ink-500 dark:text-ink-300">
            {profile.shippedTo.map(name => {
              const url = APP_STORE_LINKS[name]
              if (url) {
                return (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-display text-lg sm:text-xl tracking-tight opacity-80 hover:opacity-100 hover:text-accent-500 dark:hover:text-accent-300 transition duration-200">
                    {name}
                  </a>
                )
              }
              return (
                <span key={name} className="font-display text-lg sm:text-xl tracking-tight opacity-40">
                  {name}
                </span>
              )
            })}
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
