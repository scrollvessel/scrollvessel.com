import { HtmlDocument } from '../html-document.js'
import { MarkdownRenderer, escapeHtml } from '../markdown-renderer.js'
import { SiteRoute } from '../site-route.js'
import type { ArticlePageRecord, StaticSiteIndex } from '../site-index.js'
import { ArticleMetadata } from './article-metadata.js'
import { ArticleTags } from './article-tags.js'
import { CategoryTrail } from './category-trail.js'
import { ExternalLinks } from './external-links.js'
import type { RenderedStaticPage } from './rendered-static-page.js'

export class ArticlePageRenderer {
  private readonly markdownRenderer = new MarkdownRenderer()

  constructor(private readonly index: StaticSiteIndex) {}

  render(article: ArticlePageRecord): RenderedStaticPage {
    const categoryName = this.index.categoryNameFor(article.categoryPath)
    const route = SiteRoute.article(article.url)
    const renderedMarkdown = this.markdownRenderer.render(article.body, { assetBasePath: './' })
    const body = `
      <article class="reader">
        <header class="page-hero">
          <p class="eyebrow">Article</p>
          ${new CategoryTrail(this.index, article.categoryPath, '文章分类路径').render()}
          <h1 class="page-title">${escapeHtml(article.title)}</h1>
          <p>${escapeHtml(article.description)}</p>
          ${new ArticleTags(article.tags).render()}
          ${new ExternalLinks(article.externalLinks).render()}
          ${new ArticleMetadata(article, categoryName).render()}
        </header>
        <div class="prose">
          ${renderedMarkdown.html}
        </div>
      </article>
    `

    return {
      route,
      html: new HtmlDocument(`${article.title} · Scroll Vessel`, article.description, body, {
        extraStyles: renderedMarkdown.styles,
        includeMermaidScript: renderedMarkdown.includeMermaidScript,
      }).render(),
    }
  }
}
