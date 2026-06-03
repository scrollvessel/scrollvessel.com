import { escapeAttribute } from './escape.js'

export function safeHref(raw: string): string {
  const trimmed = raw.trim()
  if (!trimmed || !isSafeUrl(trimmed)) return '#'

  return escapeAttribute(trimmed)
}

export function safeImageSrc(raw: string, assetBasePath: string): string {
  const trimmed = raw.trim()
  if (!trimmed || !isSafeUrl(trimmed)) return '#'
  if (/^[a-z]+:/i.test(trimmed) || trimmed.startsWith('/') || trimmed.startsWith('#')) return escapeAttribute(trimmed)
  if (trimmed.startsWith('./') || trimmed.startsWith('../')) return escapeAttribute(trimmed)

  return escapeAttribute(`${assetBasePath}${trimmed}`)
}

export function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href)
}

function isSafeUrl(raw: string): boolean {
  const trimmed = raw.trim()
  return (
    trimmed.startsWith('/') ||
    trimmed.startsWith('#') ||
    trimmed.startsWith('./') ||
    trimmed.startsWith('../') ||
    /^[^:/?#]+(?:[/?#].*)?$/i.test(trimmed) ||
    /^https?:\/\//i.test(trimmed) ||
    /^mailto:/i.test(trimmed)
  )
}
