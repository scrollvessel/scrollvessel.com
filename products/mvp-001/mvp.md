# MVP 001

## 来源

- 草案：[`../../references/wips/`](../../references/wips/)
- 对话确认：2026-05-29 MVP 范围沟通。

## 定位

MVP 001 落实 [`../../knowledge/domains/scroll-vessel.md`](../../knowledge/domains/scroll-vessel.md) 中定义的“卷书成船 / Scroll Vessel”品牌定位：纯前端静态内容总站、公众号官网、个人技术博客和主理型权威实践分享平台。

## 目标

交付一个可上线的 MVP：内容以仓库内 Markdown 目录树维护，构建期生成可部署到任意静态托管平台的 `dist/`，并提供有品牌感、有组织感、可索引、可分享、可持续扩展的技术内容体验。

成功结果不是普通博客模板，而是一个有品牌、有审美、有信息架构、有长期维护意图的工程实践内容平台。

## 目标用户

- 从首页进入，想了解 Scroll Vessel 内容体系的访客。
- 从搜索引擎进入某篇文章，想快速阅读并判断可信度的访客。
- 在仓库中维护 Markdown 内容，并通过构建发布站点的作者。

## 核心方案

采用 A+C 混合方案：

- 内容和构建骨架遵循 [`../../knowledge/architectures/static-markdown-content.md`](../../knowledge/architectures/static-markdown-content.md)。
- 视觉旗舰体验遵循 [`../../knowledge/uis/scroll-vessel-experience.md`](../../knowledge/uis/scroll-vessel-experience.md)。

## 范围内

### 技术和内容源

- 使用 Vue + Vite + TypeScript。
- 内容源、URL、目录混合、开发热更新、生产静态输出和内容索引规则引用 [`../../knowledge/architectures/static-markdown-content.md`](../../knowledge/architectures/static-markdown-content.md)。

### Front Matter

文章 Front Matter 字段和结构化数据规则引用 [`../../knowledge/domains/article-frontmatter.md`](../../knowledge/domains/article-frontmatter.md)。

### 页面

动态生成：

- 首页：权威实践入口和知识航行控制台，包含平台定位、精选文章、最新文章和 Atlas 入口。
- Atlas 分类地图页：数据驱动展示分类层级和文章数量，作为核心创意页面。
- 分类页：顶部有创意视觉头部；主体先展示子分类入口，再展示当前目录文章。
- 文章页：渲染 Markdown 正文、代码高亮、标题锚点、TOC 数据、metadata、tags、阅读分钟数和字数、同步发布外链、平台化分享、上一篇/下一篇、返回所属分类入口。
- 404 页：有创意但清晰引导回首页或 Atlas。
- `sitemap.xml`。
- 全文 `rss.xml`。

手写静态页面：

- About：说明站点、主理人和内容关注范围，不走 Markdown 文章树。
- Privacy：说明 Google Analytics、RSS、外链和静态站点数据处理，不走 Markdown 文章树。

### 交互和视觉

首页、Atlas、分类页、文章页和导航体验标准引用 [`../../knowledge/uis/scroll-vessel-experience.md`](../../knowledge/uis/scroll-vessel-experience.md)。

MVP 001 的产品级交互要求：

- 分类页文章列表支持 Grid/List 切换。
- Grid/List 偏好使用 localStorage 记住。
- 分类页默认按 `createdAt` 最新优先，用户可以切换排序方向。

### Markdown 能力

- 基础 Markdown：标题、段落、列表、链接、图片、代码块。
- 代码高亮。
- 标题锚点和 TOC 数据。
- 图片支持文章同目录相对引用、公共图片路径和远程 URL；推荐文章专属图片跟随 Markdown 同目录维护。

### SEO、分享和分析

SEO、分享图、RSS、可访问性和性能质量标准引用 [`../../knowledge/qas/content-site-quality.md`](../../knowledge/qas/content-site-quality.md)。

MVP 001 额外要求：

