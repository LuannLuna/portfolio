import { useEffect, useState } from 'react'
import { Moon, Sun, Menu, X, Languages } from 'lucide-react'
import { useTheme } from '../hooks/useTheme.js'
import { useContent, useLocale } from '../i18n/locale.jsx'

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const { nav } = useContent()
  const { locale, toggleLocale } = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-40 transition-all
      ${scrolled
        ? 'bg-white/70 dark:bg-ink-950/70 backdrop-blur border-b border-ink-200/60 dark:border-white/10'
        : 'bg-transparent'}`}>
      <nav className="container-prose flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent-500 to-cyan-400 text-white">
            {nav.brand.short}
          </span>
          <span className="hidden sm:inline">{nav.brand.full}</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {nav.links.map(l => (
            <a key={l.href} href={l.href}
               className="rounded-lg px-3 py-2 text-sm text-ink-600 dark:text-ink-300
                          hover:text-ink-900 dark:hover:text-white hover:bg-ink-100/60 dark:hover:bg-white/5">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLocale}
            aria-label="Switch language"
            title={locale === 'en' ? 'Mudar para Português' : 'Switch to English'}
            className="grid h-9 place-items-center rounded-lg border border-ink-200 dark:border-white/10
                       bg-white/70 dark:bg-white/5 hover:bg-ink-100 dark:hover:bg-white/10 transition-colors
                       px-2.5 text-xs font-mono font-semibold uppercase tracking-wide">
            <span className="flex items-center gap-1"><Languages size={14} /> {locale === 'en' ? 'PT' : 'EN'}</span>
          </button>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-lg border border-ink-200 dark:border-white/10
                       bg-white/70 dark:bg-white/5 hover:bg-ink-100 dark:hover:bg-white/10 transition-colors">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Open menu"
            className="md:hidden grid h-9 w-9 place-items-center rounded-lg border border-ink-200 dark:border-white/10
                       bg-white/70 dark:bg-white/5">
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-ink-200/60 dark:border-white/10 bg-white/95 dark:bg-ink-950/95 backdrop-blur">
          <div className="container-prose py-3 flex flex-col">
            {nav.links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                 className="rounded-lg px-3 py-2 text-sm text-ink-700 dark:text-ink-200 hover:bg-ink-100 dark:hover:bg-white/5">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
