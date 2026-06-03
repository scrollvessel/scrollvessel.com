import type { CategoryMetadataRecord } from './content-record-types.js'

export class CategoryMetadataCatalog {
  private readonly metadata = new Map<string, CategoryMetadataRecord>()

  constructor(records: CategoryMetadataRecord[]) {
    for (const record of records) {
      this.metadata.set(record.path.join('/'), record)
    }
  }

  categoryNameFor(path: string[]): string {
    return this.metadata.get(path.join('/'))?.categoryName ?? path.at(-1) ?? 'uncategorized'
  }
}
