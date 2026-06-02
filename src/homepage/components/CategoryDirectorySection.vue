<script setup lang="ts">
import type { HomepageCategoryNode } from '../homepage-model'

defineProps<{
  categories: HomepageCategoryNode[]
}>()
</script>

<template>
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
</template>
