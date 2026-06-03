import { escapeHtml } from '../markdown-renderer.js'
import type { PageSection } from './page-section.js'

export class ArticleTags implements PageSection {
  constructor(private readonly tags: string[] | undefined) {}

  render(): string {
    if (!Array.isArray(this.tags) || this.tags.length === 0) return ''

    const items = this.tags.map((tag) => tag.trim()).filter((tag) => tag !== '').map((tag) => `<span>${escapeHtml(tag)}</span>`)
    if (items.length === 0) return ''

    return `<div class="article-tags" aria-label="文章标签">${items.join('')}</div>`
  }
}
