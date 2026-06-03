import { describe, expect, it } from 'vitest'
import { generateStaticPages } from '../generate-static-pages.js'
import { StaticSiteFixture } from './support/static-site-fixture.js'

describe('static page generator', () => {
  it('generates safe category and article pages from isolated content fixtures', async () => {
    const fixture = await StaticSiteFixture.create()
    await fixture.writeJson('topic/meta.json', { categoryName: '主题目录' })
    await fixture.writeJson('topic/child/meta.json', { categoryName: '子目录' })
    await fixture.writeMarkdown('topic/child/article.md', `---
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

[unsafe](javascript:alert(1)) and [safe](/topic/child/index.html) and [external](https://example.com/reference)
`)
    await fixture.writeMarkdown('demo/placeholder.md', `---
title: Demo Placeholder
description: Demo placeholder
createdAt: 2026-06-01
updatedAt: 2026-06-02
author: Fixture Author
lang: zh-CN
---

Demo body
`)

    const result = await generateStaticPages({ contentRoot: fixture.contentRoot, outputRoot: fixture.outputRoot })
    const categoryHtml = await fixture.readOutput('topic/index.html')
    const articleHtml = await fixture.readOutput('topic/child/article.html')

    expect(result).toEqual({ articleCount: 1, categoryCount: 2 })
    expect(fixture.outputExists('topic/child/index.html')).toBe(true)
    expect(fixture.outputExists('demo/index.html')).toBe(false)
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
    expect(articleHtml).toContain('href="https://example.com/reference"')
    expect(articleHtml).toContain('class="prose-external-link"')
    expect(articleHtml).toContain('<a href="https://example.com/reference" class="prose-external-link" target="_blank" rel="noopener noreferrer">external</a>')
    expect(articleHtml).toContain('.prose-external-link { display: inline-flex; align-items: baseline; gap: 0.18em; background-image: linear-gradient(currentcolor, currentcolor);')
    expect(articleHtml).toContain('.prose-external-link::after')
    expect(articleHtml).toContain('href="#"')
    expect(articleHtml).not.toContain('href="javascript:')
  })
})
