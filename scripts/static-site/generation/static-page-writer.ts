import { DistWriter } from '../dist-writer.js'
import type { RenderedStaticPage } from '../page/rendered-static-page.js'

export class StaticPageWriter {
  constructor(private readonly writer: DistWriter) {}

  async writeAll(pages: RenderedStaticPage[]): Promise<void> {
    await Promise.all(pages.map((page) => this.writer.write(page.route, page.html)))
  }
}
