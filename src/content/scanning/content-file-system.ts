import { readdir, readFile } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { ContentValidationError } from '../frontmatter/content-validation-error.js'

export class ContentFileSystem {
  constructor(private readonly contentRoot: string) {}

  async findContentFiles(): Promise<string[]> {
    return this.findFiles(this.contentRoot)
  }

  async readText(filePath: string): Promise<string> {
    return readFile(filePath, 'utf8')
  }

  private async findFiles(directory: string): Promise<string[]> {
    let entries
    try {
      entries = await readdir(directory, { withFileTypes: true })
    } catch (error) {
      if (isNodeError(error) && error.code === 'ENOENT') {
        throw new ContentValidationError([
          { filePath: this.contentRoot, field: 'contentRoot', reason: 'missing', fix: 'Create the content directory.' },
        ])
      }
      throw error
    }

    const files: string[] = []

    for (const entry of entries) {
      const fullPath = join(directory, entry.name)
      if (entry.isDirectory()) {
        files.push(...(await this.findFiles(fullPath)))
      } else if (entry.isFile() && (extname(entry.name) === '.md' || entry.name === 'meta.json')) {
        files.push(fullPath)
      }
    }

    return files.sort()
  }
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && 'code' in error
}
