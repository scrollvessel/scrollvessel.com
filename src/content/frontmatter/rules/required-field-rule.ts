import type { ContentValidationIssue } from '../content-validation-error.js'
import type { FrontMatterRule } from '../frontmatter-rule.js'
import type { FrontMatterData } from '../frontmatter-types.js'
import { requiredFields } from '../frontmatter-types.js'

export class RequiredFieldRule implements FrontMatterRule {
  validate(data: FrontMatterData, filePath: string, issues: ContentValidationIssue[]): void {
    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null || (typeof data[field] === 'string' && data[field].trim() === '')) {
        issues.push({ filePath, field, reason: 'required', fix: `Add ${field} to front matter.` })
      }
    }
  }
}
