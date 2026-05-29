# 用户旅程 001：从首页探索到文章

## 所属 MVP

- [`../mvp.md`](../mvp.md)

## 用户

首次或回访的技术读者。

## 用户意图

用户从首页进入 Scroll Vessel，希望快速理解这个站点的内容气质，并通过 Atlas 或分类页找到一篇值得阅读的工程实践或技术概念文章。

## 起点

用户打开站点首页。

## 终点

用户进入一篇文章页，并能开始阅读正文。

## 旅程步骤

1. 用户进入首页，看到“卷书成船 / Scroll Vessel”作为权威实践分享平台的定位。
2. 用户通过首页的精选文章、最新文章或 Atlas 入口理解可探索的内容方向。
3. 用户进入 Atlas 分类地图页。
4. 用户在 Atlas 中看到分类层级和文章数量，并选择一个分类。
5. 用户进入分类页，先看到子分类入口，再看到当前目录文章列表。
6. 用户在 Grid/List 视图之间切换，必要时调整排序方向。
7. 用户点击文章卡片进入文章页。
8. 用户在文章页看到标题、作者、创建时间、更新时间、分类、标签、阅读时间、字数和正文。

## 异常和边界

- 若分类暂无文章，分类页应仍能展示子分类或空状态引导。
- 封面图、分享图和减少动态效果遵循 [`../../../knowledge/qas/content-site-quality.md`](../../../knowledge/qas/content-site-quality.md)。

## 成功标准

- 用户能从首页经由 Atlas 和分类页进入文章。
- 首页、Atlas、分类页和文章页体验符合 [`../../../knowledge/uis/scroll-vessel-experience.md`](../../../knowledge/uis/scroll-vessel-experience.md)。
- Grid/List 偏好能被记住。

## 后续 story 候选

- 首页权威实践入口。
- Atlas 分类地图。
- 分类页浏览与列表切换。
- 文章页基础阅读体验。

## 知识引用

- [`../../../knowledge/domains/scroll-vessel.md`](../../../knowledge/domains/scroll-vessel.md)
- [`../../../knowledge/uis/scroll-vessel-experience.md`](../../../knowledge/uis/scroll-vessel-experience.md)
- [`../../../knowledge/qas/content-site-quality.md`](../../../knowledge/qas/content-site-quality.md)
- [`../../../knowledge/user-journeys/README.md`](../../../knowledge/user-journeys/README.md)
- [`../../../knowledge/principles/progressive-refinement.md`](../../../knowledge/principles/progressive-refinement.md)
- [`../../../knowledge/principles/single-authority.md`](../../../knowledge/principles/single-authority.md)
