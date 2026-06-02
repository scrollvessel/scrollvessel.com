import {
  buildCategories,
  toArticleRecord,
  toCategoryMetadataRecord,
  type ArticleRecord,
  type CategoryMetadataRecord,
} from '../content/content-records'
import { parseFrontMatter } from '../content/frontmatter'
import { HomepageModel } from './homepage-model'

const markdownModules = import.meta.glob('../../content/**/*.md', { eager: true, query: '?raw', import: 'default' })
const metadataModules = import.meta.glob('../../content/**/meta.json', { eager: true, import: 'default' })

export function loadHomepageModel(): HomepageModel {
  const articles = loadArticles()
  const categoryMetadata = loadCategoryMetadata()

  return new HomepageModel({
    articles,
    categories: buildCategories(articles, categoryMetadata),
    categoryMetadata,
  })
}

function loadArticles(): ArticleRecord[] {
  return Object.entries(markdownModules).map(([sourcePath, source]) => {
    const { data, body } = parseFrontMatter(String(source), sourcePath)
    const relativePath = sourcePath.replace(/^\.\.\/\.\.\/content\//, '')

    return toArticleRecord({ body, data, relativePath, sourcePath })
  })
}

function loadCategoryMetadata(): CategoryMetadataRecord[] {
  return Object.entries(metadataModules).map(([sourcePath, data]) => {
    const relativePath = sourcePath.replace(/^\.\.\/\.\.\/content\//, '')

    return toCategoryMetadataRecord({ data, relativePath, sourcePath })
  })
}
