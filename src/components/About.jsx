import Section from './Section.jsx'
import Markdown from './Markdown.jsx'
import { useContent } from '../i18n/locale.jsx'

export default function About() {
  const { about } = useContent()

  return (
    <Section
      id="about"
      number="01"
      eyebrow={about.eyebrow}
      title={about.title}
      lede={about.lede}>
      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-7">
          <Markdown className="dropcap">{about.body}</Markdown>

          <div className="mt-12">
            <p className="eyebrow">{about.howIWorkLabel}</p>
            <ol className="mt-4 border-t border-rule">
              {about.philosophy.map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[3rem_1fr] gap-4 border-b border-rule py-4 text-[16px] leading-relaxed">
                  <span className="font-mono text-[10px] text-signal">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <aside className="col-span-12 lg:col-span-5">
          <dl className="border-t border-rule">
            {about.stats.map((stat) => (
              <div
                key={stat.value}
                className="flex items-baseline justify-between gap-6 border-b border-rule py-5">
                <dt className="meta max-w-[13rem] leading-relaxed">{stat.label}</dt>
                <dd className="whitespace-nowrap font-display text-[clamp(2rem,3vw,2.75rem)] font-bold leading-none tracking-[-0.045em]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="meta mt-4">Fig. 01 — {about.eyebrow}</p>
        </aside>
      </div>
    </Section>
  )
}
