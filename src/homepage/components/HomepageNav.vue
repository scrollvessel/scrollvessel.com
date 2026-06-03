<script setup lang="ts">
interface NavItem {
  href: string
  label: string
}

const navItems: NavItem[] = [
  { href: '#atlas-route', label: 'Atlas' },
  { href: '#featured-route', label: 'Featured' },
  { href: '#latest-route', label: 'Latest' },
  { href: '#directions', label: 'Directions' },
]
</script>

<template>
  <nav class="mb-12 flex flex-col gap-4 font-display text-xs uppercase tracking-[0.08em] md:mb-16 md:flex-row md:items-baseline md:justify-between" aria-label="主要导航">
    <a class="min-h-11 inline-flex items-center font-bold" href="#top">卷书成船 / Scroll Vessel</a>
    <div class="flex flex-wrap gap-x-5 gap-y-2 text-(--ink-soft)">
      <a v-for="item in navItems" :key="item.href" class="nav-link" :href="item.href">{{ item.label }}</a>
    </div>
  </nav>
</template>
