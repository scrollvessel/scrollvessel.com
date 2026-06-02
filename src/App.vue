<script setup lang="ts">
import { computed } from 'vue'
import Homepage from './homepage/Homepage.vue'
import { loadHomepageModel } from './homepage/load-homepage-content'

const homepage = loadHomepageModel()
const knownPaths = new Set<string>(['/', '/index.html', '/404.html'])

for (const article of homepage.allArticles()) {
  knownPaths.add(article.url)
}

for (const category of homepage.allCategories()) {
  knownPaths.add(category.url)
}

const currentPath = window.location.pathname
const shouldShowHomepage = computed(() => knownPaths.has(currentPath))

if (!shouldShowHomepage.value) {
  window.location.replace('/404.html')
}
</script>

<template>
  <Homepage v-if="shouldShowHomepage" />
</template>
