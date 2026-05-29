# QA 验证

## 触发条件

当实现完成，需要根据 `tests.md` 和 `plans/plan.md` 验证 story 是否可交付。

## 输入

- `tests.md`。
- `plans/plan.md`。
- 当前代码变更和必要运行环境。

## 输出

- `story-*/plans/qa.md`，包含验证结果和证据。

## 步骤

1. 读取 `tests.md` 的测试点、优先级和证据要求。
2. 对照 `plans/plan.md` 确认实现任务和验证命令。
3. 执行自动化测试、手工检查或其他必要验证。
4. 记录命令、结果、截图或日志摘要等证据。
5. 对失败项标注影响、复现方式和建议处理。
6. 若存在阻塞失败，标记 `FAIL`，触发 `implementation.md` 修复，不进入交付结论。
7. 若必须验证项通过，标记 `PASS` 并进入 `code-review.md`，由审查阶段确认代码质量和范围。
8. 写入 `plans/qa.md`，供审查和后续修复使用。

## 权威知识引用

- [质量和验证标准](../../knowledge/qas/README.md)
- [单一权威](../../knowledge/principles/single-authority.md)
- [逐步细化](../../knowledge/principles/progressive-refinement.md)

## 完成标准

- `plans/qa.md` 覆盖 `tests.md` 中必须验证的项目。
- 每项结论都有证据或明确未验证原因。
- PASS 结果会进入 `code-review.md`；FAIL 结果会回到 `implementation.md`。
- 失败项可被实现或审查阶段直接处理。

## 提示词模板

```text
请基于以下输入执行 QA 验证：<输入路径：tests.md、plans/plan.md、代码变更、运行说明>。
产品/故事标识：<产品/故事标识，例如 mvp-001 / user-journey-001 / story-001>。
预期输出路径：<输出路径：plans/qa.md>。
记录验证项、命令或步骤、结果、证据、失败影响和后续建议。
约束：<约束：不要复制权威知识正文；使用相对链接；不要扩大 story 范围>。
```
