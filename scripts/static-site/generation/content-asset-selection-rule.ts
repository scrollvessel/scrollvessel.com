import { extname } from 'node:path'
import type { FileSelectionRule } from '../../file-system/recursive-file-finder.js'

export class ContentAssetSelectionRule implements FileSelectionRule {
  accepts(fileName: string): boolean {
    return extname(fileName) !== '.md' && fileName !== 'meta.json'
  }
}
