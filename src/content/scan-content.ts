import { readdir, readFile } from 'node:fs/promises'
import { basename, extname, join, relative, sep } from 'node:path'
import {
  buildCategories,
  toArticleRecord,
  toCategoryMetadataRecord,
  type ArticleRecord,
  type CategoryMetadataRecord,
  type CategoryRecord,
} from './content-records.js'
import { ContentValidationError, type ContentValidationIssue, parseFrontMatter } from './frontmatter.js'

export type { ArticleRecord, CategoryMetadataRecord, CategoryRecord } from './content-records.js'

export interface ContentIndex {
  articles: ArticleRecord[]
  categories: CategoryRecord[]
  categoryMetadata: CategoryMetadataRecord[]
}

export async function scanContent(contentRoot: string): Promise<ContentIndex> {
  const contentFiles = await findContentFiles(contentRoot, contentRoot)
  const articles: ArticleRecord[] = []
  const categoryMetadata: CategoryMetadataRecord[] = []
  const urls = new Map<string, string>()

  for (const filePath of contentFiles) {
    const relativePath = normalizePath(relative(contentRoot, filePath))

    if (isCategoryMetadataFile(filePath)) {
      const metadata = toCategoryMetadataRecord({ data: await readCategoryMetadata(filePath), relativePath, sourcePath: filePath })
      validateCategoryMetadata(metadata)
      categoryMetadata.push(metadata)
      continue
    }

    const source = await readFile(filePath, 'utf8')
    const { data, body } = parseFrontMatter(source, filePath)
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
    categories: buildCategories(articles, categoryMetadata),
    categoryMetadata,
  }
}

async function findContentFiles(directory: string, contentRoot: string): Promise<string[]> {
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
      files.push(...(await findContentFiles(fullPath, contentRoot)))
    } else if (entry.isFile() && (extname(entry.name) === '.md' || entry.name === 'meta.json')) {
      files.push(fullPath)
    }
  }

  return files.sort()
}

async function readCategoryMetadata(filePath: string): Promise<unknown> {
  try {
    return JSON.parse(await readFile(filePath, 'utf8'))
  } catch (error) {
    throw new ContentValidationError([
      {
        filePath,
        field: 'categoryMetadata',
        reason: 'type',
        fix: error instanceof Error ? error.message : 'Use valid JSON.',
      },
    ])
  }
}

function validateCategoryMetadata(metadata: CategoryMetadataRecord): void {
  if (metadata.path.length === 0) {
    throw new ContentValidationError([
      {
        filePath: metadata.sourcePath,
        field: 'categoryName',
        reason: 'semantic',
        fix: 'Place meta.json inside a category directory.',
      },
    ])
  }

  if (!metadata.categoryName) {
    throw new ContentValidationError([
      {
        filePath: metadata.sourcePath,
        field: 'categoryName',
        reason: 'required',
        fix: 'Add a non-empty categoryName string.',
      },
    ])
  }
}

function isCategoryMetadataFile(filePath: string): boolean {
  return basename(filePath) === 'meta.json'
}

function normalizePath(path: string): string {
  return path.split(sep).join('/')
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && 'code' in error
}
