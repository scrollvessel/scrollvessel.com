<script setup lang="ts">
import { computed } from 'vue'
import CategoryChart from './components/CategoryChart.vue'
import DirectionSection from './components/DirectionSection.vue'
import ExplorerSections from './components/ExplorerSections.vue'
import HomepageHero from './components/HomepageHero.vue'
import { loadHomepageModel } from './load-homepage-content'
import './homepage.css'

const homepage = loadHomepageModel()
const categories = computed(() => homepage.topCategories())
const featuredArticles = computed(() => homepage.featuredArticles())
const latestArticles = computed(() => homepage.latestArticles())
</script>

<template>
  <main class="page-shell min-h-dvh text-[var(--ink)]">
    <article class="book mx-auto min-h-dvh w-[min(1180px,calc(100%_-_32px))] py-8 md:py-16">
      <div class="relative z-10">
        <nav class="mb-12 flex flex-col gap-4 font-display text-xs uppercase tracking-[0.08em] md:mb-16 md:flex-row md:items-baseline md:justify-between" aria-label="主要导航">
          <a class="min-h-11 inline-flex items-center font-bold" href="#top">卷书成船 / Scroll Vessel</a>
          <div class="flex flex-wrap gap-x-5 gap-y-2 text-[var(--ink-soft)]">
            <a class="nav-link" href="#atlas-route">Atlas</a>
            <a class="nav-link" href="#featured-route">Featured</a>
            <a class="nav-link" href="#latest-route">Latest</a>
            <a class="nav-link" href="#directions">Directions</a>
          </div>
        </nav>

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
