<script setup lang="ts">
import type { HomepageArticleItem } from '../homepage-view-model'

defineProps<{
  article: HomepageArticleItem
  folio: string
  id: string
}>()
</script>

<template>
  <article :id="id" class="article" :data-folio="folio">
    <div>
      <a class="article-title" :href="article.url">{{ article.title }}</a>
      <div class="meta"><span>{{ article.categoryLabel }}</span><span>{{ article.updatedAt }}</span></div>
    </div>
  </article>
</template>
