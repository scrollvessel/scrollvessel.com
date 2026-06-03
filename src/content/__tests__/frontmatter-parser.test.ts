import { describe, expect, it } from 'vitest'
import { scanContent } from '../scan-content.js'
import { ContentFixture } from './support/content-fixture.js'

describe('front matter parser', () => {
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

  it('fails when front matter is missing or malformed', async () => {
    const fixture = await ContentFixture.create()
    await fixture.writeMarkdown('engineering/no-frontmatter.md', 'Body only')

    await expect(scanContent(fixture.root)).rejects.toMatchObject({
      name: 'ContentValidationError',
      issues: [expect.objectContaining({ field: 'frontMatter', reason: 'missing' })],
    })
  })
})
