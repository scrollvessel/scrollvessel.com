<script setup lang="ts">
import MapLink from './MapLink.vue'
</script>

<template>
  <div class="max-w-5xl">
    <p class="mb-5 font-display text-xs font-semibold uppercase tracking-[0.18em]">Aged parchment · Editorial nautical chart</p>
    <h1 id="homepage-title" class="max-w-6xl font-title text-[clamp(3.25rem,8.6vw,7rem)] font-bold leading-[0.88] tracking-[-0.055em]">
      沿着书页上的海图，寻找可沉淀的工程实践。
    </h1>
    <p class="mt-7 max-w-2xl text-[clamp(1.125rem,2vw,1.45rem)] leading-[1.82] text-[var(--ink-soft)]">
      Scroll Vessel 是持续筛选、结构化组织和长期维护的技术内容航线图。首页先展开一张两层分类海图；点击航点时，海图像镜头推进一样聚焦并展开下一层。
    </p>
    <div class="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-display text-sm uppercase tracking-[0.08em]" aria-label="首页主要入口">
      <MapLink href="#atlas-route">按分类浏览</MapLink>
      <MapLink href="#featured-route">查看精选</MapLink>
      <MapLink href="#latest-route">查看最新</MapLink>
    </div>
  </div>
</template>
