import type { ArticleRecord, CategoryMetadataRecord, CategoryRecord } from '../content/content-records'

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

export class HomepageModel {
  private readonly articles: HomepageArticleCollection
  private readonly categoryNameCatalog: CategoryNameCatalog

  constructor(private readonly data: HomepageModelData) {
    this.articles = new HomepageArticleCollection(data.articles.filter(isHomepageArticle))
    this.categoryNameCatalog = new CategoryNameCatalog(data.categoryMetadata)
  }

  topCategories(): HomepageCategoryNode[] {
    const topMap = new Map<string, MutableCategoryNode>()

    for (const article of this.articles.all()) {
      const [topSlug, childSlug] = article.categoryPath
      if (!topSlug || !childSlug) continue

      const top = ensureCategory(topMap, topSlug, [topSlug], this.categoryNameCatalog, 'parent', topMap.size)
      if (!top) continue

      const child = ensureCategory(top.childrenMap, childSlug, [topSlug, childSlug], this.categoryNameCatalog, 'child', top.childrenMap.size)
      if (!child) continue

      top.count += 1
      child.count += 1
      child.articles.push(article)
    }

    return [...topMap.values()].map((category) => category.toNode())
  }

  featuredArticles(): HomepageArticle[] {
    return this.articles.featured()
  }

  latestArticles(): HomepageArticle[] {
    return this.articles.latest()
  }

  allArticles(): HomepageArticle[] {
    return this.articles.all()
  }

  allCategories(): HomepageCategoryNode[] {
    return this.topCategories()
  }
}

class HomepageArticleCollection {
  constructor(private readonly articles: HomepageArticle[]) {}

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

class CategoryNameCatalog {
  private readonly names = new Map<string, string>()

  constructor(records: CategoryMetadataRecord[]) {
    for (const record of records) {
      this.names.set(record.path.join('/'), record.categoryName)
    }
  }

  labelFor(path: string[]): string | null {
    return this.names.get(path.join('/')) ?? null
  }
}

class MutableCategoryNode {
  readonly childrenMap = new Map<string, MutableCategoryNode>()
  readonly articles: HomepageArticle[] = []
  count = 0

  constructor(
    readonly slug: string,
    readonly path: string[],
    private readonly label: string,
    private readonly position: string,
  ) {}

  toNode(): HomepageCategoryNode {
    const children = [...this.childrenMap.values()].sort((a, b) => b.count - a.count).map((child) => child.toNode())

    return {
      slug: this.slug,
      label: this.label,
      description: children.length > 0 ? `${children.length} 个子航点` : `${this.count} 篇文章`,
      count: this.count,
      url: toCategoryUrl(this.path),
      position: this.position,
      children,
      articles: this.articles,
    }
  }
}

function ensureCategory(
  map: Map<string, MutableCategoryNode>,
  slug: string,
  path: string[],
  names: CategoryNameCatalog,
  layer: 'parent' | 'child',
  index: number,
): MutableCategoryNode | null {
  const category = map.get(slug)
  if (category) return category

  const label = names.labelFor(path)
  if (!label) return null

  const next = new MutableCategoryNode(slug, path, label, positionFor(layer, index))
  map.set(slug, next)
  return next
}

function positionFor(layer: 'parent' | 'child', index: number): string {
  if (layer === 'parent') return `parent-slot-${(index % 4) + 1}`
  return `child-slot-${(index % 8) + 1}`
}

export function buildFocusedRouteItems(categories: HomepageCategoryNode[], selectedSlug: string): FocusedRouteItem[] {
  const selected = categories.flatMap((category) => category.children).find((category) => category.slug === selectedSlug)
  if (!selected) return []

  return selected.articles.slice(0, 3).map((article) => ({
    count: 1,
    label: article.title,
    url: article.url,
  }))
}

export function firstChildSlug(categories: HomepageCategoryNode[]): string {
  return categories.flatMap((category) => category.children).at(0)?.slug ?? ''
}

function toCategoryUrl(path: string[]): string {
  return `/${path.join('/')}/index.html`
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
