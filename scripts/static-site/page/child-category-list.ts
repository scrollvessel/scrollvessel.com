import type { CategoryRecord } from '../../../src/content/index.js'
import { SiteRoute } from '../site-route.js'
import { escapeAttribute, escapeHtml } from '../markdown-renderer.js'
import type { PageSection } from './page-section.js'

export class ChildCategoryList implements PageSection {
  constructor(private readonly categories: CategoryRecord[]) {}

  render(): string {
    if (this.categories.length === 0) return '<p class="empty">暂无子分类，可直接浏览当前分类文章。</p>'

    return `<ul class="list">${this.categories
      .map(
        (category) => `<li><a href="${escapeAttribute(SiteRoute.category(category.path).toString())}"><strong>${escapeHtml(category.categoryName)}</strong><span>${category.articleCount} 篇文章</span></a></li>`,
      )
      .join('')}</ul>`
  }
}
