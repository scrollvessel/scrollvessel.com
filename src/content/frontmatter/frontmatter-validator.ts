import { ContentValidationError, type ContentValidationIssue } from './content-validation-error.js'
import type { FrontMatterRule } from './frontmatter-rule.js'
import type { FrontMatterData } from './frontmatter-types.js'
import { BooleanFieldRule } from './rules/boolean-field-rule.js'
import { DateFieldRule } from './rules/date-field-rule.js'
import { ExternalLinksFieldRule } from './rules/external-links-field-rule.js'
import { RequiredFieldRule } from './rules/required-field-rule.js'
import { StringFieldRule } from './rules/string-field-rule.js'
import { TagsFieldRule } from './rules/tags-field-rule.js'

export class FrontMatterValidator {
  constructor(
    private readonly data: FrontMatterData,
    private readonly filePath: string,
    private readonly rules: FrontMatterRule[] = defaultFrontMatterRules(),
  ) {}

  validate(): void {
    const issues: ContentValidationIssue[] = []

    for (const rule of this.rules) {
      rule.validate(this.data, this.filePath, issues)
    }

    if (issues.length > 0) {
      throw new ContentValidationError(issues)
    }
  }
}

function defaultFrontMatterRules(): FrontMatterRule[] {
  return [
    new RequiredFieldRule(),
    new StringFieldRule(),
    new DateFieldRule(),
    new BooleanFieldRule(),
    new TagsFieldRule(),
    new ExternalLinksFieldRule(),
  ]
}
