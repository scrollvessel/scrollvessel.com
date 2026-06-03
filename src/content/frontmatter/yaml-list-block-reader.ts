import { syntaxError } from './content-validation-error.js'
import type { FrontMatterObject, ScalarFrontMatterValue } from './frontmatter-types.js'

export interface YamlListBlock {
  value: FrontMatterObject[]
  endIndex: number
}

export class YamlListBlockReader {
  constructor(
    private readonly lines: string[],
    private readonly startIndex: number,
    private readonly filePath: string,
    private readonly parseScalarValue: (value: string) => ScalarFrontMatterValue,
  ) {}

  read(): YamlListBlock | null {
    const items: FrontMatterObject[] = []
    let index = this.startIndex + 1

    while (index < this.lines.length) {
      const line = this.lines[index]
      if (!line.trim()) {
        index += 1
        continue
      }

      const itemMatch = line.match(/^\s{2}-\s+([A-Za-z][A-Za-z0-9]*):\s*(.*)$/)
      if (!itemMatch) break

      const item: FrontMatterObject = { [itemMatch[1]]: this.parseScalarValue(itemMatch[2]) }
      index += 1

      while (index < this.lines.length) {
        const childLine = this.lines[index]
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

    const nextLine = this.lines[index]
    if (nextLine && /^\s/.test(nextLine)) {
      throw syntaxError(this.filePath, nextLine)
    }

    return { value: items, endIndex: index - 1 }
  }
}
