# 扫描内容树并校验 Front Matter 实施计划

## 所属故事

- [`../story.md`](../story.md)

## 输入

- [`../ui.md`](../ui.md)
- [`../tests.md`](../tests.md)

## 当前状态

实现完成，待审查。

## 目标

实现一个构建期可复用的内容源扫描与 Front Matter 校验底座，让合法 Markdown 进入统一内容索引，并让不合法内容产生可定位错误。

## 架构

新增 `src/content/` 作为内容构建边界，不修改现有 Vue 页面。内容扫描只负责发现 Markdown、解析 Front Matter、校验字段、生成内容源记录和错误报告；Markdown 正文渲染、TOC、RSS、sitemap、页面路由和最终 `dist/` 输出留给后续故事。

## 技术栈

- Vite + Vue 当前脚手架。
- Node.js 标准库：`node:fs/promises`、`node:path`。
- Vitest：用于内容扫描与校验单元测试，需要在本故事中引入测试脚本和依赖。

## UI 状态

本故事为非 UI story，依据 [`../ui.md`](../ui.md) 不生成 UI 产物，不需要浏览器或 Playwright 验证。

## 文件结构

- 修改 `package.json`：增加 `test`、`validate:content` 脚本和 TypeScript/Vitest 开发依赖。
- 创建 `tsconfig.json`：提供严格 TypeScript 类型检查配置。
- 创建 `src/content/frontmatter.ts`：解析 Front Matter、校验字段和生成可定位错误。
- 创建 `src/content/scan-content.ts`：扫描内容目录、生成 URL、分类上下文和内容源记录。
- 创建 `src/content/index.ts`：导出内容构建边界 API。
- 创建 `src/content/__tests__/scan-content.test.ts`：覆盖 [`../../../../../knowledge/qas/chains/content-source-chain.md`](../../../../../knowledge/qas/chains/content-source-chain.md) 的节点 01-11。
- 创建 `scripts/validate-content.ts`：提供构建前内容校验入口。

## 不做事项

- 不渲染 Markdown 正文。
- 不生成标题锚点、TOC、阅读时间或字数。
- 不生成首页、Atlas、分类页、文章页、RSS、sitemap 或最终 `dist/`。
- 不实现 UI、浏览器交互、站内搜索或后端。

## 实施任务

### 任务 1：接入测试运行器

**关联 QA 节点**：为后续节点验证提供执行入口。

**文件**

- 修改：`package.json`

**步骤**

1. 修改 `package.json`，增加 Vitest 依赖和测试脚本：

   ```json
   {
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview",
       "prepare": "lefthook install --force",
       "test": "vitest run"
     },
     "devDependencies": {
       "@commitlint/cli": "^21.0.1",
       "@commitlint/config-conventional": "^21.0.1",
       "@tailwindcss/postcss": "latest",
       "autoprefixer": "latest",
       "lefthook": "^2.1.8",
       "tailwindcss": "latest",
       "vitest": "latest"
     }
   }
   ```

2. 运行依赖安装：

   ```bash
   pnpm install
   ```

3. 运行测试命令确认测试入口可执行：

   ```bash
   pnpm test
   ```

   预期：没有测试文件时 Vitest 报告未找到测试，或在后续测试文件创建后通过对应测试。

### 任务 2：先写 Front Matter 校验失败测试

**关联 QA 节点**：04 Front Matter 被解析；05 必填字段校验；06 字段类型校验；07 语义规则校验；10 错误报告可定位。

**文件**

- 创建：`src/content/__tests__/scan-content.test.ts`

**步骤**

1. 创建测试文件，写入 Front Matter 校验失败场景：

   ```js
   import { mkdir, mkdtemp, writeFile } from 'node:fs/promises'
   import { join } from 'node:path'
   import { tmpdir } from 'node:os'
   import { describe, expect, it } from 'vitest'
   import { scanContent } from '../scan-content.ts'

   async function createContentRoot() {
     return mkdtemp(join(tmpdir(), 'scroll-vessel-content-'))
   }

   async function writeMarkdown(root, relativePath, body) {
     const filePath = join(root, relativePath)
     await mkdir(join(filePath, '..'), { recursive: true })
     await writeFile(filePath, body, 'utf8')
     return filePath
   }

   describe('scanContent', () => {
     it('fails with file and field when required front matter is missing', async () => {
       const root = await createContentRoot()
       await writeMarkdown(root, 'engineering/missing-title.md', `---
