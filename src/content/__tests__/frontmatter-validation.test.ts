import { describe, expect, it } from 'vitest'
import { scanContent } from '../scan-content.js'
import { ContentFixture } from './support/content-fixture.js'

describe('front matter validation', () => {
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

  it('accepts CRLF front matter delimiters and a closing delimiter at EOF', async () => {
    const fixture = await ContentFixture.create()
    await fixture.writeMarkdown(
      'engineering/crlf.md',
      '---\r\ntitle: CRLF Article\r\ndescription: CRLF article\r\ncreatedAt: 2026-05-30\r\nupdatedAt: 2026-05-30\r\nauthor: Neil Wang\r\nlang: zh-CN\r\n---',
    )

    const result = await scanContent(fixture.root)

    expect(result.articles[0]).toMatchObject({
      title: 'CRLF Article',
      body: '',
    })
  })

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

  it('fails when front matter is missing or malformed', async () => {
    const fixture = await ContentFixture.create()
    await fixture.writeMarkdown('engineering/no-frontmatter.md', 'Body only')

    await expect(scanContent(fixture.root)).rejects.toMatchObject({
      name: 'ContentValidationError',
      issues: [expect.objectContaining({ field: 'frontMatter', reason: 'missing' })],
    })
  })
})
