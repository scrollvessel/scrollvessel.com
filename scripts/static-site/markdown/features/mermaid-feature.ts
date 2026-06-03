import type { MarkdownFeature } from '../markdown-feature.js'
import { escapeHtml } from '../escape.js'
import { renderCodeFence } from './code-fence-feature.js'

export function mermaidFeature(): MarkdownFeature {
  return {
    name: 'mermaid',
    register(markdown, context) {
      markdown.renderer.rules.fence = (tokens, index) => {
        const token = tokens[index]
        if (token.info.trim().split(/\s+/)[0] !== 'mermaid') return renderCodeFence(token)

        context.requireMermaidScript()
        return `<pre class="mermaid">${escapeHtml(token.content)}</pre>`
      }
    },
    styles() {
      return `.prose pre.mermaid { border-left: 0; }
      .prose .mermaid { margin: 1.8em auto; overflow-x: auto; background: transparent; padding: 1em 1.1em; color: var(--ink); text-align: center; white-space: pre; }
      .prose .mermaid svg { background: transparent !important; }
      .prose .mermaid .node rect, .prose .mermaid .node circle, .prose .mermaid .node ellipse, .prose .mermaid .node polygon, .prose .mermaid .node path, .prose .mermaid .cluster rect, .prose .mermaid .labelBkg, .prose .mermaid .edgeLabel, .prose .mermaid .edgeLabel p { background: transparent !important; fill: transparent !important; }`
    },
  }
}
