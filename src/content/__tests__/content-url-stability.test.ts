import { describe, expect, it } from 'vitest'
import { scanContent } from '../scan-content.js'
import { ContentFixture } from './support/content-fixture.js'

describe('content URL stability', () => {
  it('creates stable article URLs from file paths', async () => {
    const fixture = await ContentFixture.create()
    await fixture.writeMarkdown('engineering/backend/api-design.md', `---
title: API Design
description: API article
createdAt: 2026-05-30
updatedAt: 2026-05-30
author: Neil Wang
lang: zh-CN
---

Body
`)

    const result = await scanContent(fixture.root)

    expect(result.articles[0]).toMatchObject({
      relativePath: 'engineering/backend/api-design.md',
      url: '/engineering/backend/api-design.html',
      categoryPath: ['engineering', 'backend'],
    })
  })

  it('keeps sibling articles and directory index pages on distinct html URLs', async () => {
    const fixture = await ContentFixture.create()
    await fixture.writeMarkdown('engineering.md', `---
title: Engineering
description: Engineering root
createdAt: 2026-05-30
updatedAt: 2026-05-30
author: Neil Wang
lang: zh-CN
---

Body
`)
    await fixture.writeMarkdown('engineering/index.md', `---
title: Engineering Index
description: Engineering index
createdAt: 2026-05-30
updatedAt: 2026-05-30
author: Neil Wang
lang: zh-CN
---

Body
`)

    const result = await scanContent(fixture.root)

    expect(result.articles.map((article) => article.url).sort()).toEqual(['/engineering.html', '/engineering/index.html'])
  })
})