description: Missing title
createdAt: 2026-05-30
updatedAt: 2026-05-30
author: Neil Wang
lang: zh-CN
---

Body
`)

       await expect(scanContent(root)).rejects.toMatchObject({
         name: 'ContentValidationError',
         issues: [
           expect.objectContaining({
             filePath: expect.stringContaining('missing-title.md'),
             field: 'title',
             reason: 'required',
           }),
         ],
       })
     })
   })
   ```

2. 运行测试，确认失败来自模块不存在：

   ```bash
   pnpm test -- src/content/__tests__/scan-content.test.ts
   ```

   预期：失败，提示找不到 `../scan-content.ts` 或 `scanContent`。

### 任务 3：实现 Front Matter 解析与字段校验

**关联 QA 节点**：04、05、06、07、10。

**文件**

- 创建：`src/content/frontmatter.ts`
- 创建：`src/content/scan-content.ts`

**步骤**

1. 创建 `src/content/frontmatter.ts`：

   ```js
   const requiredFields = ['title', 'description', 'createdAt', 'updatedAt', 'author', 'lang']

   export class ContentValidationError extends Error {
     constructor(issues) {
       super(formatIssues(issues))
       this.name = 'ContentValidationError'
       this.issues = issues
     }
   }

   export function parseFrontMatter(source, filePath) {
     if (!source.startsWith('---\n')) {
       throw new ContentValidationError([
         { filePath, field: 'frontMatter', reason: 'missing', fix: 'Add YAML front matter delimited by ---.' },
       ])
     }

     const endIndex = source.indexOf('\n---\n', 4)
     if (endIndex === -1) {
       throw new ContentValidationError([
         { filePath, field: 'frontMatter', reason: 'unterminated', fix: 'Close front matter with ---.' },
       ])
     }

     const raw = source.slice(4, endIndex)
     const body = source.slice(endIndex + 5)
     const data = parseYamlSubset(raw, filePath)
     validateFrontMatter(data, filePath)
     return { data, body }
   }

   function parseYamlSubset(raw, filePath) {
     const data = {}
     const lines = raw.split('\n')

     for (const line of lines) {
       if (!line.trim()) continue
       const match = line.match(/^([A-Za-z][A-Za-z0-9]*):\s*(.*)$/)
       if (!match) {
         throw new ContentValidationError([
           { filePath, field: 'frontMatter', reason: 'syntax', fix: `Use key: value syntax near "${line}".` },
         ])
       }

       const [, key, value] = match
       data[key] = parseValue(value)
     }

     return data
   }

   function parseValue(value) {
     const trimmed = value.trim()
     if (trimmed === 'true') return true
     if (trimmed === 'false') return false
     if (trimmed === '[]') return []
     if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
       return trimmed
         .slice(1, -1)
         .split(',')
         .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
         .filter(Boolean)
     }
     return trimmed.replace(/^['"]|['"]$/g, '')
   }

   function validateFrontMatter(data, filePath) {
     const issues = []

     for (const field of requiredFields) {
       if (data[field] === undefined || data[field] === null || data[field] === '') {
         issues.push({ filePath, field, reason: 'required', fix: `Add ${field} to front matter.` })
       }
     }

     for (const field of ['title', 'description', 'createdAt', 'updatedAt', 'author', 'lang', 'cover']) {
       if (data[field] !== undefined && typeof data[field] !== 'string') {
         issues.push({ filePath, field, reason: 'type', fix: `${field} must be a string.` })
       }
     }

     for (const field of ['createdAt', 'updatedAt']) {
       if (typeof data[field] === 'string' && !/^\d{4}-\d{2}-\d{2}$/.test(data[field])) {
         issues.push({ filePath, field, reason: 'date-format', fix: `${field} must use YYYY-MM-DD.` })
       }
     }

     for (const field of ['featured', 'draft']) {
       if (data[field] !== undefined && typeof data[field] !== 'boolean') {
         issues.push({ filePath, field, reason: 'type', fix: `${field} must be true or false.` })
       }
     }

     if (data.tags !== undefined && !Array.isArray(data.tags)) {
       issues.push({ filePath, field: 'tags', reason: 'type', fix: 'tags must be an array.' })
     }

     if (data.externalLinks !== undefined && !Array.isArray(data.externalLinks)) {
       issues.push({ filePath, field: 'externalLinks', reason: 'type', fix: 'externalLinks must be an array.' })
     }

     if (issues.length > 0) {
       throw new ContentValidationError(issues)
     }
   }

   function formatIssues(issues) {
     return issues.map((issue) => `${issue.filePath}: ${issue.field} ${issue.reason}. ${issue.fix}`).join('\n')
   }
   ```

