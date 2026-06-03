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
  <section class="sections mt-16 grid grid-cols-1 gap-10 border-t border-(--hairline) pt-7 lg:grid-cols-[1.08fr_1fr_1fr] lg:gap-14" aria-label="首页探索入口">
    <CategoryDirectorySection :categories="categories" />
    <ArticleListSection
      id="featured-route"
      issue="Editor’s selection"
      label="Featured"
      title="精选文章"
      description="适合先读的文章，覆盖本站当前最重要的主题。"
      :articles="featuredArticles"
      empty-message="暂无精选文章，可以先从主题分类进入。"
      folio-prefix="F"
    />
    <ArticleListSection
      id="latest-route"
      issue="Recent notes"
      label="Latest"
      title="最新文章"
      description="最近更新的文章，适合回访时快速查看新增内容。"
      :articles="latestArticles"
      empty-message="暂无最新文章，可以先从主题分类进入。"
      folio-prefix="N"
    />
  </section>
</template>
