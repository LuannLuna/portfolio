import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Section from './Section.jsx'
import { useContent } from '../i18n/locale.jsx'
import { Sparkles } from 'lucide-react'

export default function About() {
  const { about } = useContent()
  return (
    <Section
      id="about"
      eyebrow={about.eyebrow}
      title={about.title}
      lede={about.lede}>
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-6 text-ink-700 dark:text-ink-200 leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{ p: ({ node, ...props }) => <p {...props} /> }}>
            {about.body}
          </ReactMarkdown>
          <div className="card p-6">
            <div className="flex items-center gap-2 text-accent-600 dark:text-accent-300">
              <Sparkles size={16} /> <span className="text-xs font-mono uppercase tracking-[0.2em]">{about.howIWorkLabel}</span>
            </div>
            <ul className="mt-4 space-y-3">
              {about.philosophy.map(p => (
                <li key={p} className="flex gap-3 text-ink-700 dark:text-ink-200">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-2 gap-3 self-start">
          {about.stats.map(s => (
            <div key={s.value} className="card p-5">
              <div className="font-display text-2xl sm:text-3xl font-semibold text-ink-900 dark:text-white">{s.value}</div>
              <div className="mt-1 text-sm text-ink-500 dark:text-ink-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
