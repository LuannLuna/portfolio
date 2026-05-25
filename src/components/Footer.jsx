import { useContent } from '../i18n/locale.jsx'

export default function Footer() {
  const { site, footer } = useContent()
  return (
    <footer className="border-t border-ink-200/60 dark:border-white/10 mt-20">
      <div className="container-prose flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-8
                      text-sm text-ink-500 dark:text-ink-400">
        <p>© {new Date().getFullYear()} {site.profile.name}. {footer.copy}</p>
        <p className="font-mono text-xs">{footer.craftedIn}</p>
      </div>
    </footer>
  )
}
