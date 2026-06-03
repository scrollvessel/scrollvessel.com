import { CategoryNameCatalog } from './category-name-catalog'
import { CategoryPosition } from './category-position'
import { MutableHomepageCategoryNode } from './homepage-category-node'
import type { HomepageArticle, HomepageCategoryNode } from './homepage-types'

export class HomepageCategoryTree {
  private readonly topMap = new Map<string, MutableHomepageCategoryNode>()

  constructor(private readonly names: CategoryNameCatalog) {}

  addArticle(article: HomepageArticle): void {
    const visiblePath = article.categoryPath.slice(0, 3)
    if (visiblePath.length === 0) return

    let childrenMap = this.topMap
    let parent: MutableHomepageCategoryNode | null = null

    for (const slug of visiblePath) {
      const path = parent ? [...parent.path, slug] : [slug]
      const category = this.ensureCategory(childrenMap, slug, path, childrenMap.size)
      if (!category) return

      category.incrementCount()
      parent = category
      childrenMap = category.childrenMap
    }

    parent?.addArticle(article)
  }

  toNodes(): HomepageCategoryNode[] {
    return [...this.topMap.values()].map((category) => category.toNode())
  }

  private ensureCategory(
    map: Map<string, MutableHomepageCategoryNode>,
    slug: string,
    path: string[],
    index: number,
  ): MutableHomepageCategoryNode | null {
    const category = map.get(slug)
    if (category) return category

    const label = this.names.labelFor(path)
    if (!label) return null

    const next = new MutableHomepageCategoryNode(slug, path, label, CategoryPosition.forDepth(path.length, index))
    map.set(slug, next)
    return next
  }
}
