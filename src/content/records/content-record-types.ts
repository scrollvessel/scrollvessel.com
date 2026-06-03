export interface ArticleRecordInput {
  body: string
  data: Record<string, unknown>
  relativePath: string
  sourcePath: string
}

export interface CategoryMetadataInput {
  data: unknown
  relativePath: string
  sourcePath: string
}

export interface ArticleRecord {
  sourcePath: string
  relativePath: string
  url: string
  categoryPath: string[]
  body: string
  [key: string]: unknown
}

export interface CategoryMetadataRecord {
  sourcePath: string
  relativePath: string
  path: string[]
  categoryName: string
}

export interface CategoryRecord {
  path: string[]
  articleCount: number
  categoryName: string
}
