import { ArticlePageRenderer, CategoryPageRenderer } from '../page-renderers.js'
import type { RenderedStaticPage } from '../page/rendered-static-page.js'
import type { StaticSiteIndex } from '../site-index.js'

export class RenderedPageCollection {
  constructor(private readonly index: StaticSiteIndex) {}

  pages(): RenderedStaticPage[] {
    const categoryRenderer = new CategoryPageRenderer(this.index)
    const articleRenderer = new ArticlePageRenderer(this.index)

    return [
      ...this.index.categories.map((category) => categoryRenderer.render(category)),
      ...this.index.articles.map((article) => articleRenderer.render(article)),
    ]
  }
}
