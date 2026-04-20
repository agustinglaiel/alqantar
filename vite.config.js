import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // NO incluyas 'react-map-gl' a secas
    include: ['mapbox-gl', 'react-map-gl/mapbox'],
    exclude: ['react-map-gl'], // opcional, por si otro plugin lo mete
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Mapbox is huge (~700kb) — isolate it so it only loads on /ubicacion
          mapbox: ['mapbox-gl', 'react-map-gl/mapbox'],
          // React core
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})