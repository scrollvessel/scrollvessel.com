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
    <ChartPoint :category="category" kind="parent" :selected="category.children.length === 0 && selectedCategory === category.slug" @select="category.children.length === 0 && emit('select', $event)" />
    <template v-for="child in category.children" :key="child.slug">
      <ChartPoint :category="child" kind="child" :selected="child.children.length === 0 && selectedCategory === child.slug" @select="child.children.length === 0 && emit('select', $event)" />
      <ChartPoint v-for="grandchild in child.children" :key="grandchild.slug" :category="grandchild" kind="grandchild" :selected="selectedCategory === grandchild.slug" @select="emit('select', $event)" />
    </template>
  </template>
</template>
