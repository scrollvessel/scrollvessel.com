<script setup>
import { computed, ref } from 'vue'
import { toArticleRecord } from './content/content-records'
import { parseFrontMatter } from './content/frontmatter'

const categoryNames = {
  'ai-development': 'AI 开发',
  agents: 'Agent 实践',
  'engineering-practice': '工程实践',
  'frontend-architecture': '前端架构',
  indexes: '目录索引',
  'knowledge-engineering': '知识工程',
  'quality-gates': '质量守门',
  'release-build': '发布与构建',
  'single-authority': '单一权威',
  'static-sites': '静态站点',
  tooling: '工具链',
  'vue-engineering': 'Vue 工程',
}

const categoryDescriptions = {
  'ai-development': 'Agent / 提示词 / 工具链',
  agents: '任务编排、审查、记忆',
  'engineering-practice': '发布 / 构建 / 质量',
  'frontend-architecture': 'Vue / 静态站 / 路由',
  indexes: '信息架构、检索入口',
  'knowledge-engineering': '目录 / 索引 / 单一权威',
  'quality-gates': '测试、校验、回归',
  'release-build': 'CI、构建、部署',
  'single-authority': '引用、去重、演进',
  'static-sites': '内容索引、路由生成',
  tooling: 'CLI、MCP、自动化',
  'vue-engineering': '组件、状态、组合式',
}

const categoryPositions = {
  'engineering-practice': 'practice',
  'release-build': 'practice-build',
  'quality-gates': 'practice-quality',
  'frontend-architecture': 'frontend',
  'vue-engineering': 'frontend-vue',
  'static-sites': 'frontend-static',
  'knowledge-engineering': 'knowledge',
  indexes: 'knowledge-index',
  'single-authority': 'knowledge-authority',
  'ai-development': 'ai',
  agents: 'ai-agent',
  tooling: 'ai-tooling',
}

const markdownModules = import.meta.glob('../content/**/*.md', { eager: true, query: '?raw', import: 'default' })

