import MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token.mjs'

export interface MarkdownRenderOptions {
  assetBasePath?: string
}

export class MarkdownRenderer {
  render(source: string, options: MarkdownRenderOptions = {}): string {
    const markdown = new MarkdownIt({
      html: false,
      linkify: false,
      typographer: false,
    })

    markdown.validateLink = () => true
    markdown.renderer.rules.link_open = (tokens, index, renderOptions, env, self) => renderLinkOpen(tokens, index, renderOptions, env, self)
    markdown.renderer.rules.image = (tokens, index) => renderImage(tokens[index], options.assetBasePath ?? './')
    markdown.renderer.rules.table_open = () => '<div class="table-scroll" tabindex="0"><table>'
    markdown.renderer.rules.table_close = () => '</table></div>'

    return markdown.render(source)
  }
}

export function escapeHtml(value: string | number): string {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export function escapeAttribute(value: string): string {
  return escapeHtml(value)
}

function renderLinkOpen(tokens: Token[], index: number, options: unknown, env: unknown, self: { renderToken: (tokens: Token[], index: number, options: unknown) => string }): string {
  const token = tokens[index]
  const hrefIndex = token.attrIndex('href')
  if (hrefIndex >= 0) {
    const href = token.attrs?.[hrefIndex]?.[1] ?? ''
    token.attrs![hrefIndex] = ['href', safeHref(href)]
  }

  return self.renderToken(tokens, index, options)
}

function renderImage(token: Token, assetBasePath: string): string {
  const rawSrc = token.attrGet('src') ?? ''
  const src = safeImageSrc(rawSrc, assetBasePath)
  const alt = token.content
  const title = token.attrGet('title')
  const titleAttribute = title ? ` title="${escapeAttribute(title)}"` : ''

  return `<img src="${src}" alt="${escapeAttribute(alt)}"${titleAttribute}>`
}

function safeHref(raw: string): string {
  const trimmed = raw.trim()
  if (!trimmed || !isSafeUrl(trimmed)) return '#'

  return escapeAttribute(trimmed)
}

function safeImageSrc(raw: string, assetBasePath: string): string {
  const trimmed = raw.trim()
  if (!trimmed || !isSafeUrl(trimmed)) return '#'
  if (/^[a-z]+:/i.test(trimmed) || trimmed.startsWith('/') || trimmed.startsWith('#')) return escapeAttribute(trimmed)
  if (trimmed.startsWith('./') || trimmed.startsWith('../')) return escapeAttribute(trimmed)

  return escapeAttribute(`${assetBasePath}${trimmed}`)
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
