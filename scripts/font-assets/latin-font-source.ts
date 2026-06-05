import { FontFace } from './font-face.js'
import type { FontFileCopier } from './font-file-copier.js'
import type { FontSource } from './font-source.js'

const latinRange = 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'

interface LatinFontFamily {
  packageName: string
  family: string
  weights: number[]
}

export class LatinFontSource implements FontSource {
  constructor(
    private readonly copier: FontFileCopier,
    private readonly fonts: LatinFontFamily[] = [
      { packageName: 'archivo', family: 'Archivo', weights: [400, 600, 700] },
      { packageName: 'crimson-pro', family: 'Crimson Pro', weights: [400, 600, 700] },
    ],
  ) {}

  async fontFaces(): Promise<string[]> {
    const fontFaces: string[] = []

    for (const font of this.fonts) {
      for (const weight of font.weights) {
        const fileName = `${font.packageName}-latin-${weight}-normal.woff2`
        await this.copier.copy({ packageName: font.packageName, fileName })
        fontFaces.push(new FontFace({ family: font.family, fileName, weight, unicodeRange: latinRange }).render())
      }
    }

    return fontFaces
  }
}
