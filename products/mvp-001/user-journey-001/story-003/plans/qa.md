# QA 记录

## 所属故事

- [`../story.md`](../story.md)

## 当前状态

文章阅读页最小可用路径已随页面闭环实现完成。

## 验证命令

- `pnpm test`：通过，3 个测试文件、20 个测试用例。
- `pnpm build`：通过，生成首页、12 个分类页和 8 个文章页。

## 浏览器 / Playwright 验证

- 文章页静态产物 `dist/engineering-practice/release-build/frontend-release-review.html` 存在。
- 文章页展示标题、描述、作者、创建 / 更新日期、所属分类、标签、字数、阅读分钟数和返回所属分类入口。
- 文章页返回分类链接指向 `/engineering-practice/release-build/index.html`。
- 生成产物未出现 `href="javascript:`，Markdown 链接协议受白名单限制。

## 结果

通过。文章阅读的最小闭环由 [`../../../user-journey-003/story-003/plans/qa.md`](../../../user-journey-003/story-003/plans/qa.md) 统一验证，本故事只记录对应覆盖状态。

## 知识引用

- [`../../../../../knowledge/qas/README.md`](../../../../../knowledge/qas/README.md)
