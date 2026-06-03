import type { FocusedRouteItem, HomepageCategoryNode } from './homepage-types'

export class SelectableCategorySet {
  private constructor(private readonly categories: HomepageCategoryNode[]) {}

  static fromTree(categories: HomepageCategoryNode[]): SelectableCategorySet {
    return new SelectableCategorySet(categories.flatMap((category) => deepestVisibleCategories(category)))
  }

  firstSlug(): string {
    return this.categories.at(0)?.slug ?? ''
  }

  focusedRouteItems(selectedSlug: string): FocusedRouteItem[] {
    const selected = this.categories.find((category) => category.slug === selectedSlug)
    if (!selected) return []

    return selected.articles.slice(0, 3).map((article) => ({
      count: 1,
      label: article.title,
      url: article.url,
    }))
  }
}

function deepestVisibleCategories(category: HomepageCategoryNode): HomepageCategoryNode[] {
  if (category.children.length === 0) return [category]
  return category.children.flatMap((child) => deepestVisibleCategories(child))
}
