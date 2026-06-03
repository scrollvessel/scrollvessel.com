import { describe, expect, it } from 'vitest'
import { MarkdownRenderer } from '../static-site/markdown-renderer.js'

describe('MarkdownRenderer', () => {
  it('registers markdown features with their own HTML behavior and styles', () => {
    const result = new MarkdownRenderer().render(`![Diagram](diagram.png)

| Name | Value |
|---|---|
| A | B |

[external](https://example.com)

\`\`\`mermaid
flowchart LR
  A --> B
\`\`\`
`)

    expect(result.html).toContain('<figure class="image-figure"><img src="./diagram.png" alt="Diagram"><figcaption>图1 · Diagram</figcaption></figure>')
    expect(result.html).toContain('<div class="table-scroll" tabindex="0"><table>')
    expect(result.html).toContain('<a href="https://example.com" class="prose-external-link" target="_blank" rel="noopener noreferrer">external</a>')
    expect(result.html).toContain('<pre class="mermaid">flowchart LR')
    expect(result.styles).toContain('.image-figure { margin: 1.8em auto; text-align: center; }')
    expect(result.styles).toContain('.table-scroll { max-width: 100%; margin: 1.6em auto; overflow-x: auto; }')
    expect(result.styles).toContain('.prose-external-link { display: inline-flex; align-items: baseline; gap: 0.18em;')
    expect(result.styles).toContain('.prose .mermaid { margin: 1.8em auto; overflow-x: auto; background: transparent;')
    expect(result.includeMermaidScript).toBe(true)
  })

  it('does not request the mermaid script when no mermaid fence is rendered', () => {
    const result = new MarkdownRenderer().render('```ts\nconst value = 1\n```')

    expect(result.html).toContain('<pre><code>const value = 1')
    expect(result.includeMermaidScript).toBe(false)
  })
})
