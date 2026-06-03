import { DocumentScripts } from './document-scripts.js'
import type { HtmlDocumentOptions } from './html-document-options.js'

export class DocumentBody {
  constructor(
    private readonly body: string,
    private readonly options: HtmlDocumentOptions,
  ) {}

  render(): string {
    return `<body>
    <div class="shell">
      <nav class="site-nav" aria-label="主要导航">
        <a href="/">卷书成船 / Scroll Vessel</a>
        <a href="/">Home</a>
      </nav>
      ${this.body}
    </div>
    ${new DocumentScripts(this.options).render()}
  </body>`
  }
}
