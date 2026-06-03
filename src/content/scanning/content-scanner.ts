import { relative } from 'node:path'
import { buildCategories } from '../records/content-records.js'
import type { ArticleRecord, CategoryMetadataRecord } from '../records/content-record-types.js'
import { ArticleLoader } from './article-loader.js'
import { CategoryMetadataLoader } from './category-metadata-loader.js'
import { ContentFileSystem } from './content-file-system.js'
import type { ContentIndex } from './content-index.js'
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
    const articles: ArticleRecord[] = []
    const categoryMetadata: CategoryMetadataRecord[] = []

    for (const filePath of contentFiles) {
      const relativePath = PathNormalizer.normalize(relative(this.contentRoot, filePath))

      if (this.metadataLoader.isMetadataFile(filePath)) {
        categoryMetadata.push(await this.metadataLoader.load(filePath, relativePath))
        continue
      }

      const article = await this.articleLoader.load(filePath, relativePath)
      this.urlRegistry.register(article, relativePath)
      articles.push(article)
    }

    return {
      articles,
      categories: buildCategories(articles, categoryMetadata),
      categoryMetadata,
    }
  }
}

export function scanContent(contentRoot: string): Promise<ContentIndex> {
  return new ContentScanner(contentRoot).scan()
}
