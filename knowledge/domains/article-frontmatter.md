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
cover?: string
externalLinks?: Array<{
  platform?: string
  label?: string
  url?: string
}>
```

## 字段规则

- `tags` 表示主题标签，也可轻量表达内容性质；不要为 MVP 级内容状态另建独立机制。
- `featured: true` 表示文章可进入首页精选候选。
- `draft: true` 表示文章只在开发环境可见，生产环境不发布。
- `cover` 可作为列表页图片和分享预览图。
- `externalLinks` 表示同一文章同步发布到外部平台的链接，例如微信公众号、知乎等。
- `externalLinks` 不强制校验完整字段；渲染时展示可用字段。

## 结构化数据

Front Matter 只维护内容事实。Article JSON-LD、Open Graph 和其他结构化数据由构建层根据内容事实生成。
