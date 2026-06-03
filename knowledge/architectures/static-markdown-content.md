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
- 使用成熟 Markdown 引擎渲染正文，至少覆盖标题、段落、链接、图片、引用、列表、代码块、分隔线和表格。
- Markdown 表格应由构建层包裹在可横向滚动的容器中；当视口宽度小于表格内容宽度时，保持表格列宽并允许左右滑动。
- 渲染 Markdown 时禁用原始 HTML 注入，并过滤链接与图片 URL 的危险协议。
- Markdown 渲染能力应通过 `scripts/static-site/markdown/features/` 下的具名能力对象注册；每个能力同时声明自己的 MarkdownIt 规则和能力专属 CSS，页面壳只负责注入能力输出的样式，不复制能力细节。
- 静态页面片段应通过 `scripts/static-site/page/` 下的 `PageSection` 多态对象表达；页面渲染器只组合片段对象，不堆叠 `renderXxx` helper。
- 静态 HTML 文档壳应通过 `scripts/static-site/document/` 下的小对象表达 head、body、scripts 和基础样式；`HtmlDocument` 只负责组合文档结构。
- 内容 Front Matter、内容记录和扫描流程应按领域职责拆到 `src/content/frontmatter/`、`src/content/records/` 和 `src/content/scanning/`；旧入口只做兼容导出。
- 首页内容模型应按文章集合、分类命名目录、分类树、分类节点和可选分类集合拆到 `src/homepage/model/`；`HomepageModel` 只作为用例协调对象。
- 首页样式应按视觉职责拆到 `src/homepage/styles/`；`homepage.css` 只作为样式入口，不堆叠背景、海图、列表、响应式等细节。
- 首页视图模型和构建期内容加载应拆到 `src/homepage/view-model/` 与 `src/homepage/loading/`；标签解析、文章项投影、Vite 内容路径和模块集合各自独立。
- 静态站点索引应通过 `scripts/static-site/index/` 下的查询、过滤和路径匹配对象表达；`StaticSiteIndex` 只组合这些对象并暴露页面渲染所需查询。
- 内容测试应按生产对象边界拆分，避免把 Front Matter、扫描、元数据和记录派生规则堆在一个大测试文件中。
- 生成静态文章页时复制文章同目录的非 Markdown 资源，保证正文中的相对图片路径在 `dist/` 中可访问。
- 生成标题锚点和 TOC 数据。
- 计算阅读时间和字数。
- 生成分类层级和文章数量数据；分类文章数量默认统计该分类及全部子分类下的聚合文章数。
- 生成 SEO 和订阅产物，质量标准引用 [`../qas/content-site-quality.md`](../qas/content-site-quality.md)。

## 实现约束

- 内容构建代码优先使用 TypeScript，并通过类型检查进入验证链路。
- 在 Node ESM 与 TypeScript 共同使用时，源码中的相对导入保留运行时可解析的 `.js` 后缀。
- 内容索引中的派生字段，例如 `sourcePath`、`relativePath`、`url`、`categoryPath` 和 `body`，由构建层生成并保持权威，不允许 Front Matter 覆盖。
