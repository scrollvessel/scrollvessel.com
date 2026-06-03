import type { ContentValidationIssue } from '../content-validation-error.js'
import type { FrontMatterRule } from '../frontmatter-rule.js'
import type { FrontMatterData } from '../frontmatter-types.js'
import { externalLinkFields } from '../frontmatter-types.js'

export class ExternalLinksFieldRule implements FrontMatterRule {
  validate(data: FrontMatterData, filePath: string, issues: ContentValidationIssue[]): void {
    const externalLinks = data.externalLinks
    if (externalLinks === undefined) return

    if (!Array.isArray(externalLinks)) {
      issues.push({ filePath, field: 'externalLinks', reason: 'type', fix: 'externalLinks must be an array.' })
      return
    }

    for (const link of externalLinks) {
      if (!link || typeof link !== 'object' || Array.isArray(link)) {
        issues.push({ filePath, field: 'externalLinks', reason: 'type', fix: 'externalLinks entries must be objects.' })
        continue
      }

      for (const field of externalLinkFields) {
        if (link[field] !== undefined && link[field] !== null && typeof link[field] !== 'string') {
          issues.push({ filePath, field: `externalLinks.${field}`, reason: 'type', fix: `externalLinks.${field} must be a string.` })
        }
      }

      const hasUsableFact = externalLinkFields.some(
        (field) => typeof link[field] === 'string' && link[field].trim() !== '',
      )
      if (!hasUsableFact) {
        issues.push({ filePath, field: 'externalLinks', reason: 'empty', fix: 'externalLinks entries need a usable platform, label, or url.' })
      }
    }
  }
}
