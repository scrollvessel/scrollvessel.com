<script setup lang="ts">
import MapLink from './MapLink.vue'
</script>

<template>
  <div class="max-w-5xl">
    <p class="mb-5 font-display text-xs font-semibold uppercase tracking-[0.18em]">Scroll Vessel · Engineering notes</p>
    <h1 id="homepage-title" class="max-w-5xl font-title text-[clamp(2.75rem,6.8vw,5.6rem)] font-bold leading-[0.98] tracking-[-0.025em]">
      从技术、产品与系统视角出发，沉淀长期有效的洞见与实践
    </h1>
    <div class="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-display text-sm uppercase tracking-[0.08em]" aria-label="首页主要入口">
      <MapLink href="#atlas-route">浏览主题</MapLink>
      <MapLink href="#featured-route">精选文章</MapLink>
      <MapLink href="#latest-route">最新更新</MapLink>
    </div>
  </div>
</template>
