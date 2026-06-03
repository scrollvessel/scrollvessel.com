import { syntaxError } from './content-validation-error.js'
import type { FrontMatterData, FrontMatterObject, ScalarFrontMatterValue } from './frontmatter-types.js'

interface ListBlock {
  value: FrontMatterObject[]
  endIndex: number
}

export class YamlSubsetReader {
  constructor(
    private readonly raw: string,
    private readonly filePath: string,
  ) {}

  read(): FrontMatterData {
    const data: FrontMatterData = {}
    const lines = this.raw.split('\n')

    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index]
      if (!line.trim()) continue

      const match = line.match(/^([A-Za-z][A-Za-z0-9]*):\s*(.*)$/)
      if (!match) {
        throw syntaxError(this.filePath, line)
      }

      const [, key, value] = match
      if (value === '') {
        const block = this.parseListBlock(lines, index)
        if (block) {
          data[key] = block.value
          index = block.endIndex
        } else {
          data[key] = ''
        }
      } else {
        data[key] = this.parseValue(value)
      }
    }

    return data
  }

  private parseListBlock(lines: string[], startIndex: number): ListBlock | null {
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

      const item: FrontMatterObject = { [itemMatch[1]]: this.parseScalarValue(itemMatch[2]) }
      index += 1

      while (index < lines.length) {
        const childLine = lines[index]
        if (!childLine.trim()) {
          index += 1
          continue
        }

        const childMatch = childLine.match(/^\s{4}([A-Za-z][A-Za-z0-9]*):\s*(.*)$/)
        if (!childMatch) break
        item[childMatch[1]] = this.parseScalarValue(childMatch[2])
        index += 1
      }

      items.push(item)
    }

    if (items.length === 0) return null

    const nextLine = lines[index]
    if (nextLine && /^\s/.test(nextLine)) {
      throw syntaxError(this.filePath, nextLine)
    }

    return { value: items, endIndex: index - 1 }
  }

  private parseValue(value: string): ScalarFrontMatterValue | ScalarFrontMatterValue[] {
    const trimmed = value.trim()
    if (trimmed === '[]') return []
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      return trimmed
        .slice(1, -1)
        .split(',')
        .map((item) => this.parseScalarValue(item))
    }
    return this.parseScalarValue(value)
  }

  private parseScalarValue(value: string): ScalarFrontMatterValue {
    const trimmed = value.trim()
    if (trimmed === 'null' || trimmed === '~') return null
    if (trimmed === 'true') return true
    if (trimmed === 'false') return false
    if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed)
    return trimmed.replace(/^["']|["']$/g, '')
  }
}
