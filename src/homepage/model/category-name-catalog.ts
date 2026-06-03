import type { CategoryMetadataRecord } from '../../content/content-records'

export class CategoryNameCatalog {
  private readonly names = new Map<string, string>()

  constructor(records: CategoryMetadataRecord[]) {
    for (const record of records) {
      this.names.set(record.path.join('/'), record.categoryName)
    }
  }

  labelFor(path: string[]): string | null {
    return this.names.get(path.join('/')) ?? null
  }
}
