import { readdir } from 'node:fs/promises'
import { extname, join } from 'node:path'

export class AssetPathFinder {
  async find(directory: string): Promise<string[]> {
    const entries = await readdir(directory, { withFileTypes: true })
    const assetPaths: string[] = []

    for (const entry of entries) {
      const fullPath = join(directory, entry.name)
      if (entry.isDirectory()) {
        assetPaths.push(...(await this.find(fullPath)))
        continue
      }

      if (entry.isFile() && extname(entry.name) !== '.md' && entry.name !== 'meta.json') {
        assetPaths.push(fullPath)
      }
    }

    return assetPaths
  }
}
