import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'projects/assets/index-6x1meezR.js',
        chunkFileNames: 'projects/assets/[name].js',
        assetFileNames: 'projects/assets/[name][extname]',
      }
    }
  }
})
