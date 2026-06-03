import type { HomepageArticle, HomepageCategoryNode, HomepageModel } from '../homepage-model'
import { CategoryLabelResolver } from './category-label-resolver'
import type { HomepageArticleItem } from './homepage-article-item'

export type { HomepageArticleItem } from './homepage-article-item'

export class HomepageViewModel {
  private readonly categories: HomepageCategoryNode[]
  private readonly labels: CategoryLabelResolver

  constructor(private readonly homepage: HomepageModel) {
    this.categories = homepage.topCategories()
    this.labels = new CategoryLabelResolver(this.categories)
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
      categoryLabel: this.labels.labelForPath(article.categoryPath),
    }
  }
}
