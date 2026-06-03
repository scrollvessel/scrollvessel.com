export class ViteContentPath {
  constructor(private readonly sourcePath: string) {}

  relativePath(): string {
    return this.sourcePath.replace(/^\.\.\/\.\.\/content\//, '')
  }
}
