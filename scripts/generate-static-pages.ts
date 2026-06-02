import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { buildCategories, scanContent, type ArticleRecord, type CategoryMetadataRecord, type CategoryRecord } from '../src/content/index.js'

interface ArticlePageRecord extends ArticleRecord {
  title: string
  description: string
  createdAt: string
  updatedAt: string
  author: string
  lang: string
  tags?: string[]
}

interface StaticSiteIndex {
  articles: ArticlePageRecord[]
  categories: CategoryRecord[]
  categoryMetadata: CategoryMetadataRecord[]
}

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
  const publishedArticles = contentIndex.articles.filter(isPublishedArticle)
  const siteIndex: StaticSiteIndex = {
    articles: publishedArticles,
    categories: buildCategories(publishedArticles, contentIndex.categoryMetadata),
    categoryMetadata: contentIndex.categoryMetadata,
  }

  await Promise.all([
    ...siteIndex.categories.map((category) => writeCategoryPage(siteIndex, category, outputRoot)),
    ...siteIndex.articles.map((article) => writeArticlePage(siteIndex, article, outputRoot)),
  ])

  return {
    articleCount: siteIndex.articles.length,
    categoryCount: siteIndex.categories.length,
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const result = await generateStaticPages()
  console.log(`Generated ${result.categoryCount} category page(s) and ${result.articleCount} article page(s).`)
}

async function writeCategoryPage(index: StaticSiteIndex, category: CategoryRecord, outputRoot: string): Promise<void> {
  const childCategories = index.categories.filter((candidate) => isDirectChild(category.path, candidate.path))
  const articles = index.articles.filter((article) => isSamePath(article.categoryPath, category.path))
  const descendantArticles = index.articles.filter((article) => startsWithPath(article.categoryPath, category.path))
  const categoryUrl = categoryUrlFor(category.path)
  const html = renderPage({
    title: `${category.categoryName} · Scroll Vessel`,
    description: `Scroll Vessel ${category.categoryName} 分类目录。`,
    body: `
      <header class="page-hero">
        <p class="eyebrow">Category route</p>
        <nav class="trail" aria-label="分类路径">${renderCategoryTrail(index, category.path)}</nav>
        <h1>${escapeHtml(category.categoryName)}</h1>
        <p>${category.articleCount} 篇文章沉淀在这条航线中。</p>
      </header>
      <main class="page-grid">
        <section class="panel" aria-labelledby="child-categories-title">
          <h2 id="child-categories-title">子分类</h2>
          ${renderChildCategories(childCategories)}
        </section>
        <section class="panel" aria-labelledby="category-articles-title">
          <h2 id="category-articles-title">当前目录文章</h2>
          ${renderArticleList(articles, '当前目录暂无直属文章，可继续查看子分类。')}
        </section>
        <section class="panel wide" aria-labelledby="descendant-articles-title">
          <h2 id="descendant-articles-title">全部文章</h2>
          ${renderArticleList(descendantArticles, '当前分类暂无文章。')}
        </section>
      </main>
    `,
  })

  await writeDistFile(outputRoot, categoryUrl, html)
}

async function writeArticlePage(index: StaticSiteIndex, article: ArticlePageRecord, outputRoot: string): Promise<void> {
  const categoryName = categoryNameFor(index, article.categoryPath)
  const html = renderPage({
    title: `${article.title} · Scroll Vessel`,
    description: article.description,
    body: `
      <article class="reader">
        <header class="page-hero">
          <p class="eyebrow">Article dispatch</p>
          <nav class="trail" aria-label="文章分类路径">${renderCategoryTrail(index, article.categoryPath)}</nav>
          <h1>${escapeHtml(article.title)}</h1>
          <p>${escapeHtml(article.description)}</p>
          <dl class="metadata">
            <div><dt>作者</dt><dd>${escapeHtml(article.author)}</dd></div>
            <div><dt>创建</dt><dd>${escapeHtml(article.createdAt)}</dd></div>
            <div><dt>更新</dt><dd>${escapeHtml(article.updatedAt)}</dd></div>
            <div><dt>分类</dt><dd>${escapeHtml(categoryName)}</dd></div>
            <div><dt>标签</dt><dd>${renderTags(article.tags)}</dd></div>
            <div><dt>字数</dt><dd>${wordCount(article.body)}</dd></div>
            <div><dt>阅读</dt><dd>${readingMinutes(article.body)} 分钟</dd></div>
          </dl>
          <a class="route-link" href="${escapeAttribute(categoryUrlFor(article.categoryPath))}">返回所属分类</a>
        </header>
        <div class="prose">
          ${renderMarkdown(article.body)}
        </div>
      </article>
    `,
  })

  await writeDistFile(outputRoot, article.url, html)
}

