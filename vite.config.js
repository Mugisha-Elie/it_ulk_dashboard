import { defineConfig } from 'vite'

export default defineConfig({
  // Base public path — change if deploying to a subdirectory
  base: '/',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
