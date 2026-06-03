import { describe, expect, it } from 'vitest'
import { scanContent } from '../scan-content.js'
import { ContentFixture } from './support/content-fixture.js'

describe('content scanner', () => {
  it('discovers markdown files recursively and ignores non-markdown files', async () => {
    const fixture = await ContentFixture.create()
    await fixture.writeMarkdown('engineering/backend/api.md', `---
title: API Design
description: API article
createdAt: 2026-05-30
updatedAt: 2026-05-30
author: Neil Wang
lang: zh-CN
tags: [api, backend]
---

Body
`)
    await fixture.writeText('engineering/backend/cover.png', 'image')

    const result = await scanContent(fixture.root)

    expect(result.articles).toHaveLength(1)
    expect(result.articles[0]).toMatchObject({
      sourcePath: expect.stringContaining('api.md'),
      title: 'API Design',
      categoryPath: ['engineering', 'backend'],
    })
  })

  it('preserves draft demo tags and external link facts', async () => {
    const fixture = await ContentFixture.create()
    await fixture.writeMarkdown('engineering/demo-article.md', `---
title: Demo Article
description: Demo article
createdAt: 2026-05-30
updatedAt: 2026-05-30
author: Neil Wang
lang: zh-CN
draft: true
demo: true
tags: [demo, content]
externalLinks:
  - platform: zhihu
    label: Zhihu
    url: https://example.com/zhihu
---

Body
`)

    const result = await scanContent(fixture.root)

    expect(result.articles[0]).toMatchObject({
      draft: true,
      demo: true,
      tags: ['demo', 'content'],
      externalLinks: [
        {
          platform: 'zhihu',
          label: 'Zhihu',
          url: 'https://example.com/zhihu',
        },
      ],
    })
  })

  it('returns empty index for empty content directory', async () => {
    const fixture = await ContentFixture.create()

    await expect(scanContent(fixture.root)).resolves.toEqual({
      articles: [],
      categories: [],
      categoryMetadata: [],
    })
  })

  it('fails with contentRoot issue when content directory is missing', async () => {
    const fixture = await ContentFixture.create()
    const missingRoot = fixture.path('missing')

    await expect(scanContent(missingRoot)).rejects.toMatchObject({
      name: 'ContentValidationError',
      issues: [
        expect.objectContaining({
          filePath: missingRoot,
          field: 'contentRoot',
          reason: 'missing',
        }),
      ],
    })
  })
})
