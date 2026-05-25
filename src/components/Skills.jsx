import { motion } from 'framer-motion'
import Section from './Section.jsx'
import { useContent } from '../i18n/locale.jsx'

export default function Skills() {
  const { skills } = useContent()
  return (
    <Section
      id="skills"
      eyebrow={skills.eyebrow}
      title={skills.title}
      lede={skills.lede}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.groups.map((group, i) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: i * 0.04 }}
            className="card p-6">
            <h3 className="font-display text-lg font-semibold">{group.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map(item => <span key={item} className="chip">{item}</span>)}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
