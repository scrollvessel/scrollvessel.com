import { describe, expect, it } from 'vitest'
import { scanContent } from '../scan-content.js'
import { ContentFixture } from './support/content-fixture.js'

describe('front matter tags field', () => {
  it('fails when tags entries are not non-empty strings', async () => {
    const fixture = await ContentFixture.create()
    await fixture.writeMarkdown('engineering/object-tags.md', `---
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

    await expect(scanContent(fixture.root)).rejects.toMatchObject({
      name: 'ContentValidationError',
      issues: [expect.objectContaining({ field: 'tags', reason: 'type' })],
    })
  })

  it('fails when inline tags contain an empty entry', async () => {
    const fixture = await ContentFixture.create()
    await fixture.writeMarkdown('engineering/empty-tag.md', `---
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

    await expect(scanContent(fixture.root)).rejects.toMatchObject({
      name: 'ContentValidationError',
      issues: [expect.objectContaining({ field: 'tags', reason: 'type' })],
    })
  })

  it('fails when inline tags contain non-string scalar entries', async () => {
    const fixture = await ContentFixture.create()
    await fixture.writeMarkdown('engineering/numeric-tag.md', `---
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

    await expect(scanContent(fixture.root)).rejects.toMatchObject({
      name: 'ContentValidationError',
      issues: [expect.objectContaining({ field: 'tags', reason: 'type' })],
    })
  })
})
