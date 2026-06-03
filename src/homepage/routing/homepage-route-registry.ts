import type { HomepageModel } from '../homepage-model'

export class HomepageRouteRegistry {
  private readonly paths = new Set<string>(['/', '/index.html', '/404.html'])

  constructor(homepage: HomepageModel) {
    for (const article of homepage.allArticles()) {
      this.paths.add(article.url)
    }

    for (const category of homepage.allCategories()) {
      this.paths.add(category.url)
    }
  }

  has(path: string): boolean {
    return this.paths.has(path)
  }
}
