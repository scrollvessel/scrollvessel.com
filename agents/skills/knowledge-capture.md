# 知识沉淀

## 触发条件

当执行中出现可复用学习、规则、模式或决策，需要从 story-specific 内容沉淀到 `knowledge/`。

每次 review 和 progress 更新后，都应显式判断一次是否需要知识沉淀；如果不需要，在当前 story 的 `plans/progress.md` 记录“无需沉淀”的原因。

## 输入

- 可复用学习或决策。
- 来源 story、QA、审查、实现记录或讨论。
- 现有 `knowledge/` 索引和相关知识文件。

## 输出

- `knowledge/` 下合适位置的新增或更新内容。
- 必要时更新对应目录 `README.md` 或 `knowledge/INDEX.md` 的链接。

## 步骤

1. 判断内容是否可复用；一次性 story 细节不进入 `knowledge/`。
2. 查找是否已有权威知识文件，优先更新现有权威。
3. 按领域选择位置：原则、用户旅程、领域、UI、QA 或架构。
4. 用简洁规则、示例或决策记录表达知识，保留来源链接。
5. 更新索引，使新知识可发现。
6. 在原 story 文件中只保留相对链接，不复制长规则。

## 权威知识引用

- [知识对象](../../knowledge/principles/knowledge-object.md)
- [单一权威](../../knowledge/principles/single-authority.md)
- [知识索引](../../knowledge/INDEX.md)

## 完成标准

- 新知识有唯一权威位置，并可通过索引找到。
- story-specific 内容没有被误沉淀。
- 相关产品文件通过相对链接引用知识权威。

## 提示词模板

```text
请判断以下学习是否应沉淀为 knowledge/ 中的可复用知识：<输入路径：来源 story、QA、review、实现记录、现有 knowledge 文件>。
产品/故事标识：<产品/故事标识，例如 mvp-001 / user-journey-001 / story-001>。
预期输出路径：<输出路径：目标 knowledge 文件；必要时更新 README.md 或 knowledge/INDEX.md>。
若应沉淀，选择合适权威文件，新增或更新内容，并更新索引；原 story 只保留相对链接。
约束：<约束：不要复制权威知识正文；使用相对链接；不要扩大 story 范围>。
```
