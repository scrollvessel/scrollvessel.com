import type { ScalarFrontMatterValue } from './frontmatter-types.js'

export class YamlScalarValueReader {
  read(value: string): ScalarFrontMatterValue {
    const trimmed = value.trim()
    if (trimmed === 'null' || trimmed === '~') return null
    if (trimmed === 'true') return true
    if (trimmed === 'false') return false
    if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed)
    return trimmed.replace(/^["']|["']$/g, '')
  }
}
