import type { CategoryRecord } from '../../src/content/index.js'
import { HtmlDocument } from './html-document.js'
import { MarkdownRenderer, escapeAttribute, escapeHtml } from './markdown-renderer.js'
import { SiteRoute } from './site-route.js'
import type { ArticlePageRecord, StaticSiteIndex } from './site-index.js'

export interface RenderedStaticPage {
  route: SiteRoute
  html: string
}

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
        <nav class="trail" aria-label="分类路径">${renderCategoryTrail(this.index, category.path)}</nav>
        <h1>${escapeHtml(category.categoryName)}</h1>
        <p>${category.articleCount} 篇文章沉淀在这条航线中。</p>
      </header>
      <main class="page-grid">
        <section class="panel" aria-labelledby="child-categories-title">
          <h2 id="child-categories-title">子分类</h2>
          ${renderChildCategories(childCategories)}
        </section>
        <section class="panel" aria-labelledby="category-articles-title">
          <h2 id="category-articles-title">当前目录文章</h2>
          ${renderArticleList(articles, '当前目录暂无直属文章，可继续查看子分类。')}
        </section>
        <section class="panel wide" aria-labelledby="descendant-articles-title">
          <h2 id="descendant-articles-title">全部文章</h2>
          ${renderArticleList(descendantArticles, '当前分类暂无文章。')}
        </section>
      </main>
    `

    return {
      route,
      html: new HtmlDocument(`${category.categoryName} · Scroll Vessel`, `Scroll Vessel ${category.categoryName} 分类目录。`, body).render(),
    }
  }
}

export class ArticlePageRenderer {
  private readonly markdownRenderer = new MarkdownRenderer()

  constructor(private readonly index: StaticSiteIndex) {}

  render(article: ArticlePageRecord): RenderedStaticPage {
    const categoryName = this.index.categoryNameFor(article.categoryPath)
    const route = SiteRoute.article(article.url)
    const body = `
      <article class="reader">
        <header class="page-hero">
          <p class="eyebrow">Article dispatch</p>
          <nav class="trail" aria-label="文章分类路径">${renderCategoryTrail(this.index, article.categoryPath)}</nav>
          <h1>${escapeHtml(article.title)}</h1>
          <p>${escapeHtml(article.description)}</p>
          <dl class="metadata">
            <div><dt>作者</dt><dd>${escapeHtml(article.author)}</dd></div>
            <div><dt>创建</dt><dd>${escapeHtml(article.createdAt)}</dd></div>
            <div><dt>更新</dt><dd>${escapeHtml(article.updatedAt)}</dd></div>
            <div><dt>分类</dt><dd>${escapeHtml(categoryName)}</dd></div>
            <div><dt>标签</dt><dd>${renderTags(article.tags)}</dd></div>
            <div><dt>字数</dt><dd>${wordCount(article.body)}</dd></div>
            <div><dt>阅读</dt><dd>${readingMinutes(article.body)} 分钟</dd></div>
          </dl>
          <a class="route-link" href="${escapeAttribute(SiteRoute.category(article.categoryPath).toString())}">返回所属分类</a>
        </header>
        <div class="prose">
          ${this.markdownRenderer.render(article.body, { assetBasePath: './' })}
        </div>
      </article>
    `

    return {
      route,
      html: new HtmlDocument(`${article.title} · Scroll Vessel`, article.description, body).render(),
    }
  }
}

function renderChildCategories(categories: CategoryRecord[]): string {
  if (categories.length === 0) return '<p class="empty">暂无子分类，可直接浏览当前分类文章。</p>'

  return `<ul class="list">${categories
    .map(
      (category) => `<li><a href="${escapeAttribute(SiteRoute.category(category.path).toString())}"><strong>${escapeHtml(category.categoryName)}</strong><span>${category.articleCount} 篇文章</span></a></li>`,
    )
    .join('')}</ul>`
}

function renderArticleList(articles: ArticlePageRecord[], emptyMessage: string): string {
  if (articles.length === 0) return `<p class="empty">${escapeHtml(emptyMessage)}</p>`

  return `<ul class="list">${articles
    .map(
      (article) => `<li><a href="${escapeAttribute(article.url)}"><strong>${escapeHtml(article.title)}</strong><span>${escapeHtml(article.description)} · ${escapeHtml(article.updatedAt)}</span></a></li>`,
    )
    .join('')}</ul>`
}

function renderCategoryTrail(index: StaticSiteIndex, path: string[]): string {
  const crumbs = path.map((_, crumbIndex) => path.slice(0, crumbIndex + 1))

  return crumbs
    .map((crumb) => `<a href="${escapeAttribute(SiteRoute.category(crumb).toString())}">${escapeHtml(index.categoryNameFor(crumb))}</a>`)
    .join('<span>/</span>')
}

function renderTags(tags: string[] | undefined): string {
  if (!Array.isArray(tags) || tags.length === 0) return '未标注'

  return tags.map((tag) => escapeHtml(tag)).join(' / ')
}

function wordCount(source: string): number {
  const compact = source.replace(/\s+/g, '')
  return Array.from(compact).length
}

function readingMinutes(source: string): number {
  return Math.max(1, Math.ceil(wordCount(source) / 500))
}
