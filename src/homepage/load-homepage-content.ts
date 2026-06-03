import type { HomepageModel } from './homepage-model'
import { HomepageContentLoader } from './loading/homepage-content-loader'

const markdownModules = import.meta.glob<string>('../../content/**/*.md', { eager: true, query: '?raw', import: 'default' })
const metadataModules = import.meta.glob<Record<string, unknown>>('../../content/**/meta.json', { eager: true, import: 'default' })

export function loadHomepageModel(): HomepageModel {
  return new HomepageContentLoader(markdownModules, metadataModules).load()
}
