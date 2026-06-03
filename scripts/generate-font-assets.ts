import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const outputRoot = 'public/fonts'
const archivoRange = 'U+0020-002F, U+003A-0040, U+0041-005A, U+005B-0060, U+0061-007A, U+007B-007E'
const latinRange = 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'

interface FontFile {
  packageName: string
  fileName: string
}

const copiedFiles = new Set<string>()
const fontFaces: string[] = []

await rm(outputRoot, { recursive: true, force: true })
await mkdir(outputRoot, { recursive: true })

for (const weight of [400, 600, 700]) {
  await copyFontFile({ packageName: 'archivo', fileName: `archivo-latin-${weight}-normal.woff2` })
  await copyFontFile({ packageName: 'crimson-pro', fileName: `crimson-pro-latin-${weight}-normal.woff2` })

  fontFaces.push(fontFace({ family: 'ArchivoLetters', fileName: `archivo-latin-${weight}-normal.woff2`, weight, unicodeRange: archivoRange }))
  fontFaces.push(fontFace({ family: 'Crimson Pro', fileName: `crimson-pro-latin-${weight}-normal.woff2`, weight, unicodeRange: latinRange }))
}

await copyFontFile({ packageName: 'cormorant-garamond', fileName: 'cormorant-garamond-latin-700-normal.woff2' })
fontFaces.push(fontFace({ family: 'Cormorant Garamond', fileName: 'cormorant-garamond-latin-700-normal.woff2', weight: 700, unicodeRange: latinRange }))

for (const weight of [400, 700]) {
  const css = await readFile(`node_modules/@fontsource/noto-serif-sc/${weight}.css`, 'utf8')
  const blocks = css.match(/\/\*[^*]+\*\/\n@font-face \{[\s\S]*?\n\}/g) ?? []

  for (const block of blocks) {
    const fileName = block.match(/files\/(noto-serif-sc-[^)]*?\.woff2)/)?.[1]
    if (!fileName) continue

    await copyFontFile({ packageName: 'noto-serif-sc', fileName })
    fontFaces.push(block.replace(/src: .*;/, `src: url('/fonts/${fileName}') format('woff2');`))
  }
}

await writeFile(join(outputRoot, 'scroll-vessel-fonts.css'), `${fontFaces.join('\n\n')}\n`, 'utf8')
console.log(`Generated ${fontFaces.length} font-face rules and ${copiedFiles.size} font files in ${outputRoot}.`)

async function copyFontFile({ packageName, fileName }: FontFile): Promise<void> {
  if (copiedFiles.has(fileName)) return

  await copyFile(`node_modules/@fontsource/${packageName}/files/${fileName}`, join(outputRoot, fileName))
  copiedFiles.add(fileName)
}

function fontFace({ family, fileName, weight, unicodeRange }: { family: string; fileName: string; weight: number; unicodeRange: string }): string {
  return `@font-face {\n  font-family: '${family}';\n  font-style: normal;\n  font-display: swap;\n  font-weight: ${weight};\n  src: url('/fonts/${fileName}') format('woff2');\n  unicode-range: ${unicodeRange};\n}`
}
