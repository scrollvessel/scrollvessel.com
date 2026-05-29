# 进度更新

## 触发条件

当 story 状态发生变化，或需要向协作者说明当前执行状态。

## 输入

- 当前 story 下的 `story.md`、`ui.md`、`tests.md`、`plans/plan.md`。
- 已有 `plans/qa.md`、`plans/review.md`，若存在。
- 当前执行状态、阻塞和未完成事项。

## 输出

- `story-*/plans/progress.md`。

## 步骤

1. 汇总 story 当前阶段、已完成事项、进行中事项和未开始事项。
2. 对照 `plans/plan.md` 更新任务状态，不改变原计划权威含义。
3. 记录验证、审查、阻塞、风险和下一步。
4. 必须包含具体进度字段：日期、actor/agent、当前阶段、已完成、进行中、待处理、阻塞、下一步。
5. 写入或更新 `plans/progress.md`，保持简洁可读。

## 权威知识引用

- [逐步细化](../../knowledge/principles/progressive-refinement.md)
- [单一权威](../../knowledge/principles/single-authority.md)

## 完成标准

- `plans/progress.md` 能让下一位执行者快速接手。
- 状态与实际文件、验证和审查结果一致。
- 阻塞项有原因、影响和建议下一步。

## 提示词模板

```text
请基于以下输入更新进度：<输入路径：story.md、ui.md、tests.md、plans/plan.md、plans/qa.md、plans/review.md>。
产品/故事标识：<产品/故事标识，例如 mvp-001 / user-journey-001 / story-001>。
预期输出路径：<输出路径：plans/progress.md>。
必须包含字段：日期、actor/agent、当前阶段、已完成、进行中、待处理、阻塞、下一步。
约束：<约束：不要复制权威知识正文；使用相对链接；不要扩大 story 范围>。
```
