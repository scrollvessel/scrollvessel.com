# QA 知识

本目录负责质量、验证链路和验收标准。

`knowledge/qas/` 按测试视角组织可复用 QA 链路，不按 story 维度拆分。故事的 `tests.md` 只引用相关 QA 链路并声明覆盖节点；故事的 `plans/qa.md` 记录实施后的具体验证证据和结果。

## QA 链路

- [`chains/content-source-chain.md`](chains/content-source-chain.md)：Markdown 内容源扫描、Front Matter 校验、分类上下文和内容索引入口的验收链路。

## 当前知识

- [`content-site-quality.md`](content-site-quality.md)：静态内容站的内容构建、SEO、可访问性和性能质量标准。

## 当前标准

- 声明实现完成前，必须运行 `pnpm build`。
- 涉及 UI 改动时，应尽量使用浏览器或 Playwright 验证核心路径。
- 故事级验证结果记录到 `products/.../story-*/plans/qa.md`。
