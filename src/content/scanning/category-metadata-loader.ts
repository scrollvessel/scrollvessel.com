import { basename } from 'node:path'
import { ContentValidationError } from '../frontmatter/content-validation-error.js'
import { toCategoryMetadataRecord } from '../records/content-records.js'
import type { CategoryMetadataRecord } from '../records/content-record-types.js'
import type { ContentFileSystem } from './content-file-system.js'

export class CategoryMetadataLoader {
  constructor(private readonly fileSystem: ContentFileSystem) {}

  isMetadataFile(filePath: string): boolean {
    return basename(filePath) === 'meta.json'
  }

  async load(filePath: string, relativePath: string): Promise<CategoryMetadataRecord> {
    const metadata = toCategoryMetadataRecord({ data: await this.readJson(filePath), relativePath, sourcePath: filePath })
    this.validate(metadata)
    return metadata
  }

  private async readJson(filePath: string): Promise<unknown> {
    try {
      return JSON.parse(await this.fileSystem.readText(filePath))
    } catch (error) {
      throw new ContentValidationError([
        {
          filePath,
          field: 'categoryMetadata',
          reason: 'type',
          fix: error instanceof Error ? error.message : 'Use valid JSON.',
        },
      ])
    }
  }

  private validate(metadata: CategoryMetadataRecord): void {
    if (metadata.path.length === 0) {
      throw new ContentValidationError([
        {
          filePath: metadata.sourcePath,
          field: 'categoryName',
          reason: 'semantic',
          fix: 'Place meta.json inside a category directory.',
        },
      ])
    }

    if (!metadata.categoryName) {
      throw new ContentValidationError([
        {
          filePath: metadata.sourcePath,
          field: 'categoryName',
          reason: 'required',
          fix: 'Add a non-empty categoryName string.',
        },
      ])
    }
  }
}
