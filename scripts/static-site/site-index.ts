import { buildCategories, type ArticleRecord, type CategoryMetadataRecord, type CategoryRecord } from '../../src/content/index.js'
import type { ArticleExternalLink, ArticlePageRecord } from './index/article-page-record.js'
import { CategoryQuery } from './index/category-query.js'
import { PublishedArticleFilter } from './index/published-article-filter.js'

export type { ArticleExternalLink, ArticlePageRecord } from './index/article-page-record.js'

export class StaticSiteIndex {
  private readonly query: CategoryQuery

  private constructor(
    readonly articles: ArticlePageRecord[],
    readonly categories: CategoryRecord[],
    readonly categoryMetadata: CategoryMetadataRecord[],
  ) {
    this.query = new CategoryQuery(articles, categories, categoryMetadata)
  }

  static fromContent(articles: ArticleRecord[], categoryMetadata: CategoryMetadataRecord[]): StaticSiteIndex {
    const publishedArticles = PublishedArticleFilter.filter(articles)
    return new StaticSiteIndex(publishedArticles, buildCategories(publishedArticles, categoryMetadata), categoryMetadata)
  }

  childCategoriesOf(category: CategoryRecord): CategoryRecord[] {
    return this.query.childCategoriesOf(category)
  }

  articlesIn(path: string[]): ArticlePageRecord[] {
    return this.query.articlesIn(path)
  }

  descendantArticlesIn(path: string[]): ArticlePageRecord[] {
    return this.query.descendantArticlesIn(path)
  }

  categoryNameFor(path: string[]): string {
    return this.query.categoryNameFor(path)
  }
}
