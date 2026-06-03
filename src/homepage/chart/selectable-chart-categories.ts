import type { HomepageCategoryNode } from '../homepage-model'

export class SelectableChartCategories {
  private constructor(private readonly categories: HomepageCategoryNode[]) {}

  static fromTree(categories: HomepageCategoryNode[]): SelectableChartCategories {
    return new SelectableChartCategories(categories.flatMap((category) => deepestVisibleCategories(category)))
  }

  firstSlug(): string {
    return this.categories.at(0)?.slug ?? ''
  }

  hasSlug(slug: string): boolean {
    return this.categories.some((category) => category.slug === slug)
  }

  labelFor(slug: string): string {
    return this.categories.find((category) => category.slug === slug)?.label ?? ''
  }
}

function deepestVisibleCategories(category: HomepageCategoryNode): HomepageCategoryNode[] {
  if (category.children.length === 0) return [category]
  return category.children.flatMap((child) => deepestVisibleCategories(child))
}
