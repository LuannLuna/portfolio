import { motion } from 'framer-motion'

export default function Section({ id, eyebrow, title, lede, children }) {
  return (
    <section id={id} className="section">
      <div className="container-prose">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className="heading mt-4">{title}</h2>
          {lede && <p className="lede">{lede}</p>}
        </motion.div>
        <div className="mt-12 sm:mt-16">{children}</div>
      </div>
    </section>
  )
}
