import { describe, expect, it } from 'vitest'
import { scanContent } from '../scan-content.js'
import { ContentFixture } from './support/content-fixture.js'

describe('required front matter fields', () => {
  it('fails with file and field when required front matter is missing', async () => {
    const fixture = await ContentFixture.create()
    await fixture.writeMarkdown('engineering/missing-title.md', `---
description: Missing title
createdAt: 2026-05-30
updatedAt: 2026-05-30
author: Neil Wang
lang: zh-CN
---

Body
`)

    await expect(scanContent(fixture.root)).rejects.toMatchObject({
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
})
