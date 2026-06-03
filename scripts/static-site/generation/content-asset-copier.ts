import { cp, mkdir } from 'node:fs/promises'
import { dirname, join, relative } from 'node:path'
import { AssetPathFinder } from './asset-path-finder.js'

export class ContentAssetCopier {
  constructor(
    private readonly contentRoot: string,
    private readonly outputRoot: string,
    private readonly finder = new AssetPathFinder(),
  ) {}

  async copy(): Promise<void> {
    const assetPaths = await this.finder.find(this.contentRoot)

    await Promise.all(assetPaths.map((assetPath) => this.copyAsset(assetPath)))
  }

  private async copyAsset(assetPath: string): Promise<void> {
    const targetPath = join(this.outputRoot, relative(this.contentRoot, assetPath))
    await mkdir(dirname(targetPath), { recursive: true })
    await cp(assetPath, targetPath)
  }
}