const articles = Object.entries(markdownModules)
  .map(([sourcePath, source]) => {
    const { data, body } = parseFrontMatter(source, sourcePath)
    const relativePath = sourcePath.replace(/^\.\.\/content\//, '')
    const article = toArticleRecord({ body, data, relativePath, sourcePath })

    return {
      ...article,
      anchor: `#article-${article.url.slice(1).replaceAll('/', '-')}`,
    }
  })
  .filter((article) => article.draft !== true)

const homepageArticles = computed(() => articles.filter((article) => !article.relativePath.startsWith('demo/')))
const topCategories = computed(() => buildCategoryTree(homepageArticles.value))
const featuredArticles = computed(() => homepageArticles.value.filter((article) => article.featured === true).sort(compareNewest).slice(0, 3))
const latestArticles = computed(() => [...homepageArticles.value].sort(compareNewest).slice(0, 3))
const selectedCategory = ref('static-sites')

const selectedCategoryChildren = computed(() => {
  const selected = topCategories.value.flatMap((category) => category.children).find((category) => category.slug === selectedCategory.value)
  if (!selected) return []

  return selected.articles.slice(0, 3).map((article) => ({
    count: 1,
    label: article.title,
    url: '#focused-route',
  }))
})

function buildCategoryTree(sourceArticles) {
  const topMap = new Map()

  for (const article of sourceArticles) {
    const [topSlug = 'uncategorized', childSlug = 'general'] = article.categoryPath
    const top = ensureCategory(topMap, topSlug)
    const child = ensureCategory(top.childrenMap, childSlug)

    top.count += 1
    child.count += 1
    child.articles.push(article)
  }

  return [...topMap.values()].map((category) => ({
    ...category,
    children: [...category.childrenMap.values()].sort((a, b) => b.count - a.count),
  }))
}

function ensureCategory(map, slug) {
  const category = map.get(slug)
  if (category) return category

  const next = {
    articles: [],
    childrenMap: new Map(),
    count: 0,
    description: categoryDescriptions[slug] ?? slug,
    label: categoryNames[slug] ?? slug,
    position: categoryPositions[slug] ?? '',
    slug,
    url: '#atlas-route',
  }
  map.set(slug, next)
  return next
}

function compareNewest(a, b) {
  return String(b.updatedAt ?? b.createdAt).localeCompare(String(a.updatedAt ?? a.createdAt))
}
</script>

<template>
  <main class="page-shell min-h-dvh text-[var(--ink)]">
    <article class="book mx-auto min-h-dvh w-[min(1180px,calc(100%_-_32px))] py-8 md:py-16">
      <div class="relative z-10">
        <nav class="mb-12 flex flex-col gap-4 font-display text-xs uppercase tracking-[0.08em] md:mb-16 md:flex-row md:items-baseline md:justify-between" aria-label="主要导航">
          <a class="min-h-11 inline-flex items-center font-bold" href="#top">卷书成船 / Scroll Vessel</a>
          <div class="flex flex-wrap gap-x-5 gap-y-2 text-[var(--ink-soft)]">
            <a class="nav-link" href="#atlas-route">Atlas</a>
            <a class="nav-link" href="#featured-route">Featured</a>
            <a class="nav-link" href="#latest-route">Latest</a>
            <a class="nav-link" href="#directions">Directions</a>
          </div>
        </nav>

        <section id="top" class="grid gap-10 md:gap-16" aria-labelledby="homepage-title">
          <div class="max-w-5xl">
            <p class="mb-5 font-display text-xs font-semibold uppercase tracking-[0.18em]">Aged parchment · Editorial nautical chart</p>
            <h1 id="homepage-title" class="max-w-6xl font-title text-[clamp(3.25rem,8.6vw,7rem)] font-bold leading-[0.88] tracking-[-0.055em]">
              沿着书页上的海图，寻找可沉淀的工程实践。
            </h1>
            <p class="mt-7 max-w-2xl text-[clamp(1.125rem,2vw,1.45rem)] leading-[1.82] text-[var(--ink-soft)]">
              Scroll Vessel 是持续筛选、结构化组织和长期维护的技术内容航线图。首页先展开一张两层分类海图；点击航点时，海图像镜头推进一样聚焦并展开下一层。
            </p>
            <div class="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-display text-sm uppercase tracking-[0.08em]" aria-label="首页主要入口">
              <a class="map-link" href="#atlas-route">按分类浏览</a>
              <a class="map-link" href="#featured-route">查看精选</a>
              <a class="map-link" href="#latest-route">查看最新</a>
            </div>
          </div>

          <aside class="chart relative min-h-[980px] isolation-isolate md:min-h-[clamp(760px,72vw,940px)]" aria-label="首页分类海图概念">
            <svg class="absolute inset-0 size-full" viewBox="0 0 1180 820" aria-hidden="true">
              <defs>
                <pattern id="waves" width="42" height="21" patternUnits="userSpaceOnUse">
                  <path d="M0 10 C10 2 21 19 31 10 C36 6 39 6 42 10" fill="none" stroke="rgba(47,33,15,.11)" stroke-width="1" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="1180" height="820" fill="url(#waves)" opacity="0.56" />
              <circle cx="590" cy="405" r="248" fill="none" stroke="rgba(47,33,15,.18)" />
              <circle cx="590" cy="405" r="170" fill="none" stroke="rgba(47,33,15,.14)" />
              <circle cx="590" cy="405" r="92" fill="none" stroke="rgba(47,33,15,.1)" />
              <path d="M590 132 L590 690 M220 405 L960 405" stroke="rgba(47,33,15,.12)" />
              <path d="M590 200 L621 405 L590 610 L559 405 Z" fill="rgba(47,33,15,.018)" stroke="rgba(47,33,15,.38)" />
              <path d="M382 405 L590 375 L798 405 L590 435 Z" fill="rgba(47,33,15,.012)" stroke="rgba(47,33,15,.3)" />
              <path d="M590 405 C452 328 340 260 178 226" fill="none" stroke="rgba(47,33,15,.56)" stroke-width="1.55" stroke-dasharray="7 9" />
              <path d="M590 405 C742 332 856 270 1010 234" fill="none" stroke="rgba(47,33,15,.52)" stroke-width="1.5" stroke-dasharray="7 9" />
              <path d="M590 405 C458 492 350 590 220 684" fill="none" stroke="rgba(47,33,15,.48)" stroke-width="1.35" stroke-dasharray="3 8" />
              <path d="M590 405 C728 494 838 604 962 692" fill="none" stroke="rgba(47,33,15,.44)" stroke-width="1.25" stroke-dasharray="3 8" />
              <path d="M178 226 C150 300 132 360 118 442 M178 226 C258 314 318 350 398 382" fill="none" stroke="rgba(47,33,15,.24)" />
              <path d="M1010 234 C900 330 840 356 760 384 M1010 234 C1044 300 1062 354 1072 432" fill="none" stroke="rgba(47,33,15,.24)" />
              <path d="M220 684 C154 626 110 580 76 520 M220 684 C316 626 384 588 468 546" fill="none" stroke="rgba(47,33,15,.22)" />
              <path d="M962 692 C846 618 786 574 718 522 M962 692 C1040 634 1092 584 1120 532" fill="none" stroke="rgba(47,33,15,.22)" />
            </svg>

            <div class="absolute left-1/2 top-0 w-[min(680px,92%)] -translate-x-1/2 text-center max-sm:static max-sm:w-auto max-sm:translate-x-0 max-sm:text-left">
              <div class="label">Classification chart</div>
              <p class="mt-3 text-base leading-[1.65] text-[var(--ink-soft)]">默认只露出当前视窗的两层航点；选择某个子类后，海图聚焦到该区域并继续展开下一层。</p>
            </div>

            <div class="absolute left-1/2 top-1/2 grid size-32 -translate-x-1/2 -translate-y-1/2 place-items-center text-center font-display text-sm font-semibold uppercase tracking-[0.08em] md:size-36">
              Scroll<br />Vessel
            </div>

            <template v-for="category in topCategories" :key="category.slug">
              <a :class="['chart-point parent', category.position]" :href="category.url">
                <strong>{{ category.label }}</strong>{{ category.count }} 篇<em>{{ category.description }}</em>
              </a>
              <button
                v-for="child in category.children"
                :key="child.slug"
                :class="['chart-point child text-left', child.position, { selected: selectedCategory === child.slug }]"
                type="button"
                @click="selectedCategory = child.slug"
              >
                <strong>{{ child.label }}</strong>{{ child.description }}<em>{{ child.count }} 篇</em>
              </button>
            </template>

            <div id="focused-route" class="focus-map absolute bottom-[36%] left-0 right-0 px-5 py-4 md:bottom-[7%] md:left-1/2 md:right-auto md:w-[min(420px,46%)] md:-translate-x-1/2" aria-label="点击航点后的聚焦展开示意">
              <div class="label">Focused route · after selection</div>
              <strong>{{ categoryNames[selectedCategory] }}</strong>
              <p>镜头推进到选中航点，旧节点退到纸面后景，并展开下一层子航线。</p>
              <div class="grid gap-2 text-sm">
                <a v-for="branch in selectedCategoryChildren" :key="branch.url" class="grid min-h-8 grid-cols-[1fr_auto] items-center gap-3 border-t border-[rgba(47,33,15,0.14)] pt-2" :href="branch.url">
                  <span>{{ branch.label }}</span><span>{{ branch.count }} 篇</span>
                </a>
              </div>
            </div>
          </aside>
        </section>

        <section class="sections mt-16 grid grid-cols-1 gap-10 border-t border-[var(--hairline)] pt-7 lg:grid-cols-[1.08fr_1fr_1fr] lg:gap-14" aria-label="首页探索入口">
          <section class="editor-section" id="atlas-route" data-issue="Index · charted categories">
            <div class="label">Atlas route</div>
            <h2>按分类航行</h2>
            <p class="dek">海图给空间感；这里像目录页一样给出当前两层，方便快速扫读和跳转。</p>
            <div class="mt-5 grid" aria-label="分类层级">
              <template v-for="(category, categoryIndex) in topCategories" :key="category.slug">
                <a class="category-row category-parent" :data-folio="String(categoryIndex + 1).padStart(2, '0')" :href="category.url">
                  <strong>{{ category.label }}</strong><span>{{ category.count }} 篇</span>
                </a>
                <a v-for="(child, childIndex) in category.children" :key="child.slug" class="category-row category-child" :data-folio="`${categoryIndex + 1}${String.fromCharCode(65 + childIndex)}`" :href="child.url">
                  <span>{{ child.label }}</span><span>{{ child.count }} 篇</span>
                </a>
              </template>
            </div>
          </section>

          <section class="editor-section" id="featured-route" data-issue="Editor’s selection · kept pieces">
            <div class="label">Curated route</div>
            <h2>精选文章</h2>
            <p class="dek">像编辑部选刊一样，只把值得沉淀、值得回看的文章放到这里。</p>
            <div v-if="featuredArticles.length" class="article-list" aria-label="精选文章">
              <article v-for="(article, index) in featuredArticles" :id="`featured-article-${index + 1}`" :key="article.relativePath" class="article" :data-folio="`F${index + 1}`">
                <div>
                  <a class="article-title" :href="`#featured-article-${index + 1}`">{{ article.title }}</a>
                  <div class="meta"><span>{{ article.categoryPath.map((part) => categoryNames[part] ?? part).join(' / ') }}</span><span>{{ article.updatedAt }}</span></div>
                </div>
              </article>
            </div>
            <p v-else class="empty-state">暂无精选文章，仍可从分类海图继续探索。</p>
          </section>

          <section class="editor-section" id="latest-route" data-issue="Recent dispatch · new notes">
            <div class="label">Recent route</div>
            <h2>最新文章</h2>
            <p class="dek">给回访读者看的近期来信；保持轻量、直接，不抢走海图主视觉。</p>
            <div v-if="latestArticles.length" class="article-list" aria-label="最新文章">
              <article v-for="(article, index) in latestArticles" :id="`latest-article-${index + 1}`" :key="article.relativePath" class="article" :data-folio="`N${index + 1}`">
                <div>
                  <a class="article-title" :href="`#latest-article-${index + 1}`">{{ article.title }}</a>
                  <div class="meta"><span>{{ article.categoryPath.map((part) => categoryNames[part] ?? part).join(' / ') }}</span><span>{{ article.updatedAt }}</span></div>
                </div>
              </article>
            </div>
            <p v-else class="empty-state">暂无最新文章，分类海图仍保持可用。</p>
          </section>
        </section>

        <section class="mt-10" id="directions" aria-label="主题方向">
          <div class="label">Directions</div>
          <h2 class="font-title text-4xl font-bold tracking-[-0.03em]">主题方向</h2>
          <p class="mt-3 max-w-3xl leading-7 text-[var(--ink-soft)]">顶层分类作为书页海图上的航向标记出现；首页提供两层视窗，后续页面承接更完整的筛选和详情。</p>
          <div class="mt-5 flex flex-wrap gap-x-7 gap-y-3 font-display text-xs uppercase tracking-[0.08em]">
            <a v-for="category in topCategories" :key="category.slug" class="map-link" :href="category.url">{{ category.label }} · {{ category.description }}</a>
          </div>
          <p class="mt-9 border-t border-[var(--hairline)] pt-5 text-sm leading-7 text-[var(--ink-soft)]">视觉原则：用整页羊皮纸纹理、淡墨航线和编辑式文字层级建立书本纸张感；海图下方列表应像旧杂志目录和编辑选刊，不做现代按钮、厚边框卡片、玻璃拟态或棕色外框装饰。</p>
        </section>
      </div>
    </article>
  </main>
</template>
