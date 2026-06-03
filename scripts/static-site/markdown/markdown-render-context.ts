export interface MarkdownRenderContext {
  readonly assetBasePath: string
  readonly includeMermaidScript: boolean
  nextImageIndex(): number
  requireMermaidScript(): void
}

export class DefaultMarkdownRenderContext implements MarkdownRenderContext {
  private imageIndex = 0
  includeMermaidScript = false

  constructor(readonly assetBasePath: string) {}

  nextImageIndex(): number {
    this.imageIndex += 1
    return this.imageIndex
  }

  requireMermaidScript(): void {
    this.includeMermaidScript = true
  }
}
