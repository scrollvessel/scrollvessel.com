# 故事 003：进入文章页基础阅读

## 所属用户旅程

- [`../user-journey.md`](../user-journey.md)

## 所属 MVP

- [`../../mvp.md`](../../mvp.md)

## 用户故事

作为技术读者，我想从分类页进入文章并开始阅读正文，以便获取具体工程实践或技术概念内容。

## 当前状态

已拆分，待 UI、测试和计划分析。

## 范围

- 用户能从分类页文章卡片进入文章页。
- 文章页展示标题、作者、创建时间、更新时间、分类、标签、阅读时间、字数和正文。
- 文章页提供返回所属分类的路径。
- Markdown 正文具备基础可读性。

## 非范围

- 不处理搜索引擎直接进入文章的独立可信度强化。
- 不处理同步发布外链和分享入口。
- 不处理上一篇/下一篇继续阅读。

## 验收标准

- 用户点击文章卡片后进入稳定文章 URL。
- 文章页 metadata 信息完整可见。
- 用户能开始阅读 Markdown 正文。
- 用户能从文章页回到所属分类。

## 主要场景

- 用户在分类页点击文章卡片。
- 用户阅读文章标题、metadata 和正文。
- 用户通过分类返回入口回到分类页。

## 边界场景

- metadata 缺失时应由内容校验阶段阻止或报告，不在文章页静默吞掉。
- 长正文应保持可读行宽和标题层级。

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
- [`../../../../knowledge/domains/article-frontmatter.md`](../../../../knowledge/domains/article-frontmatter.md)
- [`../../../../knowledge/principles/single-authority.md`](../../../../knowledge/principles/single-authority.md)
- [`../../../../knowledge/principles/progressive-refinement.md`](../../../../knowledge/principles/progressive-refinement.md)
