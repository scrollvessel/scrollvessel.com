# 故事 002：文章页外链与分享

## 所属用户旅程

- [`../user-journey.md`](../user-journey.md)

## 所属 MVP

- [`../../mvp.md`](../../mvp.md)

## 用户故事

作为正在阅读文章的技术读者，我想查看同步发布外链并分享文章，以便在其他平台继续阅读或传播内容。

## 当前状态

已拆分，待 UI、测试和计划分析。

## 范围

- 文章页展示 externalLinks 中的同步发布外链。
- 文章页提供复制链接入口。
- 在支持的浏览器中提供原生分享入口。
- 提供 MVP 范围内的平台化分享入口。
- 分享和外链入口不干扰正文阅读。

## 非范围

- 不自动生成每篇文章动态 Open Graph 图。
- 不实现复杂平台同步状态。
- 不实现评论或互动层。

## 验收标准

- 用户能识别并打开同步发布外链。
- 用户能复制当前文章链接。
- 支持 Web Share API 时用户能调用原生分享。
- 不支持原生分享时仍有可用替代分享路径。

## 主要场景

- 用户阅读文章后复制链接。
- 用户通过原生分享发送文章。
- 用户打开微信公众号、知乎或其他同步平台外链。

## 边界场景

- 没有 externalLinks 的文章不显示空外链区域。
- 外链应清晰表达将离开本站。

## 派生文件

- [`ui.md`](ui.md)
- [`tests.md`](tests.md)
- [`plans/plan.md`](plans/plan.md)
- [`plans/qa.md`](plans/qa.md)
- [`plans/review.md`](plans/review.md)
- [`plans/progress.md`](plans/progress.md)

## 知识引用

- [`../../../../knowledge/domains/article-frontmatter.md`](../../../../knowledge/domains/article-frontmatter.md)
- [`../../../../knowledge/qas/content-site-quality.md`](../../../../knowledge/qas/content-site-quality.md)
- [`../../../../knowledge/uis/scroll-vessel-experience.md`](../../../../knowledge/uis/scroll-vessel-experience.md)
- [`../../../../knowledge/principles/single-authority.md`](../../../../knowledge/principles/single-authority.md)
- [`../../../../knowledge/principles/progressive-refinement.md`](../../../../knowledge/principles/progressive-refinement.md)
