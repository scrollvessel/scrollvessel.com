import { ContentValidationError } from '../frontmatter/content-validation-error.js'
import type { ArticleRecord } from '../records/content-record-types.js'

export class UrlRegistry {
  private readonly urls = new Map<string, string>()

  register(article: ArticleRecord, relativePath: string): void {
    const duplicatePath = this.urls.get(article.url)
    if (duplicatePath) {
      throw new ContentValidationError([
        {
          filePath: article.sourcePath,
          field: 'url',
          reason: 'duplicate',
          fix: `${relativePath} resolves to the same URL as ${duplicatePath}.`,
        },
      ])
    }

    this.urls.set(article.url, relativePath)
  }
}
