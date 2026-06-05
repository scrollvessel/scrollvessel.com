import type { ArticleRecord, CategoryMetadataRecord } from '../records/content-record-types.js'
import type { ArticleLoader } from './article-loader.js'
import type { CategoryMetadataLoader } from './category-metadata-loader.js'
import type { UrlRegistry } from './url-registry.js'

export class ContentScanCollector {
  readonly articles: ArticleRecord[] = []
  readonly categoryMetadata: CategoryMetadataRecord[] = []

  constructor(
    private readonly articleLoader: ArticleLoader,
    private readonly metadataLoader: CategoryMetadataLoader,
    private readonly urlRegistry: UrlRegistry,
  ) {}

  async collect(filePath: string, relativePath: string): Promise<void> {
    if (this.metadataLoader.isMetadataFile(filePath)) {
      this.categoryMetadata.push(await this.metadataLoader.load(filePath, relativePath))
      return
    }

    const article = await this.articleLoader.load(filePath, relativePath)
    this.urlRegistry.register(article, relativePath)
    this.articles.push(article)
  }
}
