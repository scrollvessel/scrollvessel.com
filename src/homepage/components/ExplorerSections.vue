<script setup lang="ts">
import type { HomepageArticle, HomepageCategoryNode } from '../homepage-model'

const props = defineProps<{
  categories: HomepageCategoryNode[]
  featuredArticles: HomepageArticle[]
  latestArticles: HomepageArticle[]
}>()

function articleCategoryLabel(article: HomepageArticle): string {
  const labels = article.categoryPath.map((slug, index) => labelForPath(article.categoryPath.slice(0, index + 1)))
  return labels.join(' / ')
}

function labelForPath(path: string[]): string {
  const [topSlug, childSlug] = path
  const top = props.categories.find((category) => category.slug === topSlug)
  if (!childSlug) return top?.label ?? topSlug ?? ''

  return top?.children.find((category) => category.slug === childSlug)?.label ?? childSlug
}
</script>

<template>
  <section class="sections mt-16 grid grid-cols-1 gap-10 border-t border-[var(--hairline)] pt-7 lg:grid-cols-[1.08fr_1fr_1fr] lg:gap-14" aria-label="首页探索入口">
    <section class="editor-section" id="atlas-route" data-issue="Index · charted categories">
      <div class="label">Atlas route</div>
      <h2>按分类航行</h2>
      <p class="dek">海图给空间感；这里像目录页一样给出当前两层，方便快速扫读和跳转。</p>
      <div class="mt-5 grid" aria-label="分类层级">
        <template v-for="(category, categoryIndex) in categories" :key="category.slug">
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
            <a class="article-title" :href="article.url">{{ article.title }}</a>
            <div class="meta"><span>{{ articleCategoryLabel(article) }}</span><span>{{ article.updatedAt }}</span></div>
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
            <a class="article-title" :href="article.url">{{ article.title }}</a>
            <div class="meta"><span>{{ articleCategoryLabel(article) }}</span><span>{{ article.updatedAt }}</span></div>
          </div>
        </article>
      </div>
      <p v-else class="empty-state">暂无最新文章，分类海图仍保持可用。</p>
    </section>
  </section>
</template>
