import { CategoryNameCatalog } from './model/category-name-catalog'
import { HomepageArticleCollection } from './model/homepage-article-collection'
import { HomepageCategoryTree } from './model/homepage-category-tree'
import { SelectableCategorySet } from './model/selectable-category-set'
import type { FocusedRouteItem, HomepageArticle, HomepageCategoryNode, HomepageModelData } from './model/homepage-types'

export type { FocusedRouteItem, HomepageArticle, HomepageCategoryNode, HomepageModelData } from './model/homepage-types'

export class HomepageModel {
  private readonly articles: HomepageArticleCollection
  private readonly categoryNameCatalog: CategoryNameCatalog

  constructor(private readonly data: HomepageModelData) {
    this.articles = HomepageArticleCollection.fromRecords(data.articles)
    this.categoryNameCatalog = new CategoryNameCatalog(data.categoryMetadata)
  }

  topCategories(): HomepageCategoryNode[] {
    const tree = new HomepageCategoryTree(this.categoryNameCatalog)

    for (const article of this.articles.all()) {
      tree.addArticle(article)
    }

    return tree.toNodes()
  }

  featuredArticles(): HomepageArticle[] {
    return this.articles.featured()
  }

  latestArticles(): HomepageArticle[] {
    return this.articles.latest()
  }

  allArticles(): HomepageArticle[] {
    return this.articles.all()
  }

  allCategories(): HomepageCategoryNode[] {
    return this.topCategories()
  }
}

export function buildFocusedRouteItems(categories: HomepageCategoryNode[], selectedSlug: string): FocusedRouteItem[] {
  return SelectableCategorySet.fromTree(categories).focusedRouteItems(selectedSlug)
}

export function firstChildSlug(categories: HomepageCategoryNode[]): string {
  return SelectableCategorySet.fromTree(categories).firstSlug()
}
