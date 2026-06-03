import { ContentValidationError } from './content-validation-error.js'
import { FrontMatterValidator } from './frontmatter-validator.js'
import type { ParsedFrontMatter } from './frontmatter-types.js'
import { YamlSubsetReader } from './yaml-subset-reader.js'

export class FrontMatterParser {
  constructor(
    private readonly source: string,
    private readonly filePath: string,
  ) {}

  parse(): ParsedFrontMatter {
    const normalizedSource = this.source.replace(/\r\n/g, '\n')
    if (!normalizedSource.startsWith('---\n')) {
      throw new ContentValidationError([
        { filePath: this.filePath, field: 'frontMatter', reason: 'missing', fix: 'Add YAML front matter delimited by ---.' },
      ])
    }

    const delimiterMatch = normalizedSource.slice(4).match(/\n---(?:\n|$)/)
    if (!delimiterMatch || delimiterMatch.index === undefined) {
      throw new ContentValidationError([
        { filePath: this.filePath, field: 'frontMatter', reason: 'unterminated', fix: 'Close front matter with ---.' },
      ])
    }

    const endIndex = delimiterMatch.index + 4
    const delimiterEndIndex = endIndex + delimiterMatch[0].length
    const raw = normalizedSource.slice(4, endIndex)
    const body = normalizedSource.slice(delimiterEndIndex)
    const data = new YamlSubsetReader(raw, this.filePath).read()

    new FrontMatterValidator(data, this.filePath).validate()

    return { data, body }
  }
}

export function parseFrontMatter(source: string, filePath: string): ParsedFrontMatter {
  return new FrontMatterParser(source, filePath).parse()
}
