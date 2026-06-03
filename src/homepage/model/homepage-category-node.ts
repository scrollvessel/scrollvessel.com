import type { HomepageArticle, HomepageCategoryNode as HomepageCategoryNodeData } from './homepage-types'

export class MutableHomepageCategoryNode {
  readonly childrenMap = new Map<string, MutableHomepageCategoryNode>()
  readonly articles: HomepageArticle[] = []
  count = 0

  constructor(
    readonly slug: string,
    readonly path: string[],
    private readonly label: string,
    private readonly position: string,
  ) {}

  addArticle(article: HomepageArticle): void {
    this.articles.push(article)
  }

  incrementCount(): void {
    this.count += 1
  }

  toNode(): HomepageCategoryNodeData {
    const children = [...this.childrenMap.values()].sort((a, b) => b.count - a.count).map((child) => child.toNode())

    return {
      slug: this.slug,
      label: this.label,
      description: children.length > 0 ? `${children.length} 个子主题` : `${this.count} 篇文章`,
      count: this.count,
      url: toCategoryUrl(this.path),
      position: this.position,
      children,
      articles: this.articles,
    }
  }
}

function toCategoryUrl(path: string[]): string {
  return `/${path.join('/')}/index.html`
}
