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
      addArticleToCategoryTree(topMap, article, this.categoryNameCatalog)
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

function addArticleToCategoryTree(topMap: Map<string, MutableCategoryNode>, article: HomepageArticle, names: CategoryNameCatalog): void {
  const visiblePath = article.categoryPath.slice(0, 3)
  if (visiblePath.length === 0) return

  let childrenMap = topMap
  let parent: MutableCategoryNode | null = null

  for (const slug of visiblePath) {
    const path = parent ? [...parent.path, slug] : [slug]
    const category = ensureCategory(childrenMap, slug, path, names, layerFor(path.length), childrenMap.size)
    if (!category) return

    category.count += 1
    parent = category
    childrenMap = category.childrenMap
  }

  parent?.articles.push(article)
}

function ensureCategory(
  map: Map<string, MutableCategoryNode>,
  slug: string,
  path: string[],
  names: CategoryNameCatalog,
  layer: CategoryLayer,
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

type CategoryLayer = 'parent' | 'child' | 'grandchild'

function layerFor(depth: number): CategoryLayer {
  if (depth === 1) return 'parent'
  if (depth === 2) return 'child'
  return 'grandchild'
}

function positionFor(layer: CategoryLayer, index: number): string {
  if (layer === 'parent') return `parent-slot-${(index % 4) + 1}`
  if (layer === 'child') return `child-slot-${(index % 8) + 1}`
  return `grandchild-slot-${(index % 8) + 1}`
}

export function buildFocusedRouteItems(categories: HomepageCategoryNode[], selectedSlug: string): FocusedRouteItem[] {
  const selected = selectableCategories(categories).find((category) => category.slug === selectedSlug)
  if (!selected) return []

  return selected.articles.slice(0, 3).map((article) => ({
    count: 1,
    label: article.title,
    url: article.url,
  }))
}

export function firstChildSlug(categories: HomepageCategoryNode[]): string {
  return selectableCategories(categories).at(0)?.slug ?? ''
}

function selectableCategories(categories: HomepageCategoryNode[]): HomepageCategoryNode[] {
  return categories.flatMap((category) => deepestVisibleCategories(category))
}

function deepestVisibleCategories(category: HomepageCategoryNode): HomepageCategoryNode[] {
  if (category.children.length === 0) return [category]
  return category.children.flatMap((child) => deepestVisibleCategories(child))
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
