import { describe, expect, it } from 'vitest'
import { scanContent } from '../scan-content.js'
import { ContentFixture } from './support/content-fixture.js'

describe('front matter scalar field rules', () => {
  it('fails with representative type and semantic validation issues', async () => {
    const fixture = await ContentFixture.create()
    await fixture.writeMarkdown('engineering/invalid-fields.md', `---
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

    await expect(scanContent(fixture.root)).rejects.toMatchObject({
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
})
