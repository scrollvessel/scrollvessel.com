import type { FocusedRouteItem, HomepageCategoryNode } from './homepage-types'
import { VisibleCategoryLeaves } from './visible-category-leaves'

export class SelectableCategorySet {
  private constructor(private readonly leaves: VisibleCategoryLeaves) {}

  static fromTree(categories: HomepageCategoryNode[]): SelectableCategorySet {
    return new SelectableCategorySet(VisibleCategoryLeaves.fromTree(categories))
  }

  firstSlug(): string {
    return this.leaves.firstSlug()
  }

  focusedRouteItems(selectedSlug: string): FocusedRouteItem[] {
    return this.leaves.articlesFor(selectedSlug).slice(0, 3).map((article) => ({
      count: 1,
      label: article.title,
      url: article.url,
    }))
  }
}
