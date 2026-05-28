# Orchestrator

Orchestrator 是智能体执行编排入口。它承接 [`../CLAUDE.md`](../CLAUDE.md) 中定义的启动链路，并在未来使用 `agents/skills/` 中的能力单元。

## 职责

1. 阅读 [`../knowledge/INDEX.md`](../knowledge/INDEX.md) 和相关产品文件。
2. 维护单一权威：引用知识文件，不复制知识正文。
3. 按以下顺序推进工作：

```text
references/wips/
→ products/*/mvp.md
→ products/*/user-journey-*/user-journey.md
→ products/*/user-journey-*/story-*/story.md
→ story ui.md + tests.md
→ story plans/plan.md
→ 实现
→ plans/qa.md
→ plans/review.md
→ plans/progress.md
→ 如果出现可复用知识，则更新 knowledge/
```

## Skill 边界

`agents/skills/` 用来存放可复用能力单元。在具体 skill 工作流设计完成前，只保留 `.gitkeep`。

未来每个 skill 应定义：

- 触发条件
- 输入
- 输出
- 权威知识引用
- 完成标准

不要把宽泛项目规则放进 skill。权威规则应放在 `knowledge/` 下，并由 skill 引用。
