import { ArrowUpRight } from 'lucide-react'
import Section from './Section.jsx'
import { useContent } from '../i18n/locale.jsx'

export default function Experience() {
  const { experience } = useContent()

  return (
    <Section
      id="experience"
      number="04"
      eyebrow={experience.eyebrow}
      title={experience.title}
      lede={experience.lede}>
      <ol className="border-t border-rule">
        {experience.jobs.map((job) => (
          <li
            key={job.role + job.period}
            className="grid grid-cols-12 gap-x-6 gap-y-5 border-b border-rule py-8">
            <div className="col-span-12 lg:col-span-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                {job.period}
              </p>
              {job.current && (
                <span className="mt-2 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-signal">
                  <span className="h-1.5 w-1.5 bg-signal" aria-hidden="true" />
                  Current
                </span>
              )}
            </div>

            <div className="col-span-12 lg:col-span-4">
              <h3 className="font-display text-2xl font-bold leading-tight tracking-[-0.03em]">
                {job.role}
              </h3>
              <p className="mt-1 text-[14px] leading-relaxed text-muted">{job.company}</p>

              {job.appLinks && job.appLinks.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                  {job.appLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink transition-colors hover:text-signal">
                      {link.name}
                      <ArrowUpRight size={11} strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              )}
            </div>

            <ul className="col-span-12 space-y-3 lg:col-span-6">
              {job.bullets.map((bullet, index) => (
                <li
                  key={index}
                  className="grid grid-cols-[1.25rem_1fr] gap-2 text-[14px] leading-relaxed text-muted">
                  <span className="mt-[0.55em] h-1 w-1 bg-signal" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  )
}
