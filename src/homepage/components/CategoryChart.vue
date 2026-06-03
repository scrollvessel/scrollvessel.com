<script setup lang="ts">
import { computed } from 'vue'
import { CategoryChartState } from '../chart/category-chart-state'
import type { HomepageCategoryNode } from '../homepage-model'
import ChartBackground from './ChartBackground.vue'
import ChartPointList from './ChartPointList.vue'
import FocusedRoutePanel from './FocusedRoutePanel.vue'

const props = defineProps<{
  categories: HomepageCategoryNode[]
}>()

const state = new CategoryChartState(computed(() => props.categories))
</script>

<template>
  <aside class="chart relative min-h-245 isolation-isolate md:min-h-[clamp(760px,72vw,940px)]" aria-label="主题分类图">
    <ChartBackground />

    <div class="absolute left-1/2 top-0 w-[min(680px,92%)] -translate-x-1/2 text-center max-sm:static max-sm:w-auto max-sm:translate-x-0 max-sm:text-left">
      <div class="label">Topic map</div>
      <p class="mt-3 text-base leading-[1.65] text-(--ink-soft)">选择一个主题，查看它下面的文章和子主题。</p>
    </div>

    <div class="absolute left-1/2 top-1/2 grid size-32 -translate-x-1/2 -translate-y-1/2 place-items-center text-center font-display text-sm font-semibold uppercase tracking-[0.08em] md:size-36">
      Scroll<br />Vessel
    </div>

    <ChartPointList :categories="categories" :selected-category="state.selectedCategory.value" @select="state.selectedCategory.value = $event" />
    <FocusedRoutePanel :selected-category-label="state.selectedCategoryLabel.value" :focused-route-items="state.focusedRouteItems.value" />
  </aside>
</template>
