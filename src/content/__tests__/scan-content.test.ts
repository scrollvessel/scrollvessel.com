import { mkdir, mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { scanContent } from '../scan-content.js'

async function createContentRoot(): Promise<string> {
  return mkdtemp(join(tmpdir(), 'scroll-vessel-content-'))
}

async function writeMarkdown(root: string, relativePath: string, body: string): Promise<string> {
  const filePath = join(root, relativePath)
  await mkdir(dirname(filePath), { recursive: true })
  await writeFile(filePath, body, 'utf8')
  return filePath
}

describe('scanContent', () => {
  it('fails with file and field when required front matter is missing', async () => {
    const root = await createContentRoot()
    await writeMarkdown(root, 'engineering/missing-title.md', `---
description: Missing title
createdAt: 2026-05-30
updatedAt: 2026-05-30
author: Neil Wang
lang: zh-CN
---

Body
`)

    await expect(scanContent(root)).rejects.toMatchObject({
      name: 'ContentValidationError',
      issues: [
        expect.objectContaining({
          filePath: expect.stringContaining('missing-title.md'),
          field: 'title',
          reason: 'required',
        }),
      ],
    })
  })

  it('discovers markdown files recursively and ignores non-markdown files', async () => {
    const root = await createContentRoot()
    await writeMarkdown(root, 'engineering/backend/api.md', `---
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
    await writeFile(join(root, 'engineering/backend/cover.png'), 'image', 'utf8')

    const result = await scanContent(root)

    expect(result.articles).toHaveLength(1)
    expect(result.articles[0]).toMatchObject({
      sourcePath: expect.stringContaining('api.md'),
      title: 'API Design',
      categoryPath: ['engineering', 'backend'],
    })
  })

  it('creates stable URLs and aggregated category context from file paths', async () => {
    const root = await createContentRoot()
    await writeMarkdown(root, 'engineering/intro.md', `---
title: Engineering Intro
description: Engineering intro
createdAt: 2026-05-30
updatedAt: 2026-05-30
author: Neil Wang
lang: zh-CN
---

Body
`)
    await writeMarkdown(root, 'engineering/backend/api-design.md', `---
title: API Design
description: API article
createdAt: 2026-05-30
updatedAt: 2026-05-30
author: Neil Wang
lang: zh-CN
---

Body
`)
    await writeMarkdown(root, 'engineering/frontend/ui-design.md', `---
title: UI Design
description: UI article
createdAt: 2026-05-30
updatedAt: 2026-05-30
author: Neil Wang
lang: zh-CN
---

Body
`)

    const result = await scanContent(root)
    const apiArticle = result.articles.find((article) => article.relativePath === 'engineering/backend/api-design.md')

    expect(apiArticle).toMatchObject({
      relativePath: 'engineering/backend/api-design.md',
      url: '/engineering/backend/api-design',
      categoryPath: ['engineering', 'backend'],
    })
    expect(result.categories).toEqual([
      { path: ['engineering'], articleCount: 3 },
      { path: ['engineering', 'backend'], articleCount: 1 },
      { path: ['engineering', 'frontend'], articleCount: 1 },
    ])
  })

  it('preserves draft demo tags and external link facts', async () => {
    const root = await createContentRoot()
    await writeMarkdown(root, 'engineering/demo-article.md', `---
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

    const result = await scanContent(root)

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

  it('accepts CRLF front matter delimiters and a closing delimiter at EOF', async () => {
    const root = await createContentRoot()
    await writeMarkdown(
      root,
      'engineering/crlf.md',
      '---\r\ntitle: CRLF Article\r\ndescription: CRLF article\r\ncreatedAt: 2026-05-30\r\nupdatedAt: 2026-05-30\r\nauthor: Neil Wang\r\nlang: zh-CN\r\n---',
    )

    const result = await scanContent(root)

    expect(result.articles[0]).toMatchObject({
      title: 'CRLF Article',
      body: '',
    })
  })

  it('fails when tags entries are not non-empty strings', async () => {
    const root = await createContentRoot()
    await writeMarkdown(root, 'engineering/object-tags.md', `---
title: Object Tags
description: Object tags
createdAt: 2026-05-30
updatedAt: 2026-05-30
author: Neil Wang
lang: zh-CN
tags:
  - name: content
---

Body
`)

    await expect(scanContent(root)).rejects.toMatchObject({
      name: 'ContentValidationError',
      issues: [expect.objectContaining({ field: 'tags', reason: 'type' })],
    })
  })

  it('fails when inline tags contain an empty entry', async () => {
    const root = await createContentRoot()
    await writeMarkdown(root, 'engineering/empty-tag.md', `---
title: Empty Tag
description: Empty tag
createdAt: 2026-05-30
updatedAt: 2026-05-30
author: Neil Wang
lang: zh-CN
tags: [content, ""]
---

Body
`)

    await expect(scanContent(root)).rejects.toMatchObject({
      name: 'ContentValidationError',
      issues: [expect.objectContaining({ field: 'tags', reason: 'type' })],
    })
  })

  it('fails when inline tags contain non-string scalar entries', async () => {
    const root = await createContentRoot()
    await writeMarkdown(root, 'engineering/numeric-tag.md', `---
title: Numeric Tag
description: Numeric tag
createdAt: 2026-05-30
updatedAt: 2026-05-30
author: Neil Wang
lang: zh-CN
tags: [123]
---

Body
`)

    await expect(scanContent(root)).rejects.toMatchObject({
      name: 'ContentValidationError',
      issues: [expect.objectContaining({ field: 'tags', reason: 'type' })],
    })
  })

  it('keeps scanner-derived fields authoritative over front matter', async () => {
    const root = await createContentRoot()
    await writeMarkdown(root, 'engineering/derived-fields.md', `---
title: Derived Fields
description: Derived fields
createdAt: 2026-05-30
updatedAt: 2026-05-30
author: Neil Wang
lang: zh-CN
url: /fake
sourcePath: /fake.md
relativePath: fake.md
categoryPath: fake
---

Body
`)

    const result = await scanContent(root)

    expect(result.articles[0]).toMatchObject({
      sourcePath: expect.stringContaining('derived-fields.md'),
      relativePath: 'engineering/derived-fields.md',
      url: '/engineering/derived-fields',
      categoryPath: ['engineering'],
      body: '\nBody\n',
    })
  })

  it('returns empty index for empty content directory', async () => {
    const root = await createContentRoot()

    await expect(scanContent(root)).resolves.toEqual({
      articles: [],
      categories: [],
    })
  })

  it('fails with contentRoot issue when content directory is missing', async () => {
    const root = join(await createContentRoot(), 'missing')

    await expect(scanContent(root)).rejects.toMatchObject({
      name: 'ContentValidationError',
      issues: [
        expect.objectContaining({
          filePath: root,
          field: 'contentRoot',
          reason: 'missing',
        }),
      ],
    })
  })

  it('fails when two markdown files resolve to the same URL', async () => {
    const root = await createContentRoot()
    await writeMarkdown(root, 'engineering.md', `---
title: Engineering
description: Engineering root
createdAt: 2026-05-30
updatedAt: 2026-05-30
author: Neil Wang
lang: zh-CN
---

Body
`)
    await writeMarkdown(root, 'engineering/index.md', `---
title: Engineering Index
description: Engineering index
createdAt: 2026-05-30
updatedAt: 2026-05-30
author: Neil Wang
lang: zh-CN
---

Body
`)

    await expect(scanContent(root)).rejects.toMatchObject({
      name: 'ContentValidationError',
      issues: [
        expect.objectContaining({
          field: 'url',
          reason: 'duplicate',
        }),
      ],
    })
  })

  it('fails with representative type and semantic validation issues', async () => {
    const root = await createContentRoot()
    await writeMarkdown(root, 'engineering/invalid-fields.md', `---
title: null
description: Invalid fields
createdAt: 2026-05-31
updatedAt: 2026-05-30
author: Neil Wang
lang: zh-CN
draft: maybe
tags: content
externalLinks:
  - platform: 123
---

Body
`)

    await expect(scanContent(root)).rejects.toMatchObject({
      name: 'ContentValidationError',
      issues: expect.arrayContaining([
        expect.objectContaining({ field: 'title', reason: 'required' }),
        expect.objectContaining({ field: 'updatedAt', reason: 'date-order' }),
        expect.objectContaining({ field: 'draft', reason: 'type' }),
        expect.objectContaining({ field: 'tags', reason: 'type' }),
        expect.objectContaining({ field: 'externalLinks.platform', reason: 'type' }),
      ]),
    })
  })

  it('fails when external link entries contain no usable facts', async () => {
    const root = await createContentRoot()
    await writeMarkdown(root, 'engineering/empty-external-link.md', `---
title: Empty External Link
description: Empty external link
createdAt: 2026-05-30
updatedAt: 2026-05-30
author: Neil Wang
lang: zh-CN
externalLinks:
  - platform:
---

Body
`)

    await expect(scanContent(root)).rejects.toMatchObject({
      name: 'ContentValidationError',
      issues: [expect.objectContaining({ field: 'externalLinks', reason: 'empty' })],
    })
  })

  it('fails when front matter is missing or malformed', async () => {
    const root = await createContentRoot()
    await writeMarkdown(root, 'engineering/no-frontmatter.md', 'Body only')

    await expect(scanContent(root)).rejects.toMatchObject({
      name: 'ContentValidationError',
      issues: [expect.objectContaining({ field: 'frontMatter', reason: 'missing' })],
    })
  })
})
