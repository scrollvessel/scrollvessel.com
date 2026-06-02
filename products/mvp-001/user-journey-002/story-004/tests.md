# 测试分析

## 所属故事

- [`story.md`](story.md)

## 当前状态

已分析。

## UI 状态引用

- [`ui.md`](ui.md)

## 验收场景

- 访问不存在路径时，页面展示 404 缺页主标题“这页没有收进海图”。
- 合法首页、文章页和分类页路径不展示 404。
- 404 页只提供“回到首页”一个主要行动入口。
- 点击“回到首页”能导航到 `/`。

## 核心路径

1. 在开发或预览环境访问不存在路径。
2. 确认页面渲染缺页提示和 404 标识。
3. 点击“回到首页”。
4. 确认回到首页。

## 边界情况

- 404 页面不依赖内容扫描数据。
- 移动端布局不遮挡主标题和回首页入口。

## 验证方式

- 构建验证：`pnpm build`
- 单元测试：`pnpm test`
- UI 验证：浏览器或 Playwright 访问不存在路径并检查回首页入口。

## 知识引用

- [`../../../../knowledge/qas/README.md`](../../../../knowledge/qas/README.md)
- [`../../../../knowledge/qas/content-site-quality.md`](../../../../knowledge/qas/content-site-quality.md)
- [`../../../../knowledge/uis/scroll-vessel-experience.md`](../../../../knowledge/uis/scroll-vessel-experience.md)
- [`../../../../knowledge/principles/single-authority.md`](../../../../knowledge/principles/single-authority.md)
