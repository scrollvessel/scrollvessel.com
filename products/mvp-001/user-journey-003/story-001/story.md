# 故事 001：扫描内容树并校验 Front Matter

## 所属用户旅程

- [`../user-journey.md`](../user-journey.md)

## 所属 MVP

- [`../../mvp.md`](../../mvp.md)

## 用户故事

作为 Scroll Vessel 作者，我想让系统扫描 content 目录并校验文章 Front Matter，以便在构建前发现内容结构问题。

## 当前状态

已拆分，待 UI、测试和计划分析。

## 范围

- 扫描 content/ 下的 Markdown 文件。
- 按内容架构识别文章路径、资源路径和分类结构。
- 校验 Front Matter 必填字段、类型和语义规则。
- 识别 demo、draft、分类、标签和 externalLinks。
- 输出清晰、可定位的错误信息。

## 非范围

- 不渲染 Markdown 正文。
- 不生成 TOC、阅读时间或字数。
- 不生成 sitemap、RSS 或最终 dist。

## 验收标准

- 有效 Markdown 文件能被扫描并转为内容源记录。
- Front Matter 不合规时构建或开发流程给出明确错误。
- demo、draft、分类、标签和 externalLinks 规则被校验。
- 错误信息能定位到具体文件和字段。

## 主要场景

- 作者新增一篇合法 Markdown，系统识别为文章。
- 作者遗漏必填 Front Matter，系统报告错误。
- 作者配置 externalLinks，系统校验结构。

## 边界场景

- 空 content 目录应给出可理解状态。
- 草稿和 demo 的处理规则必须符合内容架构和领域规则。

## 派生文件

- [`ui.md`](ui.md)
- [`tests.md`](tests.md)
- [`plans/plan.md`](plans/plan.md)
- [`plans/qa.md`](plans/qa.md)
- [`plans/review.md`](plans/review.md)
- [`plans/progress.md`](plans/progress.md)

## 知识引用

- [`../../../../knowledge/architectures/static-markdown-content.md`](../../../../knowledge/architectures/static-markdown-content.md)
- [`../../../../knowledge/domains/article-frontmatter.md`](../../../../knowledge/domains/article-frontmatter.md)
- [`../../../../knowledge/qas/content-site-quality.md`](../../../../knowledge/qas/content-site-quality.md)
- [`../../../../knowledge/principles/single-authority.md`](../../../../knowledge/principles/single-authority.md)
- [`../../../../knowledge/principles/progressive-refinement.md`](../../../../knowledge/principles/progressive-refinement.md)
