<script setup lang="ts">
import type { HomepageArticleItem } from '../homepage-view-model'
import ArticleListItem from './ArticleListItem.vue'

defineProps<{
  id: string
  issue: string
  label: string
  title: string
  description: string
  articles: HomepageArticleItem[]
  emptyMessage: string
  folioPrefix: string
}>()
</script>

<template>
  <section class="editor-section" :id="id" :data-issue="issue">
    <div class="label">{{ label }}</div>
    <h2>{{ title }}</h2>
    <p class="dek">{{ description }}</p>
    <div v-if="articles.length" class="article-list" :aria-label="title">
      <ArticleListItem v-for="(article, index) in articles" :id="`${id}-article-${index + 1}`" :key="article.relativePath" :article="article" :folio="`${folioPrefix}${index + 1}`" />
    </div>
    <p v-else class="empty-state">{{ emptyMessage }}</p>
  </section>
</template>
