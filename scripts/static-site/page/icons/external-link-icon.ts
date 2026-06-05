import { ExternalLinkIconRegistry } from './external-link-icon-registry.js'

const registry = new ExternalLinkIconRegistry()

export function svgIconForPlatform(platform: string): string {
  return registry.iconFor(platform).render()
}
