import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X, Github } from 'lucide-react'
import Section from './Section.jsx'
import Markdown from './Markdown.jsx'
import TagFilter from './TagFilter.jsx'
import { useContent } from '../i18n/locale.jsx'

export default function Projects() {
  const { projects, projectsMeta, githubProjects } = useContent()
  const [active, setActive] = useState(null)
  const [tag, setTag] = useState(null)

  const visible = useMemo(
    () => (tag ? projects.filter(p => p.tags.includes(tag)) : projects),
    [tag, projects]
  )

  return (
    <Section
      id="projects"
      eyebrow={projectsMeta.eyebrow}
      title={projectsMeta.title}
      lede={projectsMeta.lede}>
      <TagFilter
        tags={projectsMeta.allTags}
        active={tag}
        onChange={setTag}
        allLabel={projectsMeta.allLabel}
      />

      <motion.div layout className="grid gap-6 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.button
              key={p.slug}
              layout
              onClick={() => setActive(p)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group relative text-left card overflow-hidden hover:shadow-glow hover:-translate-y-0.5 transition-all">
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full
                                         bg-accent-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition" />
              {p.coverUrl && (
                <div className={`aspect-[16/9] w-full overflow-hidden border-b border-ink-200/70 dark:border-white/10
                                ${p.coverFit === 'contain' ? 'bg-ink-50 dark:bg-white/5' : ''}`}>
                  <img
                    src={p.coverUrl}
                    alt=""
                    loading="lazy"
                    className={`h-full w-full transition-transform duration-500 group-hover:scale-105
                               ${p.coverFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                  />
                </div>
              )}
              <div className="p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent-600 dark:text-accent-300">
                      {p.company} · {p.period}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{p.title}</h3>
                  </div>
                  <ArrowUpRight size={20} className="flex-none text-ink-400 group-hover:text-accent transition" />
                </div>
                <p className="mt-3 text-ink-600 dark:text-ink-300">{p.tagline}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.slice(0, 5).map(s => <span key={s} className="chip">{s}</span>)}
                  {p.stack.length > 5 && <span className="chip">+{p.stack.length - 5}</span>}
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Open Source Highlights Section */}
      <div className="mt-20 sm:mt-28 border-t border-ink-200/50 dark:border-white/5 pt-16">
        <div className="max-w-3xl">
          <p className="eyebrow">
            <Github size={14} /> Open Source
          </p>
          <h3 className="mt-3 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-ink-900 dark:text-white">
            Featured GitHub Repositories
          </h3>
          <p className="mt-2 text-ink-600 dark:text-ink-300">
            A selection of native iOS libraries, toolkits, and architecture blueprints illustrating modern Swift patterns, modular architecture, and platform APIs.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {githubProjects.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group card p-6 hover:shadow-glow hover:-translate-y-0.5 hover:border-accent-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-ink-900 dark:text-white group-hover:text-accent-500 dark:group-hover:text-accent-300 transition duration-200">
                    <Github size={18} className="opacity-80" />
                    <span className="font-mono text-sm font-semibold tracking-tight">{p.name}</span>
                  </div>
                  <ArrowUpRight size={16} className="text-ink-400 group-hover:text-accent transition duration-200" />
                </div>
                <p className="mt-4 text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
                  {p.description}
                </p>
              </div>
              <div className="mt-6">
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map(s => (
                    <span key={s} className="inline-flex items-center rounded-full bg-ink-50 dark:bg-white/5 border border-ink-100 dark:border-white/5 px-2 py-0.5 text-[10px] font-medium text-ink-700 dark:text-ink-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
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
            <h3 className="mt-1 font-display text-2xl font-semibold">{project.title}</h3>
          </div>
          <button onClick={onClose}
                  className="grid h-9 w-9 flex-none place-items-center rounded-lg border border-ink-200 dark:border-white/10
                             hover:bg-ink-100 dark:hover:bg-white/5">
            <X size={16} />
          </button>
        </div>

        {project.coverUrl && (
          <div className={`w-full aspect-[16/9] overflow-hidden
                          ${project.coverFit === 'contain' ? 'bg-ink-50 dark:bg-white/5' : ''}`}>
            <img
              src={project.coverUrl}
              alt=""
              className={`h-full w-full ${project.coverFit === 'contain' ? 'object-contain' : 'object-cover'}`}
            />
          </div>
        )}

        <div className="px-6 sm:px-8 py-6 space-y-8">
          <p className="text-lg text-ink-700 dark:text-ink-200 leading-relaxed">{project.tagline}</p>

          {project.gallery.length > 0 && <Gallery items={project.gallery} />}

          {project.impact.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.impact.map(m => (
                <div key={m.label} className="rounded-xl border border-ink-200 dark:border-white/10 p-4 bg-ink-50/60 dark:bg-white/5">
                  <div className="font-display text-xl font-semibold">{m.metric}</div>
                  <div className="mt-1 text-xs text-ink-500 dark:text-ink-400 leading-snug">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          <Block title="My role" body={project.role} />
          {project.challenges.length > 0 && <ListBlock title="Challenges" items={project.challenges} />}
          {project.decisions.length > 0 && <ListBlock title="Architecture & decisions" items={project.decisions} />}

          {project.body && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400 mb-3">Case study</h4>
              <Markdown>{project.body}</Markdown>
            </div>
          )}

          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">Tech</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map(s => <span key={s} className="chip">{s}</span>)}
            </div>
          </div>

          {project.tags.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">Tags</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map(t => <span key={t} className="chip">{t}</span>)}
              </div>
            </div>
          )}
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

function Gallery({ items }) {
  return (
    <div>
      <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400 mb-3">
        Screens
      </h4>
      <div className="-mx-6 sm:-mx-8 px-6 sm:px-8 overflow-x-auto pb-2
                      [scrollbar-width:thin]">
        <ul className="flex gap-4 snap-x snap-mandatory">
          {items.map((g, i) => (
            <li key={i} className="snap-start flex-none w-[180px] sm:w-[200px]">
              <a
                href={g.url}
                target="_blank"
                rel="noreferrer"
                className="group block">
                <div className="aspect-[9/19.5] overflow-hidden rounded-2xl border border-ink-200 dark:border-white/10
                                bg-ink-50 dark:bg-white/5 shadow-sm group-hover:shadow-glow transition">
                  <img
                    src={g.url}
                    alt={g.alt || g.caption || ''}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                {g.caption && (
                  <p className="mt-2 text-xs text-ink-500 dark:text-ink-400 leading-snug">
                    {g.caption}
                  </p>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
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
