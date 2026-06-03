import type { ArticlePageRecord } from '../site-index.js'
import { escapeAttribute, escapeHtml } from '../markdown-renderer.js'
import type { PageSection } from './page-section.js'
import { svgIconForPlatform } from './icons/external-link-icon.js'

export class ExternalLinks implements PageSection {
  constructor(private readonly externalLinks: ArticlePageRecord['externalLinks']) {}

  render(): string {
    if (!Array.isArray(this.externalLinks)) return ''

    const links = this.externalLinks
      .filter((link) => typeof link.label === 'string' && link.label.trim() !== '' && typeof link.url === 'string' && link.url.trim() !== '')
      .map((link) => new ExternalLink(link).render())

    if (links.length === 0) return ''

    return `<nav class="external-links" aria-label="外部链接">${links.join('')}</nav>`
  }
}

class ExternalLink implements PageSection {
  constructor(private readonly link: NonNullable<ArticlePageRecord['externalLinks']>[number]) {}

  render(): string {
    const platform = typeof this.link.platform === 'string' ? this.link.platform.trim().toLowerCase() : ''
    const label = typeof this.link.label === 'string' ? this.link.label.trim() : ''
    const url = typeof this.link.url === 'string' ? this.link.url.trim() : ''

    return `<a class="external-link" href="${escapeAttribute(url)}" target="_blank" rel="noopener noreferrer"><span class="external-link-icon" aria-hidden="true">${svgIconForPlatform(platform)}</span><span>${escapeHtml(label)}</span></a>`
  }
}
