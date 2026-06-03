<script setup lang="ts">
import type { FocusedRouteItem } from '../homepage-model'

defineProps<{
  selectedCategoryLabel: string
  focusedRouteItems: FocusedRouteItem[]
}>()
</script>

<template>
  <div id="focused-route" class="focus-map absolute bottom-[36%] left-0 right-0 px-5 py-4 md:bottom-[7%] md:left-1/2 md:right-auto md:w-[min(420px,46%)] md:-translate-x-1/2" aria-label="当前主题下的内容">
    <div class="label">Selected topic</div>
    <strong>{{ selectedCategoryLabel }}</strong>
    <p>继续查看这个主题下的文章和子主题。</p>
    <div class="grid gap-2 text-sm">
      <a v-for="branch in focusedRouteItems" :key="branch.url" class="grid min-h-8 grid-cols-[1fr_auto] items-center gap-3 border-t border-[rgba(47,33,15,0.14)] pt-2" :href="branch.url">
        <span>{{ branch.label }}</span><span>{{ branch.count }} 篇</span>
      </a>
    </div>
  </div>
</template>
