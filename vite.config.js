import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'src': resolve(__dirname, 'src'),
    },
  },
  plugins: [ vue() ],
})
