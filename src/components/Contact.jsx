import { Mail, Linkedin, Github, ArrowRight } from 'lucide-react'
import Section from './Section.jsx'
import { profile } from '../data/profile.js'

export default function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Let's talk"
      title="Working on something where iOS is the bet?"
      lede="I'm open to senior IC and tech-lead conversations — full-time or contract — with teams that take performance, accessibility, and architecture seriously.">
      <div className="card p-8 sm:p-10">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p className="text-ink-700 dark:text-ink-200 leading-relaxed">
              The fastest way to reach me is email. I usually reply within a day, and I'm comfortable jumping into a 30-min
              fit chat before either of us writes a brief.
            </p>
            <a href={`mailto:${profile.email}`}
               className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-ink-900 dark:bg-white px-5 py-3
                          text-sm font-medium text-white dark:text-ink-900 hover:opacity-90 transition">
              {profile.email}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
            <ContactRow icon={<Mail size={16} />} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
            <ContactRow icon={<Linkedin size={16} />} label="LinkedIn" value="linkedin.com/in/luannluna" href={profile.links.linkedin} />
            <ContactRow icon={<Github size={16} />} label="GitHub" value="github.com/LuannLuna" href={profile.links.github} />
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
