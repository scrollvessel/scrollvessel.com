import { join } from 'node:path'

export class SiteRoute {
  private constructor(readonly url: string) {}

  static category(path: string[]): SiteRoute {
    return new SiteRoute(`/${path.join('/')}/index.html`)
  }

  static article(url: string): SiteRoute {
    return new SiteRoute(url)
  }

  outputPath(outputRoot: string): string {
    return join(outputRoot, this.url.replace(/^\//, ''))
  }

  toString(): string {
    return this.url
  }
}
