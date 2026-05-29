# 用户旅程到故事

## 触发条件

当已有 `user-journey.md`，需要选择其中一段转成一个可实现 story。

## 输入

- `products/*/user-journey-*/user-journey.md`。
- 相关 MVP 和知识链接。

## 输出

- `products/*/user-journey-*/story-*/story.md`。
- 同一 story 下的初始派生文件：`ui.md`、`tests.md`、`plans/plan.md`、`plans/qa.md`、`plans/review.md`、`plans/progress.md`。
- UI story 的 `ui/` 目录；暂无产物时保留 `.gitkeep`。

## 步骤

1. 读取用户旅程，选择一个连续、可交付、可验证的切片。
2. 明确 story 的用户价值、前置条件、范围和非范围。
3. 写出验收标准、主要场景、边界场景和依赖。
4. 保留与上游 MVP、用户旅程、知识文件的相对链接。
5. 写入 `story.md`，供 UI、测试和计划阶段使用。
6. 初始化 `ui.md`、`tests.md` 和 `plans/` 下的计划、QA、审查、进度文件，使后续阶段有固定入口。
7. 在 `story.md` 的派生文件索引中链接这些入口，不复制下游文件正文。

## 权威知识引用

- [逐步细化](../../knowledge/principles/progressive-refinement.md)
- [单一权威](../../knowledge/principles/single-authority.md)
- [知识索引](../../knowledge/INDEX.md)

## 完成标准

- `story.md` 只表达一个可实现 story。
- 验收标准可被测试阶段直接转为测试点。
- `ui.md`、`tests.md` 和 `plans/` 初始文件已存在，后续阶段可直接接续。
- 范围足够小，能进入 UI、测试、计划阶段。

## 提示词模板

```text
请基于以下输入拆出一个可实现 story：<输入路径：user-journey.md、MVP 链接、knowledge 链接>。
产品/故事标识：<产品/故事标识，例如 mvp-001 / user-journey-001 / story-001>。
预期输出路径：<输出路径：story.md、ui.md、tests.md、plans/plan.md、plans/qa.md、plans/review.md、plans/progress.md、ui/.gitkeep>。
story.md 输出包含用户价值、范围、非范围、验收标准、场景、边界和依赖链接；其他文件只初始化阶段入口和相对链接，具体分析由后续 skill 填充。
约束：<约束：不要复制权威知识正文；使用相对链接；不要扩大 story 范围>。
```
