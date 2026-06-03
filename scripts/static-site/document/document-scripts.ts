import type { HtmlDocumentOptions } from './html-document-options.js'

export class DocumentScripts {
  constructor(private readonly options: HtmlDocumentOptions) {}

  render(): string {
    return this.options.includeMermaidScript ? '<script type="module" src="/assets/static-mermaid.js"></script>' : ''
  }
}
