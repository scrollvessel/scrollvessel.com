import { mkdir, mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'

export class ContentFixture {
  private constructor(readonly root: string) {}

  static async create(): Promise<ContentFixture> {
    return new ContentFixture(await mkdtemp(join(tmpdir(), 'scroll-vessel-content-')))
  }

  path(relativePath: string): string {
    return join(this.root, relativePath)
  }

  async writeMarkdown(relativePath: string, body: string): Promise<string> {
    const filePath = this.path(relativePath)
    await mkdir(dirname(filePath), { recursive: true })
    await writeFile(filePath, body, 'utf8')
    return filePath
  }

  async writeJson(relativePath: string, data: unknown): Promise<string> {
    const filePath = this.path(relativePath)
    await mkdir(dirname(filePath), { recursive: true })
    await writeFile(filePath, JSON.stringify(data), 'utf8')
    return filePath
  }

  async writeText(relativePath: string, body: string): Promise<string> {
    const filePath = this.path(relativePath)
    await mkdir(dirname(filePath), { recursive: true })
    await writeFile(filePath, body, 'utf8')
    return filePath
  }
}
