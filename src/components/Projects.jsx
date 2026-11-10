import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, X } from 'lucide-react'
import Section from './Section.jsx'
import Markdown from './Markdown.jsx'
import TagFilter from './TagFilter.jsx'
import { useContent } from '../i18n/locale.jsx'

export default function Projects() {
  const { projects, projectsMeta, githubProjects } = useContent()
  const { labels } = projectsMeta
  const [active, setActive] = useState(null)
  const [tag, setTag] = useState(null)

  const visible = useMemo(
    () => (tag ? projects.filter((project) => project.tags.includes(tag)) : projects),
    [tag, projects]
  )

  const counts = useMemo(() => {
    const result = { all: projects.length }
    for (const project of projects) {
      for (const item of project.tags) result[item] = (result[item] || 0) + 1
    }
    return result
  }, [projects])

  const activeIndex = active ? projects.findIndex((project) => project.slug === active.slug) : -1
  const nextProject =
    activeIndex >= 0 ? projects[(activeIndex + 1) % projects.length] : null

  return (
    <Section
      id="projects"
      number="02"
      eyebrow={projectsMeta.eyebrow}
      title={projectsMeta.title}
      lede={projectsMeta.lede}>
      <TagFilter
        tags={projectsMeta.allTags}
        active={tag}
        onChange={setTag}
        allLabel={projectsMeta.allLabel}
        counts={counts}
        label={labels.filter}
      />

      <div className="border-t border-rule">
        {visible.map((project) => (
          <ProjectRow
            key={project.slug}
            project={project}
            index={projects.indexOf(project)}
            labels={labels}
            onOpen={() => setActive(project)}
          />
        ))}
      </div>

      <OpenSource projects={githubProjects} labels={labels} />

      {active &&
        createPortal(
          <ProjectModal
            key={active.slug}
            project={active}
            labels={labels}
            nextProject={nextProject}
            onNext={setActive}
            onClose={() => setActive(null)}
          />,
          document.body
        )}
    </Section>
  )
}

function ProjectRow({ project, index, labels, onOpen }) {
  const impact = project.impact[0]

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group grid w-full grid-cols-12 gap-x-6 gap-y-5 border-b border-rule py-8 text-left">
      <span className="col-span-2 font-mono text-[10px] tracking-[0.16em] text-muted transition-colors group-hover:text-signal sm:col-span-1">
        {String(index + 1).padStart(2, '0')}
      </span>

      <span className="col-span-10 sm:col-span-11 lg:col-span-5">
        <span className="meta block">
          {project.company} / {project.period}
        </span>
        <span className="mt-2 block font-display text-[clamp(1.7rem,2.8vw,2.6rem)] font-bold leading-[0.98] tracking-[-0.04em]">
          {project.title}
        </span>
        <span className="mt-3 block max-w-md text-[15px] leading-relaxed text-muted">
          {project.tagline}
        </span>
        <span className="mt-4 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          {project.tags.join(' / ')}
        </span>
      </span>

      <span className="col-span-12 sm:col-span-6 lg:col-span-2">
        {impact && (
          <>
            <span className="meta block">{labels.impact}</span>
            <span className="mt-2 block font-display text-xl font-bold leading-tight tracking-[-0.03em]">
              {impact.metric}
            </span>
            <span className="mt-1 block text-[11px] leading-snug text-muted">
              {impact.label}
            </span>
          </>
        )}
      </span>

      <span className="col-span-12 sm:col-span-6 lg:col-span-4">
        {project.coverUrl ? (
          <span className="block aspect-[5/2] overflow-hidden border border-rule bg-surface">
            <img
              src={project.coverUrl}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
            />
          </span>
        ) : (
          <span className="flex aspect-[5/2] items-center justify-center border border-rule bg-surface font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            No cover
          </span>
        )}
      </span>

      <span className="col-span-12 flex items-center justify-between border-t border-rule pt-3 lg:hidden">
        <span className="meta">{labels.caseStudy}</span>
        <ArrowUpRight size={14} strokeWidth={1.5} />
      </span>
    </button>
  )
}

