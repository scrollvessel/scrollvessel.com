import { pathToFileURL } from 'node:url'
import { scanContent } from '../src/content/index.js'
import { DistWriter } from './static-site/dist-writer.js'
import { ArticlePageRenderer, CategoryPageRenderer } from './static-site/page-renderers.js'
import { StaticSiteIndex } from './static-site/site-index.js'

export interface GenerateStaticPagesOptions {
  contentRoot?: string
  outputRoot?: string
}

export interface GenerateStaticPagesResult {
  articleCount: number
  categoryCount: number
}

export async function generateStaticPages({ contentRoot = 'content', outputRoot = 'dist' }: GenerateStaticPagesOptions = {}): Promise<GenerateStaticPagesResult> {
  const contentIndex = await scanContent(contentRoot)
  const siteIndex = StaticSiteIndex.fromContent(contentIndex.articles, contentIndex.categoryMetadata)
  const categoryRenderer = new CategoryPageRenderer(siteIndex)
  const articleRenderer = new ArticlePageRenderer(siteIndex)
  const writer = new DistWriter(outputRoot)
  const pages = [
    ...siteIndex.categories.map((category) => categoryRenderer.render(category)),
    ...siteIndex.articles.map((article) => articleRenderer.render(article)),
  ]

  await Promise.all(pages.map((page) => writer.write(page.route, page.html)))

  return {
    articleCount: siteIndex.articles.length,
    categoryCount: siteIndex.categories.length,
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const result = await generateStaticPages()
  console.log(`Generated ${result.categoryCount} category page(s) and ${result.articleCount} article page(s).`)
}
