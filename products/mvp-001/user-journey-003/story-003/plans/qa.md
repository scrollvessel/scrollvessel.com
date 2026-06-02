# QA 记录

## 所属故事

- [`../story.md`](../story.md)

## 当前状态

已完成页面闭环验证。

## 验证命令

- `pnpm test`：通过，3 个测试文件、20 个测试用例通过。
- `pnpm build`：通过，内容校验、Vite production build 和静态分类 / 文章页生成均成功。
- 静态生成结果：Generated 12 category page(s) and 8 article page(s)。

## 浏览器 / Playwright 验证

- 预览服务打开分类页 `http://127.0.0.1:4173/engineering-practice/index.html`：页面标题和主标题均为“工程实践”，分类页静态产物可访问。
- HTTP 响应验证文章页 `http://127.0.0.1:4173/engineering-practice/release-build/frontend-release-review.html`：`title` 和 `h1` 均为“从一次发布事故看前端发布审查”。
- HTTP 响应验证 `http://127.0.0.1:4173/ai-development/tooling/cli-tooling-notes.html`：`title` 和 `h1` 均为对应文章标题。
- 静态产物验证：`dist/demo/index.html` 不存在，`content/demo/` 占位目录不进入生产分类页。
- 文章页 metadata：生成产物展示 tags，并保留返回所属分类链接。
- 链接安全：生成产物未出现 `href="javascript:`，Markdown 链接协议受白名单限制。
- 下划线样式：生成产物不再使用全局密集链接下划线，只在列表标题文本上保留轻量标注。

## 结果

通过。首页链接指向的分类页和文章页已经由生产构建输出，页面闭环可用。

## 知识引用

- [`../../../../../knowledge/qas/README.md`](../../../../../knowledge/qas/README.md)
- [`../../../../../knowledge/qas/content-site-quality.md`](../../../../../knowledge/qas/content-site-quality.md)
