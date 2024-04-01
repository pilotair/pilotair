import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "node:path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/__admin__",
  build: {
    outDir: "../src/__admin__",
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/__api__': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
