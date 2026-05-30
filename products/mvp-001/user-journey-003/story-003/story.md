# 故事 003：生成分类、路由、SEO 和订阅产物

## 所属用户旅程

- [`../user-journey.md`](../user-journey.md)

## 所属 MVP

- [`../../mvp.md`](../../mvp.md)

## 用户故事

作为 Scroll Vessel 作者，我想在生产构建时生成分类、路由、SEO 文件和 RSS，以便 dist 可以部署为完整静态站点。

## 当前状态

已拆分，待 UI、测试和计划分析。

## 范围

- 生成分类树和分类页所需数据。
- 生成首页、Atlas、分类页和文章页所需路由数据。
- 生成 sitemap.xml。
- 生成全文 rss.xml。
- 生产构建输出可部署 dist。

## 非范围

- 不实现后端、数据库或登录。
- 不实现全文搜索。
- 不生成每篇文章动态 Open Graph 图。

## 验收标准

- 生产构建能输出首页、Atlas、分类页和文章页。
- 分类数据能支持 Atlas 和分类页使用。
- sitemap.xml 包含关键静态页面和文章 URL。
- rss.xml 包含文章订阅内容。
- dist 可作为纯静态站点部署。

## 主要场景

- 作者运行生产构建，得到完整 dist。
- 新增文章后 sitemap 和 RSS 包含对应文章。
- 分类结构变化后 Atlas 和分类页数据同步更新。

## 边界场景

- 没有正式文章但有 demo 内容时，构建产物仍应明确 demo 状态。
- 构建失败时应给出可定位的原因。

## 派生文件

- [`ui.md`](ui.md)
- [`tests.md`](tests.md)
- [`plans/plan.md`](plans/plan.md)
- [`plans/qa.md`](plans/qa.md)
- [`plans/review.md`](plans/review.md)
- [`plans/progress.md`](plans/progress.md)

## 知识引用

- [`../../../../knowledge/architectures/static-markdown-content.md`](../../../../knowledge/architectures/static-markdown-content.md)
- [`../../../../knowledge/qas/content-site-quality.md`](../../../../knowledge/qas/content-site-quality.md)
- [`../../../../knowledge/uis/atlas-nautical-map.md`](../../../../knowledge/uis/atlas-nautical-map.md)
- [`../../../../knowledge/principles/single-authority.md`](../../../../knowledge/principles/single-authority.md)
- [`../../../../knowledge/principles/progressive-refinement.md`](../../../../knowledge/principles/progressive-refinement.md)
