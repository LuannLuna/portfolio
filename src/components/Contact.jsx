import { ArrowUpRight } from 'lucide-react'
import Section from './Section.jsx'
import Markdown from './Markdown.jsx'
import { useContent } from '../i18n/locale.jsx'

export default function Contact() {
  const { contact, site } = useContent()
  const { profile } = site

  return (
    <Section
      id="contact"
      number="05"
      eyebrow={contact.eyebrow}
      title={contact.title}
      lede={contact.lede}>
      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-7">
          <a
            href={`mailto:${profile.email}`}
            className="group block border-b border-rule pb-6">
            <span className="eyebrow">Email</span>
            <span className="mt-3 block break-words font-display text-[clamp(1.5rem,4vw,3.5rem)] font-bold tracking-[-0.04em] transition-colors group-hover:text-signal">
              {profile.email}
            </span>
          </a>

          <div className="mt-8">
            <Markdown>{contact.body}</Markdown>
          </div>

          {profile.links.schedule && (
            <a
              href={profile.links.schedule}
              target="_blank"
              rel="noreferrer"
              className="btn mt-8">
              30 min
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </a>
          )}
        </div>

        <aside className="col-span-12 lg:col-span-5">
          <div className="border-t border-rule">
            <ContactRow label="LinkedIn" value={contact.linkedinDisplay} href={profile.links.linkedin} />
            <ContactRow label="GitHub" value={contact.githubDisplay} href={profile.links.github} />
            {profile.links.schedule && (
              <ContactRow label="Cal.com" value="cal.com/luann-luna" href={profile.links.schedule} />
            )}
            <ContactRow label="Resume" value="PDF" href={profile.links.resume} />
          </div>
        </aside>
      </div>
    </Section>
  )
}

function ContactRow({ label, value, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-baseline justify-between gap-4 border-b border-rule py-4">
      <span className="meta">{label}</span>
      <span className="flex min-w-0 items-center gap-2 text-[14px] text-ink transition-colors group-hover:text-signal">
        <span className="truncate">{value}</span>
        <ArrowUpRight size={13} strokeWidth={1.5} className="flex-none" />
      </span>
    </a>
  )
}
