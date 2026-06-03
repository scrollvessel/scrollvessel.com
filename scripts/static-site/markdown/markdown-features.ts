import type { MarkdownFeature } from './markdown-feature.js'
import { codeFenceFeature } from './features/code-fence-feature.js'
import { imageFiguresFeature } from './features/image-figures-feature.js'
import { mermaidFeature } from './features/mermaid-feature.js'
import { safeLinksFeature } from './features/safe-links-feature.js'
import { tableScrollFeature } from './features/table-scroll-feature.js'

export function createDefaultMarkdownFeatures(): MarkdownFeature[] {
  return [safeLinksFeature(), imageFiguresFeature(), tableScrollFeature(), mermaidFeature(), codeFenceFeature()]
}
