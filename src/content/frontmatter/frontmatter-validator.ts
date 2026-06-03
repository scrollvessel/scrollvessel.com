import { ContentValidationError, type ContentValidationIssue } from './content-validation-error.js'
import { booleanFields, externalLinkFields, requiredFields, stringFields, type FrontMatterData, type FrontMatterValue } from './frontmatter-types.js'

export class FrontMatterValidator {
  private readonly issues: ContentValidationIssue[] = []

  constructor(
    private readonly data: FrontMatterData,
    private readonly filePath: string,
  ) {}

  validate(): void {
    this.validateRequiredFields()
    this.validateStringFields()
    this.validateDateFields()
    this.validateBooleanFields()
    this.validateTags()
    this.validateExternalLinks()

    if (this.issues.length > 0) {
      throw new ContentValidationError(this.issues)
    }
  }

  private validateRequiredFields(): void {
    for (const field of requiredFields) {
      if (this.data[field] === undefined || this.data[field] === null || (typeof this.data[field] === 'string' && this.data[field].trim() === '')) {
        this.issues.push({ filePath: this.filePath, field, reason: 'required', fix: `Add ${field} to front matter.` })
      }
    }
  }

  private validateStringFields(): void {
    for (const field of stringFields) {
      if (this.data[field] !== undefined && this.data[field] !== null && typeof this.data[field] !== 'string') {
        this.issues.push({ filePath: this.filePath, field, reason: 'type', fix: `${field} must be a string.` })
      }
    }
  }

  private validateDateFields(): void {
    for (const field of ['createdAt', 'updatedAt'] as const) {
      if (typeof this.data[field] === 'string' && !/^\d{4}-\d{2}-\d{2}$/.test(this.data[field])) {
        this.issues.push({ filePath: this.filePath, field, reason: 'date-format', fix: `${field} must use YYYY-MM-DD.` })
      }
    }

    if (isDateString(this.data.createdAt) && isDateString(this.data.updatedAt) && this.data.updatedAt < this.data.createdAt) {
      this.issues.push({ filePath: this.filePath, field: 'updatedAt', reason: 'date-order', fix: 'updatedAt must not be earlier than createdAt.' })
    }
  }

  private validateBooleanFields(): void {
    for (const field of booleanFields) {
      if (this.data[field] !== undefined && typeof this.data[field] !== 'boolean') {
        this.issues.push({ filePath: this.filePath, field, reason: 'type', fix: `${field} must be true or false.` })
      }
    }
  }

  private validateTags(): void {
    const tags = this.data.tags
    if (tags === undefined) return

    if (!Array.isArray(tags) || tags.some((tag) => typeof tag !== 'string' || tag.trim() === '')) {
      this.issues.push({ filePath: this.filePath, field: 'tags', reason: 'type', fix: 'tags must be an array of non-empty strings.' })
    }
  }

  private validateExternalLinks(): void {
    const externalLinks = this.data.externalLinks
    if (externalLinks === undefined) return

    if (!Array.isArray(externalLinks)) {
      this.issues.push({ filePath: this.filePath, field: 'externalLinks', reason: 'type', fix: 'externalLinks must be an array.' })
      return
    }

    for (const link of externalLinks) {
      if (!link || typeof link !== 'object' || Array.isArray(link)) {
        this.issues.push({ filePath: this.filePath, field: 'externalLinks', reason: 'type', fix: 'externalLinks entries must be objects.' })
        continue
      }

      for (const field of externalLinkFields) {
        if (link[field] !== undefined && link[field] !== null && typeof link[field] !== 'string') {
          this.issues.push({ filePath: this.filePath, field: `externalLinks.${field}`, reason: 'type', fix: `externalLinks.${field} must be a string.` })
        }
      }

      const hasUsableFact = externalLinkFields.some(
        (field) => typeof link[field] === 'string' && link[field].trim() !== '',
      )
      if (!hasUsableFact) {
        this.issues.push({ filePath: this.filePath, field: 'externalLinks', reason: 'empty', fix: 'externalLinks entries need a usable platform, label, or url.' })
      }
    }
  }
}

function isDateString(value: FrontMatterValue | undefined): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
}
