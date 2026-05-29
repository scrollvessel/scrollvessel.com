# 用户旅程 003：作者维护 Markdown 并构建发布

## 所属 MVP

- [`../mvp.md`](../mvp.md)

## 用户

Scroll Vessel 作者和维护者。

## 用户意图

作者希望像维护代码一样维护文章内容：在仓库中编辑 Markdown 目录树，开发时实时预览，发布时构建成可部署的静态站点。

## 起点

作者在本地仓库中编辑 `content/` 下的 Markdown 文件、图片资源或站点配置。

## 终点

构建产物 `dist/` 包含文章页、分类页、首页、Atlas、SEO 文件和 RSS，可部署到任意静态托管平台。

## 旅程步骤

1. 作者在 `content/` 中新增、删除或修改 Markdown 文件。
2. 作者按 [`../../../knowledge/domains/article-frontmatter.md`](../../../knowledge/domains/article-frontmatter.md) 维护 Front Matter。
3. 开发环境按 [`../../../knowledge/architectures/static-markdown-content.md`](../../../knowledge/architectures/static-markdown-content.md) 扫描内容树并更新本地页面。
4. 内容构建层生成文章数据、分类数据、TOC 数据、阅读数据、SEO 数据和订阅文件。
5. 若内容不合规，系统按 [`../../../knowledge/qas/content-site-quality.md`](../../../knowledge/qas/content-site-quality.md) 报告错误。
6. 作者部署纯静态 `dist/`。

## 异常和边界

内容源、草稿、目录混合、Front Matter 和 externalLinks 规则引用 [`../../../knowledge/architectures/static-markdown-content.md`](../../../knowledge/architectures/static-markdown-content.md) 与 [`../../../knowledge/domains/article-frontmatter.md`](../../../knowledge/domains/article-frontmatter.md)。

## 成功标准

- 作者能用仓库 Markdown 目录树维护文章和分类。
- dev 环境能反映 Markdown 变化。
- production build 能输出可部署的纯静态站点。
- 构建质量符合 [`../../../knowledge/qas/content-site-quality.md`](../../../knowledge/qas/content-site-quality.md)。

## 后续 story 候选

- 内容扫描和 Front Matter 校验。
- Markdown 渲染与 TOC 数据生成。
- 静态路由和页面生成。
- sitemap、RSS 和 SEO 产物生成。
- 作者体验错误提示。

## 知识引用

- [`../../../knowledge/architectures/static-markdown-content.md`](../../../knowledge/architectures/static-markdown-content.md)
- [`../../../knowledge/domains/article-frontmatter.md`](../../../knowledge/domains/article-frontmatter.md)
- [`../../../knowledge/qas/content-site-quality.md`](../../../knowledge/qas/content-site-quality.md)
- [`../../../knowledge/user-journeys/README.md`](../../../knowledge/user-journeys/README.md)
- [`../../../knowledge/principles/progressive-refinement.md`](../../../knowledge/principles/progressive-refinement.md)
- [`../../../knowledge/principles/single-authority.md`](../../../knowledge/principles/single-authority.md)
