import MarkdownIt from 'markdown-it'
import type { MarkdownFeature } from './markdown-feature.js'
import { DefaultMarkdownRenderContext } from './markdown-render-context.js'
import { createDefaultMarkdownFeatures } from './markdown-features.js'

export interface MarkdownRenderOptions {
  assetBasePath?: string
}

export interface MarkdownRenderResult {
  html: string
  styles: string
  includeMermaidScript: boolean
}

export class MarkdownRenderer {
  constructor(private readonly features: MarkdownFeature[] = createDefaultMarkdownFeatures()) {}

  render(source: string, options: MarkdownRenderOptions = {}): MarkdownRenderResult {
    const markdown = new MarkdownIt({
      html: false,
      linkify: false,
      typographer: false,
    })
    const context = new DefaultMarkdownRenderContext(options.assetBasePath ?? './')

    markdown.validateLink = () => true
    for (const feature of this.features) {
      feature.register(markdown, context)
    }

    return {
      html: markdown.render(source),
      styles: this.features.flatMap((feature) => feature.styles?.() ?? []).join('\n      '),
      includeMermaidScript: context.includeMermaidScript,
    }
  }
}
