import type { ArticlePageRecord } from '../site-index.js'
import { escapeAttribute, escapeHtml } from '../markdown-renderer.js'
import type { PageSection } from './page-section.js'

export class ArticleList implements PageSection {
  constructor(
    private readonly articles: ArticlePageRecord[],
    private readonly emptyMessage: string,
  ) {}

  render(): string {
    if (this.articles.length === 0) return `<p class="empty">${escapeHtml(this.emptyMessage)}</p>`

    return `<ul class="list">${this.articles
      .map(
        (article) => `<li><a href="${escapeAttribute(article.url)}"><strong>${escapeHtml(article.title)}</strong><span>${escapeHtml(article.description)} · ${escapeHtml(article.updatedAt)}</span></a></li>`,
      )
      .join('')}</ul>`
  }
}
