import { toArticleRecord, type ArticleRecord } from '../../content/content-records'
import { parseFrontMatter } from '../../content/frontmatter'
import { ViteContentPath } from './vite-content-path'

export class MarkdownModuleCollection {
  constructor(private readonly modules: Record<string, string>) {}

  toArticles(): ArticleRecord[] {
    return Object.entries(this.modules).map(([sourcePath, source]) => {
      const { data, body } = parseFrontMatter(String(source), sourcePath)
      const relativePath = new ViteContentPath(sourcePath).relativePath()

      return toArticleRecord({ body, data, relativePath, sourcePath })
    })
  }
}
