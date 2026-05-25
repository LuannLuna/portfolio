import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react'
import { availableLocales, defaultLocale, getContent } from '../content/loader.js'

const STORAGE_KEY = 'locale'

// localStorage choice wins; else auto-detect pt-* browsers; else default.
function resolveInitialLocale() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && availableLocales.includes(stored)) return stored
  } catch (e) { /* ignore */ }
  try {
    const lang = (navigator.language || '').toLowerCase()
    if (lang.startsWith('pt') && availableLocales.includes('pt')) return 'pt'
  } catch (e) { /* ignore */ }
  return defaultLocale
}

const LocaleContext = createContext(null)

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(resolveInitialLocale)

  useEffect(() => { document.documentElement.lang = locale }, [locale])

  const persist = (next) => { try { localStorage.setItem(STORAGE_KEY, next) } catch (e) { /* ignore */ } }

  const setLocale = useCallback((next) => {
    if (!availableLocales.includes(next)) return
    persist(next)
    setLocaleState(next)
  }, [])

  const toggleLocale = useCallback(() => {
    setLocaleState(prev => {
      const next = availableLocales[(availableLocales.indexOf(prev) + 1) % availableLocales.length]
      persist(next)
      return next
    })
  }, [])

  const content = useMemo(() => getContent(locale), [locale])

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale, availableLocales, content }),
    [locale, setLocale, toggleLocale, content]
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}

export function useContent() {
  return useLocale().content
}
