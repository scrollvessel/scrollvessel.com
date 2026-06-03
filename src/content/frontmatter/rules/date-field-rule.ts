import type { ContentValidationIssue } from '../content-validation-error.js'
import type { FrontMatterRule } from '../frontmatter-rule.js'
import type { FrontMatterData, FrontMatterValue } from '../frontmatter-types.js'

export class DateFieldRule implements FrontMatterRule {
  validate(data: FrontMatterData, filePath: string, issues: ContentValidationIssue[]): void {
    for (const field of ['createdAt', 'updatedAt'] as const) {
      if (typeof data[field] === 'string' && !/^\d{4}-\d{2}-\d{2}$/.test(data[field])) {
        issues.push({ filePath, field, reason: 'date-format', fix: `${field} must use YYYY-MM-DD.` })
      }
    }

    if (isDateString(data.createdAt) && isDateString(data.updatedAt) && data.updatedAt < data.createdAt) {
      issues.push({ filePath, field: 'updatedAt', reason: 'date-order', fix: 'updatedAt must not be earlier than createdAt.' })
    }
  }
}

function isDateString(value: FrontMatterValue | undefined): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
}