function OpenSource({ projects, labels }) {
  if (!projects || projects.length === 0) return null

  return (
    <div className="mt-20">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule pb-4">
        <div>
          <p className="eyebrow">{labels.openSource}</p>
          <h3 className="mt-2 font-display text-3xl font-bold tracking-[-0.04em]">
            {labels.repositories}
          </h3>
        </div>
        <span className="meta">{String(projects.length).padStart(2, '0')}</span>
      </div>

      <ul>
        {projects.map((project, index) => (
          <li key={project.name} className="border-b border-rule">
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="group grid grid-cols-12 gap-x-6 gap-y-2 py-6">
              <span className="col-span-1 font-mono text-[10px] text-muted transition-colors group-hover:text-signal">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="col-span-11 flex items-baseline justify-between gap-4 lg:col-span-3">
                <span className="font-display text-2xl font-bold tracking-[-0.03em]">
                  {project.name}
                </span>
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.5}
                  className="text-muted transition-colors group-hover:text-signal"
                />
              </span>
              <span className="col-span-12 text-[14px] leading-relaxed text-muted lg:col-span-5">
                {project.description}
              </span>
              <span className="col-span-12 font-mono text-[10px] uppercase tracking-[0.14em] text-muted lg:col-span-3">
                {project.stack.join(' / ')}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ProjectModal({ project, labels, nextProject, onNext, onClose }) {
  const sheetRef = useRef(null)

  useEffect(() => {
    const previous = document.activeElement
    const sheet = sheetRef.current
    const focusables = sheet
      ? [...sheet.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])')]
      : []
    focusables[0]?.focus()

    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab' || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [onClose])

  return (
    <div
      className="overlay-in fixed inset-0 z-50 overflow-y-auto bg-ink/80"
      onClick={onClose}>
      <div className="flex min-h-full justify-center p-0 sm:p-6">
        <div
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          onClick={(event) => event.stopPropagation()}
          className="sheet-in relative flex w-full max-w-[1400px] flex-col bg-paper sm:max-h-[calc(100vh-3rem)]">
          <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-rule bg-paper px-5 py-3 sm:px-8">
            <p className="meta truncate">
              {labels.caseStudy} / {project.company} / {project.period}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label={labels.close}
              className="grid h-11 w-11 flex-none place-items-center border border-rule text-muted transition-colors hover:border-ink hover:text-ink sm:h-9 sm:w-9">
              <X size={16} strokeWidth={1.5} />
            </button>
          </header>

          <div className="overflow-y-auto">
            <div className="container-grid py-10 sm:py-14">
              <div className="grid grid-cols-12 gap-x-6 gap-y-8">
                <div className="col-span-12 lg:col-span-9">
                  <h2
                    id="case-study-title"
                    className="display text-balance text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[0.9]">
                    {project.title}
                  </h2>
                  <p className="mt-5 max-w-3xl text-pretty text-lg leading-relaxed text-muted">
                    {project.tagline}
                  </p>
                </div>

                <aside className="col-span-12 lg:col-span-3">
                  <dl className="border-t border-rule">
                    <ModalMeta label={labels.stack} value={project.stack.join(' / ')} />
                    <ModalMeta label={labels.tags} value={project.tags.join(' / ')} />
                  </dl>
                </aside>
              </div>

              {project.coverUrl && (
                <figure className="mt-10 border border-rule">
                  <img src={project.coverUrl} alt="" className="w-full" />
                  <figcaption className="flex items-baseline justify-between gap-4 border-t border-rule px-4 py-2">
                    <span className="meta">Fig. 01 — {project.title}</span>
                    <span className="meta">{project.period}</span>
                  </figcaption>
                </figure>
              )}

              <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-12">
                <div className="col-span-12 lg:col-span-8">
                  <p className="eyebrow">{labels.caseStudy}</p>
                  {project.body && <Markdown>{project.body}</Markdown>}
                  <Gallery items={project.gallery} labels={labels} />
                </div>

                <aside className="col-span-12 space-y-10 lg:col-span-4">
                  <div>
                    <p className="eyebrow">{labels.role}</p>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">
                      {project.role}
                    </p>
                  </div>

                  {project.challenges.length > 0 && (
                    <ListBlock title={labels.challenges} items={project.challenges} />
                  )}
                  {project.decisions.length > 0 && (
                    <ListBlock title={labels.decisions} items={project.decisions} />
                  )}
                  {project.impact.length > 0 && (
                    <ImpactTable items={project.impact} label={labels.impact} />
                  )}
                </aside>
              </div>

              {nextProject && nextProject.slug !== project.slug && (
                <div className="mt-16 border-t border-rule pt-6">
                  <button
                    type="button"
                    onClick={() => onNext(nextProject)}
                    className="group flex w-full flex-wrap items-baseline justify-between gap-4 text-left">
                    <span className="meta">{labels.next}</span>
                    <span className="flex items-center gap-3 font-display text-2xl font-bold tracking-[-0.03em] transition-colors group-hover:text-signal sm:text-3xl">
                      {nextProject.title}
                      <ArrowUpRight size={18} strokeWidth={1.5} />
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ModalMeta({ label, value }) {
  return (
    <div className="border-b border-rule py-3">
      <dt className="meta">{label}</dt>
      <dd className="mt-1 font-mono text-[11px] leading-relaxed text-ink">{value}</dd>
    </div>
  )
}

function Gallery({ items, labels }) {
  if (!items || items.length === 0) return null

  return (
    <div className="mt-12">
      <p className="eyebrow">
        {labels.screens} — {String(items.length).padStart(2, '0')}
      </p>
      <ul className="mt-4 flex snap-x gap-4 overflow-x-auto pb-4">
        {items.map((item, index) => (
          <li key={`${item.url}-${index}`} className="w-[180px] flex-none snap-start sm:w-[210px]">
            <a href={item.url} target="_blank" rel="noreferrer" className="group block">
              <span className="block aspect-[9/19.5] overflow-hidden border border-rule bg-surface">
                <img
                  src={item.url}
                  alt={item.alt || item.caption || ''}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </span>
              {item.caption && (
                <span className="mt-2 block text-[11px] leading-snug text-muted">
                  {item.caption}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ListBlock({ title, items }) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <ul className="mt-3 border-t border-rule">
        {items.map((item, index) => (
          <li
            key={index}
            className="grid grid-cols-[2rem_1fr] gap-2 border-b border-rule py-3 text-[14px] leading-relaxed text-muted">
            <span className="font-mono text-[10px] text-signal">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ImpactTable({ items, label }) {
  return (
    <div>
      <p className="eyebrow">{label}</p>
      <dl className="mt-3 border-t border-rule">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-baseline justify-between gap-4 border-b border-rule py-3">
            <dt className="max-w-[60%] text-[12px] leading-snug text-muted">{item.label}</dt>
            <dd className="text-right font-display text-lg font-bold tracking-[-0.03em]">
              {item.metric}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
