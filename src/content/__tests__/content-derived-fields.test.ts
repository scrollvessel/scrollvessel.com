import { describe, expect, it } from 'vitest'
import { scanContent } from '../scan-content.js'
import { ContentFixture } from './support/content-fixture.js'

describe('content derived fields', () => {
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
})
