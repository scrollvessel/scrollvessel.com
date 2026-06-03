import type { RenderRule } from 'markdown-it/lib/renderer.mjs'
import type { MarkdownFeature } from '../markdown-feature.js'
import { isExternalHref, safeHref } from '../url-safety.js'

export function safeLinksFeature(): MarkdownFeature {
  return {
    name: 'safe-links',
    register(markdown) {
      markdown.renderer.rules.link_open = (tokens, index, renderOptions, env, self) => renderLinkOpen(tokens, index, renderOptions, env, self)
    },
    styles() {
      return `.prose-external-link { display: inline-flex; align-items: baseline; gap: 0.18em; background-image: linear-gradient(currentcolor, currentcolor); background-position: 0 100%; background-repeat: no-repeat; background-size: 100% 1px; }
      .prose-external-link::after { content: ''; display: inline-block; width: 0.92em; height: 0.92em; background: currentcolor; opacity: 0.72; transform: translateY(0.08em); clip-path: path('M9 7h8v8h-1.8V10.1l-7.9 7.9L6 16.7l7.9-7.9H9z'); }`
    },
  }
}

const renderLinkOpen: RenderRule = (tokens, index, options, _env, self) => {
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