function renderPage({ title, description, body }: { title: string; description: string; body: string }): string {
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeAttribute(description)}" />
    <title>${escapeHtml(title)}</title>
    <style>
      :root { color-scheme: light; --paper: #f6e4ad; --paper-warm: #efd18a; --ink: #2f210f; --ink-soft: rgba(47, 33, 15, 0.72); --hairline: rgba(47, 33, 15, 0.28); }
      * { box-sizing: border-box; }
      html { min-height: 100%; scroll-behavior: smooth; }
      body { min-height: 100%; margin: 0; color: var(--ink); background: radial-gradient(circle at 18% 18%, rgba(255, 249, 214, 0.45), transparent 18rem), linear-gradient(135deg, #f9e9b7 0%, var(--paper) 48%, var(--paper-warm) 100%); font-family: 'Crimson Pro', 'Noto Serif SC', Georgia, serif; }
      a { color: inherit; text-decoration: none; }
      .shell { width: min(1040px, calc(100% - 32px)); margin: 0 auto; padding: 32px 0 56px; }
      .site-nav { display: flex; justify-content: space-between; gap: 16px; margin-bottom: 52px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; }
      .page-hero { border-bottom: 1px solid var(--hairline); padding-bottom: 28px; }
      .eyebrow { margin: 0 0 12px; color: var(--ink-soft); font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; }
      .trail { display: flex; flex-wrap: wrap; gap: 8px 12px; margin-bottom: 18px; color: var(--ink-soft); font-size: 14px; }
      .trail a, .site-nav a, .route-link { display: inline-flex; min-height: 44px; align-items: center; }
      h1 { max-width: 860px; margin: 0; font-size: clamp(3rem, 8vw, 6rem); line-height: 0.9; letter-spacing: -0.055em; }
      h2 { margin: 0 0 16px; font-size: clamp(2rem, 4vw, 3.25rem); line-height: 0.95; letter-spacing: -0.045em; }
      .page-hero p:not(.eyebrow) { max-width: 720px; color: var(--ink-soft); font-size: 18px; line-height: 1.75; }
      .page-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 36px; margin-top: 36px; }
      .panel { border-top: 1px solid var(--hairline); padding-top: 18px; }
      .wide { grid-column: 1 / -1; }
      .list { display: grid; gap: 12px; margin: 0; padding: 0; list-style: none; }
      .list a { display: grid; gap: 6px; min-height: 44px; padding: 12px 0; }
      .list li + li { border-top: 1px solid rgba(47,33,15,.12); }
      .list strong { width: fit-content; background-image: linear-gradient(currentcolor, currentcolor); background-position: 0 100%; background-repeat: no-repeat; background-size: 100% 1px; font-size: 22px; line-height: 1.12; }
      .list span, .empty { color: var(--ink-soft); line-height: 1.65; }
      .metadata { display: flex; flex-wrap: wrap; gap: 10px 18px; margin: 22px 0; color: var(--ink-soft); }
      .metadata div { min-width: 96px; }
      .metadata dt { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; }
      .metadata dd { margin: 4px 0 0; color: var(--ink); }
      .route-link { display: inline-flex; min-height: 44px; align-items: center; }
      .reader { max-width: 860px; }
      .prose { margin-top: 34px; font-size: 18px; line-height: 1.86; }
      .prose h2 { margin-top: 2em; }
      .prose h3 { margin-top: 1.6em; font-size: 1.5rem; }
      .prose p { margin: 1.1em 0; }
      .prose ul, .prose ol { padding-left: 1.35em; }
      .prose code { background: rgba(47, 33, 15, 0.08); padding: 0.12em 0.28em; }
      .prose pre { overflow-x: auto; background: rgba(47, 33, 15, 0.08); padding: 16px; }
      :focus-visible { outline: 2px solid var(--ink); outline-offset: 5px; }
      @media (max-width: 760px) { .site-nav { flex-direction: column; } .page-grid { grid-template-columns: 1fr; } .wide { grid-column: auto; } }
      @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; } }
    </style>
  </head>
  <body>
    <div class="shell">
      <nav class="site-nav" aria-label="主要导航">
        <a href="/">卷书成船 / Scroll Vessel</a>
        <a href="/">Home</a>
      </nav>
      ${body}
    </div>
  </body>
