import { StaticGenerationCli } from './static-site/generation/static-generation-cli.js'
import { defaultGenerateStaticPagesOptions, StaticPageGenerator } from './static-site/generation/static-page-generator.js'
import type { GenerateStaticPagesOptions, GenerateStaticPagesResult } from './static-site/generation/static-generation-result.js'

export type { GenerateStaticPagesOptions, GenerateStaticPagesResult } from './static-site/generation/static-generation-result.js'

export async function generateStaticPages(options: GenerateStaticPagesOptions = {}): Promise<GenerateStaticPagesResult> {
  return new StaticPageGenerator(defaultGenerateStaticPagesOptions(options)).generate()
}

await new StaticGenerationCli(import.meta.url).runIfEntryPoint(process.argv)
