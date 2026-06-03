import type { HomepageCategoryNode } from '../homepage-model'
import { VisibleCategoryLeaves } from '../model/visible-category-leaves'

export class SelectableChartCategories {
  private constructor(private readonly leaves: VisibleCategoryLeaves) {}

  static fromTree(categories: HomepageCategoryNode[]): SelectableChartCategories {
    return new SelectableChartCategories(VisibleCategoryLeaves.fromTree(categories))
  }

  firstSlug(): string {
    return this.leaves.firstSlug()
  }

  hasSlug(slug: string): boolean {
    return this.leaves.hasSlug(slug)
  }

  labelFor(slug: string): string {
    return this.leaves.labelFor(slug)
  }
}
