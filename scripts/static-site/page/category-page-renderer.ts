import type { CategoryRecord } from '../../../src/content/index.js'
import { HtmlDocument } from '../html-document.js'
import { escapeHtml } from '../markdown-renderer.js'
import { SiteRoute } from '../site-route.js'
import type { StaticSiteIndex } from '../site-index.js'
import { ArticleList } from './article-list.js'
import { CategoryTrail } from './category-trail.js'
import { ChildCategoryList } from './child-category-list.js'
import type { RenderedStaticPage } from './rendered-static-page.js'

export class CategoryPageRenderer {
  constructor(private readonly index: StaticSiteIndex) {}

  render(category: CategoryRecord): RenderedStaticPage {
    const childCategories = this.index.childCategoriesOf(category)
    const articles = this.index.articlesIn(category.path)
    const descendantArticles = this.index.descendantArticlesIn(category.path)
    const route = SiteRoute.category(category.path)
    const body = `
      <header class="page-hero">
        <p class="eyebrow">Category route</p>
        ${new CategoryTrail(this.index, category.path, '分类路径').render()}
        <h1 class="page-title">${escapeHtml(category.categoryName)}</h1>
        <p>${category.articleCount} 篇文章沉淀在这条航线中。</p>
      </header>
      <main class="page-grid">
        <section class="panel" aria-labelledby="child-categories-title">
          <h2 id="child-categories-title" class="panel-title">子分类</h2>
          ${new ChildCategoryList(childCategories).render()}
        </section>
        <section class="panel" aria-labelledby="category-articles-title">
          <h2 id="category-articles-title" class="panel-title">当前目录文章</h2>
          ${new ArticleList(articles, '当前目录暂无直属文章，可继续查看子分类。').render()}
        </section>
        <section class="panel wide" aria-labelledby="descendant-articles-title">
          <h2 id="descendant-articles-title" class="panel-title">全部文章</h2>
          ${new ArticleList(descendantArticles, '当前分类暂无文章。').render()}
        </section>
      </main>
    `

    return {
      route,
      html: new HtmlDocument(`${category.categoryName} · Scroll Vessel`, `Scroll Vessel ${category.categoryName} 分类目录。`, body).render(),
    }
  }
}