2. 创建最小 `src/content/scan-content.ts`：

   ```js
   import { readFile } from 'node:fs/promises'
   import { parseFrontMatter } from './frontmatter.ts'

   export async function scanContent(contentRoot) {
     const filePath = `${contentRoot}/engineering/missing-title.md`
     const source = await readFile(filePath, 'utf8')
     parseFrontMatter(source, filePath)
     return { articles: [] }
   }
   ```

3. 运行测试：

   ```bash
   pnpm test -- src/content/__tests__/scan-content.test.ts
   ```

   预期：刚才的必填字段失败测试通过。

### 任务 4：测试并实现内容目录和 Markdown 发现

**关联 QA 节点**：01 内容目录存在；02 Markdown 文件被发现。

**文件**

- 修改：`src/content/__tests__/scan-content.test.ts`
- 修改：`src/content/scan-content.ts`

**步骤**

1. 在测试文件中追加发现 Markdown 的测试：

   ```js
   it('discovers markdown files recursively and ignores non-markdown files', async () => {
     const root = await createContentRoot()
     await writeMarkdown(root, 'engineering/backend/api.md', `---
title: API Design
description: API article
createdAt: 2026-05-30
updatedAt: 2026-05-30
author: Neil Wang
lang: zh-CN
tags: [api, backend]
---

Body
`)
     await writeFile(join(root, 'engineering/backend/cover.png'), 'image', 'utf8')

     const result = await scanContent(root)

     expect(result.articles).toHaveLength(1)
     expect(result.articles[0]).toMatchObject({
       sourcePath: expect.stringContaining('api.md'),
       title: 'API Design',
       categoryPath: ['engineering', 'backend'],
     })
   })
   ```

2. 运行测试，确认失败来自扫描实现硬编码：

   ```bash
   pnpm test -- src/content/__tests__/scan-content.test.ts
   ```

   预期：新增测试失败。

3. 替换 `src/content/scan-content.ts` 为递归扫描实现：

   ```js
   import { readdir, readFile } from 'node:fs/promises'
   import { extname, relative, sep } from 'node:path'
   import { parseFrontMatter } from './frontmatter.ts'

   export async function scanContent(contentRoot) {
     const markdownFiles = await findMarkdownFiles(contentRoot)
     const articles = []

     for (const filePath of markdownFiles) {
       const source = await readFile(filePath, 'utf8')
       const { data, body } = parseFrontMatter(source, filePath)
       const relativePath = relative(contentRoot, filePath)
       articles.push(toArticleRecord(data, body, filePath, relativePath))
     }

     return { articles }
   }

   async function findMarkdownFiles(directory) {
     const entries = await readdir(directory, { withFileTypes: true })
     const files = []

     for (const entry of entries) {
       const fullPath = `${directory}/${entry.name}`
       if (entry.isDirectory()) {
         files.push(...(await findMarkdownFiles(fullPath)))
       } else if (entry.isFile() && extname(entry.name) === '.md') {
         files.push(fullPath)
       }
     }

     return files.sort()
   }

   function toArticleRecord(data, body, sourcePath, relativePath) {
     const parts = relativePath.split(sep)
     const fileName = parts.at(-1)
     const slug = fileName.replace(/\.md$/, '')
     const categoryPath = parts.slice(0, -1)
     const url = `/${[...categoryPath, slug].join('/')}`

     return {
       sourcePath,
       relativePath,
       url,
       categoryPath,
       body,
       ...data,
     }
   }
   ```

