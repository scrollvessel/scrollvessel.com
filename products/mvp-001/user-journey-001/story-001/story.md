# 故事 001：通过 Atlas 航海星图探索分类

## 所属用户旅程

- [`../user-journey.md`](../user-journey.md)

## 所属 MVP

- [`../../mvp.md`](../../mvp.md)

## 用户故事

作为首次或回访的技术读者，我想通过 Atlas 航海星图理解 Scroll Vessel 的内容分类，以便选择一个主题并进入分类页继续探索。

## 当前状态

已拆分，待 UI、测试和计划分析。

## 范围

- 用户能从首页或导航进入 Atlas。
- Atlas 展示分类层级、文章数量和可点击分类节点。
- 航海星图隐喻引用可复用 UI 知识，不在本故事重复定义。
- 用户能通过节点进入对应分类页。
- 页面提供列表替代视图，保障键盘、屏幕阅读器和移动端可用性。

## 非范围

- 不实现分类页文章列表的 Grid/List 切换。
- 不实现文章页阅读体验。
- 不实现站内搜索或复杂知识图谱。

## 验收标准

- 用户打开 Atlas 后能理解这是分类地图，而不是普通文章列表。
- 用户能看到一级分类、子分类关系和文章数量。
- 用户能通过分类节点进入对应分类页。
- 键盘用户能访问分类入口并完成进入分类页的路径。
- 移动端或减少复杂视觉负担时有可用的列表替代视图。

## 主要场景

- 用户从首页点击 Atlas 入口，进入 Atlas 页面。
- 用户浏览航海星图节点，查看某个分类的文章数量和摘要。
- 用户选择一个分类节点，进入分类页。

## 边界场景

- 当分类没有文章但有子分类时，仍应提供进入子分类的路径。
- 当用户启用减少动态效果时，航线和节点动效应降级为静态状态变化。

## 派生文件

- [`ui.md`](ui.md)
- [`tests.md`](tests.md)
- [`plans/plan.md`](plans/plan.md)
- [`plans/qa.md`](plans/qa.md)
- [`plans/review.md`](plans/review.md)
- [`plans/progress.md`](plans/progress.md)

## 知识引用

- [`../../../../knowledge/uis/atlas-nautical-map.md`](../../../../knowledge/uis/atlas-nautical-map.md)
- [`../../../../knowledge/uis/scroll-vessel-experience.md`](../../../../knowledge/uis/scroll-vessel-experience.md)
- [`../../../../knowledge/qas/content-site-quality.md`](../../../../knowledge/qas/content-site-quality.md)
- [`../../../../knowledge/principles/single-authority.md`](../../../../knowledge/principles/single-authority.md)
- [`../../../../knowledge/principles/progressive-refinement.md`](../../../../knowledge/principles/progressive-refinement.md)
