import { FontFace } from './font-face.js'
import type { FontFileCopier } from './font-file-copier.js'
import type { FontSource } from './font-source.js'

const latinRange = 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'

export class CormorantGaramondFontSource implements FontSource {
  constructor(private readonly copier: FontFileCopier) {}

  async fontFaces(): Promise<string[]> {
    const fileName = 'cormorant-garamond-latin-700-normal.woff2'
    await this.copier.copy({ packageName: 'cormorant-garamond', fileName })
    return [new FontFace({ family: 'Cormorant Garamond', fileName, weight: 700, unicodeRange: latinRange }).render()]
  }
}
