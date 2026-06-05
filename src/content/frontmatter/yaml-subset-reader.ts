import { syntaxError } from './content-validation-error.js'
import type { FrontMatterData, ScalarFrontMatterValue } from './frontmatter-types.js'
import { YamlInlineArrayReader } from './yaml-inline-array-reader.js'
import { YamlListBlockReader } from './yaml-list-block-reader.js'
import { YamlScalarValueReader } from './yaml-scalar-value-reader.js'

export class YamlSubsetReader {
  constructor(
    private readonly raw: string,
    private readonly filePath: string,
    private readonly scalarReader = new YamlScalarValueReader(),
    private readonly inlineArrayReader = new YamlInlineArrayReader(scalarReader),
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
    if (this.inlineArrayReader.canRead(value)) return this.inlineArrayReader.read(value)
    return this.parseScalarValue(value)
  }

  private parseScalarValue = (value: string): ScalarFrontMatterValue => this.scalarReader.read(value)
}