</html>
`
}

function renderChildCategories(categories: CategoryRecord[]): string {
  if (categories.length === 0) return '<p class="empty">暂无子分类，可直接浏览当前分类文章。</p>'

  return `<ul class="list">${categories
    .map(
      (category) => `<li><a href="${escapeAttribute(categoryUrlFor(category.path))}"><strong>${escapeHtml(category.categoryName)}</strong><span>${category.articleCount} 篇文章</span></a></li>`,
    )
    .join('')}</ul>`
}

function renderArticleList(articles: ArticlePageRecord[], emptyMessage: string): string {
  if (articles.length === 0) return `<p class="empty">${escapeHtml(emptyMessage)}</p>`

  return `<ul class="list">${articles
    .map(
      (article) => `<li><a href="${escapeAttribute(article.url)}"><strong>${escapeHtml(article.title)}</strong><span>${escapeHtml(article.description)} · ${escapeHtml(article.updatedAt)}</span></a></li>`,
    )
    .join('')}</ul>`
}

function renderCategoryTrail(index: StaticSiteIndex, path: string[]): string {
  const crumbs = path.map((_, crumbIndex) => path.slice(0, crumbIndex + 1))

  return crumbs
    .map((crumb) => `<a href="${escapeAttribute(categoryUrlFor(crumb))}">${escapeHtml(categoryNameFor(index, crumb))}</a>`)
    .join('<span>/</span>')
}

function renderMarkdown(source: string): string {
  const blocks = source.trim().split(/\n{2,}/)

  return blocks
    .map((block) => {
      const trimmed = block.trim()
      if (!trimmed) return ''
      if (trimmed.startsWith('### ')) return `<h3>${renderInlineMarkdown(trimmed.slice(4))}</h3>`
      if (trimmed.startsWith('## ')) return `<h2>${renderInlineMarkdown(trimmed.slice(3))}</h2>`
      if (trimmed.startsWith('# ')) return `<h2>${renderInlineMarkdown(trimmed.slice(2))}</h2>`
      if (trimmed.startsWith('- ')) return `<ul>${trimmed.split('\n').map((line) => `<li>${renderInlineMarkdown(line.replace(/^-\s+/, ''))}</li>`).join('')}</ul>`
      if (/^```/.test(trimmed)) return `<pre><code>${escapeHtml(trimmed.replace(/^```[a-zA-Z]*\n?/, '').replace(/```$/, ''))}</code></pre>`
      return `<p>${renderInlineMarkdown(trimmed.replace(/\n/g, ' '))}</p>`
    })
    .join('\n')
}

function renderInlineMarkdown(source: string): string {
  return escapeHtml(source)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label: string, href: string) => `<a href="${safeHref(href)}">${label}</a>`)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
}

function renderTags(tags: string[] | undefined): string {
  if (!Array.isArray(tags) || tags.length === 0) return '未标注'

  return tags.map((tag) => escapeHtml(tag)).join(' / ')
}

function safeHref(raw: string): string {
  const trimmed = raw.trim()
  if (
    trimmed.startsWith('/') ||
    trimmed.startsWith('#') ||
    trimmed.startsWith('./') ||
    trimmed.startsWith('../') ||
    /^https?:\/\//i.test(trimmed) ||
    /^mailto:/i.test(trimmed)
  ) {
    return escapeAttribute(trimmed)
  }

  return '#'
}

function isPublishedArticle(article: ArticleRecord): article is ArticlePageRecord {
  return (
    article.draft !== true &&
    !article.relativePath.startsWith('demo/') &&
    typeof article.title === 'string' &&
    typeof article.description === 'string' &&
    typeof article.createdAt === 'string' &&
    typeof article.updatedAt === 'string' &&
    typeof article.author === 'string' &&
    typeof article.lang === 'string'
  )
}

function categoryNameFor(index: StaticSiteIndex, path: string[]): string {
  return index.categoryMetadata.find((metadata) => isSamePath(metadata.path, path))?.categoryName ?? path.at(-1) ?? ''
}

function categoryUrlFor(path: string[]): string {
  return `/${path.join('/')}/index.html`
}

function outputPathFor(outputRoot: string, url: string): string {
  return join(outputRoot, url.replace(/^\//, ''))
}

async function writeDistFile(outputRoot: string, url: string, html: string): Promise<void> {
  const filePath = outputPathFor(outputRoot, url)
  await mkdir(dirname(filePath), { recursive: true })
  await writeFile(filePath, html, 'utf8')
}

function isDirectChild(parent: string[], child: string[]): boolean {
  return child.length === parent.length + 1 && startsWithPath(child, parent)
}

function startsWithPath(path: string[], prefix: string[]): boolean {
  return prefix.every((part, index) => path[index] === part)
}

function isSamePath(a: string[], b: string[]): boolean {
  return a.length === b.length && startsWithPath(a, b)
}

function wordCount(source: string): number {
  const compact = source.replace(/\s+/g, '')
  return Array.from(compact).length
}

function readingMinutes(source: string): number {
  return Math.max(1, Math.ceil(wordCount(source) / 500))
}

function escapeHtml(value: string | number): string {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function escapeAttribute(value: string): string {
  return escapeHtml(value)
}
