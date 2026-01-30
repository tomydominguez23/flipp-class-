import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Base relativa para que funcione en subcarpetas (GitHub Pages, etc.)
  base: './',
  plugins: [react()],
  build: {
    // Exporta a la raíz del repo para despliegues que esperan `dist/` en `/`
    outDir: '../dist',
    // Vite no borra outDir si está fuera del root a menos que se fuerce
    emptyOutDir: true,
  },
})
