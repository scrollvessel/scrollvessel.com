import { describe, expect, it } from 'vitest'
import { scanContent } from '../scan-content.js'
import { ContentFixture } from './support/content-fixture.js'

describe('content records', () => {
  it('creates stable URLs and aggregated category context from file paths', async () => {
    const fixture = await ContentFixture.create()
    await fixture.writeMarkdown('engineering/intro.md', `---
title: Engineering Intro
description: Engineering intro
createdAt: 2026-05-30
updatedAt: 2026-05-30
author: Neil Wang
lang: zh-CN
---

Body
`)
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
    await fixture.writeMarkdown('engineering/frontend/ui-design.md', `---
title: UI Design
description: UI article
createdAt: 2026-05-30
updatedAt: 2026-05-30
author: Neil Wang
lang: zh-CN
---

Body
`)

    const result = await scanContent(fixture.root)
    const apiArticle = result.articles.find((article) => article.relativePath === 'engineering/backend/api-design.md')

    expect(apiArticle).toMatchObject({
      relativePath: 'engineering/backend/api-design.md',
      url: '/engineering/backend/api-design.html',
      categoryPath: ['engineering', 'backend'],
    })
    expect(result.categories).toEqual([
      { path: ['engineering'], articleCount: 3, categoryName: 'engineering' },
      { path: ['engineering', 'backend'], articleCount: 1, categoryName: 'backend' },
      { path: ['engineering', 'frontend'], articleCount: 1, categoryName: 'frontend' },
    ])
  })

  it('keeps scanner-derived fields authoritative over front matter', async () => {
    const fixture = await ContentFixture.create()
    await fixture.writeMarkdown('engineering/derived-fields.md', `---
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

    const result = await scanContent(fixture.root)

    expect(result.articles[0]).toMatchObject({
      sourcePath: expect.stringContaining('derived-fields.md'),
      relativePath: 'engineering/derived-fields.md',
      url: '/engineering/derived-fields.html',
      categoryPath: ['engineering'],
      body: '\nBody\n',
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
