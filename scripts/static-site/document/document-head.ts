import { escapeAttribute, escapeHtml } from '../markdown-renderer.js'
import { BaseDocumentStyles } from './base-document-styles.js'
import type { HtmlDocumentOptions } from './html-document-options.js'

export class DocumentHead {
  constructor(
    private readonly title: string,
    private readonly description: string,
    private readonly options: HtmlDocumentOptions,
  ) {}

  render(): string {
    return `<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeAttribute(this.description)}" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="theme-color" content="#f6e4ad" />
    <title>${escapeHtml(this.title)}</title>
    <link rel="stylesheet" href="/fonts/scroll-vessel-fonts.css" />
    ${new BaseDocumentStyles(this.options.extraStyles).render()}
  </head>`
  }
}
