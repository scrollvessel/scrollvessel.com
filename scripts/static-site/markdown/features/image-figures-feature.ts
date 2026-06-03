import type Token from 'markdown-it/lib/token.mjs'
import type { MarkdownFeature } from '../markdown-feature.js'
import { escapeAttribute, escapeHtml } from '../escape.js'
import { safeImageSrc } from '../url-safety.js'

export function imageFiguresFeature(): MarkdownFeature {
  return {
    name: 'image-figures',
    register(markdown, context) {
      markdown.renderer.rules.paragraph_open = (tokens, index) => (isImageOnlyParagraph(tokens, index) ? '' : '<p>')
      markdown.renderer.rules.paragraph_close = (tokens, index) => (isImageOnlyParagraph(tokens, index - 2) ? '' : '</p>')
      markdown.renderer.rules.image = (tokens, index) => renderImage(tokens[index], context.assetBasePath, context.nextImageIndex())
    },
    styles() {
      return `.image-figure { margin: 1.8em auto; text-align: center; }
      .prose img { display: block; width: min(100%, 760px); height: auto; margin: 0 auto; border: 1px solid rgba(47, 33, 15, 0.18); box-shadow: 0 18px 48px rgba(47, 33, 15, 0.13); }
      .image-figure figcaption { margin-top: 0.8em; color: var(--ink-soft); font-size: 13px; line-height: 1.6; text-align: center; }`
    },
  }
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
