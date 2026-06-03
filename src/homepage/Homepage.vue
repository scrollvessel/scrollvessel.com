<script setup lang="ts">
import { computed } from 'vue'
import CategoryChart from './components/CategoryChart.vue'
import DirectionSection from './components/DirectionSection.vue'
import ExplorerSections from './components/ExplorerSections.vue'
import HomepageHero from './components/HomepageHero.vue'
import HomepageNav from './components/HomepageNav.vue'
import { HomepageViewModel } from './homepage-view-model'
import { loadHomepageModel } from './load-homepage-content'
import './homepage.css'

const homepage = loadHomepageModel()
const viewModel = new HomepageViewModel(homepage)
const categories = computed(() => viewModel.topCategories())
const featuredArticles = computed(() => viewModel.featuredArticles())
const latestArticles = computed(() => viewModel.latestArticles())
</script>

<template>
  <main class="page-shell min-h-dvh text-(--ink)">
    <article class="book mx-auto min-h-dvh w-[min(1180px,calc(100%-32px))] py-8 md:py-16">
      <div class="relative z-10">
        <HomepageNav />

        <section id="top" class="grid gap-10 md:gap-16" aria-labelledby="homepage-title">
          <HomepageHero />
          <CategoryChart :categories="categories" />
        </section>

        <ExplorerSections :categories="categories" :featured-articles="featuredArticles" :latest-articles="latestArticles" />
        <DirectionSection :categories="categories" />
      </div>
    </article>
  </main>
</template>
