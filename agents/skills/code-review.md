# 代码审查

## 触发条件

当实现已有 diff，或 QA 后需要确认代码质量和 story 完成度。

## 输入

- 当前 diff。
- `story.md`、`ui.md`、`tests.md`、`plans/plan.md`；非 UI story 以 `ui.md` 的跳过说明为准。
- `plans/qa.md`，若已存在。

## 输出

- `story-*/plans/review.md`。
- 必要的代码或文档修复。

## 步骤

1. 审查 diff 是否满足 story、UI、测试和计划要求。
2. 检查正确性、范围控制、可维护性、安全性、可访问性和回归风险。
3. 将发现写入 `plans/review.md`，区分必须修复、建议修复和无需处理。
4. 对必须修复项执行修复，不只记录问题。
5. 修复后重新运行相关验证，并重新审查受影响 diff。
6. 循环执行“review → fix → re-verify/re-review → update review.md”，直到无阻塞问题或明确记录阻塞原因。
7. `plans/review.md` 记录审查发现、修复和结论，并链接或摘要 QA 证据；`plans/qa.md` 仍是验证证据权威，避免把 QA 证据复制成第二权威。

## 权威知识引用

- [质量和验证标准](../../knowledge/qas/README.md)
- [架构和建模标准](../../knowledge/architectures/README.md)
- [单一权威](../../knowledge/principles/single-authority.md)

## 完成标准

- `plans/review.md` 记录审查结论、问题、修复和复验结果，并链接或摘要 `plans/qa.md` 的证据。
- 所有必须修复项已修复并复验，或有清晰 BLOCKED 原因。
- diff 未超出 story 范围，且可进入交付或下一轮处理。

## 提示词模板

```text
请基于以下输入执行代码审查：<输入路径：diff、story.md、ui.md、tests.md、plans/plan.md、plans/qa.md>。
产品/故事标识：<产品/故事标识，例如 mvp-001 / user-journey-001 / story-001>。
预期输出路径：<输出路径：plans/review.md；必要时修复代码或文档>。
发现必须修复项后立即修复、复验、复审；review.md 只链接或摘要 QA 证据，plans/qa.md 是验证证据权威。
约束：<约束：不要复制权威知识正文；使用相对链接；不要扩大 story 范围>。
```
