import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // En producción se publica bajo /flipp-class-/ en GitHub Pages.
  base: mode === 'production' ? '/flipp-class-/' : '/',
  plugins: [react()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
}))
