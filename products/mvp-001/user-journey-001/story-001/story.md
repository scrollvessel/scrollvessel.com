# 故事 001：首页权威实践入口

## 所属用户旅程

- [`../user-journey.md`](../user-journey.md)

## 所属 MVP

- [`../../mvp.md`](../../mvp.md)

## 用户故事

作为首次或回访的技术读者，我想从首页快速理解 Scroll Vessel 的内容定位和探索路径，以便通过精选文章、最新文章或 Atlas 入口继续找到值得阅读的工程实践或技术概念内容。

## 当前状态

已改写，待计划分析和实现。

## 范围

- 首页呈现 Scroll Vessel 的站点身份、内容范围和长期维护意图。
- 首页提供精选文章入口。
- 首页提供最新文章入口。
- 首页提供 Atlas 分类地图入口。
- 首页提供主题方向或顶层分类入口，用于导向后续分类探索路径。

## 非范围

- 不实现 Atlas 分类地图页本体。
- 不实现分类页文章列表的 Grid/List 切换。
- 不实现文章页阅读体验。
- 不实现内容扫描、Markdown 转换或路由生成管线。
- 不实现站内搜索或复杂知识图谱。

## 验收标准

- 用户打开首页后能理解这是 Scroll Vessel 的权威实践入口，而不是普通个人宣言式博客。
- 用户能从首页找到精选文章、最新文章和 Atlas 入口。
- 用户能通过首页进入继续探索内容的路径。
- 键盘用户能访问首页主要入口。
- 当文章或精选数据不足时，首页仍提供稳定可理解的状态和可用探索路径。

## 主要场景

- 用户打开首页，理解站点定位和内容范围。
- 用户从首页选择 Atlas 入口，准备进入分类地图。
- 用户从首页选择精选或最新文章入口，准备进入具体内容。
- 用户从首页选择主题方向或顶层分类入口，准备进入分类页。

## 边界场景

- 当没有精选文章时，首页仍展示最新文章或 Atlas 入口。
- 当没有文章数据时，首页不崩溃，并保留站点定位和 Atlas 或主题探索入口。
- 当用户启用减少动态效果时，首页核心信息和入口仍可理解。

## 派生文件

- [`ui.md`](ui.md)
- [`tests.md`](tests.md)
- [`plans/plan.md`](plans/plan.md)
- [`plans/qa.md`](plans/qa.md)
- [`plans/review.md`](plans/review.md)
- [`plans/progress.md`](plans/progress.md)

## 知识引用

- [`../../../../knowledge/domains/scroll-vessel.md`](../../../../knowledge/domains/scroll-vessel.md)
- [`../../../../knowledge/uis/scroll-vessel-experience.md`](../../../../knowledge/uis/scroll-vessel-experience.md)
- [`../../../../knowledge/qas/content-site-quality.md`](../../../../knowledge/qas/content-site-quality.md)
- [`../../../../knowledge/principles/single-authority.md`](../../../../knowledge/principles/single-authority.md)
- [`../../../../knowledge/principles/progressive-refinement.md`](../../../../knowledge/principles/progressive-refinement.md)
