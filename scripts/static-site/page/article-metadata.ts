import type { ArticlePageRecord } from '../site-index.js'
import { escapeHtml } from '../markdown-renderer.js'
import type { PageSection } from './page-section.js'
import { readingMinutes, wordCount } from './reading-metrics.js'

export class ArticleMetadata implements PageSection {
  constructor(
    private readonly article: ArticlePageRecord,
    private readonly categoryName: string,
  ) {}

  render(): string {
    return `<dl class="metadata">
            <div><dt>作者</dt><dd>${escapeHtml(this.article.author)}</dd></div>
            <div><dt>创建</dt><dd>${escapeHtml(this.article.createdAt)}</dd></div>
            <div><dt>更新</dt><dd>${escapeHtml(this.article.updatedAt)}</dd></div>
            <div><dt>分类</dt><dd>${escapeHtml(this.categoryName)}</dd></div>
            <div><dt>字数</dt><dd>${wordCount(this.article.body)}</dd></div>
            <div><dt>阅读</dt><dd>${readingMinutes(this.article.body)} 分钟</dd></div>
          </dl>`
  }
}
