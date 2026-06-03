import type { ContentValidationIssue } from './content-validation-error.js'
import type { FrontMatterData } from './frontmatter-types.js'

export interface FrontMatterRule {
  validate(data: FrontMatterData, filePath: string, issues: ContentValidationIssue[]): void
}
