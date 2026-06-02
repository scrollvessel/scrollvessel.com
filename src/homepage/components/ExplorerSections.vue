<script setup lang="ts">
import type { HomepageCategoryNode } from '../homepage-model'
import type { HomepageArticleItem } from '../homepage-view-model'
import ArticleListSection from './ArticleListSection.vue'
import CategoryDirectorySection from './CategoryDirectorySection.vue'

defineProps<{
  categories: HomepageCategoryNode[]
  featuredArticles: HomepageArticleItem[]
  latestArticles: HomepageArticleItem[]
}>()
</script>

<template>
  <section class="sections mt-16 grid grid-cols-1 gap-10 border-t border-[var(--hairline)] pt-7 lg:grid-cols-[1.08fr_1fr_1fr] lg:gap-14" aria-label="首页探索入口">
    <CategoryDirectorySection :categories="categories" />
    <ArticleListSection
      id="featured-route"
      issue="Editor’s selection · kept pieces"
      label="Curated route"
      title="精选文章"
      description="像编辑部选刊一样，只把值得沉淀、值得回看的文章放到这里。"
      :articles="featuredArticles"
      empty-message="暂无精选文章，仍可从分类海图继续探索。"
      folio-prefix="F"
    />
    <ArticleListSection
      id="latest-route"
      issue="Recent dispatch · new notes"
      label="Recent route"
      title="最新文章"
      description="给回访读者看的近期来信；保持轻量、直接，不抢走海图主视觉。"
      :articles="latestArticles"
      empty-message="暂无最新文章，分类海图仍保持可用。"
      folio-prefix="N"
    />
  </section>
</template>
