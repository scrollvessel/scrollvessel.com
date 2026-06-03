import { ContentPath } from './content-path.js'
import type { ArticleRecord, ArticleRecordInput } from './content-record-types.js'

export class ArticleRecordFactory {
  static fromInput({ body, data, relativePath, sourcePath }: ArticleRecordInput): ArticleRecord {
    const contentPath = ContentPath.fromRelativeFile(relativePath)

    return {
      ...data,
      sourcePath,
      relativePath,
      url: contentPath.toUrl(),
      categoryPath: contentPath.toCategoryPath(),
      body,
    }
  }
}
