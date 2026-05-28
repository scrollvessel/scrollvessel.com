# CLAUDE.md

本仓库使用知识工程工作流来管理一个前端 Vue 项目。

## 启动链路

开始工作前，必须遵循以下链路：

```text
hook
→ .claude/rules/must-read-claude.md
→ CLAUDE.md
→ knowledge/INDEX.md
→ agents/orchestrator.md
→ agents/skills/
```

`CLAUDE.md` 是启动索引。它只指向权威文件，不复制权威正文。

## 项目约束

- 本项目是纯前端项目。
- 原始草案只放在 `references/wips/`。
- 工作必须逐步细化：草案 → MVP → 用户旅程 → 故事 → UI/测试 → 计划 → 实现 → 验证 → 审查/进度更新。
- 使用单一权威模式：每条规则、提示词或知识对象都放在最合适的文件中，其他地方只引用它。

## 必读文件

1. [`knowledge/INDEX.md`](knowledge/INDEX.md)：知识地图。
2. [`knowledge/SOUL.md`](knowledge/SOUL.md)：价值观和方法论。
3. [`agents/orchestrator.md`](agents/orchestrator.md)：执行编排入口。

## 产品工作区

当前脚手架：

```text
products/mvp-001/
  mvp.md
  user-journey-001/
    user-journey.md
    story-001/
      story.md
      ui.md
      tests.md
      plans/
        plan.md
        qa.md
        review.md
        progress.md
```

## 验证要求

在声明实现完成前，必须执行 [`knowledge/qas/`](knowledge/qas/README.md) 中相关检查。涉及 UI 改动时，应尽量使用浏览器或 Playwright 验证核心路径。
