import { readFile } from 'node:fs/promises'
import type { FontFile } from './font-file.js'
import type { FontFileCopier } from './font-file-copier.js'

export class NotoSerifScFontSource {
  constructor(private readonly copier: FontFileCopier) {}

  async fontFaces(): Promise<string[]> {
    const fontFaces: string[] = []

    for (const weight of [400, 700]) {
      const css = await readFile(`node_modules/@fontsource/noto-serif-sc/${weight}.css`, 'utf8')
      const blocks = css.match(/\/\*[^*]+\*\/\n@font-face \{[\s\S]*?\n\}/g) ?? []

      for (const block of blocks) {
        const file = this.fileFrom(block)
        if (!file) continue

        await this.copier.copy(file)
        fontFaces.push(block.replace(/src: .*;/, `src: url('/fonts/${file.fileName}') format('woff2');`))
      }
    }

    return fontFaces
  }

  private fileFrom(block: string): FontFile | null {
    const fileName = block.match(/files\/(noto-serif-sc-[^)]*?\.woff2)/)?.[1]
    if (!fileName) return null

    return { packageName: 'noto-serif-sc', fileName }
  }
}
