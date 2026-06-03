import { existsSync } from 'node:fs'
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { generateStaticPages } from '../generate-static-pages.js'

async function createWorkspace(): Promise<{ contentRoot: string; outputRoot: string }> {
  const root = await mkdtemp(join(tmpdir(), 'scroll-vessel-static-'))
  return {
    contentRoot: join(root, 'content'),
    outputRoot: join(root, 'dist'),
  }
}

async function writeJson(root: string, relativePath: string, data: unknown): Promise<void> {
  const filePath = join(root, relativePath)
  await mkdir(dirname(filePath), { recursive: true })
  await writeFile(filePath, JSON.stringify(data), 'utf8')
}

async function writeMarkdown(root: string, relativePath: string, body: string): Promise<void> {
  const filePath = join(root, relativePath)
  await mkdir(dirname(filePath), { recursive: true })
  await writeFile(filePath, body, 'utf8')
}

describe('generate static pages', () => {
  it('generates safe category and article pages from isolated content fixtures', async () => {
    const { contentRoot, outputRoot } = await createWorkspace()
    await writeJson(contentRoot, 'topic/meta.json', { categoryName: '主题目录' })
    await writeJson(contentRoot, 'topic/child/meta.json', { categoryName: '子目录' })
    await writeMarkdown(contentRoot, 'topic/child/article.md', `---
title: Fixture Article
description: Fixture description
createdAt: 2026-06-01
updatedAt: 2026-06-02
author: Fixture Author
lang: zh-CN
tags: [alpha, beta]
externalLinks:
  - platform: source
    label: 查看原文
    url: https://example.com/original
  - platform: zhihu
    label: 知乎
    url: https://www.zhihu.com/question/1
  - platform: mystery
    label: 未知平台
    url: https://example.com/mystery
---

# Fixture Article

[unsafe](javascript:alert(1)) and [safe](/topic/child/index.html)
`)
    await writeMarkdown(contentRoot, 'demo/placeholder.md', `---
title: Demo Placeholder
description: Demo placeholder
createdAt: 2026-06-01
updatedAt: 2026-06-02
author: Fixture Author
lang: zh-CN
---

Demo body
`)

    const result = await generateStaticPages({ contentRoot, outputRoot })
    const categoryHtml = await readFile(join(outputRoot, 'topic/index.html'), 'utf8')
    const articleHtml = await readFile(join(outputRoot, 'topic/child/article.html'), 'utf8')

    expect(result).toEqual({ articleCount: 1, categoryCount: 2 })
    expect(existsSync(join(outputRoot, 'topic/child/index.html'))).toBe(true)
    expect(existsSync(join(outputRoot, 'demo/index.html'))).toBe(false)
    expect(categoryHtml).toContain('<h1 class="page-title">主题目录</h1>')
    expect(articleHtml).toContain('<h1 class="page-title">Fixture Article</h1>')
    expect(articleHtml).toContain('<p>Fixture description</p>\n          <div class="article-tags" aria-label="文章标签"><span>alpha</span><span>beta</span></div>\n          <nav class="external-links" aria-label="外部链接">')
    expect(articleHtml).not.toContain('<dt>标签</dt>')
    expect(articleHtml).toContain('aria-label="外部链接"')
    expect(articleHtml).toContain('<span class="external-link-icon" aria-hidden="true"><svg class="external-link-svg" viewBox="0 0 24 24" role="img" focusable="false"><path d="M8 12h8M12 8l4 4-4 4"/></svg></span><span>查看原文</span>')
    expect(articleHtml).toContain('<span class="external-link-icon" aria-hidden="true"><svg class="external-link-svg" viewBox="0 0 24 24" role="img" focusable="false"><path d="M6 5h7v14H6zM10 5v14M15 5h3l-3 7h4l-4 7"/></svg></span><span>知乎</span>')
    expect(articleHtml).toContain('<span class="external-link-icon" aria-hidden="true"><svg class="external-link-svg" viewBox="0 0 24 24" role="img" focusable="false"><path d="M9 7h8v8M17 7 7 17"/></svg></span><span>未知平台</span>')
    expect(articleHtml).toContain('href="https://example.com/original"')
    expect(articleHtml).toContain('target="_blank" rel="noopener noreferrer"')
    expect(articleHtml).toContain('href="/topic/child/index.html"')
    expect(articleHtml).toContain('href="#"')
    expect(articleHtml).not.toContain('href="javascript:')
  })

  it('renders markdown tables and article-relative images safely', async () => {
    const { contentRoot, outputRoot } = await createWorkspace()
    await writeJson(contentRoot, 'translations/martinfowler/meta.json', { categoryName: 'Martin Fowler Blog' })
    await writeMarkdown(contentRoot, 'translations/martinfowler/article.md', `---
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
    await writeFile(join(contentRoot, 'translations/martinfowler/3.jpg'), 'fixture image bytes')

    await generateStaticPages({ contentRoot, outputRoot })

    const articleHtml = await readFile(join(outputRoot, 'translations/martinfowler/article.html'), 'utf8')

    expect(articleHtml).toContain('<div class="table-scroll" tabindex="0"><table>')
    expect(articleHtml).toContain('<th>Phase</th>')
    expect(articleHtml).toContain('<td>Markdown</td>')
    expect(articleHtml).toContain('<img src="./3.jpg" alt="Workflow diagram"')
    expect(articleHtml).toContain('<img src="#" alt="Unsafe image"')
    expect(articleHtml).toContain('<pre class="mermaid">flowchart LR')
    expect(articleHtml).toContain('A[Input] --&gt; B[Output]')
    expect(articleHtml).toContain('.prose pre.mermaid { border-left: 0; }')
    expect(articleHtml).toContain('.prose .mermaid { margin: 1.8em auto; overflow-x: auto; background: transparent;')
    expect(articleHtml).not.toContain('.prose .mermaid { margin: 1.8em auto; overflow-x: auto; border-left:')
    expect(articleHtml).toContain('.prose .mermaid svg { background: transparent !important; }')
    expect(articleHtml).toContain('.prose .mermaid .node rect')
    expect(articleHtml).toContain('<script type="module" src="/assets/static-mermaid.js"></script>')
    expect(articleHtml).not.toContain('src="javascript:')
    expect(existsSync(join(outputRoot, 'translations/martinfowler/3.jpg'))).toBe(true)
  })
})
