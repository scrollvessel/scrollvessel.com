import type { CategoryMetadataRecord, CategoryRecord } from '../../../src/content/index.js'
import type { ArticlePageRecord } from './article-page-record.js'
import { PathMatch } from './path-match.js'

export class CategoryQuery {
  constructor(
    private readonly articles: ArticlePageRecord[],
    private readonly categories: CategoryRecord[],
    private readonly categoryMetadata: CategoryMetadataRecord[],
  ) {}

  childCategoriesOf(category: CategoryRecord): CategoryRecord[] {
    return this.categories.filter((candidate) => new PathMatch(candidate.path).isDirectChildOf(category.path))
  }

  articlesIn(path: string[]): ArticlePageRecord[] {
    return this.articles.filter((article) => new PathMatch(article.categoryPath).isSame(path))
  }

  descendantArticlesIn(path: string[]): ArticlePageRecord[] {
    return this.articles.filter((article) => new PathMatch(article.categoryPath).startsWith(path))
  }

  categoryNameFor(path: string[]): string {
    return this.categoryMetadata.find((metadata) => new PathMatch(metadata.path).isSame(path))?.categoryName ?? path.at(-1) ?? ''
  }
}
