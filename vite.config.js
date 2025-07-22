import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'index-6x1meezR.js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name][extname]',
      }
    }
  }
})
