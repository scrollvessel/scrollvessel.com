import type { FocusedRouteItem, HomepageCategoryNode } from './homepage-types'
import { SelectableCategorySet } from './selectable-category-set'

export class HomepageCategorySelection {
  private readonly selectableCategories: SelectableCategorySet

  constructor(categories: HomepageCategoryNode[]) {
    this.selectableCategories = SelectableCategorySet.fromTree(categories)
  }

  firstSlug(): string {
    return this.selectableCategories.firstSlug()
  }

  focusedRouteItems(selectedSlug: string): FocusedRouteItem[] {
    return this.selectableCategories.focusedRouteItems(selectedSlug)
  }
}
