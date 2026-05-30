# 故事 001：文章页独立建立可信度

## 所属用户旅程

- [`../user-journey.md`](../user-journey.md)

## 所属 MVP

- [`../../mvp.md`](../../mvp.md)

## 用户故事

作为从搜索结果、社交分享或外部平台进入的技术读者，我想直接判断文章是否可信和值得阅读，以便不依赖首页也能开始阅读。

## 当前状态

已拆分，待 UI、测试和计划分析。

## 范围

- 文章稳定 URL 可直接打开。
- 静态 HTML 直接呈现标题、关键 metadata 和正文。
- 作者、创建时间、更新时间、分类、标签、阅读时间和字数清晰可见。
- demo 文章必须明确标注 demo。
- 文章页 SEO 基础信息完整。

## 非范围

- 不实现分享按钮和同步发布外链。
- 不实现上一篇/下一篇继续阅读。
- 不实现评论、点赞或登录。

## 验收标准

- 用户直接打开文章 URL 后不需要先访问首页即可阅读。
- 用户能看到判断文章可信度所需的 metadata。
- demo 文章不会被误解为正式内容。
- 无脚本场景下核心正文仍可读。

## 主要场景

- 用户从搜索结果打开文章。
- 用户查看标题、作者、时间、分类和标签后继续阅读。
- 用户打开 demo 文章并看到 demo 标注。

## 边界场景

- 缺少关键 Front Matter 时应由内容校验报告。
- SEO 和无脚本可读性遵循内容站质量标准。

## 派生文件

- [`ui.md`](ui.md)
- [`tests.md`](tests.md)
- [`plans/plan.md`](plans/plan.md)
- [`plans/qa.md`](plans/qa.md)
- [`plans/review.md`](plans/review.md)
- [`plans/progress.md`](plans/progress.md)

## 知识引用

- [`../../../../knowledge/domains/article-frontmatter.md`](../../../../knowledge/domains/article-frontmatter.md)
- [`../../../../knowledge/qas/content-site-quality.md`](../../../../knowledge/qas/content-site-quality.md)
- [`../../../../knowledge/uis/scroll-vessel-experience.md`](../../../../knowledge/uis/scroll-vessel-experience.md)
- [`../../../../knowledge/principles/single-authority.md`](../../../../knowledge/principles/single-authority.md)
- [`../../../../knowledge/principles/progressive-refinement.md`](../../../../knowledge/principles/progressive-refinement.md)
