import type { ContentValidationIssue } from '../content-validation-error.js'
import type { FrontMatterRule } from '../frontmatter-rule.js'
import type { FrontMatterData } from '../frontmatter-types.js'
import { booleanFields } from '../frontmatter-types.js'

export class BooleanFieldRule implements FrontMatterRule {
  validate(data: FrontMatterData, filePath: string, issues: ContentValidationIssue[]): void {
    for (const field of booleanFields) {
      if (data[field] !== undefined && typeof data[field] !== 'boolean') {
        issues.push({ filePath, field, reason: 'type', fix: `${field} must be true or false.` })
      }
    }
  }
}
