import type { ContentValidationIssue } from '../content-validation-error.js'
import type { FrontMatterRule } from '../frontmatter-rule.js'
import type { FrontMatterData } from '../frontmatter-types.js'
import { stringFields } from '../frontmatter-types.js'

export class StringFieldRule implements FrontMatterRule {
  validate(data: FrontMatterData, filePath: string, issues: ContentValidationIssue[]): void {
    for (const field of stringFields) {
      if (data[field] !== undefined && data[field] !== null && typeof data[field] !== 'string') {
        issues.push({ filePath, field, reason: 'type', fix: `${field} must be a string.` })
      }
    }
  }
}
