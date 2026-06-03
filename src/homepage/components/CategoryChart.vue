<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { buildFocusedRouteItems, firstChildSlug, type HomepageCategoryNode } from '../homepage-model'
import ChartBackground from './ChartBackground.vue'
import ChartPointList from './ChartPointList.vue'
import FocusedRoutePanel from './FocusedRoutePanel.vue'

const props = defineProps<{
  categories: HomepageCategoryNode[]
}>()

const selectedCategory = ref(firstChildSlug(props.categories))

watch(
  () => props.categories,
  (categories) => {
    if (!selectableCategories(categories).some((category) => category.slug === selectedCategory.value)) {
      selectedCategory.value = firstChildSlug(categories)
    }
  },
)

const selectedCategoryLabel = computed(() => {
  return selectableCategories(props.categories).find((category) => category.slug === selectedCategory.value)?.label ?? ''
})

const focusedRouteItems = computed(() => buildFocusedRouteItems(props.categories, selectedCategory.value))

function selectableCategories(categories: HomepageCategoryNode[]): HomepageCategoryNode[] {
  return categories.flatMap((category) => deepestVisibleCategories(category))
}

function deepestVisibleCategories(category: HomepageCategoryNode): HomepageCategoryNode[] {
  if (category.children.length === 0) return [category]
  return category.children.flatMap((child) => deepestVisibleCategories(child))
}
</script>

<template>
  <aside class="chart relative min-h-245 isolation-isolate md:min-h-[clamp(760px,72vw,940px)]" aria-label="首页分类海图概念">
    <ChartBackground />

    <div class="absolute left-1/2 top-0 w-[min(680px,92%)] -translate-x-1/2 text-center max-sm:static max-sm:w-auto max-sm:translate-x-0 max-sm:text-left">
      <div class="label">Classification chart</div>
      <p class="mt-3 text-base leading-[1.65] text-(--ink-soft)">默认最多露出当前视窗的三层航点；选择最深可见分类后，海图聚焦到该区域。</p>
    </div>

    <div class="absolute left-1/2 top-1/2 grid size-32 -translate-x-1/2 -translate-y-1/2 place-items-center text-center font-display text-sm font-semibold uppercase tracking-[0.08em] md:size-36">
      Scroll<br />Vessel
    </div>

    <ChartPointList :categories="categories" :selected-category="selectedCategory" @select="selectedCategory = $event" />
    <FocusedRoutePanel :selected-category-label="selectedCategoryLabel" :focused-route-items="focusedRouteItems" />
  </aside>
</template>
