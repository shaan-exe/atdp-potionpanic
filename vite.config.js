import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: '/projects/p2/assets/index-6x1meezR.js',
        chunkFileNames: '/projects/p2/assets/[name].js',
        assetFileNames: '/projects/p2/assets/[name][extname]',
      }
    }
  }
})
