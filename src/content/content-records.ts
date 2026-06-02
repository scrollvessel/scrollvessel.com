export interface ArticleRecordInput {
  body: string
  data: Record<string, unknown>
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

export interface CategoryRecord {
  path: string[]
  articleCount: number
}

export function toArticleRecord({ body, data, relativePath, sourcePath }: ArticleRecordInput): ArticleRecord {
  const parts = relativePath.split('/')
  const fileName = parts.at(-1) ?? ''
  const slug = fileName.replace(/\.md$/, '')
  const categoryPath = parts.slice(0, -1)
  const urlParts = slug === 'index' ? categoryPath : [...categoryPath, slug]
  const url = `/${urlParts.join('/')}`

  return {
    ...data,
    sourcePath,
    relativePath,
    url,
    categoryPath,
    body,
  }
}

export function buildCategories(articles: ArticleRecord[]): CategoryRecord[] {
  const counts = new Map<string, CategoryRecord>()

  for (const article of articles) {
    for (let index = 1; index <= article.categoryPath.length; index += 1) {
      const path = article.categoryPath.slice(0, index)
      const key = path.join('/')
      const category = counts.get(key) ?? { path, articleCount: 0 }
      category.articleCount += 1
      counts.set(key, category)
    }
  }

  return [...counts.values()].sort((a, b) => a.path.join('/').localeCompare(b.path.join('/')))
}
