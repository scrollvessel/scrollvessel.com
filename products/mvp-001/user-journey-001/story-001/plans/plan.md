# 实施计划

## 所属故事

- [`../story.md`](../story.md)

## 输入

- [`../ui.md`](../ui.md)
- [`../tests.md`](../tests.md)

## 当前状态

已分析，待实现。

## 实现范围

本计划实现 Story 001 的首页入口：将 `knowledge/uis/homepage-control-deck.html` 的首页羊皮纸海图概念落到 Vue/Tailwind 页面中，并用 `content/` 下的演示文章填充分类、精选文章和最新文章效果。

不实现 Atlas 分类页本体、文章详情页正文渲染、站内搜索或复杂知识图谱。

## 数据准备

1. 在 `content/` 下生成覆盖首页视觉需要的演示 Markdown 内容。
2. 演示内容按分类目录组织，用目录层级驱动首页分类海图的当前两层结构。
3. 每篇演示文章 front matter 必须包含：
   - `demo: true`
   - `title`
   - `description`
   - `createdAt`
   - `updatedAt`
   - `author`
   - `lang`
   - `tags`
   - 可选 `featured: true`
4. 演示内容只用于验证 UI 信息密度和内容结构效果；正式内容机制仍遵循 `knowledge/domains/article-frontmatter.md`。

建议 demo 分类结构：

```text
content/
  engineering-practice/
    release-build/
    quality-gates/
  frontend-architecture/
    vue-engineering/
    static-sites/
  knowledge-engineering/
    indexes/
    single-authority/
  ai-development/
    agents/
    tooling/
```

## 实现步骤

1. 内容数据层
   - 使用现有 `src/content/scan-content.ts` 读取 `content/`。
   - 在首页实现中从扫描结果派生：分类树、精选文章、最新文章。
   - 精选文章来自 `featured: true`。
   - 最新文章按 `updatedAt` 或 `createdAt` 倒序截取。
   - demo 内容必须保留 `demo: true` 字段供后续过滤或标识。

2. 首页结构
   - 替换 `src/App.vue` 当前 hello 页面。
   - 保持单页首页入口，不新增路由。
   - 页面分区：顶部导航、首页标题区、大幅分类海图、杂志式三列列表、主题方向说明。

3. 分类海图
   - 默认展示当前两层分类：顶层分类 + 子分类。
   - 使用静态方式表达“点击子类后聚焦并展开下一层”的设计意图；实现阶段不要求完整动画系统。
   - 交互入口保持可点击、可聚焦，不能只依赖 hover。
   - 减少动态效果时核心信息仍可理解。

4. 杂志式列表
   - 下方三列分别为：按分类航行、精选文章、最新文章。
   - 视觉遵循旧杂志目录 / 编辑选刊风格：栏目编号、细分隔线、编辑式标题层级、低 UI chrome。
   - 数据不足时：
     - 没有精选文章则显示稳定空状态，并保留分类和最新入口。
     - 没有文章时仍显示站点定位、分类入口和空状态。

5. 样式实现
   - 优先使用 Tailwind CSS。
   - 必要时在 `src/style.css` 定义少量全局纸张纹理、字体族和可复用基础层。
   - 不引入现代按钮、厚边框卡片、玻璃拟态、多色霓虹或棕色外框装饰。
   - 保持移动端无横向滚动，主要入口点击区域不小于 44px。

6. 可访问性
   - 使用语义 HTML：`main`、`nav`、`section`、`article`、标题层级顺序清晰。
   - 主要入口支持键盘访问并有可见焦点。
   - 海图信息不能只通过视觉线条传达；下方分类目录作为文本替代。
   - 所有锚点链接有明确文本，不使用图标-only 入口。

7. 验证
   - 运行 `pnpm build`。
   - 运行 `pnpm test`。
   - 浏览器或 Playwright 验证首页核心路径：
     - 打开首页能理解站点身份和内容范围。
     - 能找到按分类、精选文章、最新文章入口。
     - 键盘 Tab 能到达主要入口且焦点可见。
     - 移动端核心信息可读、可点击、无横向滚动。

## 实施顺序

1. 生成 demo Markdown 内容并确保 `pnpm build` 内容校验通过。
2. 实现首页数据派生逻辑。
3. 替换 `src/App.vue` 首页结构。
4. 调整 `src/style.css` / Tailwind 样式以贴近概念稿。
5. 运行构建、测试和浏览器验证。
6. 更新 `plans/qa.md` 与 `plans/progress.md`。

## 完成标准

- 实现满足 `story.md` 的验收标准。
- UI 符合 `ui.md` 的分析。
- 验证覆盖 `tests.md` 的核心场景。

## 知识引用

- [`../../../../../knowledge/architectures/README.md`](../../../../../knowledge/architectures/README.md)
- [`../../../../../knowledge/uis/README.md`](../../../../../knowledge/uis/README.md)
- [`../../../../../knowledge/uis/scroll-vessel-experience.md`](../../../../../knowledge/uis/scroll-vessel-experience.md)
- [`../../../../../knowledge/uis/homepage-control-deck.html`](../../../../../knowledge/uis/homepage-control-deck.html)
- [`../../../../../knowledge/domains/article-frontmatter.md`](../../../../../knowledge/domains/article-frontmatter.md)
- [`../../../../../knowledge/qas/README.md`](../../../../../knowledge/qas/README.md)
- [`../../../../../knowledge/qas/content-site-quality.md`](../../../../../knowledge/qas/content-site-quality.md)
