import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/)
export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: 5173,
    strictPort: true,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5555'
    },
    port: 5173,
    strictPort: true,
    host: true,
    origin: "http://localhost:5173",
  },
 });