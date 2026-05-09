import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import Section from './Section.jsx'
import { projects } from '../data/projects.js'

export default function Projects() {
  const [active, setActive] = useState(null)

  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title="Projects where the architecture choice was the product choice."
      lede="A short list of the work I'm proudest of — picked because the constraints were real, the tradeoffs were visible, and the impact was measurable.">
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((p, i) => (
          <motion.button
            key={p.slug}
            onClick={() => setActive(p)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group relative text-left card p-6 sm:p-7 overflow-hidden hover:shadow-glow hover:-translate-y-0.5 transition-all">
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full
                                       bg-accent-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition" />
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent-600 dark:text-accent-300">
                  {p.company} · {p.period}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{p.name}</h3>
              </div>
              <ArrowUpRight size={20} className="flex-none text-ink-400 group-hover:text-accent transition" />
            </div>
            <p className="mt-3 text-ink-600 dark:text-ink-300">{p.tagline}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.stack.slice(0, 5).map(s => <span key={s} className="chip">{s}</span>)}
              {p.stack.length > 5 && <span className="chip">+{p.stack.length - 5}</span>}
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </Section>
  )
}

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-end sm:place-items-center p-0 sm:p-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm"
      />
      <motion.div
        role="dialog" aria-modal="true"
        initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
        transition={{ type: 'spring', damping: 24, stiffness: 220 }}
        className="relative w-full sm:max-w-3xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl
                   border border-ink-200 dark:border-white/10 bg-white dark:bg-ink-900 shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-ink-200/70 dark:border-white/10
                        bg-white/90 dark:bg-ink-900/90 backdrop-blur px-6 sm:px-8 py-5">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent-600 dark:text-accent-300">
              {project.company} · {project.period}
            </p>
            <h3 className="mt-1 font-display text-2xl font-semibold">{project.name}</h3>
          </div>
          <button onClick={onClose}
                  className="grid h-9 w-9 flex-none place-items-center rounded-lg border border-ink-200 dark:border-white/10
                             hover:bg-ink-100 dark:hover:bg-white/5">
            <X size={16} />
          </button>
        </div>

        <div className="px-6 sm:px-8 py-6 space-y-8">
          <p className="text-lg text-ink-700 dark:text-ink-200 leading-relaxed">{project.tagline}</p>

          {/* Impact */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.impact.map(m => (
              <div key={m.label} className="rounded-xl border border-ink-200 dark:border-white/10 p-4 bg-ink-50/60 dark:bg-white/5">
                <div className="font-display text-xl font-semibold">{m.metric}</div>
                <div className="mt-1 text-xs text-ink-500 dark:text-ink-400 leading-snug">{m.label}</div>
              </div>
            ))}
          </div>

          <Block title="Overview" body={project.overview} />
          <Block title="My role" body={project.role} />
          <ListBlock title="Challenges" items={project.challenges} />
          <ListBlock title="Architecture & decisions" items={project.decisions} />
          <Block title="Lessons learned" body={project.lessons} />

          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">Tech</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map(s => <span key={s} className="chip">{s}</span>)}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Block({ title, body }) {
  return (
    <div>
      <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">{title}</h4>
      <p className="mt-3 text-ink-700 dark:text-ink-200 leading-relaxed">{body}</p>
    </div>
  )
}
function ListBlock({ title, items }) {
  return (
    <div>
      <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">{title}</h4>
      <ul className="mt-3 space-y-2">
        {items.map((it, i) => (
          <li key={i} className="flex gap-3 text-ink-700 dark:text-ink-200">
            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
