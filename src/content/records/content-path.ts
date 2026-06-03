export class ContentPath {
  private constructor(private readonly segments: string[]) {}

  static fromRelativeFile(relativePath: string): ContentPath {
    return new ContentPath(relativePath.split('/').filter(Boolean))
  }

  toCategoryPath(): string[] {
    return this.segments.slice(0, -1)
  }

  toUrl(): string {
    const fileName = this.segments.at(-1) ?? ''
    const slug = fileName.replace(/\.md$/, '')
    const categoryPath = this.toCategoryPath()
    const urlParts = slug === 'index' ? [...categoryPath, 'index.html'] : [...categoryPath, `${slug}.html`]

    return `/${urlParts.join('/')}`
  }

  toMetadataCategoryPath(): string[] {
    const fileName = this.segments.at(-1)
    if (fileName !== 'meta.json') return this.segments

    return this.segments.slice(0, -1)
  }
}
