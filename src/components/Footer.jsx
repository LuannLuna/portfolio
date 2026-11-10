import { ArrowUp } from 'lucide-react'
import { useContent } from '../i18n/locale.jsx'

export default function Footer() {
  const { site, footer } = useContent()

  return (
    <footer className="border-t border-rule">
      <div className="container-grid py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-2xl font-bold tracking-[-0.04em]">
              {site.profile.name}
              <span className="text-signal">.</span>
            </p>
            <p className="meta mt-2">{footer.craftedIn}</p>
          </div>

          <p className="max-w-sm font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-muted">
            {footer.copy} Set in Archivo, IBM Plex Sans & Plex Mono.
          </p>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="link-line font-mono text-[10px] uppercase tracking-[0.16em]">
            Top
            <ArrowUp size={13} strokeWidth={1.5} />
          </button>
        </div>

        <div className="meta mt-8 flex flex-wrap justify-between gap-3 border-t border-rule pt-4">
          <span>
            © {new Date().getFullYear()} {site.profile.name}
          </span>
          <span>Portfolio / v2.0</span>
        </div>
      </div>
    </footer>
  )
}
