# 测试分析

## 所属故事

- [`story.md`](story.md)

## 当前状态

已分析。

## UI 状态引用

- [`ui.md`](ui.md)

## 覆盖范围

本测试分析覆盖首页入口故事的验收标准；可复用质量标准引用 `knowledge/qas/`，不在本文件复制正文。

## 验收场景

| 优先级 | 场景 | 预期结果 | 证据 |
|---|---|---|---|
| P0 | 打开首页 | 首页呈现 Scroll Vessel 的站点身份、内容范围和继续探索路径 | 浏览器或 Playwright 截图 / 断言 |
| P0 | 查看主要入口 | 首页可找到精选文章、最新文章和 Atlas 入口 | 浏览器或 Playwright 截图 / 断言 |
| P0 | 键盘访问主要入口 | Tab 顺序能到达首页主要入口，入口有可见焦点 | 浏览器或 Playwright 记录 |
| P1 | 数据不足状态 | 精选或文章数据不足时，首页不崩溃并保留可用探索路径 | 测试数据或人工验证记录 |
| P1 | 移动端访问 | 首页核心信息和主要入口在移动端可读、可点击 | 浏览器或 Playwright 截图 |

## 核心路径

1. 用户打开首页。
2. 用户理解站点定位。
3. 用户选择 Atlas、精选文章、最新文章或主题方向入口继续探索。

## 边界情况

- 没有精选文章时，首页仍提供最新文章或 Atlas 入口。
- 没有文章数据时，首页仍保留站点定位和可用探索入口。
- 减少动态效果时，首页核心信息和入口仍可理解。

## 不测试范围

- Atlas 分类地图页本体。
- 分类页 Grid/List 切换和排序。
- 文章页正文渲染。
- 内容扫描、Markdown 转换或路由生成管线。
- 站内搜索或复杂知识图谱。

## 验证方式

- 构建验证：`pnpm build`。
- UI 验证：浏览器或 Playwright 覆盖首页核心路径、键盘访问和移动端布局。
- 质量标准：引用 [`../../../../knowledge/qas/content-site-quality.md`](../../../../knowledge/qas/content-site-quality.md)。

## 知识引用

- [`../../../../knowledge/qas/README.md`](../../../../knowledge/qas/README.md)
- [`../../../../knowledge/qas/content-site-quality.md`](../../../../knowledge/qas/content-site-quality.md)
- [`../../../../knowledge/uis/scroll-vessel-experience.md`](../../../../knowledge/uis/scroll-vessel-experience.md)
- [`../../../../knowledge/principles/single-authority.md`](../../../../knowledge/principles/single-authority.md)
