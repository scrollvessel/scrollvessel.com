import type { StaticSiteIndex } from '../site-index.js'
import type { GenerateStaticPagesResult } from './static-generation-result.js'

export class StaticGenerationSummary {
  constructor(private readonly siteIndex: StaticSiteIndex) {}

  result(): GenerateStaticPagesResult {
    return {
      articleCount: this.siteIndex.articles.length,
      categoryCount: this.siteIndex.categories.length,
    }
  }
}
