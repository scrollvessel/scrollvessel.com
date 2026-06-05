import { CormorantGaramondFontSource } from './cormorant-garamond-font-source.js'
import { FontFileCopier } from './font-file-copier.js'
import { FontOutputDirectory } from './font-output-directory.js'
import type { FontSource } from './font-source.js'
import { LatinFontSource } from './latin-font-source.js'
import { NotoSerifScFontSource } from './noto-serif-sc-font-source.js'

export class FontAssetGenerator {
  private readonly output = new FontOutputDirectory('public/fonts')
  private readonly copier = new FontFileCopier(this.output)
  private readonly sources: FontSource[] = [
    new LatinFontSource(this.copier),
    new CormorantGaramondFontSource(this.copier),
    new NotoSerifScFontSource(this.copier),
  ]

  async generate(): Promise<void> {
    await this.output.reset()

    const fontFaces = (await Promise.all(this.sources.map((source) => source.fontFaces()))).flat()

    await this.output.writeCss(fontFaces)
    console.log(`Generated ${fontFaces.length} font-face rules and ${this.copier.copiedCount()} font files in ${this.output.path}.`)
  }
}
