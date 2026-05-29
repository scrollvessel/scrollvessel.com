# 故事到 UI

## 触发条件

当已有 `story.md`，且 story 涉及界面、交互、信息架构或视觉表达。

## 输入

- `story.md`。
- 上游 `mvp.md`、`user-journey.md` 链接。
- 现有 UI 规范或界面知识链接。

## 输出

- `story-*/ui.md` 作为 UI 索引。
- `story-*/ui/` 下的 story-specific UI 产物。

## 步骤

1. 直接使用 `ui-ux-pro-max` skill 进行 UI/UX 分析和产物生成。
2. 接受 `ui-ux-pro-max` 的原生产物形态，包括线框、流程、组件说明、视觉建议或其他交付物。
3. 将本 story 专属 UI 产物存放在该 story 的 `ui/` 目录。
4. 用 `ui.md` 建立索引，说明每个 UI 产物的路径、类型、状态、用途、关联验收标准和是否可复用。
5. 如果 `ui-ux-pro-max` 产出可复用 UI 规则或模式，通过 `knowledge-capture` 抽取到 `knowledge/uis/`；story-specific 产物仍留在本 story 的 `ui/` 目录。

## 权威知识引用

- [UI 知识](../../knowledge/uis/README.md)
- [单一权威](../../knowledge/principles/single-authority.md)
- [逐步细化](../../knowledge/principles/progressive-refinement.md)

## UI 适用性字段

`ui.md` 必须先记录 UI 适用性：

- 是否 UI story
- 若跳过 UI，跳过原因
- `ui-ux-pro-max` 的输入摘要或产物来源

## UI 索引字段

`ui.md` 的产物索引至少记录：

- 产物路径
- 产物类型
- 状态
- 用途
- 关联验收标准
- 是否可复用

## 完成标准

- 已明确使用 `ui-ux-pro-max`。
- `ui.md` 能索引所有 story-specific UI 产物。
- UI 产物与 `story.md` 的验收标准对齐。
- 没有把一次性 UI 决策误放进 `knowledge/`。

## 提示词模板

```text
请基于以下输入使用 ui-ux-pro-max 完成 UI/UX 分析：<输入路径：story.md、上游 MVP/Journey 链接、UI 知识链接>。
产品/故事标识：<产品/故事标识，例如 mvp-001 / user-journey-001 / story-001>。
预期输出路径：<输出路径：ui.md、ui/ 产物；可复用知识只能通过 knowledge-capture 进入 knowledge/uis/>。
约束：<约束：不要复制权威知识正文；使用相对链接；不要扩大 story 范围>。
```
