# 进度记录

## 所属故事

- [`../story.md`](../story.md)

## 当前状态

- 状态：实现完成，字体系统调整已复验
- 最近更新：2026-06-03 将字体系统调整为 [`knowledge/uis/scroll-vessel-experience.md`](../../../../../knowledge/uis/scroll-vessel-experience.md) 定义的混合编辑部风格。

## 运行状态

记录开发、构建、预览、浏览器验证等运行状态。

## 变更记录

- 更新 [`plan.md`](plan.md)，明确首页 Vue/Tailwind 实现步骤、demo 内容策略、空状态、可访问性和验证方式。
- 在 `content/` 下新增覆盖首页分类海图、精选文章和最新文章的 demo Markdown 内容，全部标注 `demo: true`。
- 更新 `knowledge/domains/article-frontmatter.md`，补充 `demo?: boolean` 字段规则。
- 替换 `src/App.vue` 初始 hello 页面，实现首页入口、两层分类海图、聚焦展开示意、精选文章、最新文章和主题方向。
- 更新 `src/style.css`，实现羊皮纸书页背景、淡墨海图节点和旧杂志目录 / 编辑选刊样式。
- 修复实现审查发现的问题：补齐页面内锚点落点、抽出内容记录纯函数供扫描层和首页复用、补充 reduced-motion 规则、修正 Tailwind `calc()` 宽度表达。
- 更新字体实施计划和代码：按 [`knowledge/uis/scroll-vessel-experience.md`](../../../../../knowledge/uis/scroll-vessel-experience.md) 的字体系统标准，将代码中的 `ArchivoLetters` 改为真实 `Archivo` 字体族，并移除 Archivo 专用字符过滤。
- 验证：`pnpm generate:fonts`、`pnpm test`、`pnpm build` 通过；本地浏览器预览确认 body/display/heading 的 computed font-family 符合预期。

## 下一步

进入实现审查，更新 [`review.md`](review.md) 后再提交实现变更。