- 文章页提供复制链接、浏览器原生分享和平台化分享入口。
- 使用 Google Analytics，并通过站点级配置启用。
- 因使用 Google Analytics，需要简短隐私提示或入口，并提供独立 Privacy 页面。

### 站点配置

- 需要站点级配置文件，包含站点标题、描述、作者、默认语言、社交链接、SEO 默认值和 Google Analytics 配置。
- 站点级社交链接至少支持 GitHub 和 X；实现上用配置数组承载。

### 主题、适配、可访问性和性能

- 支持亮色和暗色主题。
- 适配桌面、平板和移动三端。
- 可访问性和性能标准引用 [`../../knowledge/qas/content-site-quality.md`](../../knowledge/qas/content-site-quality.md)。

### 示例内容

- 需要 2-3 篇 demo Markdown，用于验证分类、文章页、SEO、列表、主题、分享和 RSS。
- demo 会发布到 production，但页面明确标注 demo，不作为正式内容。

## 范围外

MVP 001 不做：

- 后端。
- 数据库。
- 登录。
- 评论。
- 点赞。
- 站内搜索。
- 在线写作或发布后台。
- 全站文章集合页。
- 作品页。
- GitHub Issues 或 GitHub Discussions 内容源。
- MDX 或 Markdown 内嵌组件。
- 每篇文章动态生成 Open Graph 图。
- 完整 PWA 离线能力。
- 复杂名词系统功能。
- 复杂文章状态机制。

## 用户旅程

- [`user-journey-001/user-journey.md`](user-journey-001/user-journey.md)：从首页探索到文章。
- [`user-journey-002/user-journey.md`](user-journey-002/user-journey.md)：从搜索结果进入文章。
- [`user-journey-003/user-journey.md`](user-journey-003/user-journey.md)：作者维护 Markdown 并构建发布。

MVP 001 的核心旅程：

1. 访客从首页进入 Atlas，再进入分类页并读到一篇文章。
2. 访客从搜索引擎进入某篇文章，并能理解作者、时间、分类、标签、正文、同步发布外链和分享入口。
3. 作者在仓库中维护 Markdown 目录树，构建时生成文章页、分类页、SEO 文件和 RSS。

## 后续扩展

MVP 001 需要为以下方向预留空间，但不实现：

- 名词系统：名词索引页、概念关系、双向链接、知识图谱。
- 作品或项目板块：以后作为独立板块加入，不与文章内容树混在一起。
- 互动层：外链到 GitHub Discussions、社交平台或第三方评论系统。
- 搜索：未来可增加前端静态全文搜索。
- 更强内容分发：平台同步状态、分享文案优化、自动 Open Graph 图。
- 多语言：当前不做多语言页面结构，但 `lang` 字段和 URL 设计不阻碍未来扩展。

## 待 UI 阶段确认

- 首页、Atlas 和分类页头部的具体视觉隐喻。
- 导航创意命名的中英文呈现。
- TOC 的具体展示方式。
- `externalLinks` 在文章页的位置。
- 分享平台清单和按钮样式。
- Atlas 中文章数量的展示方式：直接数量、递归总数或同时展示。

## 知识引用

- [`../../knowledge/domains/scroll-vessel.md`](../../knowledge/domains/scroll-vessel.md)
- [`../../knowledge/domains/article-frontmatter.md`](../../knowledge/domains/article-frontmatter.md)
- [`../../knowledge/architectures/static-markdown-content.md`](../../knowledge/architectures/static-markdown-content.md)
- [`../../knowledge/uis/scroll-vessel-experience.md`](../../knowledge/uis/scroll-vessel-experience.md)
- [`../../knowledge/qas/content-site-quality.md`](../../knowledge/qas/content-site-quality.md)
- [`../../knowledge/principles/progressive-refinement.md`](../../knowledge/principles/progressive-refinement.md)
- [`../../knowledge/principles/single-authority.md`](../../knowledge/principles/single-authority.md)
- [`../../knowledge/principles/separation-of-concerns.md`](../../knowledge/principles/separation-of-concerns.md)
