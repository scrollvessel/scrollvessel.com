import { scanContent } from '../../../src/content/index.js'
import { DistWriter } from '../dist-writer.js'
import { StaticSiteIndex } from '../site-index.js'
import { ContentAssetCopier } from './content-asset-copier.js'
import { RenderedPageCollection } from './rendered-page-collection.js'
import type { GenerateStaticPagesOptions, GenerateStaticPagesResult } from './static-generation-result.js'

export class StaticPageGenerator {
  constructor(private readonly options: Required<GenerateStaticPagesOptions>) {}

  async generate(): Promise<GenerateStaticPagesResult> {
    const contentIndex = await scanContent(this.options.contentRoot)
    const siteIndex = StaticSiteIndex.fromContent(contentIndex.articles, contentIndex.categoryMetadata)
    const pages = new RenderedPageCollection(siteIndex).pages()
    const writer = new DistWriter(this.options.outputRoot)

    await Promise.all(pages.map((page) => writer.write(page.route, page.html)))
    await new ContentAssetCopier(this.options.contentRoot, this.options.outputRoot).copy()

    return {
      articleCount: siteIndex.articles.length,
      categoryCount: siteIndex.categories.length,
    }
  }
}

export function defaultGenerateStaticPagesOptions(options: GenerateStaticPagesOptions = {}): Required<GenerateStaticPagesOptions> {
  return {
    contentRoot: options.contentRoot ?? 'content',
    outputRoot: options.outputRoot ?? 'dist',
  }
}
