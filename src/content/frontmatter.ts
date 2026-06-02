const requiredFields = ['title', 'description', 'createdAt', 'updatedAt', 'author', 'lang'] as const
const stringFields = ['title', 'description', 'createdAt', 'updatedAt', 'author', 'lang', 'cover'] as const
const booleanFields = ['featured', 'draft', 'demo'] as const
const externalLinkFields = ['platform', 'label', 'url'] as const

type ScalarFrontMatterValue = string | number | boolean | null
type FrontMatterValue = ScalarFrontMatterValue | string[] | FrontMatterObject[]
type FrontMatterObject = Record<string, ScalarFrontMatterValue>

type FrontMatterData = Record<string, FrontMatterValue>

type ContentValidationReason =
  | 'date-format'
  | 'date-order'
  | 'duplicate'
  | 'empty'
  | 'missing'
  | 'required'
  | 'syntax'
  | 'type'
  | 'unterminated'

export interface ContentValidationIssue {
  filePath: string
  field: string
  reason: ContentValidationReason
  fix: string
}

export interface ParsedFrontMatter {
  data: FrontMatterData
  body: string
}

interface ListBlock {
  value: FrontMatterObject[]
  endIndex: number
}

export class ContentValidationError extends Error {
  issues: ContentValidationIssue[]

  constructor(issues: ContentValidationIssue[]) {
    super(formatIssues(issues))
    this.name = 'ContentValidationError'
    this.issues = issues
  }
}

export function parseFrontMatter(source: string, filePath: string): ParsedFrontMatter {
  if (!source.startsWith('---\n')) {
    throw new ContentValidationError([
      { filePath, field: 'frontMatter', reason: 'missing', fix: 'Add YAML front matter delimited by ---.' },
    ])
  }

  const endIndex = source.indexOf('\n---\n', 4)
  if (endIndex === -1) {
    throw new ContentValidationError([
      { filePath, field: 'frontMatter', reason: 'unterminated', fix: 'Close front matter with ---.' },
    ])
  }

  const raw = source.slice(4, endIndex)
  const body = source.slice(endIndex + 5)
  const data = parseYamlSubset(raw, filePath)
  validateFrontMatter(data, filePath)
  return { data, body }
}

function parseYamlSubset(raw: string, filePath: string): FrontMatterData {
  const data: FrontMatterData = {}
  const lines = raw.split('\n')

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    if (!line.trim()) continue

    const match = line.match(/^([A-Za-z][A-Za-z0-9]*):\s*(.*)$/)
    if (!match) {
      throw syntaxError(filePath, line)
    }

    const [, key, value] = match
    if (value === '') {
      const block = parseListBlock(lines, index, filePath)
      if (block) {
        data[key] = block.value
        index = block.endIndex
      } else {
        data[key] = ''
      }
    } else {
      data[key] = parseValue(value)
    }
  }

  return data
}

function parseListBlock(lines: string[], startIndex: number, filePath: string): ListBlock | null {
  const items: FrontMatterObject[] = []
  let index = startIndex + 1

  while (index < lines.length) {
    const line = lines[index]
    if (!line.trim()) {
      index += 1
      continue
    }

    const itemMatch = line.match(/^\s{2}-\s+([A-Za-z][A-Za-z0-9]*):\s*(.*)$/)
    if (!itemMatch) break

    const item: FrontMatterObject = { [itemMatch[1]]: parseScalarValue(itemMatch[2]) }
    index += 1

    while (index < lines.length) {
      const childLine = lines[index]
      if (!childLine.trim()) {
        index += 1
        continue
      }

      const childMatch = childLine.match(/^\s{4}([A-Za-z][A-Za-z0-9]*):\s*(.*)$/)
      if (!childMatch) break
      item[childMatch[1]] = parseScalarValue(childMatch[2])
      index += 1
    }

    items.push(item)
  }

  if (items.length === 0) return null

  const nextLine = lines[index]
  if (nextLine && /^\s/.test(nextLine)) {
    throw syntaxError(filePath, nextLine)
  }

  return { value: items, endIndex: index - 1 }
}

function parseValue(value: string): ScalarFrontMatterValue | string[] {
  const trimmed = value.trim()
  if (trimmed === '[]') return []
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((item) => item.trim().replace(/^["']|["']$/g, ''))
      .filter(Boolean)
  }
  return parseScalarValue(value)
}

function parseScalarValue(value: string): ScalarFrontMatterValue {
  const trimmed = value.trim()
  if (trimmed === 'null' || trimmed === '~') return null
  if (trimmed === 'true') return true
  if (trimmed === 'false') return false
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed)
  return trimmed.replace(/^["']|["']$/g, '')
}

function validateFrontMatter(data: FrontMatterData, filePath: string): void {
  const issues: ContentValidationIssue[] = []

  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null || (typeof data[field] === 'string' && data[field].trim() === '')) {
      issues.push({ filePath, field, reason: 'required', fix: `Add ${field} to front matter.` })
    }
  }

  for (const field of stringFields) {
    if (data[field] !== undefined && data[field] !== null && typeof data[field] !== 'string') {
      issues.push({ filePath, field, reason: 'type', fix: `${field} must be a string.` })
    }
  }

  for (const field of ['createdAt', 'updatedAt'] as const) {
    if (typeof data[field] === 'string' && !/^\d{4}-\d{2}-\d{2}$/.test(data[field])) {
      issues.push({ filePath, field, reason: 'date-format', fix: `${field} must use YYYY-MM-DD.` })
    }
  }

  if (isDateString(data.createdAt) && isDateString(data.updatedAt) && data.updatedAt < data.createdAt) {
    issues.push({ filePath, field: 'updatedAt', reason: 'date-order', fix: 'updatedAt must not be earlier than createdAt.' })
  }

  for (const field of booleanFields) {
    if (data[field] !== undefined && typeof data[field] !== 'boolean') {
      issues.push({ filePath, field, reason: 'type', fix: `${field} must be true or false.` })
    }
  }

  if (data.tags !== undefined && !Array.isArray(data.tags)) {
    issues.push({ filePath, field: 'tags', reason: 'type', fix: 'tags must be an array.' })
  }

  if (data.externalLinks !== undefined) {
    validateExternalLinks(data.externalLinks, filePath, issues)
  }

  if (issues.length > 0) {
    throw new ContentValidationError(issues)
  }
}

function validateExternalLinks(
  externalLinks: FrontMatterValue,
  filePath: string,
  issues: ContentValidationIssue[],
): void {
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

function isDateString(value: FrontMatterValue | undefined): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
}

function syntaxError(filePath: string, line: string): ContentValidationError {
  return new ContentValidationError([
    { filePath, field: 'frontMatter', reason: 'syntax', fix: `Use key: value syntax near "${line}".` },
  ])
}

function formatIssues(issues: ContentValidationIssue[]): string {
  return issues.map((issue) => `${issue.filePath}: ${issue.field} ${issue.reason}. ${issue.fix}`).join('\n')
}
