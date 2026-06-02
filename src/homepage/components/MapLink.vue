<script setup lang="ts">
defineProps<{
  href: string
}>()
</script>

<template>
  <a class="map-link" :href="href"><slot /></a>
</template>
