import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Mail, Linkedin, Github, ArrowRight, Calendar } from 'lucide-react'
import Section from './Section.jsx'
import { useContent } from '../i18n/locale.jsx'

export default function Contact() {
  const { contact, site } = useContent()
  const { profile } = site
  return (
    <Section
      id="contact"
      eyebrow={contact.eyebrow}
      title={contact.title}
      lede={contact.lede}>
      <div className="card p-8 sm:p-10">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <div className="text-ink-700 dark:text-ink-200 leading-relaxed space-y-4">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{ p: ({ node, ...props }) => <p {...props} /> }}>
                {contact.body}
              </ReactMarkdown>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {profile.links.schedule && (
                <a href={profile.links.schedule} target="_blank" rel="noreferrer"
                   className="group inline-flex items-center gap-2 rounded-xl bg-ink-900 dark:bg-white px-5 py-3
                              text-sm font-medium text-white dark:text-ink-900 hover:opacity-90 transition">
                  <Calendar size={16} />
                  Schedule a call
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </a>
              )}
              <a href={`mailto:${profile.email}`}
                 className="inline-flex items-center gap-2 rounded-xl border border-ink-200 dark:border-white/10 px-5 py-3
                            text-sm font-medium hover:bg-ink-100/60 dark:hover:bg-white/5 transition">
                <Mail size={16} />
                {profile.email}
              </a>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
            {profile.links.schedule && (
              <ContactRow icon={<Calendar size={16} />} label="Schedule" value="cal.com/luann-luna/30min" href={profile.links.schedule} />
            )}
            <ContactRow icon={<Mail size={16} />} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
            <ContactRow icon={<Linkedin size={16} />} label="LinkedIn" value={contact.linkedinDisplay} href={profile.links.linkedin} />
            <ContactRow icon={<Github size={16} />} label="GitHub" value={contact.githubDisplay} href={profile.links.github} />
          </div>
        </div>
      </div>
    </Section>
  )
}

function ContactRow({ icon, label, value, href }) {
  return (
    <a href={href} target="_blank" rel="noreferrer"
       className="flex items-center gap-3 rounded-xl border border-ink-200 dark:border-white/10 px-4 py-3
                  hover:bg-ink-100/60 dark:hover:bg-white/5 transition">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent/10 text-accent-600 dark:text-accent-300">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-mono uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">{label}</span>
        <span className="block truncate text-sm">{value}</span>
      </span>
    </a>
  )
}
