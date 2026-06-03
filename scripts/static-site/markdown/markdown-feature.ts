import type MarkdownIt from 'markdown-it'
import type { MarkdownRenderContext } from './markdown-render-context.js'

export interface MarkdownFeature {
  name: string
  register(markdown: MarkdownIt, context: MarkdownRenderContext): void
  styles?(): string
}
