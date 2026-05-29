# 故事到测试

## 触发条件

当已有 `story.md` 和 `ui.md` 中的 UI 适用性状态，需要生成验收、逻辑测试和适用的 UI 可观察检查。

## 输入

- `story.md`。
- `ui.md` 中的 UI 适用性状态，以及适用的 `ui/` 产物。
- 上游 MVP、用户旅程和知识链接。

## 输出

- `story-*/tests.md`。

## 步骤

1. 从 `story.md` 提取验收标准、场景、边界和非范围。
2. 先生成不依赖 UI 产物的验收、逻辑、边界和回归测试。
3. 根据 `ui.md` 的 UI 适用性状态判断是否需要 UI 检查；若是 UI story，再从 `ui/` 产物提取可观察交互、状态和视觉验证点。
4. 若 `ui.md` 标记为非 UI story，在 `tests.md` 引用该跳过原因，避免后续阶段等待不存在的 UI 产物。
5. 标注测试优先级、执行方式、前置数据和预期证据。
6. 写入 `tests.md`，供计划和 QA 阶段引用。

## 权威知识引用

- [质量和验证标准](../../knowledge/qas/README.md)
- [UI 知识](../../knowledge/uis/README.md)
- [单一权威](../../knowledge/principles/single-authority.md)

## 完成标准

- `tests.md` 覆盖 story 验收标准；UI story 还覆盖关键 UI 状态，非 UI story 记录 UI 跳过说明。
- 每个测试点有明确预期结果和证据要求。
- 测试范围不超出 story 的范围。

## 提示词模板

```text
请基于以下输入生成 tests.md：<输入路径：story.md、ui.md、适用的 ui/ 产物、上游链接>。
产品/故事标识：<产品/故事标识，例如 mvp-001 / user-journey-001 / story-001>。
预期输出路径：<输出路径：tests.md>。
包含测试场景、优先级、步骤、预期结果、证据要求和不测试范围。
约束：<约束：不要复制权威知识正文；使用相对链接；不要扩大 story 范围>。
```
