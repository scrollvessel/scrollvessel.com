import { escapeAttribute } from './escape.js'
import { SafeUrl } from './safe-url.js'

export function safeHref(raw: string): string {
  const url = new SafeUrl(raw)
  if (!url.value() || !url.isSafe()) return '#'

  return escapeAttribute(url.value())
}

export function safeImageSrc(raw: string, assetBasePath: string): string {
  const url = new SafeUrl(raw)
  if (!url.value() || !url.isSafe()) return '#'
  if (url.hasProtocolOrRoot() || url.hasRelativePrefix()) return escapeAttribute(url.value())

  return escapeAttribute(`${assetBasePath}${url.value()}`)
}

export function isExternalHref(href: string): boolean {
  return new SafeUrl(href).isExternalHttp()
}
