import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/__admin__",
  build: {
    outDir: "../Pilotair/wwwroot",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 80,
    strictPort: true,
    proxy: {
      "^(?!/__admin__(/?)).*": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
