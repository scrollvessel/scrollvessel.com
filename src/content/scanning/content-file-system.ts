import { readFile } from 'node:fs/promises'
import { RecursiveFileFinder } from '../../../scripts/file-system/recursive-file-finder.js'
import { ContentValidationError } from '../frontmatter/content-validation-error.js'
import { ContentFileSelectionRule } from './content-file-selection-rule.js'

export class ContentFileSystem {
  constructor(
    private readonly contentRoot: string,
    private readonly finder = new RecursiveFileFinder(new ContentFileSelectionRule()),
  ) {}

  async findContentFiles(): Promise<string[]> {
    try {
      return await this.finder.find(this.contentRoot)
    } catch (error) {
      if (isNodeError(error) && error.code === 'ENOENT') {
        throw new ContentValidationError([
          { filePath: this.contentRoot, field: 'contentRoot', reason: 'missing', fix: 'Create the content directory.' },
        ])
      }
      throw error
    }
  }

  async readText(filePath: string): Promise<string> {
    return readFile(filePath, 'utf8')
  }
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && 'code' in error
}
