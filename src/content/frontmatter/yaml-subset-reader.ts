import { syntaxError } from './content-validation-error.js'
import type { FrontMatterData, ScalarFrontMatterValue } from './frontmatter-types.js'
import { YamlListBlockReader } from './yaml-list-block-reader.js'

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
        const block = new YamlListBlockReader(lines, index, this.filePath, this.parseScalarValue).read()
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

  private parseValue = (value: string): ScalarFrontMatterValue | ScalarFrontMatterValue[] => {
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

  private parseScalarValue = (value: string): ScalarFrontMatterValue => {
    const trimmed = value.trim()
    if (trimmed === 'null' || trimmed === '~') return null
    if (trimmed === 'true') return true
    if (trimmed === 'false') return false
    if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed)
    return trimmed.replace(/^["']|["']$/g, '')
  }
}
