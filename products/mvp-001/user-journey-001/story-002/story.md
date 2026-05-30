# 故事 002：在分类页浏览文章列表

## 所属用户旅程

- [`../user-journey.md`](../user-journey.md)

## 所属 MVP

- [`../../mvp.md`](../../mvp.md)

## 用户故事

作为技术读者，我想在分类页先看到子分类入口，再浏览当前目录文章，以便按主题继续深入阅读。

## 当前状态

已拆分，待 UI、测试和计划分析。

## 范围

- 分类页展示当前分类标题和主题气质。
- 分类页先展示子分类入口，再展示当前目录文章。
- 文章列表支持 Grid/List 切换。
- 文章列表支持排序方向切换。
- Grid/List 视图偏好使用 localStorage 记住。

## 非范围

- 不实现 Atlas 航海星图本体。
- 不实现文章页正文渲染。
- 不实现全站文章集合页或站内搜索。

## 验收标准

- 用户进入分类页后能看到当前位置和子分类入口。
- 用户能看到当前目录文章列表。
- 用户能在 Grid/List 视图之间切换。
- 用户能切换排序方向。
- 刷新或重新进入分类页后，Grid/List 偏好仍被记住。

## 主要场景

- 用户从 Atlas 进入某个分类页。
- 用户先查看子分类，再浏览当前分类文章。
- 用户切换列表视图和排序方向后点击文章。

## 边界场景

- 暂无文章时显示空状态和可继续探索的子分类或返回 Atlas 的入口。
- localStorage 不可用时不阻塞基本浏览路径。

## 派生文件

- [`ui.md`](ui.md)
- [`tests.md`](tests.md)
- [`plans/plan.md`](plans/plan.md)
- [`plans/qa.md`](plans/qa.md)
- [`plans/review.md`](plans/review.md)
- [`plans/progress.md`](plans/progress.md)

## 知识引用

- [`../../../../knowledge/uis/scroll-vessel-experience.md`](../../../../knowledge/uis/scroll-vessel-experience.md)
- [`../../../../knowledge/qas/content-site-quality.md`](../../../../knowledge/qas/content-site-quality.md)
- [`../../../../knowledge/principles/single-authority.md`](../../../../knowledge/principles/single-authority.md)
- [`../../../../knowledge/principles/progressive-refinement.md`](../../../../knowledge/principles/progressive-refinement.md)
