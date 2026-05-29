# Orchestrator

Orchestrator 是智能体执行编排入口。它承接 [`../CLAUDE.md`](../CLAUDE.md) 中定义的启动链路，并通过 `agents/skills/` 中的流程阶段 skill 推进工作。

## 职责

1. 识别当前输入处于哪个流程阶段。
2. 选择对应的 `agents/skills/*.md`。
3. 维护单一权威：引用知识文件，不复制知识正文。
4. 保持阶段产物写入 `products/`，可复用知识写入 `knowledge/`。

## 调度表

| 当前输入 | 下一步 | 使用 skill | 输出 |
|---|---|---|---|
| `references/wips/` 草案 | 提炼 MVP | [`skills/wip-to-mvp.md`](skills/wip-to-mvp.md) | `products/*/mvp.md` |
| `products/*/mvp.md` | 拆用户旅程 | [`skills/mvp-to-user-journey.md`](skills/mvp-to-user-journey.md) | `products/*/user-journey-*/user-journey.md` |
| `user-journey.md` | 拆故事 | [`skills/user-journey-to-story.md`](skills/user-journey-to-story.md) | `story-*/story.md` |
| `story.md` | 分析 UI | [`skills/story-to-ui.md`](skills/story-to-ui.md) | `story-*/ui.md` 和 `story-*/ui/` |
| `story.md` + UI 产物 | 分析测试 | [`skills/story-to-tests.md`](skills/story-to-tests.md) | `story-*/tests.md` |
| `story.md` + `ui.md` + `tests.md` | 生成计划 | [`skills/story-to-plan.md`](skills/story-to-plan.md) | `story-*/plans/plan.md` |
| `plans/plan.md` | 实现 | [`skills/implementation.md`](skills/implementation.md) | 代码变更和必要的 `plans/progress.md` 更新 |
| 实现完成 | 验证 | [`skills/qa-verification.md`](skills/qa-verification.md) | `plans/qa.md` |
| 实现完成或验证后 | 审查并修复 | [`skills/code-review.md`](skills/code-review.md) | `plans/review.md` 和必要修复 |
| 状态变化 | 更新进度 | [`skills/progress-update.md`](skills/progress-update.md) | `plans/progress.md` |
| 出现可复用知识 | 知识沉淀 | [`skills/knowledge-capture.md`](skills/knowledge-capture.md) | `knowledge/` 下合适文件 |

## 阶段说明

- UI story 先通过 `story-to-ui.md` 生成 UI 索引和产物，再进入测试和计划。
- 非 UI story 可跳过 UI 产物，但 `story-to-plan.md` 必须记录不需要 UI 产物的原因。
- `story-to-tests.md` 可在 `story.md` 后启动；若 UI 产物存在，应纳入测试分析。

## 回流规则

```text
QA 失败或 review 存在必须修复项
→ implementation.md 修复
→ qa-verification.md 复验受影响范围
→ code-review.md 复审受影响 diff
→ progress-update.md 更新状态
```

- `plans/qa.md` 是验证证据权威。
- `plans/review.md` 是审查发现、修复动作和复审结论权威。
- `plans/progress.md` 是任务状态和交接状态权威。
- 若 QA 或 review 仍阻塞，不进入交付结论，只更新 `plans/progress.md` 记录阻塞原因和下一步。

## 执行规则

- 不跳过用户明确要求的阶段。
- 不把 `knowledge/` 的权威正文复制到 skill 或 product 文件。
- 不把 story-specific 产物长期沉淀到 `knowledge/`，除非它已经成为可复用知识。
- UI 规则由 [`skills/story-to-ui.md`](skills/story-to-ui.md) 作为阶段权威；Orchestrator 只负责调度。
- `implementation.md` 使用 SDD 思路，并借鉴 OpenSpec 的 change/spec/tasks 纪律，但不引入独立 OpenSpec 权威系统。
- `code-review.md` 发现问题后必须进入修复和复验循环。
