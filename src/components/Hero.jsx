import { ArrowUpRight } from 'lucide-react'
import { useContent } from '../i18n/locale.jsx'

const APP_STORE_LINKS = {
  Petz: 'https://apps.apple.com/br/app/petz-tudo-que-seu-pet-precisa/id1250491446',
  LTK: 'https://apps.apple.com/br/app/ltk-liketoknow-it/id1154027990',
  Next: 'https://apps.apple.com/br/app/next-conta-digital-e-cart%C3%A3o/id1133682678',
  G1: 'https://apps.apple.com/br/app/g1-portal-de-not%C3%ADcias-da-globo/id413333281',
  GE: 'https://apps.apple.com/br/app/ge-not%C3%ADcias-de-esportes/id361393520',
  Dafiti: 'https://apps.apple.com/br/app/dafiti-shopping-no-seu-bolso/id564924168',
  TocaLivros: 'https://apps.apple.com/br/app/audiolivros-da-tocalivros/id919766261',
}

export default function Hero() {
  const { hero, site } = useContent()
  const { profile } = site
  const nameParts = profile.name.toUpperCase().split(' ')

  return (
    <section id="top" className="relative">
      <div className="container-grid">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b border-rule py-3">
          <span className="meta flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-signal" aria-hidden="true" />
            {hero.availability}
          </span>
          <span className="meta hidden sm:inline">{hero.location}</span>
          <span className="meta">Portfolio / {new Date().getFullYear()}</span>
        </div>

        <div className="grid grid-cols-12 gap-x-6 gap-y-12 pt-8 lg:pt-12">
          <div className="col-span-12 lg:col-span-9">
            <h1 className="display text-[clamp(4.5rem,11.5vw,11rem)] uppercase leading-[0.8]">
              {nameParts.map((part, index) => (
                <span key={part} className="reveal-line">
                  <span style={{ animationDelay: `${index * 90}ms` }}>
                    {part}
                    {index === nameParts.length - 1 && (
                      <span className="text-signal">.</span>
                    )}
                  </span>
                </span>
              ))}
            </h1>

            <p className="mt-8 max-w-4xl text-balance text-[clamp(1.4rem,2.6vw,2.2rem)] leading-[1.22] tracking-[-0.02em]">
              {hero.headline.lead}{' '}
              <span className="text-signal">{hero.headline.highlight}</span>{' '}
              {hero.headline.trail}
            </p>
          </div>

          <figure className="col-span-12 lg:col-span-3">
            {profile.photoUrl && (
              <>
                <div className="aspect-[4/5] w-full max-w-sm overflow-hidden border border-rule bg-surface">
                  <img
                    src={profile.photoUrl}
                    alt={profile.photoAlt || profile.name}
                    width="640"
                    height="800"
                    loading="eager"
                    decoding="async"
                    className="h-full w-full object-cover grayscale contrast-[1.05]"
                  />
                </div>
                <figcaption className="mt-2 flex items-center justify-between gap-4 border-t border-rule pt-2">
                  <span className="meta">{profile.name}</span>
                  <span className="meta">{hero.location.split('·')[0].trim()}</span>
                </figcaption>
              </>
            )}
          </figure>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-10 border-t border-rule pt-8">
          <div className="col-span-12 lg:col-span-7">
            <p className="max-w-2xl text-pretty text-[17px] leading-[1.7] text-muted">
              {hero.body}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a href={hero.ctaPrimary.href} className="btn btn-signal">
                {hero.ctaPrimary.label}
                <ArrowUpRight size={14} strokeWidth={1.5} />
              </a>
              <a
                href={hero.ctaSecondary.href}
                target="_blank"
                rel="noreferrer"
                className="link-line font-mono text-[10px] uppercase tracking-[0.16em]">
                {hero.ctaSecondary.label} ↗
              </a>

              <span className="hidden h-4 w-px bg-rule sm:block" aria-hidden="true" />

              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="link-line font-mono text-[10px] uppercase tracking-[0.16em]">
                LinkedIn ↗
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="link-line font-mono text-[10px] uppercase tracking-[0.16em]">
                GitHub ↗
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="link-line font-mono text-[10px] uppercase tracking-[0.16em]">
                Email ↗
              </a>
            </div>
          </div>

          <aside className="col-span-12 lg:col-span-5">
            <dl className="border-t border-rule">
              {hero.spec.map((item) => (
                <div
                  key={item.label}
                  className="flex items-baseline justify-between gap-6 border-b border-rule py-3">
                  <dt className="meta">{item.label}</dt>
                  <dd className="text-right font-mono text-[11px] leading-relaxed text-ink">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <div className="mt-14 border-t border-rule pt-5">
          <div className="flex items-baseline justify-between gap-4">
            <p className="eyebrow">{hero.shippedToLabel}</p>
            <span className="meta">
              {String(profile.shippedTo.length).padStart(2, '0')}
            </span>
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 sm:grid-cols-3 lg:grid-cols-5">
            {profile.shippedTo.map((name) => {
              const url = APP_STORE_LINKS[name]
              return (
                <li key={name} className="border-t border-rule py-2">
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between font-display text-lg tracking-[-0.02em] text-ink transition-colors hover:text-signal">
                      {name}
                      <ArrowUpRight size={13} strokeWidth={1.5} />
                    </a>
                  ) : (
                    <span className="font-display text-lg tracking-[-0.02em] text-muted">
                      {name}
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
