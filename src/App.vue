<script setup lang="ts">
import { computed } from 'vue'
import Homepage from './homepage/Homepage.vue'
import { loadHomepageModel } from './homepage/load-homepage-content'
import { HomepageRouteRegistry } from './homepage/routing/homepage-route-registry'
import { StaticRouteGuard } from './homepage/routing/static-route-guard'

const routeGuard = new StaticRouteGuard(new HomepageRouteRegistry(loadHomepageModel()))
const currentPath = window.location.pathname
const shouldShowHomepage = computed(() => routeGuard.allows(currentPath))

routeGuard.redirectUnknown(currentPath)
</script>

<template>
  <Homepage v-if="shouldShowHomepage" />
</template>
