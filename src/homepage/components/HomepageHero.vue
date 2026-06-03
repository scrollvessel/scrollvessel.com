<script setup lang="ts">
import MapLink from './MapLink.vue'
</script>

<template>
  <div class="max-w-5xl">
    <p class="mb-5 font-display text-xs font-semibold uppercase tracking-[0.18em]">Scroll Vessel · Engineering notes</p>
    <h1 id="homepage-title" class="max-w-6xl font-title text-[clamp(3.25rem,8.6vw,7rem)] font-bold leading-[0.88] tracking-[-0.055em]">
      从技术、产品与系统视角出发，沉淀长期有效的洞见与实践
    </h1>
    <p class="mt-7 max-w-2xl text-[clamp(1.125rem,2vw,1.45rem)] leading-[1.82] text-[var(--ink-soft)]">
      这里收集软件工程、知识工程和 AI coding 相关的文章。你可以从主题分类进入，也可以直接查看精选和最新更新。
    </p>
    <div class="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-display text-sm uppercase tracking-[0.08em]" aria-label="首页主要入口">
      <MapLink href="#atlas-route">浏览主题</MapLink>
      <MapLink href="#featured-route">精选文章</MapLink>
      <MapLink href="#latest-route">最新更新</MapLink>
    </div>
  </div>
</template>
