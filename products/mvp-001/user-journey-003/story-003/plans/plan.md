# 实施计划

## 所属故事

- [`../story.md`](../story.md)

## 输入

- [`../ui.md`](../ui.md)
- [`../tests.md`](../tests.md)
- [`../../../../user-journey-001/story-002/story.md`](../../../../user-journey-001/story-002/story.md)
- [`../../../../user-journey-001/story-003/story.md`](../../../../user-journey-001/story-003/story.md)

## 当前状态

已分析；本轮实现可用页面闭环，暂不覆盖 RSS、sitemap、Atlas 页面本体和完整 SEO。

## 步骤

1. 内容领域补强
   - 复用现有 `content/**/meta.json` 分类元数据。
   - 保持 URL 由目录派生：文章 `/path/article.html`，分类 `/path/index.html`。
   - 增加页面生成所需的分类页和文章页视图模型。

2. 静态页面生成
   - 新增构建脚本，基于同一内容索引生成分类页和文章页 HTML。
   - 在 Vite build 后执行静态页面生成，输出到 `dist/`。
   - 首页继续由 Vite 输出 `dist/index.html`。

3. 分类页最小实现
   - 展示分类名、父级路径、子分类入口和当前分类聚合文章列表。
   - 保留 Story 002 的 Grid/List 与排序要求为本轮最小交互：提供默认列表和稳定 URL，复杂偏好可后续增强。

4. 文章页最小实现
   - 展示标题、作者、创建时间、更新时间、分类路径、标签、字数、阅读时间和正文。
   - 提供返回所属分类入口。
   - Markdown 正文使用基础 HTML 渲染，保证段落、标题和链接可读。

5. 验证与记录
   - 运行 `pnpm test`、`pnpm build`。
   - 检查 `dist/` 中分类页和文章页产物。
   - 浏览器验证首页 → 分类页 → 文章页 → 分类页核心路径。
   - 更新 `qa.md` 和 `progress.md`。

## 完成标准

- 实现满足 `story.md` 的首页、分类页和文章页静态输出验收标准中的页面闭环部分。
- 分类页满足 `user-journey-001/story-002` 的基础浏览路径。
- 文章页满足 `user-journey-001/story-003` 的基础阅读路径。
- 验证覆盖 `tests.md` 的核心场景。

## 知识引用

- [`../../../../../knowledge/architectures/static-markdown-content.md`](../../../../../knowledge/architectures/static-markdown-content.md)
- [`../../../../../knowledge/qas/content-site-quality.md`](../../../../../knowledge/qas/content-site-quality.md)
- [`../../../../../knowledge/domains/article-frontmatter.md`](../../../../../knowledge/domains/article-frontmatter.md)
- [`../../../../../knowledge/principles/single-authority.md`](../../../../../knowledge/principles/single-authority.md)
