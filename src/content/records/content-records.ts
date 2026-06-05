import { ArticleRecordFactory } from './article-record-factory.js'
import { CategoryCollectionBuilder } from './category-collection-builder.js'
import { CategoryMetadata } from './category-metadata.js'
import type { ArticleRecord, ArticleRecordInput, CategoryMetadataInput, CategoryMetadataRecord, CategoryRecord } from './content-record-types.js'

export function toArticleRecord(input: ArticleRecordInput): ArticleRecord {
  return ArticleRecordFactory.fromInput(input)
}

export function toCategoryMetadataRecord(input: CategoryMetadataInput): CategoryMetadataRecord {
  return CategoryMetadata.fromInput(input).record
}

export function buildCategories(articles: ArticleRecord[], metadataRecords: CategoryMetadataRecord[] = []): CategoryRecord[] {
  return new CategoryCollectionBuilder(articles, metadataRecords).build()
}
