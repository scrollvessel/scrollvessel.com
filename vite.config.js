import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  appType: 'spa',
  base: '/',
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',
        'static-mermaid': 'src/static-mermaid.ts',
      },
      output: {
        entryFileNames: 'assets/[name].js',
      },
    },
  },
})
