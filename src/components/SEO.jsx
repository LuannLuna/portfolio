import { useEffect } from 'react'
import { site } from '../content/loader.js'

function setMeta(selector, value) {
  const el = document.querySelector(selector)
  if (el && value) el.setAttribute('content', value)
}

export default function SEO() {
  useEffect(() => {
    document.title = site.site.title
    setMeta('meta[name="description"]', site.site.description)
    setMeta('meta[property="og:title"]', site.site.title)
    setMeta('meta[property="og:description"]', site.site.description)
    setMeta('meta[property="og:url"]', site.site.url)
    setMeta('meta[property="og:image"]', site.site.ogImage)
    setMeta('meta[name="twitter:title"]', site.site.title)
    setMeta('meta[name="twitter:description"]', site.site.description)
    setMeta('meta[name="theme-color"]', site.site.themeColor)
  }, [])
  return null
}
