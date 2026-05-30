# 测试分析

## 所属故事

- [`story.md`](story.md)

## 当前状态

已分析，待生成实施计划。

## UI 状态引用

- [`ui.md`](ui.md)：本故事为非 UI story，不需要 UI 产物或浏览器交互验证。

## 引用 QA 链路

- [`../../../../knowledge/qas/chains/content-source-chain.md`](../../../../knowledge/qas/chains/content-source-chain.md)

## 本故事覆盖节点

覆盖 [`../../../../knowledge/qas/chains/content-source-chain.md`](../../../../knowledge/qas/chains/content-source-chain.md) 中的以下节点：

- 01. 内容目录存在
- 02. Markdown 文件被发现
- 03. 路径映射稳定 URL
- 04. Front Matter 被解析
- 05. 必填字段校验
- 06. 字段类型校验
- 07. 语义规则校验
- 08. 内容事实归一
- 09. 分类上下文生成
- 10. 错误报告可定位
- 11. 内容源记录进入内容索引

## 本故事不覆盖

- Markdown 正文渲染、代码高亮、标题锚点和 TOC：属于后续文章数据故事。
- 文章页、分类页、Atlas、RSS、sitemap 或最终 `dist/` 输出：属于后续路由和产物故事。
- UI 视觉、浏览器交互或 Playwright 流程：本故事为非 UI story。

## 验证方式

- 单元测试：按引用 QA 链路覆盖本故事节点。
- 构建验证：后续实施后使用 `pnpm build` 验证内容校验能接入构建流程。
- UI 验证：不适用。

## 知识引用

- [`../../../../knowledge/qas/chains/content-source-chain.md`](../../../../knowledge/qas/chains/content-source-chain.md)
- [`../../../../knowledge/architectures/static-markdown-content.md`](../../../../knowledge/architectures/static-markdown-content.md)
- [`../../../../knowledge/domains/article-frontmatter.md`](../../../../knowledge/domains/article-frontmatter.md)
- [`../../../../knowledge/qas/content-site-quality.md`](../../../../knowledge/qas/content-site-quality.md)
- [`../../../../knowledge/qas/README.md`](../../../../knowledge/qas/README.md)
- [`../../../../knowledge/principles/single-authority.md`](../../../../knowledge/principles/single-authority.md)
