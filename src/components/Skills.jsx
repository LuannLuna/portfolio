import Section from './Section.jsx'
import { useContent } from '../i18n/locale.jsx'

export default function Skills() {
  const { skills } = useContent()

  return (
    <Section
      id="skills"
      number="03"
      eyebrow={skills.eyebrow}
      title={skills.title}
      lede={skills.lede}>
      <div className="border-t border-rule">
        {skills.groups.map((group, index) => (
          <div
            key={group.title}
            className="grid grid-cols-12 gap-x-6 gap-y-3 border-b border-rule py-6">
            <div className="col-span-12 flex items-baseline gap-3 lg:col-span-3">
              <span className="font-mono text-[10px] text-signal">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-lg font-bold tracking-[-0.02em]">
                {group.title}
              </h3>
            </div>
            <div className="col-span-12 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[17px] leading-relaxed text-ink lg:col-span-9">
              {group.items.map((item, itemIndex) => (
                <span key={item} className="inline-flex items-baseline">
                  {item}
                  {itemIndex < group.items.length - 1 && (
                    <span className="mx-2 text-rule" aria-hidden="true">
                      /
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
