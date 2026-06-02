# 文章 Front Matter

## 必填字段

```yaml
title: string
description: string
createdAt: YYYY-MM-DD
updatedAt: YYYY-MM-DD
author: string
lang: string
```

缺少必填字段时，构建必须失败。

## 可选字段

```yaml
tags?: string[]
featured?: boolean
draft?: boolean
demo?: boolean
cover?: string
externalLinks?: Array<{
  platform?: string
  label?: string
  url?: string
}>
```

## 字段规则

- `tags` 表示主题标签，也可轻量表达内容性质；不要为 MVP 级内容状态另建独立机制。`tags` 出现时必须是字符串数组，数组项必须是非空字符串。
- `featured: true` 表示文章可进入首页精选候选。
- `draft: true` 表示文章只在开发环境可见，生产环境不发布。
- `demo: true` 表示文章是用于 UI、内容结构或构建链路验证的演示内容，不代表正式发布内容。
- `cover` 可作为列表页图片和分享预览图。
- `externalLinks` 表示同一文章同步发布到外部平台的链接，例如微信公众号、知乎等。
- `externalLinks` 不强制校验完整字段；渲染时展示可用字段。

## 目录元数据

分类目录的展示事实维护在同级 `meta.json`：

```json
{
  "categoryName": "分类展示名"
}
```

- `categoryName` 是分类展示名的单一权威，首页、分类页和导航不得在页面代码中硬编码分类名称。
- 访问路径仍由目录和文件名派生，文章 URL 以 `.html` 结束，目录索引使用 `/目录/index.html`。

## 结构化数据

Front Matter 只维护内容事实。Article JSON-LD、Open Graph 和其他结构化数据由构建层根据内容事实生成。
