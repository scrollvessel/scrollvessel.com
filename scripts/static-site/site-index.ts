import { buildCategories, type ArticleRecord, type CategoryMetadataRecord, type CategoryRecord } from '../../src/content/index.js'

export interface ArticleExternalLink {
  platform?: string | null
  label?: string | null
  url?: string | null
}

export interface ArticlePageRecord extends ArticleRecord {
  title: string
  description: string
  createdAt: string
  updatedAt: string
  author: string
  lang: string
  tags?: string[]
  externalLinks?: ArticleExternalLink[]
}

export class StaticSiteIndex {
  private constructor(
    readonly articles: ArticlePageRecord[],
    readonly categories: CategoryRecord[],
    readonly categoryMetadata: CategoryMetadataRecord[],
  ) {}

  static fromContent(articles: ArticleRecord[], categoryMetadata: CategoryMetadataRecord[]): StaticSiteIndex {
    const publishedArticles = articles.filter(isPublishedArticle)
    return new StaticSiteIndex(publishedArticles, buildCategories(publishedArticles, categoryMetadata), categoryMetadata)
  }

  childCategoriesOf(category: CategoryRecord): CategoryRecord[] {
    return this.categories.filter((candidate) => isDirectChild(category.path, candidate.path))
  }

  articlesIn(path: string[]): ArticlePageRecord[] {
    return this.articles.filter((article) => isSamePath(article.categoryPath, path))
  }

  descendantArticlesIn(path: string[]): ArticlePageRecord[] {
    return this.articles.filter((article) => startsWithPath(article.categoryPath, path))
  }

  categoryNameFor(path: string[]): string {
    return this.categoryMetadata.find((metadata) => isSamePath(metadata.path, path))?.categoryName ?? path.at(-1) ?? ''
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

function isDirectChild(parent: string[], child: string[]): boolean {
  return child.length === parent.length + 1 && startsWithPath(child, parent)
}

function startsWithPath(path: string[], prefix: string[]): boolean {
  return prefix.every((part, index) => path[index] === part)
}

function isSamePath(a: string[], b: string[]): boolean {
  return a.length === b.length && startsWithPath(a, b)
}
