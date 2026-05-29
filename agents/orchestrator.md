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
| `user-journey.md` | 拆故事并初始化 story 工作区 | [`skills/user-journey-to-story.md`](skills/user-journey-to-story.md) | `story-*/story.md`、`ui.md`、`tests.md`、`plans/` 初始文件 |
| `story.md` | 分析 UI | [`skills/story-to-ui.md`](skills/story-to-ui.md) | `story-*/ui.md` 和 `story-*/ui/` |
| `story.md` + UI 状态 | 分析测试 | [`skills/story-to-tests.md`](skills/story-to-tests.md) | `story-*/tests.md` |
| `story.md` + `ui.md` + `tests.md` | 生成计划 | [`skills/story-to-plan.md`](skills/story-to-plan.md) | `story-*/plans/plan.md` |
| `plans/plan.md` | 实现 | [`skills/implementation.md`](skills/implementation.md) | 代码变更和必要的 `plans/progress.md` 更新 |
| 实现完成 | 验证 | [`skills/qa-verification.md`](skills/qa-verification.md) | `plans/qa.md` |
| 实现完成或验证后 | 审查并修复 | [`skills/code-review.md`](skills/code-review.md) | `plans/review.md` 和必要修复 |
| 状态变化 | 更新进度 | [`skills/progress-update.md`](skills/progress-update.md) | `plans/progress.md` |
| 出现可复用知识 | 知识沉淀 | [`skills/knowledge-capture.md`](skills/knowledge-capture.md) | `knowledge/` 下合适文件 |

## 就绪门槛

| 阶段 | 最小输入 | 必要输出 | 跳过条件 |
|---|---|---|---|
| 任意写入 | 待写入内容 | 权威归属判断；必要时先更新 `knowledge/` | 不跳过 |
| MVP | `references/wips/` | `mvp.md` | 用户明确指定已有 MVP |
| 用户旅程 | `mvp.md` | `user-journey.md` | 用户明确只处理已有旅程 |
| 故事 | `user-journey.md` | `story.md`、`ui.md`、`tests.md`、`plans/` 初始文件 | 用户明确只处理已有 story；若缺少派生入口，先补齐 story 工作区 |
| UI | `story.md` | `ui.md`；UI story 还需要必要 `ui/` 产物 | 不跳过；非 UI story 在 `ui.md` 记录跳过原因 |
| 测试 | `story.md`；`ui.md` 中的 UI 适用性状态 | `tests.md` | 不跳过 |
| 计划 | `story.md`、`tests.md`、UI 状态 | `plans/plan.md` | 不跳过 |
| 实现 | `plans/plan.md` | 代码变更 | 不跳过 |
| QA | 代码变更、`tests.md` | `plans/qa.md` | 不跳过 |
| Review | diff、`plans/qa.md` | `plans/review.md` | 不跳过 |
| Progress | 阶段切换、阻塞、偏离计划或交接 | `plans/progress.md` | routine 日志不写 |

## 阶段说明

- `user-journey-to-story.md` 创建 story 工作区入口；后续 UI、测试、计划、QA、审查和进度阶段更新这些入口，不再临时发明新位置。
- UI story 先通过 `story-to-ui.md` 生成 UI 索引和产物，再进入 UI 相关测试和计划。
- `ui.md` 是 UI 适用性和 UI 产物索引的单一权威；非 UI story 也要在 `ui.md` 记录跳过原因。
- `story-to-tests.md` 可在 `story.md` 后先生成验收和逻辑测试；若 UI 产物存在，再补充 UI 可观察检查。

## 回流规则

```text
QA 失败或 review 存在必须修复项
→ 判断是否需要修正 story/ui/tests/plan
→ 若规格或计划错误，回到对应 skill 修正
→ implementation.md 修复
→ qa-verification.md 复验受影响范围
→ code-review.md 复审受影响 diff
→ progress-update.md 更新状态
```

- `story.md` 是故事权威，`ui.md` 是 UI 适用性和 UI 产物索引权威，`tests.md` 是测试规格权威。
- `plans/plan.md` 是静态实施计划权威。
- `plans/qa.md` 是验证证据权威。
- `plans/review.md` 是审查发现、修复动作和复审结论权威。
- `plans/progress.md` 是任务状态和交接状态权威。
- 若 QA 或 review 仍阻塞，不进入交付结论，只更新 `plans/progress.md` 记录阻塞原因和下一步。

## 执行规则

- 不跳过用户明确要求的阶段。
- 执行任何写入前，先按 [`../knowledge/principles/single-authority.md`](../knowledge/principles/single-authority.md) 判断内容权威归属。
- 能放进 `knowledge/` 的可复用知识，必须先沉淀到 `knowledge/`；`products/`、skills 和其他文件只引用，不复制正文。
- 若外部工具或通用 skill 给出默认产物路径，必须让位于本仓库调度表和 [`../knowledge/principles/single-authority.md`](../knowledge/principles/single-authority.md)。
- 不把 story-specific 产物长期沉淀到 `knowledge/`，除非它已经成为可复用知识。
- UI 规则由 [`skills/story-to-ui.md`](skills/story-to-ui.md) 作为阶段权威；Orchestrator 只负责调度。
- `implementation.md` 使用 SDD 思路，并借鉴 OpenSpec 的 change/spec/tasks 纪律，但不引入独立 OpenSpec 权威系统。
- `code-review.md` 发现问题后必须进入修复和复验循环。
