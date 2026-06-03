import { describe, expect, it } from 'vitest'
import { scanContent } from '../scan-content.js'
import { ContentFixture } from './support/content-fixture.js'

describe('front matter external links field', () => {
  it('fails when external link entries contain no usable facts', async () => {
    const fixture = await ContentFixture.create()
    await fixture.writeMarkdown('engineering/empty-external-link.md', `---
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

    await expect(scanContent(fixture.root)).rejects.toMatchObject({
      name: 'ContentValidationError',
      issues: [expect.objectContaining({ field: 'externalLinks', reason: 'empty' })],
    })
  })
})
