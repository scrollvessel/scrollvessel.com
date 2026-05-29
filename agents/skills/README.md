# Skills 索引

`agents/skills/` 存放流程阶段能力单元。每个 skill 负责一个阶段，Orchestrator 只负责调度。

## 共享提示词字段

每个 skill 的提示词模板都应包含以下字段：

- 输入路径：本阶段需要读取的精确文件或目录。
- 产品/故事标识：例如 `mvp-001 / user-journey-001 / story-001`。
- 输出路径：本阶段要创建或更新的精确文件或目录。
- 约束：不要复制权威知识正文；使用相对链接；不要扩大 story 范围。

## 流程阶段

- [`wip-to-mvp.md`](wip-to-mvp.md)：草案收敛为 MVP。
- [`mvp-to-user-journey.md`](mvp-to-user-journey.md)：MVP 拆为用户旅程。
- [`user-journey-to-story.md`](user-journey-to-story.md)：用户旅程拆为 story，并初始化 story 工作区入口。
- [`story-to-ui.md`](story-to-ui.md)：判断 UI 适用性，必要时生成 story-specific UI 产物。
- [`story-to-tests.md`](story-to-tests.md)：生成验收、逻辑和 UI 可观察测试。
- [`story-to-plan.md`](story-to-plan.md)：生成可执行实现计划。
- [`implementation.md`](implementation.md)：按计划实现代码变更。
- [`qa-verification.md`](qa-verification.md)：验证并记录证据。
- [`code-review.md`](code-review.md)：审查、修复并复验阻塞问题。
- [`progress-update.md`](progress-update.md)：记录阶段切换、阻塞、偏离计划或交接状态。
- [`knowledge-capture.md`](knowledge-capture.md)：沉淀可复用知识。
