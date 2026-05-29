# 静态 Markdown 内容架构

## 定义

静态 Markdown 内容架构使用仓库内 Markdown 目录树作为内容源，在构建期生成可部署的静态站点。

## 核心规则

- Markdown 文件和目录是内容源，不是运行时数据源。
- 构建期扫描 Markdown 目录树，生成文章数据、分类数据和页面路由。
- 生产构建输出纯静态 `dist/`，应可部署到任意静态托管平台。
- 开发环境应能监听 Markdown 新增、删除和修改，并更新本地页面。
- 文件路径默认决定 URL；URL 稳定性来自内容路径稳定性。
- 目录可以同时包含子目录和 Markdown 文件。
- 草稿发布规则引用 [`../domains/article-frontmatter.md`](../domains/article-frontmatter.md)。

## 内容索引

同一份内容索引应驱动：

- 首页内容模块。
- Atlas 或分类入口。
- 分类页。
- 文章页。
- SEO 和订阅产物，具体标准引用 [`../qas/content-site-quality.md`](../qas/content-site-quality.md)。

## 构建职责

构建层负责：

- 解析 Front Matter，字段规则引用 [`../domains/article-frontmatter.md`](../domains/article-frontmatter.md)。
- 渲染 Markdown。
- 生成标题锚点和 TOC 数据。
- 计算阅读时间和字数。
- 生成分类层级和文章数量数据。
- 生成 SEO 和订阅产物，质量标准引用 [`../qas/content-site-quality.md`](../qas/content-site-quality.md)。
