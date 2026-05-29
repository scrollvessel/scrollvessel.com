# WIP 到 MVP

## 触发条件

当输入来自 `references/wips/`，需要把零散草案收敛为一个可推进的 MVP。

## 输入

- `references/wips/` 下的草案、访谈、想法或截图说明。
- 已存在的相关 `knowledge/` 链接。

## 输出

- `products/mvp-xxx/mvp.md`。
- 必要时只补充引用链接，不复制知识正文。

## 步骤

1. 通读 WIP，识别产品目标、目标用户、使用场景和约束。
2. 按 [`../../knowledge/principles/single-authority.md`](../../knowledge/principles/single-authority.md) 判断内容权威归属。
3. 先把可复用领域、架构、UI、QA 或流程知识沉淀到 `knowledge/` 的合适文件，并更新索引。
4. 提炼 MVP 的核心价值、范围、非目标和成功信号。
5. 合并重复想法，标记不确定问题和待验证假设。
6. 初步列出关键用户旅程，保留到后续拆分。
7. 写入 `products/mvp-xxx/mvp.md`，只保留产品实例决策和知识引用，保持可被下一阶段直接使用。

## 权威知识引用

- [逐步细化](../../knowledge/principles/progressive-refinement.md)
- [单一权威](../../knowledge/principles/single-authority.md)：写入 products 前必须先判断可复用知识是否应进入 `knowledge/`。
- [知识索引](../../knowledge/INDEX.md)

## 完成标准

- `mvp.md` 明确目标、范围、非目标、目标用户、关键旅程和待验证问题。
- MVP 可被拆成用户旅程，不依赖原始 WIP 才能理解。
- 可复用知识已写入 `knowledge/` 的合适权威文件，并通过索引可发现。
- `mvp.md` 没有复制 `knowledge/` 权威正文，只保留相对链接和产品实例决策。

## 提示词模板

```text
请基于以下输入提炼一个 MVP：<输入路径：references/wips/ 草案、相关 knowledge 链接>。
产品/故事标识：<产品/故事标识，例如 mvp-001 / user-journey-001 / story-001>。
预期输出路径：<输出路径：products/mvp-xxx/mvp.md>。
输出包含目标、用户、范围、非目标、关键用户旅程、假设和待确认问题。
约束：<约束：不要复制权威知识正文；使用相对链接；不要扩大 story 范围>。
```
