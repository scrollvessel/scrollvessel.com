import type { HomepageArticle, HomepageCategoryNode, HomepageModel } from './homepage-model'

export interface HomepageArticleItem {
  relativePath: string
  title: string
  url: string
  updatedAt: string
  categoryLabel: string
}

export class HomepageViewModel {
  private readonly categories: HomepageCategoryNode[]

  constructor(private readonly homepage: HomepageModel) {
    this.categories = homepage.topCategories()
  }

  topCategories(): HomepageCategoryNode[] {
    return this.categories
  }

  featuredArticles(): HomepageArticleItem[] {
    return this.homepage.featuredArticles().map((article) => this.articleItem(article))
  }

  latestArticles(): HomepageArticleItem[] {
    return this.homepage.latestArticles().map((article) => this.articleItem(article))
  }

  private articleItem(article: HomepageArticle): HomepageArticleItem {
    return {
      relativePath: article.relativePath,
      title: article.title,
      url: article.url,
      updatedAt: article.updatedAt,
      categoryLabel: article.categoryPath.map((_, index) => this.labelForPath(article.categoryPath.slice(0, index + 1))).join(' / '),
    }
  }

  private labelForPath(path: string[]): string {
    const [topSlug, childSlug] = path
    const top = this.categories.find((category) => category.slug === topSlug)
    if (!childSlug) return top?.label ?? topSlug ?? ''

    return top?.children.find((category) => category.slug === childSlug)?.label ?? childSlug
  }
}