4. 运行测试：

   ```bash
   pnpm test -- src/content/__tests__/scan-content.test.ts
   ```

   预期：现有测试通过。

### 任务 5：测试并实现 URL 冲突和内容索引入口

**关联 QA 节点**：03 路径映射稳定 URL；09 分类上下文生成；11 内容源记录进入内容索引。

**文件**

- 修改：`src/content/__tests__/scan-content.test.ts`
- 修改：`src/content/scan-content.ts`
- 创建：`src/content/index.ts`

**步骤**

1. 追加 URL 和分类断言测试：

   ```js
   it('creates stable URLs and category context from file paths', async () => {
     const root = await createContentRoot()
     await writeMarkdown(root, 'engineering/backend/api-design.md', `---
title: API Design
description: API article
createdAt: 2026-05-30
updatedAt: 2026-05-30
author: Neil Wang
lang: zh-CN
---

Body
`)

     const result = await scanContent(root)

     expect(result.articles[0]).toMatchObject({
       relativePath: 'engineering/backend/api-design.md',
       url: '/engineering/backend/api-design',
       categoryPath: ['engineering', 'backend'],
     })
     expect(result.categories).toEqual([
       { path: ['engineering'], articleCount: 0 },
       { path: ['engineering', 'backend'], articleCount: 1 },
     ])
   })
   ```

2. 运行测试，确认失败来自缺少 `categories`：

   ```bash
   pnpm test -- src/content/__tests__/scan-content.test.ts
   ```

   预期：新增测试失败。

3. 在 `src/content/scan-content.ts` 中增加分类索引：

   ```js
   import { readdir, readFile } from 'node:fs/promises'
   import { extname, relative, sep } from 'node:path'
   import { parseFrontMatter } from './frontmatter.ts'

   export async function scanContent(contentRoot) {
     const markdownFiles = await findMarkdownFiles(contentRoot)
     const articles = []

     for (const filePath of markdownFiles) {
       const source = await readFile(filePath, 'utf8')
       const { data, body } = parseFrontMatter(source, filePath)
       const relativePath = normalizePath(relative(contentRoot, filePath))
       articles.push(toArticleRecord(data, body, filePath, relativePath))
     }

     return {
       articles,
       categories: buildCategories(articles),
     }
   }

   async function findMarkdownFiles(directory) {
     const entries = await readdir(directory, { withFileTypes: true })
     const files = []

     for (const entry of entries) {
       const fullPath = `${directory}/${entry.name}`
       if (entry.isDirectory()) {
         files.push(...(await findMarkdownFiles(fullPath)))
       } else if (entry.isFile() && extname(entry.name) === '.md') {
         files.push(fullPath)
       }
     }

     return files.sort()
   }

   function toArticleRecord(data, body, sourcePath, relativePath) {
     const parts = relativePath.split('/')
     const fileName = parts.at(-1)
     const slug = fileName.replace(/\.md$/, '')
     const categoryPath = parts.slice(0, -1)
     const url = `/${[...categoryPath, slug].join('/')}`

     return {
       sourcePath,
       relativePath,
       url,
       categoryPath,
       body,
       ...data,
     }
   }

   function buildCategories(articles) {
     const counts = new Map()

     for (const article of articles) {
       for (let index = 1; index <= article.categoryPath.length; index += 1) {
         const path = article.categoryPath.slice(0, index)
         const key = path.join('/')
         counts.set(key, { path, articleCount: 0 })
       }
       const leafKey = article.categoryPath.join('/')
       if (counts.has(leafKey)) {
         counts.get(leafKey).articleCount += 1
       }
     }

     return [...counts.values()].sort((a, b) => a.path.join('/').localeCompare(b.path.join('/')))
   }

   function normalizePath(path) {
     return path.split(sep).join('/')
   }
   ```

4. 创建 `src/content/index.ts`：

   ```js
   export { scanContent } from './scan-content.ts'
   export { ContentValidationError, parseFrontMatter } from './frontmatter.ts'
   ```

