import { toCategoryMetadataRecord, type CategoryMetadataRecord } from '../../content/content-records'
import { ViteContentPath } from './vite-content-path'

export class MetadataModuleCollection {
  constructor(private readonly modules: Record<string, unknown>) {}

  toCategoryMetadata(): CategoryMetadataRecord[] {
    return Object.entries(this.modules).map(([sourcePath, data]) => {
      const relativePath = new ViteContentPath(sourcePath).relativePath()

      return toCategoryMetadataRecord({ data, relativePath, sourcePath })
    })
  }
}
