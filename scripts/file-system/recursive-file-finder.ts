import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

export interface FileSelectionRule {
  accepts(fileName: string): boolean
}

export class RecursiveFileFinder {
  constructor(private readonly rule: FileSelectionRule) {}

  async find(directory: string): Promise<string[]> {
    const entries = await readdir(directory, { withFileTypes: true })
    const files: string[] = []

    for (const entry of entries) {
      const fullPath = join(directory, entry.name)
      if (entry.isDirectory()) {
        files.push(...(await this.find(fullPath)))
      } else if (entry.isFile() && this.rule.accepts(entry.name)) {
        files.push(fullPath)
      }
    }

    return files.sort()
  }
}
