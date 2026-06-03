import type { ContentValidationIssue } from '../content-validation-error.js'
import type { FrontMatterRule } from '../frontmatter-rule.js'
import type { FrontMatterData } from '../frontmatter-types.js'

export class TagsFieldRule implements FrontMatterRule {
  validate(data: FrontMatterData, filePath: string, issues: ContentValidationIssue[]): void {
    const tags = data.tags
    if (tags === undefined) return

    if (!Array.isArray(tags) || tags.some((tag) => typeof tag !== 'string' || tag.trim() === '')) {
      issues.push({ filePath, field: 'tags', reason: 'type', fix: 'tags must be an array of non-empty strings.' })
    }
  }
}
