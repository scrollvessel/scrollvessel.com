import { RecursiveFileFinder } from '../../file-system/recursive-file-finder.js'
import { ContentAssetSelectionRule } from './content-asset-selection-rule.js'

export class AssetPathFinder {
  constructor(private readonly finder = new RecursiveFileFinder(new ContentAssetSelectionRule())) {}

  async find(directory: string): Promise<string[]> {
    return this.finder.find(directory)
  }
}
