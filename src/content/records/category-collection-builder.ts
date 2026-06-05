import { CategoryIndex } from './category-index.js'
import { CategoryMetadataCatalog } from './category-metadata-catalog.js'
import type { ArticleRecord, CategoryMetadataRecord, CategoryRecord } from './content-record-types.js'

export class CategoryCollectionBuilder {
  constructor(
    private readonly articles: ArticleRecord[],
    private readonly metadataRecords: CategoryMetadataRecord[] = [],
  ) {}

  build(): CategoryRecord[] {
    const categoryIndex = new CategoryIndex(new CategoryMetadataCatalog(this.metadataRecords))

    for (const article of this.articles) {
      categoryIndex.addArticle(article)
    }

    return categoryIndex.toRecords()
  }
}
