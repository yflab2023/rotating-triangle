import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // ← GitHub Pages用（相対パス）
  build: {
    outDir: 'dist'
  }
})
