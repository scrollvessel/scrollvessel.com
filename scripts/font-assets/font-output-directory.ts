import { mkdir, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

export class FontOutputDirectory {
  constructor(readonly path: string) {}

  async reset(): Promise<void> {
    await rm(this.path, { recursive: true, force: true })
    await mkdir(this.path, { recursive: true })
  }

  async writeCss(fontFaces: string[]): Promise<void> {
    await writeFile(join(this.path, 'scroll-vessel-fonts.css'), `${fontFaces.join('\n\n')}\n`, 'utf8')
  }
}
