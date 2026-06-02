import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  appType: 'spa',
  base: '/',
  plugins: [vue()],
})
