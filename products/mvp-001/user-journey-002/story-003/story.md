# 故事 003：文章页继续阅读路径

## 所属用户旅程

- [`../user-journey.md`](../user-journey.md)

## 所属 MVP

- [`../../mvp.md`](../../mvp.md)

## 用户故事

作为从外部进入文章的技术读者，我想从文章页继续探索相关内容，以便理解 Scroll Vessel 的内容体系。

## 当前状态

已拆分，待 UI、测试和计划分析。

## 范围

- 文章页提供返回所属分类的路径。
- 文章页提供上一篇/下一篇入口。
- 文章页表达当前位置或上下文路径。
- 继续阅读入口不喧宾夺主。

## 非范围

- 不实现站内搜索。
- 不实现推荐算法。
- 不实现复杂知识图谱或双向链接。

## 验收标准

- 用户能从文章页进入所属分类。
- 用户能访问上一篇或下一篇文章。
- 用户能理解当前文章和内容体系的关系。

## 主要场景

- 用户读完文章后进入所属分类。
- 用户通过上一篇/下一篇继续阅读。
- 用户通过上下文路径理解文章所在主题。

## 边界场景

- 首篇或末篇文章缺少上一篇/下一篇时，应只展示存在的方向。
- 所属分类不存在时应由内容构建阶段报告错误。

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
