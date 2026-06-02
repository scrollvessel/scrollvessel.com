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
    expect(categoryHtml).toContain('<h1>主题目录</h1>')
    expect(articleHtml).toContain('<dt>标签</dt><dd>alpha / beta</dd>')
    expect(articleHtml).toContain('href="/topic/child/index.html"')
    expect(articleHtml).toContain('href="#"')
    expect(articleHtml).not.toContain('href="javascript:')
  })
})
