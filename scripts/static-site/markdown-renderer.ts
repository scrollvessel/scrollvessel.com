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
    let imageIndex = 0

    markdown.validateLink = () => true
    markdown.renderer.rules.link_open = (tokens, index, renderOptions, env, self) => renderLinkOpen(tokens, index, renderOptions, env, self)
    markdown.renderer.rules.paragraph_open = (tokens, index) => (isImageOnlyParagraph(tokens, index) ? '' : '<p>')
    markdown.renderer.rules.paragraph_close = (tokens, index) => (isImageOnlyParagraph(tokens, index - 2) ? '' : '</p>')
    markdown.renderer.rules.image = (tokens, index) => {
      imageIndex += 1
      return renderImage(tokens[index], options.assetBasePath ?? './', imageIndex)
    }
    markdown.renderer.rules.fence = (tokens, index) => renderFence(tokens[index])
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
    const safe = safeHref(href)
    token.attrs![hrefIndex] = ['href', safe]
    if (isExternalHref(safe)) {
      token.attrSet('class', 'prose-external-link')
      token.attrSet('target', '_blank')
      token.attrSet('rel', 'noopener noreferrer')
    }
  }

  return self.renderToken(tokens, index, options)
}

function isImageOnlyParagraph(tokens: Token[], paragraphOpenIndex: number): boolean {
  const inline = tokens[paragraphOpenIndex + 1]
  if (!inline || inline.type !== 'inline' || !inline.children || inline.children.length === 0) return false

  return inline.children.every((child) => child.type === 'image' || child.type === 'softbreak')
}

function renderImage(token: Token, assetBasePath: string, imageIndex: number): string {
  const rawSrc = token.attrGet('src') ?? ''
  const src = safeImageSrc(rawSrc, assetBasePath)
  const alt = token.content.trim()
  const title = token.attrGet('title')
  const titleAttribute = title ? ` title="${escapeAttribute(title)}"` : ''
  const caption = `图${imageIndex} · ${alt}`

  return `<figure class="image-figure"><img src="${src}" alt="${escapeAttribute(alt)}"${titleAttribute}><figcaption>${escapeHtml(caption)}</figcaption></figure>`
}

function renderFence(token: Token): string {
  if (token.info.trim().split(/\s+/)[0] === 'mermaid') {
    return `<pre class="mermaid">${escapeHtml(token.content)}</pre>`
  }

  return `<pre><code>${escapeHtml(token.content)}</code></pre>`
}

function safeHref(raw: string): string {
  const trimmed = raw.trim()
  if (!trimmed || !isSafeUrl(trimmed)) return '#'

  return escapeAttribute(trimmed)
}

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href)
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
