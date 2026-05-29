# 故事到计划

## 触发条件

当 `story.md`、`ui.md` 和 `tests.md` 已准备好，需要生成可执行实现计划。`ui.md` 是 UI 适用性权威。

## 输入

- `story.md`。
- `tests.md`。
- `ui.md` 中的 UI 适用性状态；UI story 还需要相关 UI 产物。

## 输出

- `story-*/plans/plan.md`。

## 步骤

1. 汇总 story 范围、测试要求，以及 UI 产物状态。
2. 根据 `ui.md` 判断 UI 状态；若为非 UI story，在计划中引用 `ui.md` 的跳过原因。
3. 分析涉及的代码区域、数据、接口、组件和风险。
4. 将工作拆成有顺序的小任务，每个任务关联验收或测试点。
5. 标明不做事项、依赖、验证命令和回滚考虑。
6. 写入 `plans/plan.md`，作为实现阶段的任务入口。

## 权威知识引用

- [架构和建模标准](../../knowledge/architectures/README.md)
- [质量和验证标准](../../knowledge/qas/README.md)
- [逐步细化](../../knowledge/principles/progressive-refinement.md)
- [单一权威](../../knowledge/principles/single-authority.md)

## 完成标准

- `plan.md` 可直接指导实现，不需要重新解释 story。
- 每个任务都有目的、产物和验证方式。
- 计划与 `story.md`、`tests.md` 保持一致；若存在 UI 产物，也必须与 `ui.md` 保持一致。

## 提示词模板

```text
请基于以下输入生成实现计划：<输入路径：story.md、tests.md、ui.md 和 ui/ 产物（如适用）>。
产品/故事标识：<产品/故事标识，例如 mvp-001 / user-journey-001 / story-001>。
预期输出路径：<输出路径：plans/plan.md>。
计划需包含实现任务、顺序、依赖、风险、不做事项和验证命令。
约束：<约束：不要复制权威知识正文；使用相对链接；不要扩大 story 范围>。
```
