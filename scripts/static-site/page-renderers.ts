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
        <h1 class="page-title">${escapeHtml(category.categoryName)}</h1>
        <p>${category.articleCount} 篇文章沉淀在这条航线中。</p>
      </header>
      <main class="page-grid">
        <section class="panel" aria-labelledby="child-categories-title">
          <h2 id="child-categories-title" class="panel-title">子分类</h2>
          ${renderChildCategories(childCategories)}
        </section>
        <section class="panel" aria-labelledby="category-articles-title">
          <h2 id="category-articles-title" class="panel-title">当前目录文章</h2>
          ${renderArticleList(articles, '当前目录暂无直属文章，可继续查看子分类。')}
        </section>
        <section class="panel wide" aria-labelledby="descendant-articles-title">
          <h2 id="descendant-articles-title" class="panel-title">全部文章</h2>
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
          <h1 class="page-title">${escapeHtml(article.title)}</h1>
          <p>${escapeHtml(article.description)}</p>
          ${renderTags(article.tags)}
          ${renderExternalLinks(article.externalLinks)}
          <dl class="metadata">
            <div><dt>作者</dt><dd>${escapeHtml(article.author)}</dd></div>
            <div><dt>创建</dt><dd>${escapeHtml(article.createdAt)}</dd></div>
            <div><dt>更新</dt><dd>${escapeHtml(article.updatedAt)}</dd></div>
            <div><dt>分类</dt><dd>${escapeHtml(categoryName)}</dd></div>
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
  if (!Array.isArray(tags) || tags.length === 0) return ''

  const items = tags.map((tag) => tag.trim()).filter((tag) => tag !== '').map((tag) => `<span>${escapeHtml(tag)}</span>`)
  if (items.length === 0) return ''

  return `<div class="article-tags" aria-label="文章标签">${items.join('')}</div>`
}

function renderExternalLinks(externalLinks: ArticlePageRecord['externalLinks']): string {
  if (!Array.isArray(externalLinks)) return ''

  const links = externalLinks
    .filter((link) => typeof link.label === 'string' && link.label.trim() !== '' && typeof link.url === 'string' && link.url.trim() !== '')
    .map((link) => renderExternalLink(link))

  if (links.length === 0) return ''

  return `<nav class="external-links" aria-label="外部链接">${links.join('')}</nav>`
}

function renderExternalLink(link: NonNullable<ArticlePageRecord['externalLinks']>[number]): string {
  const platform = typeof link.platform === 'string' ? link.platform.trim().toLowerCase() : ''
  const label = typeof link.label === 'string' ? link.label.trim() : ''
  const url = typeof link.url === 'string' ? link.url.trim() : ''

  return `<a class="external-link" href="${escapeAttribute(url)}" target="_blank" rel="noopener noreferrer"><span class="external-link-icon" aria-hidden="true">${svgIconForPlatform(platform)}</span><span>${escapeHtml(label)}</span></a>`
}

function svgIconForPlatform(platform: string): string {
  if (platform === 'source') return svgIcon('<path d="M8 12h8M12 8l4 4-4 4"/>')
  if (platform === 'wechat') return svgIcon('<path d="M8.5 9.5c-2.8 0-5 1.8-5 4 0 1.2.7 2.3 1.8 3l-.5 1.8 2.1-1.1c.5.1 1 .2 1.6.2 2.8 0 5-1.8 5-4s-2.2-4-5-4z"/><path d="M13 6c3.1 0 5.5 1.9 5.5 4.4 0 1.3-.7 2.5-1.9 3.3l.5 1.9-2.2-1.1-.9.1"/><path d="M7.2 13.3h.1M10 13.3h.1"/>')
  if (platform === 'zhihu') return svgIcon('<path d="M6 5h7v14H6zM10 5v14M15 5h3l-3 7h4l-4 7"/>')

  return svgIcon('<path d="M9 7h8v8M17 7 7 17"/>')
}

function svgIcon(paths: string): string {
  return `<svg class="external-link-svg" viewBox="0 0 24 24" role="img" focusable="false">${paths}</svg>`
}

function wordCount(source: string): number {
  const compact = source.replace(/\s+/g, '')
  return Array.from(compact).length
}

function readingMinutes(source: string): number {
  return Math.max(1, Math.ceil(wordCount(source) / 500))
}
