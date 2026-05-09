import { motion } from 'framer-motion'
import Section from './Section.jsx'
import { skillGroups } from '../data/skills.js'

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Toolkit"
      title="The stack I reach for first."
      lede="Day-to-day I write Swift 6 with strict concurrency, build on SwiftUI + Observation, and modularize with Swift Package Manager. Everything else is in service of that loop staying fast.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
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
