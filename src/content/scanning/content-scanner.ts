import { relative } from 'node:path'
import { buildCategories } from '../records/content-records.js'
import { ArticleLoader } from './article-loader.js'
import { CategoryMetadataLoader } from './category-metadata-loader.js'
import { ContentFileSystem } from './content-file-system.js'
import type { ContentIndex } from './content-index.js'
import { ContentScanCollector } from './content-scan-collector.js'
import { PathNormalizer } from './path-normalizer.js'
import { UrlRegistry } from './url-registry.js'

export class ContentScanner {
  private readonly fileSystem: ContentFileSystem
  private readonly articleLoader: ArticleLoader
  private readonly metadataLoader: CategoryMetadataLoader
  private readonly urlRegistry = new UrlRegistry()

  constructor(private readonly contentRoot: string) {
    this.fileSystem = new ContentFileSystem(contentRoot)
    this.articleLoader = new ArticleLoader(this.fileSystem)
    this.metadataLoader = new CategoryMetadataLoader(this.fileSystem)
  }

  async scan(): Promise<ContentIndex> {
    const contentFiles = await this.fileSystem.findContentFiles()
    const collector = new ContentScanCollector(this.articleLoader, this.metadataLoader, this.urlRegistry)

    for (const filePath of contentFiles) {
      await collector.collect(filePath, PathNormalizer.normalize(relative(this.contentRoot, filePath)))
    }

    return {
      articles: collector.articles,
      categories: buildCategories(collector.articles, collector.categoryMetadata),
      categoryMetadata: collector.categoryMetadata,
    }
  }
}

export function scanContent(contentRoot: string): Promise<ContentIndex> {
  return new ContentScanner(contentRoot).scan()
}
