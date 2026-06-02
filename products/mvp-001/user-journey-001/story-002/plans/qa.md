# QA 记录

## 所属故事

- [`../story.md`](../story.md)

## 当前状态

分类目录页最小可用路径已随页面闭环实现完成。

## 验证命令

- `pnpm test`：通过，3 个测试文件、20 个测试用例。
- `pnpm build`：通过，生成首页、12 个分类页和 8 个文章页。

## 浏览器 / Playwright 验证

- 分类页静态产物 `dist/engineering-practice/index.html` 存在，主标题来自 `content/engineering-practice/meta.json` 的“工程实践”。
- 子分类页静态产物 `dist/engineering-practice/release-build/index.html` 存在。
- `dist/demo/index.html` 未生成，`content/demo/` 占位目录不进入生产分类页。

## 结果

通过。分类浏览的最小闭环由 [`../../../user-journey-003/story-003/plans/qa.md`](../../../user-journey-003/story-003/plans/qa.md) 统一验证，本故事只记录对应覆盖状态。

## 知识引用

- [`../../../../../knowledge/qas/README.md`](../../../../../knowledge/qas/README.md)