5. 运行测试：

   ```bash
   pnpm test -- src/content/__tests__/scan-content.test.ts
   ```

   预期：现有测试通过。

### 任务 6：测试并实现 draft、demo、externalLinks 内容事实

**关联 QA 节点**：08 内容事实归一。

**文件**

- 修改：`src/content/__tests__/scan-content.test.ts`
- 修改：`src/content/frontmatter.ts`
- 修改：`src/content/scan-content.ts`

**步骤**

1. 追加内容事实测试：

   ```js
   it('preserves draft demo tags and external link facts', async () => {
     const root = await createContentRoot()
     await writeMarkdown(root, 'engineering/demo-article.md', `---
title: Demo Article
description: Demo article
createdAt: 2026-05-30
updatedAt: 2026-05-30
author: Neil Wang
lang: zh-CN
draft: true
demo: true
tags: [demo, content]
externalLinks: []
---

Body
`)

     const result = await scanContent(root)

     expect(result.articles[0]).toMatchObject({
       draft: true,
       demo: true,
       tags: ['demo', 'content'],
       externalLinks: [],
     })
   })
   ```

2. 运行测试，确认失败来自 `demo` 类型未校验或字段未按预期保留：

   ```bash
   pnpm test -- src/content/__tests__/scan-content.test.ts
   ```

   预期：新增测试失败或通过；若通过，继续下一步补校验。

3. 在 `src/content/frontmatter.ts` 中把 `demo` 加入布尔字段校验：

   ```js
   for (const field of ['featured', 'draft', 'demo']) {
     if (data[field] !== undefined && typeof data[field] !== 'boolean') {
       issues.push({ filePath, field, reason: 'type', fix: `${field} must be true or false.` })
     }
   }
   ```

4. 运行测试：

   ```bash
   pnpm test -- src/content/__tests__/scan-content.test.ts
   ```

   预期：所有内容扫描测试通过。

### 任务 7：接入构建验证但不改变页面

**关联 QA 节点**：10 错误报告可定位；11 内容源记录进入内容索引。

**文件**

- 创建：`content/demo/hello-scroll-vessel.md`
- 修改：`package.json`
- 创建：`scripts/validate-content.ts`

**步骤**

1. 创建 demo 内容文件 `content/demo/hello-scroll-vessel.md`：

   ```markdown
   ---
   title: Hello Scroll Vessel
   description: Demo article for validating the content source pipeline.
   createdAt: 2026-05-30
   updatedAt: 2026-05-30
   author: Neil Wang
   lang: zh-CN
   demo: true
   tags: [demo]
   externalLinks: []
   ---

   # Hello Scroll Vessel

   This demo article validates content scanning and Front Matter checks.
   ```

2. 创建 `scripts/validate-content.ts`：

   ```js
   import { scanContent } from '../src/content/index.ts'

   try {
     const result = await scanContent('content')
     console.log(`Validated ${result.articles.length} article(s).`)
   } catch (error) {
     if (error.issues) {
       console.error(error.message)
       process.exit(1)
     }
     throw error
   }
   ```

3. 修改 `package.json`，增加内容校验脚本并让 build 先校验：

   ```json
   {
     "scripts": {
       "dev": "vite",
       "validate:content": "node scripts/validate-content.ts",
       "build": "pnpm validate:content && vite build",
       "preview": "vite preview",
       "prepare": "lefthook install --force",
       "test": "vitest run"
     }
   }
   ```

4. 运行内容校验：

   ```bash
   pnpm validate:content
   ```

   预期：输出 `Validated 1 article(s).`

5. 运行完整测试和构建：

   ```bash
   pnpm test && pnpm build
   ```

   预期：测试通过，构建通过。

### 任务 8：更新 QA 记录

**关联 QA 节点**：记录实施后的证据，不新增知识正文。

**文件**

- 修改：`products/mvp-001/user-journey-003/story-001/plans/qa.md`
- 修改：`products/mvp-001/user-journey-003/story-001/plans/progress.md`

**步骤**

