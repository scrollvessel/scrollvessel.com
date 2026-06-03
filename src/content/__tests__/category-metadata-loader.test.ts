import { describe, expect, it } from 'vitest'
import { scanContent } from '../scan-content.js'
import { ContentFixture } from './support/content-fixture.js'

describe('category metadata loader', () => {
  it('uses category metadata from directory meta files as display authority', async () => {
    const fixture = await ContentFixture.create()
    await fixture.writeJson('engineering/meta.json', { categoryName: '工程实践' })
    await fixture.writeJson('engineering/backend/meta.json', { categoryName: '后端工程' })
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

    expect(result.categoryMetadata).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: ['engineering'], categoryName: '工程实践' }),
        expect.objectContaining({ path: ['engineering', 'backend'], categoryName: '后端工程' }),
      ]),
    )
    expect(result.categories).toEqual([
      { path: ['engineering'], articleCount: 1, categoryName: '工程实践' },
      { path: ['engineering', 'backend'], articleCount: 1, categoryName: '后端工程' },
    ])
  })

  it('fails when category metadata misses categoryName', async () => {
    const fixture = await ContentFixture.create()
    await fixture.writeJson('engineering/meta.json', {})

    await expect(scanContent(fixture.root)).rejects.toMatchObject({
      name: 'ContentValidationError',
      issues: [expect.objectContaining({ field: 'categoryName', reason: 'required' })],
    })
  })

  it('fails when category metadata is not valid JSON', async () => {
    const fixture = await ContentFixture.create()
    await fixture.writeText('engineering/meta.json', '{')

    await expect(scanContent(fixture.root)).rejects.toMatchObject({
      name: 'ContentValidationError',
      issues: [expect.objectContaining({ field: 'categoryMetadata', reason: 'type' })],
    })
  })
})
