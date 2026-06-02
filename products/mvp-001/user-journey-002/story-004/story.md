# 故事 004：失效地址进入 404 缺页页

## 所属用户旅程

- [`../user-journey.md`](../user-journey.md)

## 所属 MVP

- [`../../mvp.md`](../../mvp.md)

## 用户故事

作为从搜索结果、社交分享或外部链接进入 Scroll Vessel 的技术读者，我想在地址不存在时看到清晰的缺页提示并回到首页，以便重新进入站点内容体系。

## 当前状态

已实现并完成验证。

## 范围

- 为不存在的站内路径展示 404 缺页页。
- 404 页延续 Scroll Vessel 羊皮纸海图视觉风格。
- 404 页只提供“回到首页”一个主要出口。

## 非范围

- 不提供 Atlas 分流入口。
- 不实现站内搜索。
- 不实现推荐文章或自动纠错。

## 验收标准

- 访问不存在路径时展示 404 缺页内容。
- 合法首页、文章页和分类页路径不进入 404。
- 页面使用“这页没有收进海图”作为主标题，并在 Route note 中说明地址不存在。
- 用户能通过唯一主要入口回到首页。
- 页面体验符合 [`../../../../knowledge/uis/scroll-vessel-experience.md`](../../../../knowledge/uis/scroll-vessel-experience.md) 的 404 页要求。

## 主要场景

- 用户访问不存在的站内 URL。
- 用户阅读缺页提示后点击“回到首页”。

## 边界场景

- 404 页不依赖文章数据、分类数据或外部服务。
- 404 页在移动端仍保持可读，并保留回首页入口。

## 派生文件

- [`ui.md`](ui.md)
- [`tests.md`](tests.md)
- [`plans/plan.md`](plans/plan.md)
- [`plans/qa.md`](plans/qa.md)
- [`plans/review.md`](plans/review.md)
- [`plans/progress.md`](plans/progress.md)

## 知识引用

- [`../../../../knowledge/uis/scroll-vessel-experience.md`](../../../../knowledge/uis/scroll-vessel-experience.md)
- [`../../../../knowledge/uis/not-found-page.html`](../../../../knowledge/uis/not-found-page.html)
- [`../../../../knowledge/qas/content-site-quality.md`](../../../../knowledge/qas/content-site-quality.md)
- [`../../../../knowledge/principles/single-authority.md`](../../../../knowledge/principles/single-authority.md)
- [`../../../../knowledge/principles/progressive-refinement.md`](../../../../knowledge/principles/progressive-refinement.md)
