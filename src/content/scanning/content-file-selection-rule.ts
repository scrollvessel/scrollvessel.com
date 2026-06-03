import { extname } from 'node:path'
import type { FileSelectionRule } from '../../../scripts/file-system/recursive-file-finder.js'

export class ContentFileSelectionRule implements FileSelectionRule {
  accepts(fileName: string): boolean {
    return extname(fileName) === '.md' || fileName === 'meta.json'
  }
}
