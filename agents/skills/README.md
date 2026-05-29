# Skills 索引

`agents/skills/` 存放流程阶段能力单元。每个 skill 负责一个阶段，Orchestrator 只负责调度。

## 共享提示词字段

每个 skill 的提示词模板都应包含以下字段：

- 输入路径：本阶段需要读取的精确文件或目录。
- 产品/故事标识：例如 `mvp-001 / user-journey-001 / story-001`。
- 输出路径：本阶段要创建或更新的精确文件或目录。
- 约束：不要复制权威知识正文；使用相对链接；不要扩大 story 范围。

## 流程阶段

- [`wip-to-mvp.md`](wip-to-mvp.md)
- [`mvp-to-user-journey.md`](mvp-to-user-journey.md)
- [`user-journey-to-story.md`](user-journey-to-story.md)
- [`story-to-ui.md`](story-to-ui.md)
- [`story-to-tests.md`](story-to-tests.md)
- [`story-to-plan.md`](story-to-plan.md)
- [`implementation.md`](implementation.md)
- [`qa-verification.md`](qa-verification.md)
- [`code-review.md`](code-review.md)
- [`progress-update.md`](progress-update.md)
- [`knowledge-capture.md`](knowledge-capture.md)
