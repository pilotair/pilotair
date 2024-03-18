import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/__admin__/",
  build: {
    outDir: "../wwwroot",
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/__admin__/api': {
        target: 'http://localhost',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
