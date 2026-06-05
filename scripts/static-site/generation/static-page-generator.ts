import { scanContent } from '../../../src/content/index.js'
import { DistWriter } from '../dist-writer.js'
import { StaticSiteIndex } from '../site-index.js'
import { ContentAssetCopier } from './content-asset-copier.js'
import { RenderedPageCollection } from './rendered-page-collection.js'
import type { GenerateStaticPagesOptions, GenerateStaticPagesResult } from './static-generation-result.js'
import { StaticGenerationSummary } from './static-generation-summary.js'
import { StaticPageWriter } from './static-page-writer.js'

export class StaticPageGenerator {
  constructor(private readonly options: Required<GenerateStaticPagesOptions>) {}

  async generate(): Promise<GenerateStaticPagesResult> {
    const contentIndex = await scanContent(this.options.contentRoot)
    const siteIndex = StaticSiteIndex.fromContent(contentIndex.articles, contentIndex.categoryMetadata)
    const pages = new RenderedPageCollection(siteIndex).pages()

    await new StaticPageWriter(new DistWriter(this.options.outputRoot)).writeAll(pages)
    await new ContentAssetCopier(this.options.contentRoot, this.options.outputRoot).copy()

    return new StaticGenerationSummary(siteIndex).result()
  }
}

export function defaultGenerateStaticPagesOptions(options: GenerateStaticPagesOptions = {}): Required<GenerateStaticPagesOptions> {
  return {
    contentRoot: options.contentRoot ?? 'content',
    outputRoot: options.outputRoot ?? 'dist',
  }
}
