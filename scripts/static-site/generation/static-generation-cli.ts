import { pathToFileURL } from 'node:url'
import { generateStaticPages } from '../../generate-static-pages.js'

export class StaticGenerationCli {
  constructor(private readonly entryUrl: string) {}

  async runIfEntryPoint(argv: string[]): Promise<void> {
    if (this.entryUrl !== pathToFileURL(argv[1] ?? '').href) return

    const result = await generateStaticPages()
    console.log(`Generated ${result.categoryCount} category page(s) and ${result.articleCount} article page(s).`)
  }
}
