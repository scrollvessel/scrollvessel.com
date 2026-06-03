import { describe, expect, it } from 'vitest'
import { generateStaticPages } from '../generate-static-pages.js'
import { StaticSiteFixture } from './support/static-site-fixture.js'

describe('content asset copier', () => {
  it('renders markdown tables and article-relative images safely', async () => {
    const fixture = await StaticSiteFixture.create()
    await fixture.writeJson('translations/martinfowler/meta.json', { categoryName: 'Martin Fowler Blog' })
    await fixture.writeMarkdown('translations/martinfowler/article.md', `---
title: Markdown Fixture
description: Markdown rendering fixture
createdAt: 2026-06-01
updatedAt: 2026-06-02
author: Fixture Author
lang: zh-CN
---

| Phase | Output |
|---|---|
| Spec | Markdown |

![Workflow diagram](3.jpg)
![Unsafe image](javascript:alert(1))

\`\`\`mermaid
flowchart LR
  A[Input] --> B[Output]
\`\`\`
`)
    await fixture.writeAsset('translations/martinfowler/3.jpg', 'fixture image bytes')

    await generateStaticPages({ contentRoot: fixture.contentRoot, outputRoot: fixture.outputRoot })

    const articleHtml = await fixture.readOutput('translations/martinfowler/article.html')

    expect(articleHtml).toContain('<div class="table-scroll" tabindex="0"><table>')
    expect(articleHtml).toContain('<th>Phase</th>')
    expect(articleHtml).toContain('<td>Markdown</td>')
    expect(articleHtml).toContain('<figure class="image-figure"><img src="./3.jpg" alt="Workflow diagram"><figcaption>图1 · Workflow diagram</figcaption></figure>')
    expect(articleHtml).toContain('<figure class="image-figure"><img src="#" alt="Unsafe image"><figcaption>图2 · Unsafe image</figcaption></figure>')
    expect(articleHtml).not.toContain('<p><figure')
    expect(articleHtml).toContain('.image-figure { margin: 1.8em auto; text-align: center; }')
    expect(articleHtml).toContain('.image-figure figcaption { margin-top: 0.8em; color: var(--ink-soft); font-size: 13px; line-height: 1.6; text-align: center; }')
    expect(articleHtml).toContain('<pre class="mermaid">flowchart LR')
    expect(articleHtml).toContain('A[Input] --&gt; B[Output]')
    expect(articleHtml).toContain('.prose pre.mermaid { border-left: 0; }')
    expect(articleHtml).toContain('.prose .mermaid { margin: 1.8em auto; overflow-x: auto; background: transparent;')
    expect(articleHtml).not.toContain('.prose .mermaid { margin: 1.8em auto; overflow-x: auto; border-left:')
    expect(articleHtml).toContain('.prose .mermaid svg { background: transparent !important; }')
    expect(articleHtml).toContain('.prose .mermaid .node rect')
    expect(articleHtml).toContain('<script type="module" src="/assets/static-mermaid.js"></script>')
    expect(articleHtml).not.toContain('src="javascript:')
    expect(fixture.outputExists('translations/martinfowler/3.jpg')).toBe(true)
  })
})
