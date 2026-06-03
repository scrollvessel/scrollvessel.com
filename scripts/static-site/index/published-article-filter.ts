import type { ArticleRecord } from '../../../src/content/index.js'
import type { ArticlePageRecord } from './article-page-record.js'

export class PublishedArticleFilter {
  static filter(articles: ArticleRecord[]): ArticlePageRecord[] {
    return articles.filter(isPublishedArticle)
  }
}

function isPublishedArticle(article: ArticleRecord): article is ArticlePageRecord {
  return (
    article.draft !== true &&
    !article.relativePath.startsWith('demo/') &&
    typeof article.title === 'string' &&
    typeof article.description === 'string' &&
    typeof article.createdAt === 'string' &&
    typeof article.updatedAt === 'string' &&
    typeof article.author === 'string' &&
    typeof article.lang === 'string'
  )
}
