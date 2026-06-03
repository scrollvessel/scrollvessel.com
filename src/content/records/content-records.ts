import { ArticleRecordFactory } from './article-record-factory.js'
import { CategoryIndex } from './category-index.js'
import { CategoryMetadata } from './category-metadata.js'
import { CategoryMetadataCatalog } from './category-metadata-catalog.js'
import type { ArticleRecord, ArticleRecordInput, CategoryMetadataInput, CategoryMetadataRecord, CategoryRecord } from './content-record-types.js'

export function toArticleRecord(input: ArticleRecordInput): ArticleRecord {
  return ArticleRecordFactory.fromInput(input)
}

export function toCategoryMetadataRecord(input: CategoryMetadataInput): CategoryMetadataRecord {
  return CategoryMetadata.fromInput(input).record
}

export function buildCategories(articles: ArticleRecord[], metadataRecords: CategoryMetadataRecord[] = []): CategoryRecord[] {
  const categoryIndex = new CategoryIndex(new CategoryMetadataCatalog(metadataRecords))

  for (const article of articles) {
    categoryIndex.addArticle(article)
  }

  return categoryIndex.toRecords()
}
