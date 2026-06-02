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

export class ContentPath {
  private constructor(private readonly segments: string[]) {}

  static fromRelativeFile(relativePath: string): ContentPath {
    return new ContentPath(relativePath.split('/').filter(Boolean))
  }

  toCategoryPath(): string[] {
    return this.segments.slice(0, -1)
  }

  toUrl(): string {
    const fileName = this.segments.at(-1) ?? ''
    const slug = fileName.replace(/\.md$/, '')
    const categoryPath = this.toCategoryPath()
    const urlParts = slug === 'index' ? [...categoryPath, 'index.html'] : [...categoryPath, `${slug}.html`]

    return `/${urlParts.join('/')}`
  }

  toMetadataCategoryPath(): string[] {
    const fileName = this.segments.at(-1)
    if (fileName !== 'meta.json') return this.segments

    return this.segments.slice(0, -1)
  }
}

export class CategoryMetadata {
  private constructor(readonly record: CategoryMetadataRecord) {}

  static fromInput({ data, relativePath, sourcePath }: CategoryMetadataInput): CategoryMetadata {
    const categoryName = readCategoryName(data)
    const path = ContentPath.fromRelativeFile(relativePath).toMetadataCategoryPath()

    return new CategoryMetadata({ categoryName, path, relativePath, sourcePath })
  }
}

export class CategoryMetadataCatalog {
  private readonly metadata = new Map<string, CategoryMetadataRecord>()

  constructor(records: CategoryMetadataRecord[]) {
    for (const record of records) {
      this.metadata.set(record.path.join('/'), record)
    }
  }

  categoryNameFor(path: string[]): string {
    return this.metadata.get(path.join('/'))?.categoryName ?? path.at(-1) ?? 'uncategorized'
  }
}

export class ArticleRecordFactory {
  static fromInput({ body, data, relativePath, sourcePath }: ArticleRecordInput): ArticleRecord {
    const contentPath = ContentPath.fromRelativeFile(relativePath)

    return {
      ...data,
      sourcePath,
      relativePath,
      url: contentPath.toUrl(),
      categoryPath: contentPath.toCategoryPath(),
      body,
    }
  }
}

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

export function toArticleRecord(input: ArticleRecordInput): ArticleRecord {
  return ArticleRecordFactory.fromInput(input)
}

export function toCategoryMetadataRecord(input: CategoryMetadataInput): CategoryMetadataRecord {
  return CategoryMetadata.fromInput(input).record
}

export function buildCategories(articles: ArticleRecord[], metadataRecords: CategoryMetadataRecord[] = []): CategoryRecord[] {
  const categoryIndex = new CategoryIndex(new CategoryMetadataCatalog(metadataRecords))

  for (const article of articles) {
    categoryIndex.addArticle(article)
  }

  return categoryIndex.toRecords()
}

function readCategoryName(data: unknown): string {
  if (!isObject(data)) return ''

  const value = data.categoryName
  return typeof value === 'string' ? value.trim() : ''
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
