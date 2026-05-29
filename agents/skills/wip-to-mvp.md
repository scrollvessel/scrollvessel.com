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
2. 提炼 MVP 的核心价值、范围、非目标和成功信号。
3. 合并重复想法，标记不确定问题和待验证假设。
4. 初步列出关键用户旅程，保留到后续拆分。
5. 写入 `products/mvp-xxx/mvp.md`，保持可被下一阶段直接使用。

## 权威知识引用

- [逐步细化](../../knowledge/principles/progressive-refinement.md)
- [单一权威](../../knowledge/principles/single-authority.md)
- [知识索引](../../knowledge/INDEX.md)

## 完成标准

- `mvp.md` 明确目标、范围、非目标、目标用户、关键旅程和待验证问题。
- MVP 可被拆成用户旅程，不依赖原始 WIP 才能理解。
- 没有复制长篇知识规则，只保留相对链接。

## 提示词模板

```text
请基于以下输入提炼一个 MVP：<输入路径：references/wips/ 草案、相关 knowledge 链接>。
产品/故事标识：<产品/故事标识，例如 mvp-001 / user-journey-001 / story-001>。
预期输出路径：<输出路径：products/mvp-xxx/mvp.md>。
输出包含目标、用户、范围、非目标、关键用户旅程、假设和待确认问题。
约束：<约束：不要复制权威知识正文；使用相对链接；不要扩大 story 范围>。
```
