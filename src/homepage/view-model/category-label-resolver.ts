import type { HomepageCategoryNode } from '../homepage-model'

export class CategoryLabelResolver {
  constructor(private readonly categories: HomepageCategoryNode[]) {}

  labelForPath(path: string[]): string {
    return path.map((_, index) => this.labelForSegment(path.slice(0, index + 1))).join(' / ')
  }

  private labelForSegment(path: string[]): string {
    const node = this.findNode(path)
    return node?.label ?? path.at(-1) ?? ''
  }

  private findNode(path: string[]): HomepageCategoryNode | null {
    let nodes = this.categories
    let current: HomepageCategoryNode | undefined

    for (const slug of path) {
      current = nodes.find((category) => category.slug === slug)
      if (!current) return null
      nodes = current.children
    }

    return current ?? null
  }
}
