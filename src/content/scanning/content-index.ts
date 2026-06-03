import type { ArticleRecord, CategoryMetadataRecord, CategoryRecord } from '../records/content-record-types.js'

export interface ContentIndex {
  articles: ArticleRecord[]
  categories: CategoryRecord[]
  categoryMetadata: CategoryMetadataRecord[]
}
