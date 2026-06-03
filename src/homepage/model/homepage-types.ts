import type { ArticleRecord, CategoryMetadataRecord, CategoryRecord } from '../../content/content-records'

export interface HomepageArticle extends ArticleRecord {
  title: string
  updatedAt: string
  featured?: boolean
  draft?: boolean
  relativePath: string
}

export interface HomepageCategoryNode {
  slug: string
  label: string
  description: string
  count: number
  url: string
  position: string
  children: HomepageCategoryNode[]
  articles: HomepageArticle[]
}

export interface FocusedRouteItem {
  label: string
  count: number
  url: string
}

export interface HomepageModelData {
  articles: ArticleRecord[]
  categories: CategoryRecord[]
  categoryMetadata: CategoryMetadataRecord[]
}
