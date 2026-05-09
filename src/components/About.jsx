import Section from './Section.jsx'
import { profile } from '../data/profile.js'
import { Sparkles } from 'lucide-react'

const stats = [
  { k: '7+ yrs', v: 'shipping native iOS' },
  { k: '1.5M+', v: 'users on apps I own' },
  { k: '8 brands', v: 'in production' },
  { k: '78%', v: 'biggest perf win' },
]

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="I build the iOS layer that the rest of the company depends on."
      lede="Most of my work sits at the seam between business outcomes and platform craft — design systems that other teams adopt, migrations that don't slow feature delivery, and the unglamorous performance work that quietly compounds.">
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-6 text-ink-700 dark:text-ink-200 leading-relaxed">
          <p>
            I started in iOS in 2018 and have spent the last seven years moving up the stack of responsibility — from
            shipping features, to owning modules, to architecting the flows that companies bet on. My recent work has
            been split between performance (Swift 6 strict concurrency, async data layers) and adoption (design-system
            components other teams reach for first).
          </p>
          <p>
            I care about the boring things that hold systems together: clear seams between layers, tests that catch the
            cross-screen bug instead of the obvious one, and observability that lets the next person on call understand
            what I built. I'm at my best inside a small team that ships often and reads each other's code.
          </p>
          <div className="card p-6">
            <div className="flex items-center gap-2 text-accent-600 dark:text-accent-300">
              <Sparkles size={16} /> <span className="text-xs font-mono uppercase tracking-[0.2em]">How I work</span>
            </div>
            <ul className="mt-4 space-y-3">
              {profile.philosophy.map(p => (
                <li key={p} className="flex gap-3 text-ink-700 dark:text-ink-200">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-2 gap-3 self-start">
          {stats.map(s => (
            <div key={s.k} className="card p-5">
              <div className="font-display text-2xl sm:text-3xl font-semibold text-ink-900 dark:text-white">{s.k}</div>
              <div className="mt-1 text-sm text-ink-500 dark:text-ink-400">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