1. 实现完成并通过验证后，更新 `plans/qa.md`，记录实际命令和结果：

   ```markdown
   # QA 记录

   ## 所属故事

   - [`../story.md`](../story.md)

   ## 当前状态

   已通过。

   ## 验证命令

   - `pnpm test`：通过。
   - `pnpm validate:content`：通过。
   - `pnpm build`：通过。

   ## 浏览器 / Playwright 验证

   不适用；本故事为非 UI story，见 [`../ui.md`](../ui.md)。

   ## 结果

   内容源扫描、Front Matter 校验、分类上下文和内容索引入口已按 [`../../../../../knowledge/qas/chains/content-source-chain.md`](../../../../../knowledge/qas/chains/content-source-chain.md) 覆盖。

   ## 知识引用

   - [`../../../../../knowledge/qas/chains/content-source-chain.md`](../../../../../knowledge/qas/chains/content-source-chain.md)
   - [`../../../../../knowledge/qas/README.md`](../../../../../knowledge/qas/README.md)
   ```

2. 更新 `plans/progress.md` 的状态：

   ```markdown
   # 进度记录

   ## 所属故事

   - [`../story.md`](../story.md)

   ## 当前状态

   - 状态：实现完成，待审查
   - 最近更新：2026-05-30

   ## 运行状态

   - `pnpm test`：通过。
   - `pnpm validate:content`：通过。
   - `pnpm build`：通过。

   ## 变更记录

   - 增加内容源扫描、Front Matter 校验和内容索引入口。
   - 增加 demo Markdown 用于构建接入验证。

   ## 下一步

   进入代码审查和复验。
   ```

3. 提交实现：

   ```bash
   git add package.json pnpm-lock.yaml src/content scripts/validate-content.ts content/demo/hello-scroll-vessel.md products/mvp-001/user-journey-003/story-001/plans/qa.md products/mvp-001/user-journey-003/story-001/plans/progress.md
   git commit -m "$(cat <<'EOF'
   feat(content): 校验 Markdown 内容源

   建立内容扫描和 Front Matter 校验入口，为后续静态页面、分类和订阅产物提供统一内容索引。
   EOF
   )"
   ```

## TypeScript 迁移说明

实际实现已按项目知识标准迁移为 TypeScript：内容管线、测试和构建前校验入口均使用 `.ts` 文件；Node ESM 运行时导入保留 `.js` 后缀；`pnpm validate:content` 通过 `tsx scripts/validate-content.ts` 执行；验证链路纳入 `pnpm exec tsc --noEmit`。

## 验证命令

- `pnpm exec tsc --noEmit`
- `pnpm test`
- `pnpm validate:content`
- `pnpm build`

## 风险和回滚

- 风险：本故事引入 `typescript`、`tsx`、`vitest` 后会更新 `pnpm-lock.yaml`。回滚时需同时回滚 `package.json` 和锁文件。
- 风险：简化 YAML 解析只覆盖当前 MVP Front Matter 子集，包括一层对象数组；复杂 YAML 特性仍需在后续故事中引入成熟 YAML parser 或扩展解析器。
- 回滚：移除 `src/content/`、`scripts/validate-content.ts`、demo 内容文件，并还原 `package.json` 与 `pnpm-lock.yaml`。

## 完成标准

- 实现满足 [`../story.md`](../story.md) 的验收标准。
- UI 跳过状态符合 [`../ui.md`](../ui.md)。
- 验证覆盖 [`../tests.md`](../tests.md) 引用的 QA 链路节点。
- `plans/qa.md` 记录实际验证证据。

## 知识引用

- [`../../../../../knowledge/architectures/static-markdown-content.md`](../../../../../knowledge/architectures/static-markdown-content.md)
- [`../../../../../knowledge/domains/article-frontmatter.md`](../../../../../knowledge/domains/article-frontmatter.md)
- [`../../../../../knowledge/qas/chains/content-source-chain.md`](../../../../../knowledge/qas/chains/content-source-chain.md)
- [`../../../../../knowledge/qas/README.md`](../../../../../knowledge/qas/README.md)
- [`../../../../../knowledge/principles/single-authority.md`](../../../../../knowledge/principles/single-authority.md)
