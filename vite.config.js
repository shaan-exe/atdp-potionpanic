import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: '/shaandabomb/projects/p2/assets/index-6x1meezR.js',
        chunkFileNames: '/shaandabomb/projects/p2/assets/[name].js',
        assetFileNames: '/shaandabomb/projects/p2/assets/[name][extname]',
      }
    }
  }
})
