import { parseFrontMatter } from '../frontmatter/frontmatter-parser.js'
import { toArticleRecord } from '../records/content-records.js'
import type { ArticleRecord } from '../records/content-record-types.js'
import type { ContentFileSystem } from './content-file-system.js'

export class ArticleLoader {
  constructor(private readonly fileSystem: ContentFileSystem) {}

  async load(filePath: string, relativePath: string): Promise<ArticleRecord> {
    const source = await this.fileSystem.readText(filePath)
    const { data, body } = parseFrontMatter(source, filePath)

    return toArticleRecord({ body, data, relativePath, sourcePath: filePath })
  }
}
