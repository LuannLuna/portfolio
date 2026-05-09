import { profile } from '../data/profile.js'

export default function Footer() {
  return (
    <footer className="border-t border-ink-200/60 dark:border-white/10 mt-20">
      <div className="container-prose flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-8
                      text-sm text-ink-500 dark:text-ink-400">
        <p>© {new Date().getFullYear()} {profile.name}. Built with React, Vite, and Tailwind.</p>
        <p className="font-mono text-xs">crafted in São Luís · MA · BR</p>
      </div>
    </footer>
  )
}
