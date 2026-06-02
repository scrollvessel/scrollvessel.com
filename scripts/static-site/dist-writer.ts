import { mkdir, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { SiteRoute } from './site-route.js'

export class DistWriter {
  constructor(private readonly outputRoot: string) {}

  async write(route: SiteRoute, html: string): Promise<void> {
    const filePath = route.outputPath(this.outputRoot)
    await mkdir(dirname(filePath), { recursive: true })
    await writeFile(filePath, html, 'utf8')
  }
}
