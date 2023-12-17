import { URL, fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

function resolve(path: string) {
  return fileURLToPath(new URL(path, import.meta.url))
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: resolve('src'),
    },
  },
  css: {
    preprocessorOptions: {
      stylus: {
        imports: [resolve('src/assets/_variables.styl')],
      },
    },
  },
  plugins: [
    vue(),
    VitePWA(),
  ],
})
