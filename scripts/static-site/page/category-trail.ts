import type { StaticSiteIndex } from '../site-index.js'
import { SiteRoute } from '../site-route.js'
import { escapeAttribute, escapeHtml } from '../markdown-renderer.js'
import type { PageSection } from './page-section.js'

export class CategoryTrail implements PageSection {
  constructor(
    private readonly index: StaticSiteIndex,
    private readonly path: string[],
    private readonly label: string,
  ) {}

  render(): string {
    const crumbs = this.path.map((_, crumbIndex) => this.path.slice(0, crumbIndex + 1))
    const links = crumbs
      .map((crumb) => `<a href="${escapeAttribute(SiteRoute.category(crumb).toString())}">${escapeHtml(this.index.categoryNameFor(crumb))}</a>`)
      .join('<span>/</span>')

    return `<nav class="trail" aria-label="${escapeAttribute(this.label)}">${links}</nav>`
  }
}
