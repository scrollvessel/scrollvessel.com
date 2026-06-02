<script setup lang="ts">
import type { HomepageCategoryNode } from '../homepage-model'

defineProps<{
  category: HomepageCategoryNode
  kind: 'parent' | 'child'
  selected?: boolean
}>()

const emit = defineEmits<{
  select: [slug: string]
}>()
</script>

<template>
  <a v-if="kind === 'parent'" :class="['chart-point parent', category.position]" :href="category.url">
    <strong>{{ category.label }}</strong>{{ category.count }} 篇<em>{{ category.description }}</em>
  </a>
  <button v-else :class="['chart-point child text-left', category.position, { selected }]" type="button" @click="emit('select', category.slug)">
    <strong>{{ category.label }}</strong>{{ category.description }}<em>{{ category.count }} 篇</em>
  </button>
</template>
