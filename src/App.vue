<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const messages = ["Hello, I'm Scroll Vessel !", '你好，我是卷书成船！']
const currentIndex = ref(0)
let intervalId

const headline = computed(() => messages[currentIndex.value])

onMounted(() => {
  intervalId = window.setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % messages.length
  }, 5000)
})

onBeforeUnmount(() => {
  window.clearInterval(intervalId)
})
</script>

<template>
  <main class="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center">
    <h1 class="bg-gradient-to-r from-red-500 via-yellow-300 via-green-300 via-blue-400 to-purple-500 bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-7xl lg:text-8xl">
      {{ headline }}
    </h1>
  </main>
</template>
