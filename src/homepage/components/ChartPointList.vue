<script setup lang="ts">
import type { HomepageCategoryNode } from '../homepage-model'
import ChartPoint from './ChartPoint.vue'

defineProps<{
  categories: HomepageCategoryNode[]
  selectedCategory: string
}>()

const emit = defineEmits<{
  select: [slug: string]
}>()
</script>

<template>
  <template v-for="category in categories" :key="category.slug">
    <ChartPoint :category="category" kind="parent" />
    <ChartPoint v-for="child in category.children" :key="child.slug" :category="child" kind="child" :selected="selectedCategory === child.slug" @select="emit('select', $event)" />
  </template>
</template>
