# 故事 002：生成文章数据与 Markdown 渲染数据

## 所属用户旅程

- [`../user-journey.md`](../user-journey.md)

## 所属 MVP

- [`../../mvp.md`](../../mvp.md)

## 用户故事

作为 Scroll Vessel 作者，我想让系统把 Markdown 转成文章页面所需数据，以便文章正文、目录和阅读信息可以被静态页面使用。

## 当前状态

已拆分，待 UI、测试和计划分析。

## 范围

- 将 Markdown 正文渲染为页面可用内容。
- 生成标题锚点和 TOC 数据。
- 生成阅读时间和字数。
- 支持代码块高亮所需数据或渲染。
- 支持文章同目录图片、公共图片和远程图片引用。

## 非范围

- 不负责扫描和 Front Matter 校验。
- 不负责分类树、路由、sitemap 或 RSS。
- 不支持 MDX 或 Markdown 内嵌组件。

## 验收标准

- 合法文章能生成正文渲染结果。
- 标题能生成稳定锚点和 TOC 数据。
- 阅读时间和字数可用于文章页 metadata。
- 代码块和图片在 MVP 范围内可正确呈现。

## 主要场景

- 作者写含标题和代码块的 Markdown，系统生成正文和 TOC。
- 作者引用同目录图片，构建结果能正确定位资源。
- 文章页读取生成数据展示阅读时间和字数。

## 边界场景

- 不支持的 Markdown 能力应保持可预期降级或在质量标准中说明。
- 图片路径错误应在构建或验证中暴露。

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
- [`../../../../knowledge/principles/single-authority.md`](../../../../knowledge/principles/single-authority.md)
- [`../../../../knowledge/principles/progressive-refinement.md`](../../../../knowledge/principles/progressive-refinement.md)
