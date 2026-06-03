import { FontFace } from './font-face.js'
import { FontFileCopier } from './font-file-copier.js'
import { FontOutputDirectory } from './font-output-directory.js'
import { NotoSerifScFontSource } from './noto-serif-sc-font-source.js'

const latinRange = 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'

export class FontAssetGenerator {
  private readonly output = new FontOutputDirectory('public/fonts')
  private readonly copier = new FontFileCopier(this.output)
  private readonly fontFaces: string[] = []

  async generate(): Promise<void> {
    await this.output.reset()
    await this.addLatinFamilies()
    await this.addCormorantGaramond()
    this.fontFaces.push(...(await new NotoSerifScFontSource(this.copier).fontFaces()))
    await this.output.writeCss(this.fontFaces)
    console.log(`Generated ${this.fontFaces.length} font-face rules and ${this.copier.copiedCount()} font files in ${this.output.path}.`)
  }

  private async addLatinFamilies(): Promise<void> {
    for (const weight of [400, 600, 700]) {
      await this.addFontFace('archivo', 'Archivo', `archivo-latin-${weight}-normal.woff2`, weight)
      await this.addFontFace('crimson-pro', 'Crimson Pro', `crimson-pro-latin-${weight}-normal.woff2`, weight)
    }
  }

  private async addCormorantGaramond(): Promise<void> {
    await this.addFontFace('cormorant-garamond', 'Cormorant Garamond', 'cormorant-garamond-latin-700-normal.woff2', 700)
  }

  private async addFontFace(packageName: string, family: string, fileName: string, weight: number): Promise<void> {
    await this.copier.copy({ packageName, fileName })
    this.fontFaces.push(new FontFace({ family, fileName, weight, unicodeRange: latinRange }).render())
  }
}
