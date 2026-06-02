<script setup lang="ts">
import type { HomepageCategoryNode } from '../homepage-model'

defineProps<{
  categories: HomepageCategoryNode[]
}>()
</script>

<template>
  <section class="mt-10" id="directions" aria-label="主题方向">
    <div class="label">Directions</div>
    <h2 class="font-title text-4xl font-bold tracking-[-0.03em]">主题方向</h2>
    <p class="mt-3 max-w-3xl leading-7 text-[var(--ink-soft)]">顶层分类作为书页海图上的航向标记出现；首页提供两层视窗，后续页面承接更完整的筛选和详情。</p>
    <div class="mt-5 flex flex-wrap gap-x-7 gap-y-3 font-display text-xs uppercase tracking-[0.08em]">
      <a v-for="category in categories" :key="category.slug" class="map-link" :href="category.url">{{ category.label }} · {{ category.description }}</a>
    </div>
    <p class="mt-9 border-t border-[var(--hairline)] pt-5 text-sm leading-7 text-[var(--ink-soft)]">视觉原则：用整页羊皮纸纹理、淡墨航线和编辑式文字层级建立书本纸张感；海图下方列表应像旧杂志目录和编辑选刊，不做现代按钮、厚边框卡片、玻璃拟态或棕色外框装饰。</p>
  </section>
</template>
