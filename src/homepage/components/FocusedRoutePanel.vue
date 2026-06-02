<script setup lang="ts">
import type { FocusedRouteItem } from '../homepage-model'

defineProps<{
  selectedCategoryLabel: string
  focusedRouteItems: FocusedRouteItem[]
}>()
</script>

<template>
  <div id="focused-route" class="focus-map absolute bottom-[36%] left-0 right-0 px-5 py-4 md:bottom-[7%] md:left-1/2 md:right-auto md:w-[min(420px,46%)] md:-translate-x-1/2" aria-label="点击航点后的聚焦展开示意">
    <div class="label">Focused route · after selection</div>
    <strong>{{ selectedCategoryLabel }}</strong>
    <p>镜头推进到选中航点，旧节点退到纸面后景，并展开下一层子航线。</p>
    <div class="grid gap-2 text-sm">
      <a v-for="branch in focusedRouteItems" :key="branch.url" class="grid min-h-8 grid-cols-[1fr_auto] items-center gap-3 border-t border-[rgba(47,33,15,0.14)] pt-2" :href="branch.url">
        <span>{{ branch.label }}</span><span>{{ branch.count }} 篇</span>
      </a>
    </div>
  </div>
</template>
