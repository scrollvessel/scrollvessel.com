import type Token from 'markdown-it/lib/token.mjs'
import type { MarkdownFeature } from '../markdown-feature.js'
import { escapeHtml } from '../escape.js'

export function codeFenceFeature(): MarkdownFeature {
  return {
    name: 'code-fence',
    register(markdown) {
      if (!markdown.renderer.rules.fence) {
        markdown.renderer.rules.fence = (tokens, index) => renderCodeFence(tokens[index])
      }
    },
  }
}

export function renderCodeFence(token: Token): string {
  return `<pre><code>${escapeHtml(token.content)}</code></pre>`
}
