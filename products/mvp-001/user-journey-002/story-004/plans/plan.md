# 404 缺页页实施计划

## 目标

为不存在的站内路径展示符合 Scroll Vessel 视觉风格的 404 缺页页，并只提供“回到首页”一个主要出口。

## 架构

当前站点是纯前端静态内容站：首页由 Vue 应用渲染，文章页和分类页由构建脚本生成静态 HTML。404 使用 `public/404.html` 输出独立静态页；同时当开发/预览或托管服务器把未知路径回退到 `index.html` 时，Vue 入口只识别首页、文章页、分类页和 `/404.html`，其余路径重定向到 `/404.html`。

## 文件

- 创建：`public/404.html`，负责独立静态 404 页结构和缺页海图视觉。
- 修改：`src/App.vue`，当未知路径被回退到 Vue 入口时重定向到 `/404.html`。
- 修改：`src/homepage/homepage-model.ts`，暴露文章和分类 URL 给入口路径判断使用。
- 引用：`knowledge/uis/not-found-page.html`，404 可复用视觉概念稿。

## 步骤

1. 创建 `public/404.html`，实现标题、Route note、回首页链接和缺页海图。
2. 在 `src/homepage/homepage-model.ts` 暴露文章和分类 URL。
3. 在 `src/App.vue` 中建立合法路径集合；未知路径回退到 Vue 入口时，重定向到 `/404.html`。
4. 运行 `pnpm build`，确认内容校验和静态构建通过，且 `dist/404.html` 存在。
5. 在浏览器验证首页、合法文章页和未知路径。

## 验证

- `pnpm test`
- `pnpm build`
- 浏览器或 Playwright 检查不存在路径的 404 页面。

## 知识引用

- [`../../../../../knowledge/uis/scroll-vessel-experience.md`](../../../../../knowledge/uis/scroll-vessel-experience.md)
- [`../../../../../knowledge/uis/not-found-page.html`](../../../../../knowledge/uis/not-found-page.html)
- [`../tests.md`](../tests.md)
