import { DocumentBody } from './document-body.js'
import { DocumentHead } from './document-head.js'
import type { HtmlDocumentOptions } from './html-document-options.js'

export class HtmlDocument {
  constructor(
    private readonly title: string,
    private readonly description: string,
    private readonly body: string,
    private readonly options: HtmlDocumentOptions = {},
  ) {}

  render(): string {
    return `<!doctype html>
<html lang="zh-CN">
  ${new DocumentHead(this.title, this.description, this.options).render()}
  ${new DocumentBody(this.body, this.options).render()}
</html>
`
  }
}
