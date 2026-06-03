import type { ArticleRecord } from '../../../src/content/index.js'

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
