import type { MarkdownFeature } from '../markdown-feature.js'

export function tableScrollFeature(): MarkdownFeature {
  return {
    name: 'table-scroll',
    register(markdown) {
      markdown.renderer.rules.table_open = () => '<div class="table-scroll" tabindex="0"><table>'
      markdown.renderer.rules.table_close = () => '</table></div>'
    },
    styles() {
      return `.table-scroll { max-width: 100%; margin: 1.6em auto; overflow-x: auto; }
      .prose table { display: table; width: max-content; min-width: 100%; border-collapse: collapse; border-top: 1px solid var(--hairline); border-bottom: 1px solid var(--hairline); }
      .prose th, .prose td { padding: 0.72em 0.9em; border-bottom: 1px solid rgba(47, 33, 15, 0.16); text-align: left; vertical-align: top; }
      .prose th { color: var(--ink); font-size: 0.82em; letter-spacing: 0.08em; text-transform: uppercase; }
      .prose tr:last-child td { border-bottom: 0; }`
    },
  }
}
