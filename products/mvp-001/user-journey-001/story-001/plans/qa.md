# QA 记录

## 所属故事

- [`../story.md`](../story.md)

## 当前状态

已完成。

## 验证命令

- `pnpm validate:content`：通过，Validated 9 article(s)。
- `pnpm test`：通过，2 个测试文件、19 个测试用例通过。
- `pnpm build`：通过，内容校验和 Vite production build 均成功。
- 分类元数据、组件化和审查修复后复验：`pnpm test` 和 `pnpm build` 均通过。

## 浏览器 / Playwright 验证

- 桌面端：通过 Chrome 打开 `http://127.0.0.1:5173/`，首页首屏呈现站点身份、标题、三条主要入口和分类海图。
- 移动端：通过 390 × 844 视口验证首页可读，无横向溢出；分类元数据和组件化修复后复验 `documentElement.scrollWidth === clientWidth`。
- 键盘入口：页面主要入口为可聚焦链接或按钮，并保留 `:focus-visible` 样式。
- 链接目标：审查后修复分类、聚焦示意、精选文章和最新文章锚点，并复验 `atlas-route`、`featured-route`、`latest-route`、`directions`、`focused-route`、`featured-article-1`、`latest-article-1` 均存在；分类和文章链接按内容目录派生并以 `.html` 结尾。
- 减少动态效果：审查后补充 `prefers-reduced-motion: reduce` 样式，关闭平滑滚动并约束动画/过渡时长。

## 结果

通过。首页入口实现满足当前 Story 001 的构建、内容校验和核心 UI 验证要求。

## 知识引用

- [`../../../../../knowledge/qas/README.md`](../../../../../knowledge/qas/README.md)
