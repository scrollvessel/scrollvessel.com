<script setup lang="ts">
import type { HomepageCategoryNode } from '../homepage-model'
import MapLink from './MapLink.vue'

defineProps<{
  categories: HomepageCategoryNode[]
}>()
</script>

<template>
  <section class="mt-10" id="directions" aria-label="主题方向">
    <div class="label">Topics</div>
    <h2 class="font-title text-4xl font-bold tracking-[-0.03em]">主题方向</h2>
    <p class="mt-3 max-w-3xl leading-7 text-(--ink-soft)">这些是本站目前持续整理的主要方向。进入任一主题，可以继续查看子分类和文章。</p>
    <div class="mt-5 flex flex-wrap gap-x-7 gap-y-3 font-display text-xs uppercase tracking-[0.08em]">
      <MapLink v-for="category in categories" :key="category.slug" :href="category.url">{{ category.label }} · {{ category.description }}</MapLink>
    </div>
    <p class="mt-9 border-t border-(--hairline) pt-5 text-sm leading-7 text-(--ink-soft)">Scroll Vessel 会持续补充这些主题下的长文、翻译和实践笔记。</p>
  </section>
</template>
