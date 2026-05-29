# 实现

## 触发条件

当 `plans/plan.md` 已存在，需要按计划修改代码并推进 story。

## 输入

- `plans/plan.md`。
- 同一 story 下的 `story.md`、`tests.md`。
- UI story 需要 `ui.md`；非 UI story 需要计划中的 UI 跳过说明。
- 相关知识链接和现有代码。

## 输出

- 代码变更。
- 必要时更新 `plans/progress.md`。
- 必要时记录实现发现，供 QA、审查或知识沉淀使用。

## 步骤

1. 以 SDD（Spec-Driven Development）思维执行：先把 `story.md`、`tests.md`、`plans/plan.md` 以及适用的 `ui.md` 作为实现前规格理解清楚，再做最小可验证变更。
2. 借鉴 OpenSpec-style 的 change/spec/tasks 纪律：明确变更意图（change）、规格约束（spec）和任务状态（tasks），但放入现有权威文件，不创建新权威系统。
3. 不引入独立 OpenSpec 权威系统；`story.md`、`ui.md`、`tests.md` 和 `plans/plan.md` 是本 story 的规格和计划权威，`plans/progress.md` 是任务状态权威。
4. 按 `plans/plan.md` 顺序实现，避免扩大范围。
5. 只在阶段切换、阻塞、偏离计划或需要交接时更新 `plans/progress.md`，避免把进度文件变成噪音日志。
6. 保留可审查 diff，避免把临时调试、无关重构或未请求文件混入。

## 权威知识引用

- [架构和建模标准](../../knowledge/architectures/README.md)
- [质量和验证标准](../../knowledge/qas/README.md)
- [单一权威](../../knowledge/principles/single-authority.md)
- [逐步细化](../../knowledge/principles/progressive-refinement.md)

## 完成标准

- 代码变更满足 `story.md`、`tests.md`、`plans/plan.md`，以及适用的 `ui.md`。
- 已运行计划要求的验证，或在 `plans/progress.md` 记录未运行原因。
- 未引入独立规格权威，未超出 story 范围。

## 提示词模板

```text
请基于以下输入执行实现：<输入路径：story.md、ui.md、tests.md、plans/plan.md>。
产品/故事标识：<产品/故事标识，例如 mvp-001 / user-journey-001 / story-001>。
预期输出路径：<输出路径：代码文件；必要时更新 plans/progress.md>。
使用 SDD（以 story/ui/tests/plan 作为实现前规格）和 OpenSpec-style change/spec/tasks 纪律；规格和计划归原文件，任务状态归 plans/progress.md，不引入独立 OpenSpec 权威系统。
约束：<约束：不要复制权威知识正文；使用相对链接；不要扩大 story 范围>。
```
