# 进度记录

## 所属故事

- [`../story.md`](../story.md)

## 当前状态

- 状态：页面闭环实现完成并通过验证；静态站生成与首页探索 UI 已完成面向对象重构。
- 最近更新：2026-06-02 完成静态站生成和首页探索 UI 的面向对象重构，生成流程拆为站点索引、路由、文档、Markdown 渲染、页面渲染和写入对象；首页导航、地图式链接、海图和探索区拆为小组件。

## 运行状态

- `pnpm test`：通过，3 个测试文件、20 个测试用例。
- `pnpm build`：通过，生成首页、12 个分类页和 8 个文章页。
- 预览 / HTTP 验证：分类页和文章页静态产物可访问。

## 变更记录

- 更新 [`../tests.md`](../tests.md)，明确首页 → 分类页 → 文章页的页面闭环验证路径。
- 更新 [`plan.md`](plan.md)，将本轮范围限定为分类页、文章页和静态页面生成，不覆盖 RSS、sitemap、Atlas 页面本体和完整 SEO。
- 新增 `scripts/generate-static-pages.ts`，基于同一内容索引输出分类目录页和文章详情页 HTML。
- 更新 `package.json`，在 `pnpm build` 中追加静态页面生成步骤。
- 新增静态产物测试，验证分类页和文章页 HTML 被输出到 `dist/`。
- 新增 [`../../../../../knowledge/uis/category-directory-page.html`](../../../../../knowledge/uis/category-directory-page.html)，作为分类 / 子分类目录页视觉概念稿。
- 更新静态页面样式，减少链接下划线密度，只在列表标题文本上保留轻量标注。
- 修复静态生成审查问题：分类索引由发布文章重建，排除 `content/demo/` 占位目录；文章页展示 tags；Markdown 链接协议受白名单限制。
- 同步用户旅程 001 的分类浏览和文章阅读故事状态记录，标明最小页面路径已由本故事闭环覆盖。
- 完成面向对象重构：`scripts/generate-static-pages.ts` 缩减为编排入口，静态站生成拆为 `StaticSiteIndex`、`SiteRoute`、`HtmlDocument`、`MarkdownRenderer`、页面渲染器和 `DistWriter`。
- 完成首页组件化：抽出首页导航、地图式链接、海图背景、航点、聚焦航线面板、分类目录栏、文章列表栏和文章项组件。

## 下一步

完成浏览器复验后进入提交阶段。
