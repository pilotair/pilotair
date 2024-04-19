import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/__admin__",
  build: {
    outDir: "../wwwroot",
    emptyOutDir: true,
  },
  server: {
    port: 80,
    strictPort: true,
    proxy: {
      '/__api__': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})
