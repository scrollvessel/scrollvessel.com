import { ContentPath } from './content-path.js'
import type { CategoryMetadataInput, CategoryMetadataRecord } from './content-record-types.js'

export class CategoryMetadata {
  private constructor(readonly record: CategoryMetadataRecord) {}

  static fromInput({ data, relativePath, sourcePath }: CategoryMetadataInput): CategoryMetadata {
    const categoryName = readCategoryName(data)
    const path = ContentPath.fromRelativeFile(relativePath).toMetadataCategoryPath()

    return new CategoryMetadata({ categoryName, path, relativePath, sourcePath })
  }
}

function readCategoryName(data: unknown): string {
  if (!isObject(data)) return ''

  const value = data.categoryName
  return typeof value === 'string' ? value.trim() : ''
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
