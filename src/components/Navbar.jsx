import { useEffect, useState } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from '../hooks/useTheme.js'
import { useContent, useLocale } from '../i18n/locale.jsx'

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const { nav } = useContent()
  const { locale, toggleLocale } = useLocale()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper">
      <div className="container-grid flex h-16 items-center justify-between gap-4">
        <a href="#top" className="group flex items-baseline gap-2">
          <span className="font-display text-[17px] font-bold tracking-[-0.04em]">
            {nav.brand.full}
          </span>
          <span className="h-1.5 w-1.5 bg-signal" aria-hidden="true" />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-5 lg:flex xl:gap-7">
          {nav.links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="group font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink">
              <span className="text-signal">{String(index + 1).padStart(2, '0')}</span>{' '}
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleLocale}
            aria-label={locale === 'en' ? 'Mudar para português' : 'Switch to English'}
            className="grid h-11 w-11 place-items-center px-1 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink sm:h-9 sm:w-9">
            {locale === 'en' ? 'PT' : 'EN'}
          </button>

          <span className="hidden h-4 w-px bg-rule sm:block" aria-hidden="true" />

          <button
            type="button"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="grid h-11 w-11 place-items-center text-muted transition-colors hover:text-ink sm:h-9 sm:w-9">
            {theme === 'dark' ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
          </button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-11 w-11 place-items-center text-muted transition-colors hover:text-ink sm:h-9 sm:w-9 lg:hidden">
            {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="border-y border-rule bg-paper lg:hidden">
          <nav aria-label="Mobile" className="container-grid py-2">
            {nav.links.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between border-b border-rule py-4">
                <span className="font-display text-3xl font-bold tracking-[-0.04em]">
                  {link.label}
                </span>
                <span className="font-mono text-[10px] text-signal">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </a>
            ))}
            <p className="meta pt-5">Luann Luna — São Luís, BR</p>
          </nav>
        </div>
      )}
    </header>
  )
}
