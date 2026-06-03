import { copyFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { FontFile } from './font-file.js'
import type { FontOutputDirectory } from './font-output-directory.js'

export class FontFileCopier {
  private readonly copiedFiles = new Set<string>()

  constructor(private readonly output: FontOutputDirectory) {}

  copiedCount(): number {
    return this.copiedFiles.size
  }

  async copy({ packageName, fileName }: FontFile): Promise<void> {
    if (this.copiedFiles.has(fileName)) return

    await copyFile(`node_modules/@fontsource/${packageName}/files/${fileName}`, join(this.output.path, fileName))
    this.copiedFiles.add(fileName)
  }
}
