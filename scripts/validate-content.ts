import { scanContent } from '../src/content/index.js'

try {
  const result = await scanContent('content')
  console.log(`Validated ${result.articles.length} article(s).`)
} catch (error) {
  if (error && typeof error === 'object' && 'issues' in error) {
    console.error(error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
  throw error
}
