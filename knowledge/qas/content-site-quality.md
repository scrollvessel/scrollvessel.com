# 静态内容站质量标准

## 内容构建

- Front Matter 字段规则引用 [`../domains/article-frontmatter.md`](../domains/article-frontmatter.md)，必填字段缺失时构建必须失败。
- 开发环境错误信息应指出具体文件、字段、原因和修复方向。
- 生产构建可以简洁失败，但必须指出阻塞原因。
- 草稿内容不应进入生产构建，草稿字段规则引用 [`../domains/article-frontmatter.md`](../domains/article-frontmatter.md)。
- 分类页、文章页、RSS、sitemap 和 SEO 数据应来自同一内容索引。

## SEO 和分享

- 每篇文章应有稳定 URL、canonical、Open Graph metadata 和 Article JSON-LD；源数据来自 [`../domains/article-frontmatter.md`](../domains/article-frontmatter.md)。
- 分类页应有 SEO metadata。
- 构建期应生成 `sitemap.xml`。
- 构建期应生成 `rss.xml`。
- 分享图使用规则引用 [`../domains/article-frontmatter.md`](../domains/article-frontmatter.md) 的 `cover` 字段定义；无 `cover` 时使用默认 Open Graph 图。

## 首页入口质量

- 首页应清晰呈现站点身份、内容范围和继续探索路径。
- 首页主要入口应支持键盘访问，并在移动端保持可读和可点击。
- 精选、最新或主题入口在数据不足时应提供稳定空状态，不阻断进入 Atlas 或其他可用路径。
- 首页不应依赖复杂动效传达核心信息；减少动态效果时仍应可理解。

## 可访问性

- 使用语义 HTML。
- 支持键盘可访问。
- 图片需要 `alt`。
- 颜色对比需要达标。
- 支持亮色和暗色主题。
- 支持 `prefers-reduced-motion`。
- 尽量照顾屏幕阅读器体验。

## 性能

- 首屏应保持轻量。
- 文章页应输出静态 HTML。
- 文章正文中的 Markdown 表格、图片、引用、代码块和分隔线应在静态 HTML 中正确渲染。
- 文章同目录静态资源应随构建复制到 `dist/`，正文图片 URL 不应图裂。
- 图片应懒加载。
- 静态资源应可缓存。
- 第三方脚本不应破坏核心阅读体验。
- 关注基础 Web Vitals。
