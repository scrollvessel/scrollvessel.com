import { existsSync } from 'node:fs'
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'

export class StaticSiteFixture {
  private constructor(
    readonly contentRoot: string,
    readonly outputRoot: string,
  ) {}

  static async create(): Promise<StaticSiteFixture> {
    const root = await mkdtemp(join(tmpdir(), 'scroll-vessel-static-'))
    return new StaticSiteFixture(join(root, 'content'), join(root, 'dist'))
  }

  outputPath(relativePath: string): string {
    return join(this.outputRoot, relativePath)
  }

  outputExists(relativePath: string): boolean {
    return existsSync(this.outputPath(relativePath))
  }

  readOutput(relativePath: string): Promise<string> {
    return readFile(this.outputPath(relativePath), 'utf8')
  }

  async writeJson(relativePath: string, data: unknown): Promise<void> {
    const filePath = join(this.contentRoot, relativePath)
    await mkdir(dirname(filePath), { recursive: true })
    await writeFile(filePath, JSON.stringify(data), 'utf8')
  }

  async writeMarkdown(relativePath: string, body: string): Promise<void> {
    const filePath = join(this.contentRoot, relativePath)
    await mkdir(dirname(filePath), { recursive: true })
    await writeFile(filePath, body, 'utf8')
  }

  async writeAsset(relativePath: string, body: string): Promise<void> {
    const filePath = join(this.contentRoot, relativePath)
    await mkdir(dirname(filePath), { recursive: true })
    await writeFile(filePath, body)
  }
}
