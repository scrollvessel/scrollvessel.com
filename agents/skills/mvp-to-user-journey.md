# MVP 到用户旅程

## 触发条件

当已有 `products/*/mvp.md`，需要把 MVP 拆成可独立理解的用户路径。

## 输入

- `products/*/mvp.md`。
- MVP 中引用的相关知识文件。

## 输出

- `products/*/user-journey-*/user-journey.md`。

## 步骤

1. 读取 MVP 的目标、范围、非目标和关键旅程。
2. 按用户目标或连续行为路径拆分用户旅程。
3. 为每条旅程描述用户、起点、终点、步骤、异常和成功标准。
4. 标记依赖、风险和需要后续故事解决的问题。
5. 写入对应 `user-journey.md`，避免把多个独立旅程混在一起。

## 权威知识引用

- [用户旅程知识](../../knowledge/user-journeys/README.md)
- [逐步细化](../../knowledge/principles/progressive-refinement.md)
- [单一权威](../../knowledge/principles/single-authority.md)

## 完成标准

- 每个 `user-journey.md` 代表一条清晰用户路径。
- 能从旅程继续拆出一个或多个可实现 story。
- 与 `mvp.md` 的范围一致，未新增未经说明的产品目标。

## 提示词模板

```text
请基于以下输入拆分用户旅程：<输入路径：mvp.md、被引用的 knowledge 文件>。
产品/故事标识：<产品/故事标识，例如 mvp-001 / user-journey-001 / story-001>。
预期输出路径：<输出路径：products/*/user-journey-*/user-journey.md>。
每条旅程包含用户、目标、路径步骤、异常、成功标准和后续 story 候选。
约束：<约束：不要复制权威知识正文；使用相对链接；不要扩大 story 范围>。
```
