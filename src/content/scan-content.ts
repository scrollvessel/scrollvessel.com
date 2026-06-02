import { readdir, readFile } from 'node:fs/promises'
import { extname, join, relative, sep } from 'node:path'
import { buildCategories, toArticleRecord, type ArticleRecord, type CategoryRecord } from './content-records.js'
import { ContentValidationError, type ContentValidationIssue, parseFrontMatter } from './frontmatter.js'

export type { ArticleRecord, CategoryRecord } from './content-records.js'

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
    const article = toArticleRecord({ body, data, relativePath, sourcePath: filePath })
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

function normalizePath(path: string): string {
  return path.split(sep).join('/')
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && 'code' in error
}
