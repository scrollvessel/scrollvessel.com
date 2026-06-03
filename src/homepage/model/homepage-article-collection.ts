import type { ArticleRecord } from '../../content/content-records'
import type { HomepageArticle } from './homepage-types'

export class HomepageArticleCollection {
  constructor(private readonly articles: HomepageArticle[]) {}

  static fromRecords(records: ArticleRecord[]): HomepageArticleCollection {
    return new HomepageArticleCollection(records.filter(isHomepageArticle))
  }

  featured(): HomepageArticle[] {
    return this.articles.filter((article) => article.featured === true).sort(compareNewest).slice(0, 3)
  }

  latest(): HomepageArticle[] {
    return [...this.articles].sort(compareNewest).slice(0, 3)
  }

  all(): HomepageArticle[] {
    return [...this.articles]
  }
}

function compareNewest(a: HomepageArticle, b: HomepageArticle): number {
  return b.updatedAt.localeCompare(a.updatedAt)
}

function isHomepageArticle(article: ArticleRecord): article is HomepageArticle {
  return (
    article.draft !== true &&
    !article.relativePath.startsWith('demo/') &&
    typeof article.title === 'string' &&
    typeof article.updatedAt === 'string'
  )
}
