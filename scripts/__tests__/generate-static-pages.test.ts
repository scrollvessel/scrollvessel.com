import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { describe, expect, it } from 'vitest'

const execFileAsync = promisify(execFile)

describe('generate static pages', () => {
  it('emits safe category index and article html pages into dist', async () => {
    await execFileAsync('pnpm', ['build'], { timeout: 120_000 })

    const categoryHtml = await readFile('dist/engineering-practice/index.html', 'utf8')
    const articleHtml = await readFile('dist/engineering-practice/release-build/frontend-release-review.html', 'utf8')

    expect(existsSync('dist/engineering-practice/index.html')).toBe(true)
    expect(existsSync('dist/engineering-practice/release-build/index.html')).toBe(true)
    expect(existsSync('dist/engineering-practice/release-build/frontend-release-review.html')).toBe(true)
    expect(existsSync('dist/demo/index.html')).toBe(false)
    expect(categoryHtml).toContain('<h1>工程实践</h1>')
    expect(articleHtml).toContain('<dt>标签</dt><dd>工程实践 / 发布与构建 / demo</dd>')
    expect(articleHtml).toContain('href="/engineering-practice/release-build/index.html"')
    expect(articleHtml).not.toContain('href="javascript:')
  })
})
