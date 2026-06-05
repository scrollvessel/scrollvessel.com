import type { ScalarFrontMatterValue } from './frontmatter-types.js'
import { YamlScalarValueReader } from './yaml-scalar-value-reader.js'

export class YamlInlineArrayReader {
  constructor(private readonly scalarReader = new YamlScalarValueReader()) {}

  canRead(value: string): boolean {
    const trimmed = value.trim()
    return trimmed === '[]' || (trimmed.startsWith('[') && trimmed.endsWith(']'))
  }

  read(value: string): ScalarFrontMatterValue[] {
    const trimmed = value.trim()
    if (trimmed === '[]') return []

    return trimmed
      .slice(1, -1)
      .split(',')
      .map((item) => this.scalarReader.read(item))
  }
}
