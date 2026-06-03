<script setup lang="ts">
import type { HomepageCategoryNode } from '../homepage-model'

defineProps<{
  categories: HomepageCategoryNode[]
}>()
</script>

<template>
  <section class="editor-section" id="atlas-route" data-issue="Index · topics">
    <div class="label">Topics</div>
    <h2>按主题浏览</h2>
    <p class="dek">从主题进入文章。一级主题给出方向，子主题帮助你更快找到具体内容。</p>
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
