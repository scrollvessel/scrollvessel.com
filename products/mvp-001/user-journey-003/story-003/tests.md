# 测试分析

## 所属故事

- [`story.md`](story.md)

## 当前状态

已分析；本轮优先验证分类页、文章页和静态 URL 闭环。

## UI 状态引用

- [`ui.md`](ui.md)
- [`../../user-journey-001/story-002/story.md`](../../user-journey-001/story-002/story.md)
- [`../../user-journey-001/story-003/story.md`](../../user-journey-001/story-003/story.md)

## 验收场景

- 构建产物包含首页、分类目录页和文章详情页。
- 首页分类链接能进入对应 `/目录/index.html`。
- 分类页展示分类名、子分类入口和该分类下文章入口。
- 文章页展示标题、metadata、正文和返回所属分类路径。
- URL 由内容目录派生：文章以 `.html` 结尾，目录索引使用 `/目录/index.html`。

## 核心路径

1. 打开首页。
2. 点击一个分类入口进入分类页。
3. 在分类页点击文章进入文章页。
4. 从文章页返回所属分类。
5. 运行生产构建并确认 `dist/` 中存在分类页和文章页 HTML。

## 边界情况

- 分类无当前目录直属文章但有子分类时，应展示子分类入口和稳定空状态。
- 分类无子分类但有文章时，应仍能浏览文章。
- `meta.json` 缺失或非法时，内容校验应失败。
- 移动端页面不应出现横向溢出。

## 验证方式

- 构建验证：`pnpm build`
- 单元验证：`pnpm test`
- 产物验证：检查 `dist/**/index.html` 和 `dist/**/*.html`
- UI 验证：浏览器打开首页、分类页、文章页核心路径。

## 知识引用

- [`../../../../knowledge/qas/README.md`](../../../../knowledge/qas/README.md)
- [`../../../../knowledge/qas/content-site-quality.md`](../../../../knowledge/qas/content-site-quality.md)
- [`../../../../knowledge/architectures/static-markdown-content.md`](../../../../knowledge/architectures/static-markdown-content.md)
- [`../../../../knowledge/principles/single-authority.md`](../../../../knowledge/principles/single-authority.md)
