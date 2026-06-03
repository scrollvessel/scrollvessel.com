import type { HomepageCategoryNode } from './homepage-types'

export class VisibleCategoryLeaves {
  private constructor(private readonly categories: HomepageCategoryNode[]) {}

  static fromTree(categories: HomepageCategoryNode[]): VisibleCategoryLeaves {
    return new VisibleCategoryLeaves(categories.flatMap((category) => deepestVisibleCategories(category)))
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

  articlesFor(slug: string) {
    return this.categories.find((category) => category.slug === slug)?.articles ?? []
  }
}

function deepestVisibleCategories(category: HomepageCategoryNode): HomepageCategoryNode[] {
  if (category.children.length === 0) return [category]
  return category.children.flatMap((child) => deepestVisibleCategories(child))
}
