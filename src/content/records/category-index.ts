import { CategoryMetadataCatalog } from './category-metadata-catalog.js'
import type { ArticleRecord, CategoryRecord } from './content-record-types.js'

export class CategoryIndex {
  private readonly counts = new Map<string, CategoryRecord>()

  constructor(private readonly metadataCatalog: CategoryMetadataCatalog) {}

  addArticle(article: ArticleRecord): void {
    for (let index = 1; index <= article.categoryPath.length; index += 1) {
      const path = article.categoryPath.slice(0, index)
      const key = path.join('/')
      const category = this.counts.get(key) ?? {
        path,
        articleCount: 0,
        categoryName: this.metadataCatalog.categoryNameFor(path),
      }

      category.articleCount += 1
      this.counts.set(key, category)
    }
  }

  toRecords(): CategoryRecord[] {
    return [...this.counts.values()].sort((a, b) => a.path.join('/').localeCompare(b.path.join('/')))
  }
}
