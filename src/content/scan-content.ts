import { readdir, readFile } from 'node:fs/promises'
import { extname, join, relative, sep } from 'node:path'
import { ContentValidationError, type ContentValidationIssue, parseFrontMatter } from './frontmatter.js'

export interface ArticleRecord {
  sourcePath: string
  relativePath: string
  url: string
  categoryPath: string[]
  body: string
  [key: string]: unknown
}

export interface CategoryRecord {
  path: string[]
  articleCount: number
}

export interface ContentIndex {
  articles: ArticleRecord[]
  categories: CategoryRecord[]
}

export async function scanContent(contentRoot: string): Promise<ContentIndex> {
  const markdownFiles = await findMarkdownFiles(contentRoot, contentRoot)
  const articles: ArticleRecord[] = []
  const urls = new Map<string, string>()

  for (const filePath of markdownFiles) {
    const source = await readFile(filePath, 'utf8')
    const { data, body } = parseFrontMatter(source, filePath)
    const relativePath = normalizePath(relative(contentRoot, filePath))
    const article = toArticleRecord(data, body, filePath, relativePath)
    const duplicatePath = urls.get(article.url)

    if (duplicatePath) {
      throw new ContentValidationError([
        {
          filePath,
          field: 'url',
          reason: 'duplicate',
          fix: `${relativePath} resolves to the same URL as ${duplicatePath}.`,
        },
      ])
    }

    urls.set(article.url, relativePath)
    articles.push(article)
  }

  return {
    articles,
    categories: buildCategories(articles),
  }
}

async function findMarkdownFiles(directory: string, contentRoot: string): Promise<string[]> {
  let entries
  try {
    entries = await readdir(directory, { withFileTypes: true })
  } catch (error) {
    if (isNodeError(error) && error.code === 'ENOENT') {
      throw new ContentValidationError([
        { filePath: contentRoot, field: 'contentRoot', reason: 'missing', fix: 'Create the content directory.' },
      ])
    }
    throw error
  }

  const files: string[] = []

  for (const entry of entries) {
    const fullPath = join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await findMarkdownFiles(fullPath, contentRoot)))
    } else if (entry.isFile() && extname(entry.name) === '.md') {
      files.push(fullPath)
    }
  }

  return files.sort()
}

function toArticleRecord(data: Record<string, unknown>, body: string, sourcePath: string, relativePath: string): ArticleRecord {
  const parts = relativePath.split('/')
  const fileName = parts.at(-1) ?? ''
  const slug = fileName.replace(/\.md$/, '')
  const categoryPath = parts.slice(0, -1)
  const urlParts = slug === 'index' ? categoryPath : [...categoryPath, slug]
  const url = `/${urlParts.join('/')}`

  return {
    ...data,
    sourcePath,
    relativePath,
    url,
    categoryPath,
    body,
  }
}

function buildCategories(articles: ArticleRecord[]): CategoryRecord[] {
  const counts = new Map<string, CategoryRecord>()

  for (const article of articles) {
    for (let index = 1; index <= article.categoryPath.length; index += 1) {
      const path = article.categoryPath.slice(0, index)
      const key = path.join('/')
      const category = counts.get(key) ?? { path, articleCount: 0 }
      category.articleCount += 1
      counts.set(key, category)
    }
  }

  return [...counts.values()].sort((a, b) => a.path.join('/').localeCompare(b.path.join('/')))
}

function normalizePath(path: string): string {
  return path.split(sep).join('/')
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && 'code' in error
}
