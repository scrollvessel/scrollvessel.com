import { buildCategories } from '../../content/content-records'
import { HomepageModel } from '../homepage-model'
import { MarkdownModuleCollection } from './markdown-module-collection'
import { MetadataModuleCollection } from './metadata-module-collection'

export class HomepageContentLoader {
  constructor(
    private readonly markdownModules: Record<string, string>,
    private readonly metadataModules: Record<string, unknown>,
  ) {}

  load(): HomepageModel {
    const articles = new MarkdownModuleCollection(this.markdownModules).toArticles()
    const categoryMetadata = new MetadataModuleCollection(this.metadataModules).toCategoryMetadata()

    return new HomepageModel({
      articles,
      categories: buildCategories(articles, categoryMetadata),
      categoryMetadata,
    })
  }
}
