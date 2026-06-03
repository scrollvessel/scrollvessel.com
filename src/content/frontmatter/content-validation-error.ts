export type ContentValidationReason =
  | 'date-format'
  | 'date-order'
  | 'duplicate'
  | 'empty'
  | 'missing'
  | 'required'
  | 'semantic'
  | 'syntax'
  | 'type'
  | 'unterminated'

export interface ContentValidationIssue {
  filePath: string
  field: string
  reason: ContentValidationReason
  fix: string
}

export class ContentValidationError extends Error {
  issues: ContentValidationIssue[]

  constructor(issues: ContentValidationIssue[]) {
    super(formatIssues(issues))
    this.name = 'ContentValidationError'
    this.issues = issues
  }
}

export function syntaxError(filePath: string, line: string): ContentValidationError {
  return new ContentValidationError([
    { filePath, field: 'frontMatter', reason: 'syntax', fix: `Use key: value syntax near "${line}".` },
  ])
}

function formatIssues(issues: ContentValidationIssue[]): string {
  return issues.map((issue) => `${issue.filePath}: ${issue.field} ${issue.reason}. ${issue.fix}`).join('\n')
}
