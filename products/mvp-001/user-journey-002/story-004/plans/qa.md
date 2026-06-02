# QA 验证记录

## 所属计划

- [`plan.md`](plan.md)

## 当前状态

已验证。

## 验证项

- `pnpm test`
- `pnpm build && test -f dist/404.html`
- 生产预览验证首页、合法文章路径、未知路径回退和 `404.html`。

## 结果

- `pnpm test`：通过。Vitest 报告 3 个测试文件、20 个测试全部通过。
- `pnpm build && test -f dist/404.html`：通过。内容校验通过，Vite 构建成功，生成 12 个分类页和 8 个文章页，且 `dist/404.html` 存在。
- 合法文章路径 HTTP 验证：`http://127.0.0.1:4176/knowledge-engineering/single-authority/single-authority-workflow.html` 返回文章页 HTML，包含标题“单一权威原则如何减少产品文档漂移”，不包含 404 标题。
- 未知路径 HTTP 验证：`http://127.0.0.1:4176/missing-route-for-404-check` 返回 Vue 首页壳，浏览器执行入口脚本后重定向到 `/404.html`。
- 未知路径浏览器验证：访问 `http://127.0.0.1:4176/missing-route-for-404-check` 后，运行时 `location.pathname` 为 `/404.html`，页面标题为“这页没有收进海图。”。
- 404 页面验证：`http://127.0.0.1:4176/404.html` 显示标题“这页没有收进海图。”，只提供“回到首页”入口，并在 Route note 中显示缺页说明。

## 说明

当前静态站同时依赖两层 404 机制：

1. `public/404.html` 作为托管平台可直接使用的静态 404 页面。
2. 当预览或托管服务器把未知路径回退到 `index.html` 时，Vue 入口用内容索引识别合法首页、文章页、分类页和 `/404.html`，其余路径重定向到 `/404.html`。

`vite.config.js` 使用 `base: '/'`，确保未知深路径回退到 `index.html` 时仍能从根路径加载 JS/CSS；否则客户端重定向脚本无法执行。
