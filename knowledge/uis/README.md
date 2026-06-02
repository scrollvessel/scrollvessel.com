# UI 知识

本目录负责可复用的 UI 分析标准。

故事的 `ui.md` 应引用本目录，而不是复制 UI 标准。

## 当前知识

- [`scroll-vessel-experience.md`](scroll-vessel-experience.md)：Scroll Vessel 的首页、Atlas、分类页、文章页、404 页和导航体验标准。
- [`homepage-control-deck.html`](homepage-control-deck.html)：首页老旧羊皮纸书页 / 单色黄色航海图的可复用视觉概念稿，强调无显式边框的整屏纸张质感、默认两层分类海图、聚焦展开交互示意、编辑式文字层级和地图标注式文字入口。
- [`not-found-page.html`](not-found-page.html)：404 缺页页面可复用视觉概念稿，延续羊皮纸海图和编辑式目录层级，只保留“回到首页”单一出口。
- [`category-directory-page.html`](category-directory-page.html)：分类 / 子分类目录页可复用视觉概念稿，延续旧编辑部目录页质感，减少密集下划线，只在标题文字上保留轻量标注。
- [`atlas-nautical-map.md`](atlas-nautical-map.md)：Atlas 航海星图隐喻、信息结构、交互和可访问性规则。

## 当前标准

- 优先使用 Tailwind CSS 进行样式实现。
- 当边界职责清晰时，应组件化 UI。
- 面向用户的文案应遵循国际化最佳实践。
- 保持视图结构可读，避免把无关 model/state/logic 混入 template。
