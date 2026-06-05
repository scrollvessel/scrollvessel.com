import { describe, expect, it } from 'vitest'
import { scanContent } from '../scan-content.js'
import { ContentFixture } from './support/content-fixture.js'

describe('content category aggregation', () => {
  it('creates aggregated category context from file paths', async () => {
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

    expect(result.categories).toEqual([
      { path: ['engineering'], articleCount: 3, categoryName: 'engineering' },
      { path: ['engineering', 'backend'], articleCount: 1, categoryName: 'backend' },
      { path: ['engineering', 'frontend'], articleCount: 1, categoryName: 'frontend' },
    ])
  })
})
