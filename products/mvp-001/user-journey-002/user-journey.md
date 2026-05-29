# 用户旅程 002：从搜索结果进入文章

## 所属 MVP

- [`../mvp.md`](../mvp.md)

## 用户

通过搜索引擎、社交分享或外部平台链接进入的技术读者。

## 用户意图

用户不是从首页开始探索，而是直接进入某篇文章。用户希望判断文章是否可信、是否值得阅读，并能继续了解 Scroll Vessel 的内容体系。

## 起点

用户打开某篇文章的稳定 URL。

## 终点

用户完成文章阅读，或通过文章页继续访问所属分类、外部同步平台或分享入口。

## 旅程步骤

1. 用户从搜索结果、社交分享或外部平台打开文章 URL。
2. 页面以静态 HTML 形式直接呈现标题、摘要相关 metadata 和正文内容。
3. 用户看到作者、创建时间、更新时间、所属分类、标签、阅读时间和字数。
4. 用户阅读 Markdown 渲染的正文、代码块和标题锚点。
5. 用户查看同步发布外链，例如微信公众号或知乎。
6. 用户使用复制链接、原生分享或平台化分享入口分享文章。
7. 用户通过上一篇/下一篇或返回所属分类继续阅读。

## 异常和边界

- 若文章是 demo，页面必须明确标注 demo，避免被误解为正式内容。
- 分享图、静态 HTML、SEO 和无脚本核心可读性遵循 [`../../../knowledge/qas/content-site-quality.md`](../../../knowledge/qas/content-site-quality.md)。

## 成功标准

- 文章页能独立建立可信度，不依赖用户先访问首页。
- 文章页能展示同步发布外链和分享入口。
- 用户能从文章页回到所属分类。
- 文章页 SEO 和阅读体验符合 [`../../../knowledge/qas/content-site-quality.md`](../../../knowledge/qas/content-site-quality.md) 与 [`../../../knowledge/uis/scroll-vessel-experience.md`](../../../knowledge/uis/scroll-vessel-experience.md)。

## 后续 story 候选

- 文章页 SEO 和结构化数据。
- 文章页 metadata 和外链展示。
- 文章分享能力。
- 文章阅读体验和可访问性。

## 知识引用

- [`../../../knowledge/domains/scroll-vessel.md`](../../../knowledge/domains/scroll-vessel.md)
- [`../../../knowledge/domains/article-frontmatter.md`](../../../knowledge/domains/article-frontmatter.md)
- [`../../../knowledge/uis/scroll-vessel-experience.md`](../../../knowledge/uis/scroll-vessel-experience.md)
- [`../../../knowledge/qas/content-site-quality.md`](../../../knowledge/qas/content-site-quality.md)
- [`../../../knowledge/user-journeys/README.md`](../../../knowledge/user-journeys/README.md)
- [`../../../knowledge/principles/progressive-refinement.md`](../../../knowledge/principles/progressive-refinement.md)
- [`../../../knowledge/principles/single-authority.md`](../../../knowledge/principles/single-authority.md)
